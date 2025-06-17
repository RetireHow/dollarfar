/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo, useEffect } from "react";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { ConfigProvider, theme as antdTheme, Modal } from "antd";
import { Icon } from "@iconify/react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  Area,
} from "recharts";
import { MortgageInputs, MortgageResults } from "./types";
import {
  calculatePMI,
  calculatePeriodicPayment,
  generateAmortizationSchedule,
  calculateEquityData,
  formatCurrency,
} from "./utils";
import { useCustomPDF } from "../../hooks/useCustomPDF";
import { assets } from "../../assets/assets";
import PageHero from "../../components/UI/PageHero";
import { toast } from "react-toastify";
import { baseUrl } from "../../api/apiConstant";
import { Link } from "react-router-dom";

const data = {
  title: "Powerful Mortgage Calculator",
  description:
    "Quickly estimate your home loan payments, amortization schedule, and potential savings from prepayments. Compare different payment frequencies, visualize interest costs, and see how extra payments reduce your loan term.",
  image: assets.mortgageIconSvg,
};

// Color scheme
const COLORS = {
  primary: "#2b6777",
  secondary: "#52ab98",
  accent: "#c8d8e4",
  background: "#f2f2f2",
  textDark: "#333333",
  textLight: "#ffffff",
};

const paymentBreakdownColors = [
  COLORS.primary, // Principal & Interest
  COLORS.secondary, // Property Tax
  "#FF9800", // Insurance
  "#F44336", // PMI
  "#9E9E9E", // HOA
];

const defaultInputs: MortgageInputs = {
  homePrice: 300000,
  downPaymentPercentage: 20,
  downPaymentAmount: 60000,
  loanTerm: 30,
  interestRate: 3.5,
  paymentFrequency: "monthly",
  propertyTax: 3000,
  homeInsurance: 1200,
  hoaFees: 200,
  startDate: moment(),
  extraPayment: 0,
  extraPaymentFrequency: "monthly",
};

type HelpModalProps = {
  title: string;
  content: string;
  visible: boolean;
  onClose: () => void;
};

type ExportPDFModalProps = {
  targetRef: React.RefObject<HTMLDivElement>;
  setIsGeneratingPDF: React.Dispatch<React.SetStateAction<boolean>>;
  isGeneratingPDF: boolean;
  setPdfError: React.Dispatch<React.SetStateAction<string | null>>;
  toPDF: () => Promise<void>;
};

const ExportPDFModal = ({
  targetRef,
  setIsGeneratingPDF,
  isGeneratingPDF,
  setPdfError,
  toPDF,
}: ExportPDFModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    agreed: false,
  });
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isDarkMode = document.documentElement.classList.contains("dark");
  const primaryColor = isDarkMode ? "#52ab98" : "#2b6777";
  const secondaryColor = isDarkMode ? "#3d8a7a" : "#1a4d5a";

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsGeneratingPDF(false);
    setPdfError(null);
    setIsModalOpen(false);
    setShowError(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      agreed: false,
    });
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSendEmail = async () => {
    // Validate fields
    if (
      !formData.email.trim() ||
      !formData.name.trim() ||
      !formData.phone.trim()
    ) {
      return setShowError(true);
    }
    if (formData.email.trim() && !emailRegex.test(formData.email)) {
      return setShowError(true);
    }
    if (!formData.agreed) {
      return setShowError(true);
    }

    setIsLoading(true);
    setIsGeneratingPDF(true);
    setPdfError(null);

    try {
      const res = await fetch(
        `${baseUrl}/report-downloaded-users/create-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            downloadedFileName: "Mortgage Calculator Report",
          }),
        }
      );

      if (!res.ok) {
        return toast.error("Failed to submit details");
      }

      await res.json();
      toast.success("A confirmation email has been sent.", {
        position: "top-center",
      });

      // Show the PDF content temporarily with fixed width
      if (targetRef.current) {
        targetRef.current.style.display = "block";
        targetRef.current.style.width = "794px";
        targetRef.current.style.margin = "0 auto";
        targetRef.current.style.padding = "0";
        targetRef.current.style.backgroundColor = isDarkMode
          ? "#1a1a1a"
          : "#fff";
      }

      // Add small delay to ensure proper rendering
      await new Promise((resolve) => setTimeout(resolve, 500));
      await toPDF();
    } catch (error: unknown) {
      console.error("Email sending failed:", error);
      setPdfError("Failed to generate PDF. Please try again.");
      const errorMessage = "Unexpected error occurred";
      toast.error(`Failed to send report: ${errorMessage}`, {
        position: "top-center",
      });
    } finally {
      // Hide the PDF content again
      if (targetRef.current) {
        targetRef.current.style.display = "none";
        targetRef.current.style.width = "";
        targetRef.current.style.margin = "";
        targetRef.current.style.padding = "";
        targetRef.current.style.backgroundColor = "";
      }
      setIsLoading(false);
      setIsModalOpen(false);
      setShowError(false);
      setIsGeneratingPDF(false);
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: primaryColor,
          colorLink: primaryColor,
          colorLinkHover: secondaryColor,
          borderRadius: 12,
          wireframe: false,
        },
        components: {
          Modal: {
            paddingContentHorizontal: 0,
          },
        },
      }}
    >
      <button
        type="button"
        className={`px-5 py-2.5 bg-gradient-to-r ${
          isDarkMode
            ? "from-[#52ab98] to-[#3d8a7a] hover:from-[#3d8a7a] hover:to-[#2b6777]"
            : "from-[#2b6777] to-[#1a4d5a] hover:from-[#1a4d5a] hover:to-[#0d3a4a]"
        } text-white rounded-xl font-medium transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg ${
          isDarkMode ? "hover:shadow-[#52ab98]/30" : "hover:shadow-[#2b6777]/30"
        }`}
        onClick={showModal}
        disabled={isLoading || isGeneratingPDF}
        aria-label="Export as PDF"
      >
        <Icon icon="mdi:file-pdf-box" className="text-xl" />
        Export as PDF
      </button>

      <Modal
        open={isModalOpen}
        closeIcon={null}
        footer={null}
        className="premium-modal"
        onCancel={handleCancel}
        centered
        width={520}
        styles={{
          content: {
            padding: 0,
            background: isDarkMode
              ? "linear-gradient(145deg, #1e1e2d, #2a2a3a)"
              : "linear-gradient(145deg, #ffffff, #f9f9ff)",
            border: "none",
            boxShadow: isDarkMode
              ? "0 10px 25px rgba(0,0,0,0.3)"
              : "0 10px 25px rgba(43, 103, 119, 0.15)",
          },
          body: {
            padding: 0,
          },
        }}
      >
        <div className="relative">
          {/* Decorative header */}
          <div
            className={`h-2 w-full ${
              isDarkMode ? "bg-[#1a4d5a]" : "bg-[#2b6777]"
            } rounded-t-xl`}
          ></div>

          {/* Close button */}
          <button
            onClick={handleCancel}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl cursor-pointer transition-colors bg-transparent border-none z-10"
            aria-label="Close modal"
          >
            <Icon icon="ion:close" className="text-current" />
          </button>

          <div className="p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`p-3 rounded-lg ${
                  isDarkMode ? "bg-[#1a4d5a]/30" : "bg-[#c8d8e4]"
                } ${isDarkMode ? "text-[#52ab98]" : "text-[#2b6777]"}`}
              >
                <Icon icon="mdi:file-document" className="text-2xl" />
              </div>
              <div>
                <h3
                  className={`text-xl font-bold ${
                    isDarkMode ? "text-white" : "text-[#2b6777]"
                  }`}
                >
                  Download Your Report
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enter your details to download the PDF
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-5">
              <div>
                <label
                  className={`block text-sm font-medium mb-1.5 ${
                    isDarkMode ? "text-gray-300" : "text-[#2b6777]"
                  }`}
                  htmlFor="name"
                >
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      showError && !formData.name.trim()
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 ${
                      isDarkMode
                        ? "focus:ring-[#52ab98]"
                        : "focus:ring-[#2b6777]"
                    } focus:border-transparent transition-all pl-11`}
                    type="text"
                    placeholder="John Doe"
                    onChange={handleInputChange}
                    value={formData.name}
                    aria-required="true"
                  />
                  <Icon
                    icon="mdi:account-outline"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
                  />
                </div>
                {showError && !formData.name.trim() && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <Icon icon="mdi:alert-circle-outline" className="text-sm" />
                    Please enter your name
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1.5 ${
                    isDarkMode ? "text-gray-300" : "text-[#2b6777]"
                  }`}
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      showError &&
                      (!formData.email.trim() ||
                        !emailRegex.test(formData.email))
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 ${
                      isDarkMode
                        ? "focus:ring-[#52ab98]"
                        : "focus:ring-[#2b6777]"
                    } focus:border-transparent transition-all pl-11`}
                    type="email"
                    placeholder="john@example.com"
                    onChange={handleInputChange}
                    value={formData.email}
                    aria-required="true"
                  />
                  <Icon
                    icon="mdi:email-outline"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
                  />
                </div>
                {showError && !formData.email.trim() && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <Icon icon="mdi:alert-circle-outline" className="text-sm" />
                    Please enter your email
                  </p>
                )}
                {showError &&
                  formData.email.trim() &&
                  !emailRegex.test(formData.email) && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <Icon
                        icon="mdi:alert-circle-outline"
                        className="text-sm"
                      />
                      Please enter a valid email address
                    </p>
                  )}
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1.5 ${
                    isDarkMode ? "text-gray-300" : "text-[#2b6777]"
                  }`}
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    id="phone"
                    name="phone"
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      showError && !formData.phone.trim()
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 ${
                      isDarkMode
                        ? "focus:ring-[#52ab98]"
                        : "focus:ring-[#2b6777]"
                    } focus:border-transparent transition-all pl-11`}
                    type="tel"
                    placeholder="+1 (123) 456-7890"
                    onChange={handleInputChange}
                    value={formData.phone}
                    aria-required="true"
                  />
                  <Icon
                    icon="mdi:phone-outline"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
                  />
                </div>
                {showError && !formData.phone.trim() && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <Icon icon="mdi:alert-circle-outline" className="text-sm" />
                    Please enter your phone number
                  </p>
                )}
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreed"
                    checked={formData.agreed}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <div
                    className={`flex-shrink-0 w-5 h-5 rounded-md border ${
                      formData.agreed
                        ? `${
                            isDarkMode
                              ? "bg-[#52ab98] border-[#52ab98]"
                              : "bg-[#2b6777] border-[#2b6777]"
                          }`
                        : "border-gray-300 dark:border-gray-600"
                    } flex items-center justify-center transition-colors mt-0.5`}
                  >
                    {formData.agreed && (
                      <Icon icon="mdi:check" className="text-white text-sm" />
                    )}
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      I agree to the{" "}
                      <Link
                        className={`${
                          isDarkMode
                            ? "text-[#52ab98] hover:text-[#3d8a7a]"
                            : "text-[#2b6777] hover:text-[#1a4d5a]"
                        } font-medium hover:underline transition-colors`}
                        to="/terms-and-condition"
                        target="_blank"
                      >
                        Terms and Conditions
                      </Link>
                    </span>
                    {showError && !formData.agreed && (
                      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                        <Icon
                          icon="mdi:alert-circle-outline"
                          className="text-sm"
                        />
                        Please accept the terms and conditions
                      </p>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3">
              {isLoading || isGeneratingPDF ? (
                <div
                  className={`flex items-center justify-center gap-3 py-3 px-6 rounded-lg bg-gray-100 dark:bg-gray-800 ${
                    isDarkMode ? "text-[#52ab98]" : "text-[#2b6777]"
                  }`}
                  aria-live="polite"
                >
                  <Icon icon="svg-spinners:ring-resize" className="text-xl" />
                  <span>Preparing your report...</span>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleSendEmail}
                    className={`w-full py-3 bg-gradient-to-r ${
                      isDarkMode
                        ? "from-[#52ab98] to-[#3d8a7a] hover:from-[#3d8a7a] hover:to-[#2b6777]"
                        : "from-[#2b6777] to-[#1a4d5a] hover:from-[#1a4d5a] hover:to-[#0d3a4a]"
                    } text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-md ${
                      isDarkMode
                        ? "hover:shadow-[#52ab98]/30"
                        : "hover:shadow-[#2b6777]/30"
                    }`}
                    disabled={isLoading}
                  >
                    <Icon
                      icon="material-symbols:download"
                      className="text-xl"
                    />
                    Download PDF Report
                  </button>
                  <button
                    onClick={handleCancel}
                    className="w-full py-2.5 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors border border-gray-300 dark:border-gray-600"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default ExportPDFModal;

// Add this component above the MortgageCalculator2 component
const FixedWidthPDFTemplate = ({
  inputs,
  results,
}: {
  inputs: MortgageInputs;
  results: MortgageResults;
}) => {
  // Fixed width for PDF (A4 paper size in pixels at 96dpi)
  const pdfWidth = 794; // ~8.27 inches (A4 width)
  const pdfMargin = 40;
  const contentWidth = pdfWidth - pdfMargin * 2;

  // Payment breakdown data for pie chart
  const paymentBreakdownData = [
    { name: "Principal & Interest", value: results.monthlyEquivalent },
    { name: "Property Tax", value: results.monthlyPropertyTax },
    { name: "Insurance", value: results.monthlyHomeInsurance },
    { name: "PMI", value: results.monthlyPMI },
    { name: "HOA", value: results.monthlyHOA },
  ];

  // Filter equity data to show every 5 years for better PDF display
  const filteredEquityData = results.equityData.filter(
    (_, index) => index % 5 === 0 || index === results.equityData.length - 1
  );

  return (
    <div
      className="pdf-template"
      style={{
        width: `${pdfWidth}px`,
        margin: "0 auto",
        padding: `${pdfMargin}px`,
        fontFamily: "Arial, sans-serif",
        fontSize: "12px",
        color: "#333",
        backgroundColor: "#fff",
      }}
    >
      {/* Header */}
      {/* PDF Header with Branding */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          paddingBottom: "16px",
          borderBottom: "1px solid #eaeaea",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* DollarFar Logo - replace with your actual logo */}

          <div
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#2b6777",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "12px",
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            <img src={assets.siteLogoWhite} alt="" />
          </div>
          <div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                margin: "0",
                color: "#2b6777",
                lineHeight: "1.2",
              }}
            >
              Mortgage Analysis Report
            </h1>
            <p
              style={{
                margin: "0",
                color: "#666",
                fontSize: "14px",
              }}
            >
              Generated by <strong>DollarFar.com</strong>
            </p>
          </div>
        </div>
        <div
          style={{
            textAlign: "right",
            fontSize: "12px",
            color: "#666",
          }}
        >
          <p style={{ margin: "0 0 4px 0" }}>
            {moment().format("MMMM D, YYYY")}
          </p>
          <p style={{ margin: "0" }}>{window.location.href}</p>
        </div>
      </header>

      {/* Two-column layout for key information */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        {/* Left Column */}
        <div style={{ flex: 1 }}>
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              borderBottom: "1px solid #eee",
              paddingBottom: "8px",
              marginBottom: "12px",
            }}
          >
            Loan Details
          </h2>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td
                  style={{ padding: "6px 0", borderBottom: "1px solid #eee" }}
                >
                  <strong>Property Value:</strong>
                </td>
                <td
                  style={{
                    padding: "6px 0",
                    borderBottom: "1px solid #eee",
                    textAlign: "right",
                  }}
                >
                  {formatCurrency(inputs.homePrice)}
                </td>
              </tr>
              <tr>
                <td
                  style={{ padding: "6px 0", borderBottom: "1px solid #eee" }}
                >
                  <strong>Down Payment:</strong>
                </td>
                <td
                  style={{
                    padding: "6px 0",
                    borderBottom: "1px solid #eee",
                    textAlign: "right",
                  }}
                >
                  {inputs.downPaymentPercentage}% (
                  {formatCurrency(inputs.downPaymentAmount)})
                </td>
              </tr>
              <tr>
                <td
                  style={{ padding: "6px 0", borderBottom: "1px solid #eee" }}
                >
                  <strong>Loan Amount:</strong>
                </td>
                <td
                  style={{
                    padding: "6px 0",
                    borderBottom: "1px solid #eee",
                    textAlign: "right",
                  }}
                >
                  {formatCurrency(results.loanAmount)}
                </td>
              </tr>
              <tr>
                <td
                  style={{ padding: "6px 0", borderBottom: "1px solid #eee" }}
                >
                  <strong>Interest Rate:</strong>
                </td>
                <td
                  style={{
                    padding: "6px 0",
                    borderBottom: "1px solid #eee",
                    textAlign: "right",
                  }}
                >
                  {inputs.interestRate}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right Column */}
        <div style={{ flex: 1 }}>
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              borderBottom: "1px solid #eee",
              paddingBottom: "8px",
              marginBottom: "12px",
            }}
          >
            Payment Information
          </h2>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td
                  style={{ padding: "6px 0", borderBottom: "1px solid #eee" }}
                >
                  <strong>Payment Amount ({inputs.paymentFrequency}):</strong>
                </td>
                <td
                  style={{
                    padding: "6px 0",
                    borderBottom: "1px solid #eee",
                    textAlign: "right",
                  }}
                >
                  {formatCurrency(results.periodicPayment)}
                </td>
              </tr>
              <tr>
                <td
                  style={{ padding: "6px 0", borderBottom: "1px solid #eee" }}
                >
                  <strong>Monthly Equivalent:</strong>
                </td>
                <td
                  style={{
                    padding: "6px 0",
                    borderBottom: "1px solid #eee",
                    textAlign: "right",
                  }}
                >
                  {formatCurrency(results.monthlyEquivalent)}
                </td>
              </tr>
              <tr>
                <td
                  style={{ padding: "6px 0", borderBottom: "1px solid #eee" }}
                >
                  <strong>Total Interest:</strong>
                </td>
                <td
                  style={{
                    padding: "6px 0",
                    borderBottom: "1px solid #eee",
                    textAlign: "right",
                  }}
                >
                  {formatCurrency(results.totalInterestPaid)}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0" }}>
                  <strong>Total Cost:</strong>
                </td>
                <td style={{ padding: "6px 0", textAlign: "right" }}>
                  {formatCurrency(results.totalCost)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Breakdown Section */}
      <div style={{ marginBottom: "24px" }}>
        <h2
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            borderBottom: "1px solid #eee",
            paddingBottom: "8px",
            marginBottom: "12px",
          }}
        >
          Payment Breakdown
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "16px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th
                style={{
                  padding: "8px",
                  textAlign: "left",
                  border: "1px solid #ddd",
                }}
              >
                Component
              </th>
              <th
                style={{
                  padding: "8px",
                  textAlign: "right",
                  border: "1px solid #ddd",
                }}
              >
                Amount
              </th>
              <th
                style={{
                  padding: "8px",
                  textAlign: "right",
                  border: "1px solid #ddd",
                }}
              >
                Percentage
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "Principal & Interest", value: results.periodicPayment },
              { name: "Property Tax", value: results.monthlyPropertyTax },
              { name: "Home Insurance", value: results.monthlyHomeInsurance },
              { name: "PMI", value: results.monthlyPMI },
              { name: "HOA Fees", value: results.monthlyHOA },
            ].map((item, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                  border: "1px solid #ddd",
                }}
              >
                <td style={{ padding: "8px" }}>{item.name}</td>
                <td style={{ padding: "8px", textAlign: "right" }}>
                  {formatCurrency(item.value)}
                </td>
                <td style={{ padding: "8px", textAlign: "right" }}>
                  {((item.value / results.periodicPayment) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div style={{ marginBottom: "24px" }}>
        <h2
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            borderBottom: "1px solid #eee",
            paddingBottom: "8px",
            marginBottom: "12px",
          }}
        >
          Payment Visualization
        </h2>

        {/* Payment Breakdown Pie Chart */}
        <div style={{ marginBottom: "190px" }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "8px",
              textAlign: "center",
            }}
          >
            Payment Breakdown (Monthly Equivalent)
          </h3>
          <div style={{ height: "300px" }}>
            <PieChart width={contentWidth} height={300}>
              <Pie
                data={paymentBreakdownData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(1)}%`
                }
              >
                {paymentBreakdownData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      paymentBreakdownColors[
                        index % paymentBreakdownColors.length
                      ]
                    }
                  />
                ))}
              </Pie>
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
              />
            </PieChart>
          </div>
        </div>

        {/* Equity Timeline Chart */}
        <div style={{ marginBottom: "24px" }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "8px",
              textAlign: "left",
            }}
          >
            Equity Timeline
          </h3>
          <div style={{ height: "300px" }}>
            <ComposedChart
              width={contentWidth}
              height={300}
              data={filteredEquityData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="year" />
              <YAxis
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
              />
              <Area
                type="monotone"
                dataKey="equity"
                name="Equity"
                stackId="1"
                stroke={COLORS.secondary}
                fill={COLORS.secondary}
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="remainingBalance"
                name="Remaining Balance"
                stackId="2"
                stroke={COLORS.primary}
                fill={COLORS.primary}
                fillOpacity={0.2}
              />
            </ComposedChart>
          </div>
        </div>

        {/* Interest vs Principal Chart */}
        <div>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "8px",
              textAlign: "left",
            }}
          >
            Interest vs Principal Over Time
          </h3>
          <div style={{ height: "300px" }}>
            <BarChart
              width={contentWidth}
              height={300}
              data={filteredEquityData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="year" />
              <YAxis
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
              />
              <Bar
                dataKey="principal"
                name="Principal"
                fill={COLORS.secondary}
              />
              <Bar dataKey="interest" name="Interest" fill={COLORS.primary} />
            </BarChart>
          </div>
        </div>
      </div>

      {/* Amortization Schedule Summary */}
      <div>
        <h2
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            borderBottom: "1px solid #eee",
            paddingBottom: "8px",
            marginBottom: "12px",
          }}
        >
          Amortization Schedule (Key Years)
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "16px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Year</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                Principal
              </th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                Interest
              </th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                Remaining
              </th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                Equity
              </th>
            </tr>
          </thead>
          <tbody>
            {[5, 10, 15, 20, 25, 30]
              .filter((y) => y <= inputs.loanTerm)
              .map((year, index) => {
                const data =
                  results.equityData.find((d) => d.year === year) ||
                  results.equityData[results.equityData.length - 1];
                return (
                  <tr
                    key={year}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                      border: "1px solid #ddd",
                    }}
                  >
                    <td style={{ padding: "8px", textAlign: "center" }}>
                      {year}
                    </td>
                    <td style={{ padding: "8px", textAlign: "center" }}>
                      {formatCurrency(data?.principal)}
                    </td>
                    <td style={{ padding: "8px", textAlign: "center" }}>
                      {formatCurrency(data?.interest)}
                    </td>
                    <td style={{ padding: "8px", textAlign: "center" }}>
                      {formatCurrency(data?.remainingBalance)}
                    </td>
                    <td style={{ padding: "8px", textAlign: "center" }}>
                      {formatCurrency(data?.equity)} (
                      {((data?.equity / inputs.homePrice) * 100).toFixed(1)}%)
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <footer
        style={{
          marginTop: "32px",
          paddingTop: "16px",
          borderTop: "1px solid #eaeaea",
          fontSize: "12px",
          color: "#666",
          textAlign: "center",
        }}
      >
        <p style={{ marginBottom: "3px" }}>
          For more financial tools and calculators, visit{" "}
          <strong>https://dollarfar.com</strong>
        </p>
        <p
          style={{
            marginTop: "8px",
            fontStyle: "italic",
            fontSize: "11px",
          }}
        >
          This document was generated by DollarFar's Mortgage Calculator. The
          information provided is for educational purposes only and should not
          be considered financial advice.
        </p>
      </footer>
    </div>
  );
};

// Reusable HelpModal component
const HelpModal = ({ title, content, visible, onClose }: HelpModalProps) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
      footer={[
        <button
          key="submit"
          className="px-4 py-2 rounded-md text-white"
          style={{ backgroundColor: COLORS.primary }}
          onClick={onClose}
        >
          Got it!
        </button>,
      ]}
    >
      <div className="text-gray-700 dark:text-gray-300">{content}</div>
    </Modal>
  );
};

export const PowerfulMortgageCalculator: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [inputs, setInputs] = useState<MortgageInputs>(defaultInputs);
  const [activeTab, setActiveTab] = useState<"basic" | "advanced">("basic");
  const [showAmortization, setShowAmortization] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const showHelpModal = (title: string, content: string) => {
    setModalContent({ title, content });
    setModalVisible(true);
  };

  const helpContent = {
    homePrice: {
      title: "Home Price",
      content:
        "The total purchase price of the home you're looking to buy. This is the base amount before any down payment or financing.",
    },
    downPayment: {
      title: "Down Payment",
      content:
        "The initial upfront payment for the home. Typically 20% avoids PMI (Private Mortgage Insurance). You can enter either a percentage or dollar amount.",
    },
    loanTerm: {
      title: "Loan Term",
      content:
        "The length of time over which you'll repay your mortgage. Common terms are 15 or 30 years. Shorter terms mean higher monthly payments but less total interest.",
    },
    interestRate: {
      title: "Interest Rate",
      content:
        "The annual interest rate for your mortgage loan. This rate affects both your monthly payment and the total amount you'll pay over the life of the loan.",
    },
    paymentFrequency: {
      title: "Payment Frequency",
      content:
        "How often you make mortgage payments. Monthly is most common, but bi-weekly or weekly payments can help you pay off your loan faster.",
    },
    propertyTax: {
      title: "Property Tax",
      content:
        "Estimated yearly property tax based on your location. This varies by municipality and is typically a percentage of your home's assessed value.",
    },
    homeInsurance: {
      title: "Home Insurance",
      content:
        "Estimated yearly homeowner's insurance cost. This protects your property against damage and typically includes liability coverage.",
    },
    hoaFees: {
      title: "HOA Fees",
      content:
        "Monthly homeowners association fees (if applicable). These cover shared community expenses and amenities in certain neighborhoods.",
    },
    startDate: {
      title: "Loan Start Date",
      content:
        "When your mortgage payments will begin. This affects your amortization schedule and when your loan will be fully paid off.",
    },
    extraPayment: {
      title: "Extra Payment",
      content:
        "Additional payments to reduce principal and shorten loan term. Even small extra payments can save thousands in interest over time.",
    },
  };

  const results = useMemo<MortgageResults>(() => {
    const downPaymentAmount =
      (inputs.downPaymentPercentage / 100) * inputs.homePrice;
    const loanAmount = inputs.homePrice - downPaymentAmount;

    const periodicPayment = calculatePeriodicPayment(
      loanAmount,
      inputs.interestRate,
      inputs.loanTerm,
      inputs.paymentFrequency
    );

    // Convert to monthly equivalent for display
    let monthlyEquivalent = periodicPayment;
    if (inputs.paymentFrequency === "biweekly")
      monthlyEquivalent = (periodicPayment * 26) / 12;
    if (inputs.paymentFrequency === "weekly")
      monthlyEquivalent = (periodicPayment * 52) / 12;

    const monthlyPMI = calculatePMI(loanAmount, inputs.homePrice);
    const monthlyTax = inputs.propertyTax / 12;
    const monthlyInsurance = inputs.homeInsurance / 12;

    const amortizationSchedule = generateAmortizationSchedule(
      loanAmount,
      inputs.interestRate,
      inputs.loanTerm,
      inputs.startDate,
      inputs.paymentFrequency,
      inputs.extraPayment,
      inputs.extraPaymentFrequency
    );

    const totalInterest = amortizationSchedule.reduce(
      (sum, entry) => sum + entry.interest,
      0
    );
    const equityData = calculateEquityData(amortizationSchedule);

    return {
      loanAmount,
      periodicPayment,
      monthlyEquivalent,
      monthlyPropertyTax: monthlyTax,
      monthlyHomeInsurance: monthlyInsurance,
      monthlyPMI,
      monthlyHOA: inputs.hoaFees,
      totalInterestPaid: totalInterest,
      totalCost: loanAmount + totalInterest + downPaymentAmount,
      payoffDate:
        amortizationSchedule.length > 0
          ? amortizationSchedule[amortizationSchedule.length - 1].date
          : inputs.startDate.clone().add(inputs.loanTerm, "years"),
      amortizationSchedule,
      equityData,
    };
  }, [inputs]);

  const handleInputChange = (field: keyof MortgageInputs, value: any) => {
    setInputs((prev) => {
      if (field === "downPaymentPercentage") {
        return {
          ...prev,
          downPaymentPercentage: value,
          downPaymentAmount: (value / 100) * prev.homePrice,
        };
      }
      if (field === "downPaymentAmount") {
        return {
          ...prev,
          downPaymentAmount: value,
          downPaymentPercentage: (value / prev.homePrice) * 100,
        };
      }
      if (field === "homePrice") {
        return {
          ...prev,
          homePrice: value,
          downPaymentAmount: (prev.downPaymentPercentage / 100) * value,
        };
      }
      if (field === "startDate" && typeof value === "string") {
        return { ...prev, [field]: moment(value) };
      }
      return { ...prev, [field]: value };
    });
  };

  // Payment breakdown data for pie chart
  const paymentBreakdownData = [
    { name: "Principal & Interest", value: results.monthlyEquivalent },
    { name: "Property Tax", value: results.monthlyPropertyTax },
    { name: "Insurance", value: results.monthlyHomeInsurance },
    { name: "PMI", value: results.monthlyPMI },
    { name: "HOA", value: results.monthlyHOA },
  ];

  const totalMonthlyCost = paymentBreakdownData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  // Custom tooltip for pie chart
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percent = (data.value / totalMonthlyCost) * 100;
      return (
        <div className="bg-white p-3 shadow-md rounded border border-gray-200">
          <p className="font-medium">{data.name}</p>
          <p>{formatCurrency(data.value)}</p>
          <p>{percent.toFixed(1)}% of payment</p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for line/bar charts
  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded border border-gray-200">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // PDF
  const { toPDF, targetRef } = useCustomPDF({
    filename: "mortgage-calculator-report.pdf",
    page: { margin: 10, format: "a4" },
    onBeforeGetContent: () => {
      setIsGeneratingPDF(true);
      setPdfError(null);
      return Promise.resolve();
    },
    onBeforeSave: () => {
      // Optional: Perform any final checks before saving
    },
    onAfterSave: () => {
      setIsGeneratingPDF(false);
    },
    onError: (error) => {
      setIsGeneratingPDF(false);
      setPdfError("Failed to generate PDF. Please try again.");
      console.error("PDF generation error:", error);
    },
  });

  return (
    <>
      <PageHero data={data} />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-8 px-4">
        {/* Help Modal */}
        <HelpModal
          title={modalContent.title}
          content={modalContent.content}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-8">
            <h1
              className="text-3xl font-bold text-gray-800 dark:text-white"
              style={{ color: COLORS.primary }}
            >
              Mortgage Calculator
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Calculate your payment schedule with different payment frequencies
            </p>
            <div className="flex justify-end">
              <ExportPDFModal
                setIsGeneratingPDF={setIsGeneratingPDF}
                isGeneratingPDF={isGeneratingPDF}
                setPdfError={setPdfError}
                targetRef={targetRef}
                toPDF={toPDF}
              />
            </div>
            {pdfError && (
              <p className="text-red-500 font-semibold text-right my-2">
                Error: PDF could not be downloaded!
              </p>
            )}
          </header>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Panel */}
            <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:shadow-xl">
              {/* Premium Tab Navigation */}
              <div className="flex border-b dark:border-gray-700 mb-6 relative">
                <div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#2b6777] to-[#52ab98] transition-all duration-300 ease-in-out"
                  style={{
                    width: "50%",
                    left: activeTab === "basic" ? "0" : "50%",
                  }}
                />

                <button
                  className={`flex-1 py-3 px-4 font-medium transition-all duration-300 relative ${
                    activeTab === "basic"
                      ? "text-[#2b6777] dark:text-white font-semibold"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                  onClick={() => setActiveTab("basic")}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <Icon
                      icon="mdi:calculator"
                      className="mr-2"
                      width={18}
                      height={18}
                    />
                    Basic
                  </span>
                </button>

                <button
                  className={`flex-1 py-3 px-4 font-medium transition-all duration-300 relative ${
                    activeTab === "advanced"
                      ? "text-[#2b6777] dark:text-white font-semibold"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                  onClick={() => setActiveTab("advanced")}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <Icon
                      icon="mdi:tune"
                      className="mr-2"
                      width={18}
                      height={18}
                    />
                    Advanced
                  </span>
                </button>
              </div>

              {activeTab === "basic" ? (
                <div className="space-y-5">
                  {/* Home Price Input */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        Home Price
                        <button
                          onClick={() =>
                            showHelpModal(
                              helpContent.homePrice.title,
                              helpContent.homePrice.content
                            )
                          }
                          className="ml-2 cursor-pointer text-gray-400 hover:text-[#2b6777] dark:hover:text-[#52ab98] transition-colors"
                        >
                          <Icon
                            icon="mdi:information-outline"
                            width={16}
                            height={16}
                          />
                        </button>
                      </label>
                      <span className="text-xs font-medium text-[#2b6777] dark:text-[#52ab98]">
                        {formatCurrency(inputs.homePrice)}
                      </span>
                    </div>
                    <NumericFormat
                      thousandSeparator={true}
                      prefix="$"
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#52ab98]/50 focus:border-[#2b6777] bg-white dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600"
                      value={inputs.homePrice}
                      onValueChange={(values) =>
                        handleInputChange("homePrice", values.floatValue || 0)
                      }
                    />
                  </div>

                  {/* Down Payment Input */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        Down Payment
                        <button
                          onClick={() =>
                            showHelpModal(
                              helpContent.downPayment.title,
                              helpContent.downPayment.content
                            )
                          }
                          className="ml-2 cursor-pointer text-gray-400 hover:text-[#2b6777] dark:hover:text-[#52ab98] transition-colors"
                        >
                          <Icon
                            icon="mdi:information-outline"
                            width={16}
                            height={16}
                          />
                        </button>
                      </label>
                      <span className="text-xs font-medium text-[#2b6777] dark:text-[#52ab98]">
                        {inputs.downPaymentPercentage}% •{" "}
                        {formatCurrency(inputs.downPaymentAmount)}
                      </span>
                    </div>

                    <div className="flex space-x-2 mb-3">
                      {[20, 10, 5, 3.5].map((percent) => (
                        <button
                          key={percent}
                          className={`flex-1 py-2 px-3 text-sm rounded-md transition-all duration-300 ${
                            inputs.downPaymentPercentage === percent
                              ? "bg-gradient-to-r from-[#2b6777] to-[#52ab98] text-white shadow-md"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                          }`}
                          onClick={() =>
                            handleInputChange("downPaymentPercentage", percent)
                          }
                        >
                          {percent}%
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <NumericFormat
                          suffix="%"
                          decimalScale={2}
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#52ab98]/50 focus:border-[#2b6777] bg-white dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600"
                          value={inputs.downPaymentPercentage}
                          onValueChange={(values) =>
                            handleInputChange(
                              "downPaymentPercentage",
                              values.floatValue || 0
                            )
                          }
                        />
                      </div>
                      <div className="relative">
                        <NumericFormat
                          thousandSeparator={true}
                          prefix="$"
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#52ab98]/50 focus:border-[#2b6777] bg-white dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600"
                          value={inputs.downPaymentAmount}
                          onValueChange={(values) =>
                            handleInputChange(
                              "downPaymentAmount",
                              values.floatValue || 0
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Loan Term Slider */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        Loan Term
                        <button
                          onClick={() =>
                            showHelpModal(
                              helpContent.loanTerm.title,
                              helpContent.loanTerm.content
                            )
                          }
                          className="ml-2 cursor-pointer text-gray-400 hover:text-[#2b6777] dark:hover:text-[#52ab98] transition-colors"
                        >
                          <Icon
                            icon="mdi:information-outline"
                            width={16}
                            height={16}
                          />
                        </button>
                      </label>
                      <span className="text-sm font-semibold text-[#2b6777] dark:text-[#52ab98]">
                        {inputs.loanTerm} years
                      </span>
                    </div>

                    <div className="px-2">
                      <input
                        type="range"
                        min="5"
                        max="30"
                        step="5"
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#2b6777]"
                        value={inputs.loanTerm}
                        onChange={(e) =>
                          handleInputChange(
                            "loanTerm",
                            parseInt(e.target.value)
                          )
                        }
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 px-1">
                        {[5, 10, 15, 20, 25, 30].map((year) => (
                          <span
                            key={year}
                            className={`${
                              inputs.loanTerm === year
                                ? "font-bold text-[#2b6777] dark:text-[#52ab98]"
                                : ""
                            }`}
                          >
                            {year}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Interest Rate Slider */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        Interest Rate
                        <button
                          onClick={() =>
                            showHelpModal(
                              helpContent.interestRate.title,
                              helpContent.interestRate.content
                            )
                          }
                          className="ml-2 cursor-pointer text-gray-400 hover:text-[#2b6777] dark:hover:text-[#52ab98] transition-colors"
                        >
                          <Icon
                            icon="mdi:information-outline"
                            width={16}
                            height={16}
                          />
                        </button>
                      </label>
                      <span className="text-sm font-semibold text-[#2b6777] dark:text-[#52ab98]">
                        {inputs.interestRate}%
                      </span>
                    </div>

                    <div className="px-2">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="0.1"
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#2b6777]"
                        value={inputs.interestRate}
                        onChange={(e) =>
                          handleInputChange(
                            "interestRate",
                            parseFloat(e.target.value)
                          )
                        }
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 px-1">
                        {[1, 3, 5, 7, 9, 10].map((rate) => (
                          <span
                            key={rate}
                            className={`${
                              inputs.interestRate >= rate &&
                              inputs.interestRate < rate + 2
                                ? "font-bold text-[#2b6777] dark:text-[#52ab98]"
                                : ""
                            }`}
                          >
                            {rate}%
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Payment Frequency Select */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        Payment Frequency
                        <button
                          onClick={() =>
                            showHelpModal(
                              helpContent.paymentFrequency.title,
                              helpContent.paymentFrequency.content
                            )
                          }
                          className="ml-2 cursor-pointer text-gray-400 hover:text-[#2b6777] dark:hover:text-[#52ab98] transition-colors"
                        >
                          <Icon
                            icon="mdi:information-outline"
                            width={16}
                            height={16}
                          />
                        </button>
                      </label>
                    </div>

                    <div className="relative">
                      <select
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#52ab98]/50 focus:border-[#2b6777] bg-white dark:bg-gray-700 dark:text-white appearance-none transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600"
                        value={inputs.paymentFrequency}
                        onChange={(e) =>
                          handleInputChange(
                            "paymentFrequency",
                            e.target.value as "monthly" | "biweekly" | "weekly"
                          )
                        }
                      >
                        <option value="monthly">Monthly</option>
                        <option value="biweekly">Bi-weekly</option>
                        <option value="weekly">Weekly</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <Icon
                          icon="mdi:chevron-down"
                          className="text-gray-400"
                          width={20}
                          height={20}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Advanced Inputs */}
                  {(
                    [
                      {
                        key: "propertyTax",
                        label: "Annual Property Tax",
                        icon: "mdi:home-city",
                      },
                      {
                        key: "homeInsurance",
                        label: "Annual Home Insurance",
                        icon: "mdi:shield-home",
                      },
                      {
                        key: "hoaFees",
                        label: "Monthly HOA Fees",
                        icon: "mdi:account-group",
                      },
                    ] as const
                  ).map((item) => (
                    <div key={item.key} className="mb-5">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                          <Icon
                            icon={item.icon}
                            className="mr-2"
                            width={16}
                            height={16}
                          />
                          {item.label}
                          <button
                            onClick={() =>
                              showHelpModal(
                                helpContent[item.key].title,
                                helpContent[item.key].content
                              )
                            }
                            className="ml-2 cursor-pointer text-gray-400 hover:text-[#2b6777] dark:hover:text-[#52ab98] transition-colors"
                          >
                            <Icon
                              icon="mdi:information-outline"
                              width={16}
                              height={16}
                            />
                          </button>
                        </label>
                        <span className="text-xs font-medium text-[#2b6777] dark:text-[#52ab98]">
                          {formatCurrency(inputs[item.key])}
                        </span>
                      </div>
                      <NumericFormat
                        thousandSeparator={true}
                        prefix="$"
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#52ab98]/50 focus:border-[#2b6777] bg-white dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600"
                        value={inputs[item.key]}
                        onValueChange={(values) =>
                          handleInputChange(item.key, values.floatValue || 0)
                        }
                      />
                    </div>
                  ))}

                  {/* Loan Start Date */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        <Icon
                          icon="mdi:calendar-start"
                          className="mr-2"
                          width={16}
                          height={16}
                        />
                        Loan Start Date
                        <button
                          onClick={() =>
                            showHelpModal(
                              helpContent.startDate.title,
                              helpContent.startDate.content
                            )
                          }
                          className="ml-2 cursor-pointer text-gray-400 hover:text-[#2b6777] dark:hover:text-[#52ab98] transition-colors"
                        >
                          <Icon
                            icon="mdi:information-outline"
                            width={16}
                            height={16}
                          />
                        </button>
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#52ab98]/50 focus:border-[#2b6777] bg-white dark:bg-gray-700 dark:text-white appearance-none transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600"
                        value={inputs.startDate.format("YYYY-MM-DD")}
                        onChange={(e) =>
                          handleInputChange("startDate", e.target.value)
                        }
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <Icon
                          icon="mdi:calendar"
                          className="text-gray-400"
                          width={20}
                          height={20}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Extra Payment */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        <Icon
                          icon="mdi:cash-plus"
                          className="mr-2"
                          width={16}
                          height={16}
                        />
                        Extra Payment
                        <button
                          onClick={() =>
                            showHelpModal(
                              helpContent.extraPayment.title,
                              helpContent.extraPayment.content
                            )
                          }
                          className="ml-2 cursor-pointer text-gray-400 hover:text-[#2b6777] dark:hover:text-[#52ab98] transition-colors"
                        >
                          <Icon
                            icon="mdi:information-outline"
                            width={16}
                            height={16}
                          />
                        </button>
                      </label>
                      <span className="text-xs font-medium text-[#2b6777] dark:text-[#52ab98]">
                        {formatCurrency(inputs.extraPayment)}
                      </span>
                    </div>

                    <NumericFormat
                      thousandSeparator={true}
                      prefix="$"
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#52ab98]/50 focus:border-[#2b6777] bg-white dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600 mb-3"
                      value={inputs.extraPayment}
                      onValueChange={(values) =>
                        handleInputChange(
                          "extraPayment",
                          values.floatValue || 0
                        )
                      }
                    />

                    <div className="relative">
                      <select
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#52ab98]/50 focus:border-[#2b6777] bg-white dark:bg-gray-700 dark:text-white appearance-none transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600"
                        value={inputs.extraPaymentFrequency}
                        onChange={(e) =>
                          handleInputChange(
                            "extraPaymentFrequency",
                            e.target.value as "monthly" | "yearly" | "one-time"
                          )
                        }
                      >
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                        <option value="one-time">One-time</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <Icon
                          icon="mdi:chevron-down"
                          className="text-gray-400"
                          width={20}
                          height={20}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reset Button */}
              <button
                className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-[#2b6777] to-[#52ab98] rounded-lg shadow-md text-sm font-semibold text-white hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                onClick={() => setInputs(defaultInputs)}
              >
                <Icon
                  icon="mdi:refresh"
                  className="mr-2"
                  width={18}
                  height={18}
                />
                Reset Calculator
              </button>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Payment Summary
                  </h2>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: COLORS.primary + "20" }}
                  >
                    <Icon
                      icon="mdi:finance"
                      className="text-xl"
                      style={{ color: COLORS.primary }}
                    />
                  </div>
                </div>

                {/* Primary Metrics - Card Style */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                  {/* Payment Card */}
                  <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-8 h-8 rounded-md flex items-center justify-center"
                        style={{ backgroundColor: COLORS.primary + "20" }}
                      >
                        <Icon
                          icon="mdi:cash-multiple"
                          className="text-sm"
                          style={{ color: COLORS.primary }}
                        />
                      </div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        {inputs.paymentFrequency === "monthly"
                          ? "Monthly"
                          : inputs.paymentFrequency === "biweekly"
                          ? "Bi-weekly"
                          : "Weekly"}{" "}
                        Payment
                      </p>
                    </div>
                    <p
                      className="text-3xl font-bold"
                      style={{ color: COLORS.primary }}
                    >
                      {formatCurrency(results.periodicPayment)}
                    </p>
                    <div className="mt-2 h-1 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full"
                        style={{
                          width: "100%",
                          backgroundColor: COLORS.primary,
                          backgroundImage: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Loan Amount Card */}
                  <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-8 h-8 rounded-md flex items-center justify-center"
                        style={{ backgroundColor: COLORS.secondary + "20" }}
                      >
                        <Icon
                          icon="mdi:bank-outline"
                          className="text-sm"
                          style={{ color: COLORS.secondary }}
                        />
                      </div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Loan Amount
                      </p>
                    </div>
                    <p
                      className="text-3xl font-bold"
                      style={{ color: COLORS.secondary }}
                    >
                      {formatCurrency(results.loanAmount)}
                    </p>
                    <div className="mt-2 h-1 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full"
                        style={{
                          width: "100%",
                          backgroundColor: COLORS.secondary,
                          backgroundImage: `linear-gradient(to right, ${COLORS.secondary}, ${COLORS.accent})`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Total Interest Card */}
                  <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-8 h-8 rounded-md flex items-center justify-center"
                        style={{ backgroundColor: "#F44336" + "20" }}
                      >
                        <Icon
                          icon="mdi:percent"
                          className="text-sm"
                          style={{ color: "#F44336" }}
                        />
                      </div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Total Interest
                      </p>
                    </div>
                    <p
                      className="text-3xl font-bold"
                      style={{ color: "#F44336" }}
                    >
                      {formatCurrency(results.totalInterestPaid)}
                    </p>
                    <div className="mt-2 h-1 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full"
                        style={{
                          width: "100%",
                          backgroundColor: "#F44336",
                          backgroundImage: `linear-gradient(to right, #F44336, #FF9800)`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Secondary Metrics - Minimal Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700/70">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">
                          Payoff Date
                        </p>
                        <p className="text-xl font-semibold text-gray-800 dark:text-white">
                          {results.payoffDate.format("MMMM YYYY")}
                        </p>
                      </div>
                      <Icon
                        icon="mdi:calendar-check"
                        className="text-2xl opacity-70"
                        style={{ color: COLORS.primary }}
                      />
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700/70">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">
                          Total Cost
                        </p>
                        <p className="text-xl font-semibold text-gray-800 dark:text-white">
                          {formatCurrency(results.totalCost)}
                        </p>
                      </div>
                      <Icon
                        icon="mdi:finance"
                        className="text-2xl opacity-70"
                        style={{ color: COLORS.secondary }}
                      />
                    </div>
                  </div>
                </div>

                {/* Visual Indicator */}
                <div className="mt-6 flex items-center justify-center">
                  <div className="relative w-full max-w-md">
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            (results.loanAmount / inputs.homePrice) * 100
                          )}%`,
                          backgroundImage: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                      <span>Loan Amount</span>
                      <span>Home Value</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition-colors duration-200">
                  <h3
                    className="text-lg font-semibold mb-4 text-gray-800 dark:text-white"
                    style={{ color: COLORS.primary }}
                  >
                    Payment Breakdown (Monthly Equivalent)
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={paymentBreakdownData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {paymentBreakdownData.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                paymentBreakdownColors[
                                  index % paymentBreakdownColors.length
                                ]
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          content={<CustomPieTooltip />}
                          wrapperStyle={{
                            backgroundColor: "var(--bg-gray-100)",
                            borderColor: "var(--border-gray-200)",
                            borderRadius: "0.5rem",
                            padding: "0.5rem",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                          }}
                        />
                        <Legend
                          layout="horizontal"
                          verticalAlign="bottom"
                          align="center"
                          wrapperStyle={{
                            color: "var(--text-gray-800)",
                            paddingTop: "1rem",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition-colors duration-200">
                  <h3
                    className="text-lg font-semibold mb-4 text-gray-800 dark:text-white"
                    style={{ color: COLORS.primary }}
                  >
                    Equity Timeline
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={results.equityData}
                        margin={{ top: 20, right: 20, left: 50, bottom: 20 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#eee"
                          strokeOpacity={0.2}
                        />
                        <XAxis
                          dataKey="year"
                          stroke="#888"
                          tick={{ fill: "var(--text-gray-600)" }}
                        />
                        <YAxis
                          tickFormatter={(value) => formatCurrency(value)}
                          stroke="#888"
                          tick={{ fill: "var(--text-gray-600)" }}
                        />
                        <Tooltip
                          content={<CustomChartTooltip />}
                          wrapperStyle={{
                            backgroundColor: "var(--bg-gray-100)",
                            borderColor: "var(--border-gray-200)",
                            borderRadius: "0.5rem",
                            padding: "0.5rem",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                          }}
                        />
                        <Legend
                          wrapperStyle={{
                            color: "var(--text-gray-800)",
                            paddingTop: "1rem",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="equity"
                          name="Equity"
                          stackId="1"
                          stroke={COLORS.secondary}
                          fill={COLORS.secondary}
                          fillOpacity={0.2}
                        />
                        <Area
                          type="monotone"
                          dataKey="remainingBalance"
                          name="Remaining Balance"
                          stackId="2"
                          stroke={COLORS.primary}
                          fill={COLORS.primary}
                          fillOpacity={0.2}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition-colors duration-200">
                <h3
                  className="text-lg font-semibold mb-4 text-gray-800 dark:text-white"
                  style={{ color: COLORS.primary }}
                >
                  Interest vs Principal
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={results.equityData}
                      margin={{ top: 20, right: 20, left: 40, bottom: 20 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#eee"
                        strokeOpacity={0.2}
                      />
                      <XAxis
                        dataKey="year"
                        stroke="#888"
                        tick={{ fill: "var(--text-gray-600)" }}
                      />
                      <YAxis
                        tickFormatter={(value) => formatCurrency(value)}
                        stroke="#888"
                        tick={{ fill: "var(--text-gray-600)" }}
                      />
                      <Tooltip
                        content={<CustomChartTooltip />}
                        wrapperStyle={{
                          backgroundColor: "var(--bg-gray-100)",
                          borderColor: "var(--border-gray-200)",
                          borderRadius: "0.5rem",
                          padding: "0.5rem",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Legend
                        wrapperStyle={{
                          color: "var(--text-gray-800)",
                          paddingTop: "1rem",
                        }}
                      />
                      <Bar
                        dataKey="principal"
                        name="Principal"
                        fill={COLORS.secondary}
                      />
                      <Bar
                        dataKey="interest"
                        name="Interest"
                        fill={COLORS.primary}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden transition-colors duration-200 border border-gray-100 dark:border-gray-700">
                <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5"
                      style={{ color: COLORS.primary }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Amortization Schedule
                    </h3>
                  </div>
                  <button
                    className="flex items-center space-x-1 text-sm font-medium transition-colors duration-200 hover:opacity-80"
                    style={{ color: COLORS.primary }}
                    onClick={() => setShowAmortization(!showAmortization)}
                  >
                    <span>
                      {showAmortization ? "Hide Details" : "Show Details"}
                    </span>
                    <svg
                      className={`w-4 h-4 transform transition-transform duration-200 ${
                        showAmortization ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>

                {showAmortization && (
                  <div className="relative">
                    <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white dark:from-gray-800 to-transparent z-10"></div>
                    <div className="overflow-x-auto max-h-96 pb-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="sticky top-0 bg-gray-50 dark:bg-gray-700 z-20">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Period
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Payment
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Principal
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Interest
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Balance
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {results.amortizationSchedule.map((entry, index) => (
                            <tr
                              key={index}
                              className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                                index % 2 === 0
                                  ? "bg-white dark:bg-gray-800"
                                  : "bg-gray-50 dark:bg-gray-700"
                              }`}
                            >
                              <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {entry.month}
                              </td>
                              <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {entry.date.format("MMM YYYY")}
                              </td>
                              <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                {formatCurrency(entry.payment)}
                              </td>
                              <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {formatCurrency(entry.principal)}
                              </td>
                              <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {formatCurrency(entry.interest)}
                              </td>
                              <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                {formatCurrency(entry.remainingBalance)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-gray-800 to-transparent z-10"></div>

                    <div className="px-6 py-3 border-t dark:border-gray-700 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                      <div>
                        Showing {results.amortizationSchedule.length} periods
                      </div>
                      <div className="flex space-x-4">
                        <button className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                        <button className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Hidden Content  */}
      <div
        ref={targetRef}
        style={{
          display: "none",
          fontFamily: "Arial, sans-serif",
          fontSize: "12px",
        }}
      >
        <FixedWidthPDFTemplate inputs={inputs} results={results} />
      </div>
    </>
  );
};
