/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import PageHero from "../../components/UI/PageHero";
import { toast } from "react-toastify";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Investor {
  name: string;
  startAge: string;
  stopAge: string;
  color: string;
}

interface Settings {
  initialInvestment: string;
  annualContribution: string;
  annualReturn: string;
  retirementAge: string;
  compounding: string;
  contributionFrequency: string;
}

interface ResultRow {
  age: number;
  invest: number;
  value: number;
}

const data = {
  title: "Compound Interest Scenario/Comparison Calculator",
  description:
    "This calculator compares investment growth for multiple investors, showing how starting ages and contributions affect returns up to retirement. Adjust settings like compounding frequency to visualize results in interactive tables. See your financial future clearly.",
  image: assets.compoundInterestCalcIcon,
};

// Modal for pdf file
import { baseUrl } from "../../api/apiConstant";
import { ConfigProvider, theme as antdTheme, Modal } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { useCustomPDF } from "../../hooks/useCustomPDF";

type ExportMortgagePDFModalProps = {
  targetRef: React.RefObject<HTMLDivElement>;
  setIsGeneratingPDF: React.Dispatch<React.SetStateAction<boolean>>;
  isGeneratingPDF: boolean;
  setPdfError: React.Dispatch<React.SetStateAction<string | null>>;
  toPDF: () => Promise<void>;
};

const ExportMortgagePDFModal = ({
  targetRef,
  setIsGeneratingPDF,
  isGeneratingPDF,
  setPdfError,
  toPDF,
}: ExportMortgagePDFModalProps) => {
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
            downloadedFileName: "Investment Comparison Calculator",
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

import moment from "moment";

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};



export const FixedWidthInvestmentGrowthPDFTemplate = ({
  investors,
  settings,
  results,
}: {
  investors: Investor[];
  settings: Settings;
  results: ResultRow[][];
}) => {
  // Fixed width for PDF (A4 paper size in pixels at 96dpi)
  const pdfWidth = 794; // ~8.27 inches (A4 width)
  const pdfMargin = 20; // Increased margin for better spacing

  // Calculate summary data for each investor
  const investorSummaries = investors.map((investor, idx) => {
    const finalResult = results[idx]?.find(
      (r) => r.age === (settings.retirementAge === "" ? 65 : parseFloat(settings.retirementAge))
    );
    
    const totalInvested = results[idx]?.reduce((sum, row) => sum + row.invest, 0) || 0;
    const growthAmount = finalResult ? finalResult.value - totalInvested : 0;
    const growthPercentage = finalResult && totalInvested > 0 
      ? ((finalResult.value - totalInvested) / totalInvested) * 100 
      : 0;

    return {
      name: investor.name || `Investor ${idx + 1}`,
      totalInvested,
      finalValue: finalResult?.value || 0,
      growthAmount,
      growthPercentage,
      startAge: investor.startAge || "0",
      stopAge: investor.stopAge || "0",
      color: investor.color,
    };
  });

  // Get min and max age for the table
  const getMaxAge = (): number => {
    const retirementAge = settings.retirementAge === "" ? 65 : parseFloat(settings.retirementAge);
    const investorAges = investors.map((i) => i.startAge === "" ? 0 : parseFloat(i.startAge));
    return Math.max(...investorAges, retirementAge);
  };

  const getMinAge = (): number => {
    const investorAges = investors.map((i) => i.startAge === "" ? 0 : parseFloat(i.startAge));
    return Math.min(...investorAges);
  };

  const minAge = getMinAge();
  const maxAge = getMaxAge();

  const chartColors = ["#10b981", "#f59e0b", "#8b5cf6"];

  // Helper function to determine if a cell should have background color
  const shouldHighlightCell = (investorIndex: number, age: number): boolean => {
    const investor = investors[investorIndex];
    const startAge = investor.startAge === "" ? 0 : parseFloat(investor.startAge);
    const stopAge = investor.stopAge === "" ? 0 : parseFloat(investor.stopAge);
    return age >= startAge && age <= stopAge;
  };

  // Key milestones to highlight
  const milestoneAges = [25, 30, 35, 40, 45, 50, 55, 60, 65].filter(age => age <= maxAge);

  return (
    <div
      className="pdf-template"
      style={{
        width: `${pdfWidth}px`,
        margin: "0 auto",
        padding: `${pdfMargin}px`,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        fontSize: "16px", // Increased from 12px to 16px for better readability
        color: "#2d3748",
        backgroundColor: "#fff",
        lineHeight: 1.6, // Increased line height for better readability
      }}
    >
      {/* Header with branding */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px", // Increased margin
          paddingBottom: "25px", // Increased padding
          borderBottom: "3px solid #e2e8f0", // Thicker border for better separation
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "60px", // Increased size
              height: "60px", // Increased size
              backgroundColor: "#2b6777",
              borderRadius: "12px", // Slightly larger radius
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "20px", // Increased margin
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)", // Enhanced shadow
            }}
          >
            <div style={{color: "white", fontWeight: "bold", fontSize: "24px"}}>DF</div> {/* Increased font size */}
          </div>
          <div>
            <h1
              style={{
                fontSize: "28px", // Increased from 24px
                fontWeight: "700",
                margin: "0",
                color: "#2b6777",
                letterSpacing: "-0.5px",
                lineHeight: 1.2,
              }}
            >
              Investment Comparison Report
            </h1>
            <p
              style={{
                margin: "8px 0 0 0", // Increased margin
                color: "#718096",
                fontSize: "18px", // Increased from 14px
                fontWeight: "500",
              }}
            >
              Compound Interest Scenario Analysis
            </p>
          </div>
        </div>
        <div
          style={{
            textAlign: "right",
            fontSize: "16px", // Increased from 12px
            color: "#718096",
          }}
        >
          <p style={{ margin: "0 0 8px 0", fontWeight: "600" }}>
            Generated on {moment().format("MMMM D, YYYY")}
          </p>
          <p style={{ margin: "0", fontSize: "14px" }}> {/* Increased from 11px */}
            dollarfar.com/investment-calculator
          </p>
        </div>
      </header>

      {/* Executive Summary */}
      <div style={{
        backgroundColor: "#f7fafc",
        padding: "25px", // Increased padding
        borderRadius: "12px",
        marginBottom: "40px", // Increased margin
        borderLeft: "5px solid #2b6777", // Thicker border
      }}>
        <h2 style={{
          fontSize: "22px", // Increased from 18px
          fontWeight: "700",
          margin: "0 0 20px 0", // Increased margin
          color: "#2d3748",
          display: "flex",
          alignItems: "center",
        }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px", // Increased size
            height: "32px", // Increased size
            backgroundColor: "#2b6777",
            color: "white",
            borderRadius: "8px", // Increased radius
            marginRight: "12px", // Increased margin
            fontSize: "18px", // Increased font size
          }}>📊</span>
          Executive Summary
        </h2>
        
        <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px"}}> {/* Increased gap */}
          <div>
            <p style={{margin: "0 0 15px 0", fontWeight: "600", fontSize: "18px"}}>Investment Parameters:</p> {/* Increased font size */}
            <ul style={{margin: "0", paddingLeft: "20px", fontSize: "16px", lineHeight: 1.8}}> {/* Increased font size and line height */}
              <li>Annual Return: <strong>{settings.annualReturn || "0"}%</strong></li>
              <li>Initial Investment: <strong>{formatCurrency(settings.initialInvestment === "" ? 0 : parseFloat(settings.initialInvestment))}</strong></li>
              <li>Annual Contribution: <strong>{formatCurrency(settings.annualContribution === "" ? 0 : parseFloat(settings.annualContribution))}</strong></li>
            </ul>
          </div>
          <div>
            <p style={{margin: "0 0 15px 0", fontWeight: "600", fontSize: "18px"}}>Analysis Period:</p> {/* Increased font size */}
            <ul style={{margin: "0", paddingLeft: "20px", fontSize: "16px", lineHeight: 1.8}}> {/* Increased font size and line height */}
              <li>Retirement Age: <strong>{settings.retirementAge || "65"}</strong></li>
              <li>Compounding: <strong>{settings.compounding}</strong></li>
              <li>Contribution Frequency: <strong>{settings.contributionFrequency}</strong></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Investor Comparison Cards */}
      <div style={{marginBottom: "40px"}}> {/* Increased margin */}
        <h2 style={{
          fontSize: "22px", // Increased from 18px
          fontWeight: "700",
          margin: "0 0 25px 0", // Increased margin
          color: "#2d3748",
          paddingBottom: "15px", // Increased padding
          borderBottom: "3px solid #e2e8f0", // Thicker border
          display: "flex",
          alignItems: "center",
        }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px", // Increased size
            height: "32px", // Increased size
            backgroundColor: "#2b6777",
            color: "white",
            borderRadius: "8px", // Increased radius
            marginRight: "12px", // Increased margin
            fontSize: "18px", // Increased font size
          }}>👥</span>
          Investor Comparison
        </h2>

        <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px"}}> {/* Increased gap */}
          {investorSummaries.map((investor, index) => (
            <div key={index} style={{
              padding: "20px", // Increased padding
              borderRadius: "12px",
              backgroundColor: "#f8f9fa",
              border: "2px solid #e2e8f0", // Thicker border
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)", // Enhanced shadow
            }}>
              <h3 style={{
                fontSize: "18px", // Increased from 15px
                fontWeight: "700",
                margin: "0 0 15px 0", // Increased margin
                color: "#2b6777",
                paddingBottom: "12px", // Increased padding
                borderBottom: "2px solid #e2e8f0", // Thicker border
              }}>
                {investor.name}
              </h3>
              
              <div style={{marginBottom: "15px", fontSize: "16px"}}> {/* Increased font size */}
                <div style={{display: "flex", justifyContent: "space-between", marginBottom: "8px"}}> {/* Increased margin */}
                  <span style={{color: "#718096"}}>Investment Period:</span>
                  <span style={{fontWeight: "600"}}>{investor.startAge} - {investor.stopAge}</span>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", marginBottom: "8px"}}> {/* Increased margin */}
                  <span style={{color: "#718096"}}>Total Invested:</span>
                  <span style={{fontWeight: "600"}}>{formatCurrency(investor.totalInvested)}</span>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", marginBottom: "8px"}}> {/* Increased margin */}
                  <span style={{color: "#718096"}}>Final Value:</span>
                  <span style={{fontWeight: "700", color: "#2b6777"}}>{formatCurrency(investor.finalValue)}</span>
                </div>
              </div>
              
              <div style={{
                backgroundColor: "#edf2f7",
                padding: "12px", // Increased padding
                borderRadius: "8px",
                textAlign: "center",
                fontSize: "16px", // Increased from 12px
              }}>
                <div style={{color: "#718096", marginBottom: "5px"}}>Total Growth</div> {/* Increased margin */}
                <div style={{
                  fontWeight: "800",
                  fontSize: "18px", // Added explicit font size
                  color: investor.growthPercentage >= 0 ? "#38a169" : "#e53e3e"
                }}>
                  {formatCurrency(investor.growthAmount)} ({investor.growthPercentage.toFixed(1)}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Milestones */}
      <div style={{marginBottom: "40px", pageBreakInside: "avoid"}}> {/* Increased margin */}
        <h2 style={{
          fontSize: "22px", // Increased from 18px
          fontWeight: "700",
          margin: "0 0 25px 0", // Increased margin
          color: "#2d3748",
          paddingBottom: "15px", // Increased padding
          borderBottom: "3px solid #e2e8f0", // Thicker border
          display: "flex",
          alignItems: "center",
        }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px", // Increased size
            height: "32px", // Increased size
            backgroundColor: "#2b6777",
            color: "white",
            borderRadius: "8px", // Increased radius
            marginRight: "12px", // Increased margin
            fontSize: "18px", // Increased font size
          }}>🎯</span>
          Key Investment Milestones
        </h2>

        <table style={{width: "100%", borderCollapse: "collapse", fontSize: "16px"}}> {/* Increased font size */}
          <thead>
            <tr>
              <th style={{
                padding: "15px", // Increased padding
                textAlign: "left",
                backgroundColor: "#2b6777",
                color: "white",
                border: "2px solid #2b6777", // Thicker border
                fontSize: "18px", // Increased from 13px
              }}>Age</th>
              {investors.map((investor, idx) => (
                <th key={idx} style={{
                  padding: "15px", // Increased padding
                  textAlign: "right",
                  backgroundColor: "#2b6777",
                  color: "white",
                  border: "2px solid #2b6777", // Thicker border
                  fontSize: "18px", // Increased from 13px
                }}>
                  {investor.name || `Investor ${idx + 1}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {milestoneAges.map((age, ageIndex) => {
              return (
                <tr key={age} style={{ backgroundColor: ageIndex % 2 === 0 ? "#f7fafc" : "white" }}>
                  <td style={{
                    padding: "12px 15px", // Increased padding
                    fontWeight: "700",
                    border: "2px solid #e2e8f0", // Thicker border
                    textAlign: "center",
                    fontSize: "16px", // Increased font size
                  }}>
                    {age}
                  </td>
                  {investors.map((_, idx) => {
                    const result = results[idx]?.find((r) => r.age === age);
                    return (
                      <td key={idx} style={{
                        padding: "12px 15px", // Increased padding
                        border: "2px solid #e2e8f0", // Thicker border
                        textAlign: "right",
                        fontWeight: "600",
                        fontSize: "16px", // Increased font size
                      }}>
                        {result ? formatCurrency(result.value) : "-"}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Detailed Projection Table */}
      <div style={{marginBottom: "40px", pageBreakInside: "avoid"}}> {/* Increased margin */}
        <h2 style={{
          fontSize: "22px", // Increased from 18px
          fontWeight: "700",
          margin: "0 0 25px 0", // Increased margin
          color: "#2d3748",
          paddingBottom: "15px", // Increased padding
          borderBottom: "3px solid #e2e8f0", // Thicker border
          display: "flex",
          alignItems: "center",
        }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px", // Increased size
            height: "32px", // Increased size
            backgroundColor: "#2b6777",
            color: "white",
            borderRadius: "8px", // Increased radius
            marginRight: "12px", // Increased margin
            fontSize: "18px", // Increased font size
          }}>📋</span>
          Detailed Year-by-Year Projection
        </h2>

        <div style={{overflow: "auto"}}>
          <table style={{width: "100%", borderCollapse: "collapse", fontSize: "14px"}}> {/* Increased from 11px */}
            <thead>
              <tr>
                {investors.map((inv, idx) => (
                  <th
                    key={idx}
                    colSpan={3}
                    style={{
                      padding: "12px 8px", // Increased padding
                      textAlign: "center",
                      fontWeight: "700",
                      color: "white",
                      backgroundColor: chartColors[idx],
                      border: "2px solid #e2e8f0", // Thicker border
                      fontSize: "16px", // Increased from 12px
                    }}
                  >
                    {inv.name || `Investor ${idx + 1}`}
                  </th>
                ))}
              </tr>
              <tr style={{ backgroundColor: "#edf2f7" }}>
                {investors.map((_, idx) => (
                  <React.Fragment key={idx}>
                    <th style={{ padding: "10px 8px", border: "2px solid #e2e8f0", fontWeight: "600", fontSize: "14px" }}> {/* Increased padding and font size */}
                      Age
                    </th>
                    <th style={{ padding: "10px 8px", border: "2px solid #e2e8f0", fontWeight: "600", fontSize: "14px" }}> {/* Increased padding and font size */}
                      Invested
                    </th>
                    <th style={{ padding: "10px 8px", border: "2px solid #e2e8f0", fontWeight: "600", fontSize: "14px" }}> {/* Increased padding and font size */}
                      Value
                    </th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: maxAge - minAge + 1 }, (_, i) => i + minAge).map((age) => (
                <tr key={age} style={{ borderBottom: "2px solid #e2e8f0" }}> {/* Thicker border */}
                  {investors.map((_, idx) => {
                    const row = results[idx]?.find((r) => r.age === age);
                    const isInvestmentPeriod = shouldHighlightCell(idx, age);
                    const bgColor = isInvestmentPeriod ? 
                      `${chartColors[idx]}20` : "transparent"; // 20 is for 12% opacity
                    
                    return row ? (
                      <React.Fragment key={idx}>
                        <td style={{ 
                          padding: "8px", // Increased padding
                          border: "2px solid #e2e8f0", // Thicker border
                          textAlign: "center",
                          backgroundColor: bgColor,
                          fontWeight: isInvestmentPeriod ? "600" : "normal",
                          fontSize: "14px", // Increased font size
                        }}>
                          {row.age}
                        </td>
                        <td style={{ 
                          padding: "8px", // Increased padding
                          border: "2px solid #e2e8f0", // Thicker border
                          textAlign: "right",
                          backgroundColor: bgColor,
                          fontSize: "14px", // Increased font size
                        }}>
                          {row.invest > 0 ? formatCurrency(row.invest) : "-"}
                        </td>
                        <td style={{ 
                          padding: "8px", // Increased padding
                          border: "2px solid #e2e8f0", // Thicker border
                          textAlign: "right",
                          fontWeight: "600",
                          backgroundColor: bgColor,
                          fontSize: "14px", // Increased font size
                        }}>
                          {formatCurrency(row.value)}
                        </td>
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={idx}>
                        <td style={{ padding: "8px", border: "2px solid #e2e8f0", textAlign: "center", fontSize: "14px" }}> {/* Increased padding and font size */}
                          {age}
                        </td>
                        <td style={{ padding: "8px", border: "2px solid #e2e8f0", textAlign: "center", fontSize: "14px" }}> {/* Increased padding and font size */}
                          -
                        </td>
                        <td style={{ padding: "8px", border: "2px solid #e2e8f0", textAlign: "center", fontSize: "14px" }}> {/* Increased padding and font size */}
                          -
                        </td>
                      </React.Fragment>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div style={{
        backgroundColor: "#f0fff4",
        padding: "25px", // Increased padding
        borderRadius: "12px",
        marginBottom: "40px", // Increased margin
        borderLeft: "5px solid #38a169", // Thicker border
      }}>
        <h2 style={{
          fontSize: "22px", // Increased from 18px
          fontWeight: "700",
          margin: "0 0 20px 0", // Increased margin
          color: "#2d3748",
          display: "flex",
          alignItems: "center",
        }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px", // Increased size
            height: "32px", // Increased size
            backgroundColor: "#38a169",
            color: "white",
            borderRadius: "8px", // Increased radius
            marginRight: "12px", // Increased margin
            fontSize: "18px", // Increased font size
          }}>💡</span>
          Key Insights & Recommendations
        </h2>
        
        <div style={{display: "grid", gridTemplateColumns: "1fr", gap: "15px"}}> {/* Increased gap */}
          <div style={{padding: "15px", backgroundColor: "white", borderRadius: "8px"}}> {/* Increased padding */}
            <h3 style={{fontSize: "18px", fontWeight: "700", margin: "0 0 10px 0", color: "#2b6777"}}>Starting Early Matters</h3> {/* Increased font size */}
            <p style={{margin: "0", fontSize: "16px", lineHeight: 1.6}}> {/* Increased font size and line height */}
              The investor who starts earliest typically achieves the highest final portfolio value, 
              demonstrating the power of compound interest over time.
            </p>
          </div>
          
          <div style={{padding: "15px", backgroundColor: "white", borderRadius: "8px"}}> {/* Increased padding */}
            <h3 style={{fontSize: "18px", fontWeight: "700", margin: "0 0 10px 0", color: "#2b6777"}}>Consistent Contributions</h3> {/* Increased font size */}
            <p style={{margin: "0", fontSize: "16px", lineHeight: 1.6}}> {/* Increased font size and line height */}
              Regular contributions significantly impact long-term growth. Even small amounts invested 
              consistently can lead to substantial wealth accumulation over time.
            </p>
          </div>
          
          <div style={{padding: "15px", backgroundColor: "white", borderRadius: "8px"}}> {/* Increased padding */}
            <h3 style={{fontSize: "18px", fontWeight: "700", margin: "0 0 10px 0", color: "#2b6777"}}>Next Steps</h3> {/* Increased font size */}
            <p style={{margin: "0", fontSize: "16px", lineHeight: 1.6}}> {/* Increased font size and line height */}
              Consider increasing contributions when possible, reviewing your investment strategy annually, 
              and diversifying across different asset classes to manage risk.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          marginTop: "50px", // Increased margin
          paddingTop: "25px", // Increased padding
          borderTop: "3px solid #e2e8f0", // Thicker border
          fontSize: "16px", // Increased from 11px
          color: "#718096",
          textAlign: "center",
        }}
      >
        <div style={{marginBottom: "20px"}}> {/* Increased margin */}
          <p style={{ margin: "0 0 8px 0", fontWeight: "600" }}>
            For more financial tools and calculators, visit <strong>dollarfar.com</strong>
          </p>
          <p style={{ margin: "0", fontStyle: "italic" }}>
            This report was generated on {moment().format("MMMM D, YYYY [at] h:mm A")}
          </p>
        </div>
        
        <div style={{
          backgroundColor: "#f7fafc",
          padding: "15px", // Increased padding
          borderRadius: "8px",
          fontSize: "16px", // Increased from 10px
        }}>
          <p style={{ margin: "0 0 8px 0", fontWeight: "600" }}>Disclaimer:</p> {/* Increased margin */}
          <p style={{ margin: "0", fontStyle: "italic" }}>
            This document was generated by DollarFar's Investment Comparison Calculator. The information 
            provided is for educational purposes only and should not be considered financial advice. 
            Past performance is not indicative of future results. Please consult with a qualified financial 
            advisor before making investment decisions.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default function CompoundInterestComparisonCalculator() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  // Default inputs with no initial values
  const [investors, setInvestors] = useState<Investor[]>([
    { name: "", startAge: "", stopAge: "", color: "bg-emerald-100" },
    { name: "", startAge: "", stopAge: "", color: "bg-amber-100" },
    { name: "", startAge: "", stopAge: "", color: "bg-purple-100" },
  ]);

  const [settings, setSettings] = useState<Settings>({
    initialInvestment: "",
    annualContribution: "",
    annualReturn: "",
    retirementAge: "65",
    compounding: "yearly",
    contributionFrequency: "yearly",
  });

  const [results, setResults] = useState<ResultRow[][]>([]);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Prevent input value change on scroll
  const preventScrollChange = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  const handleInvestorChange = (
    index: number,
    field: keyof Investor,
    value: string
  ) => {
    const updated = [...investors];
    updated[index][field] = value;
    setInvestors(updated);
  };

  const handleSettingChange = (field: keyof Settings, value: string) => {
    setSettings({
      ...settings,
      [field]: value,
    });
  };

  // Reset all input fields
  const resetAllFields = () => {
    setInvestors([
      { name: "", startAge: "", stopAge: "", color: "bg-emerald-100" },
      { name: "", startAge: "", stopAge: "", color: "bg-amber-100" },
      { name: "", startAge: "", stopAge: "", color: "bg-teal-100" },
    ]);

    setSettings({
      initialInvestment: "",
      annualContribution: "",
      annualReturn: "",
      retirementAge: "",
      compounding: "yearly",
      contributionFrequency: "yearly",
    });

    setResults([]);
  };

  const calculateResults = (investor: Investor): ResultRow[] => {
    // Use 0 if field is empty string
    const initialInvestment =
      settings.initialInvestment === ""
        ? 0
        : parseFloat(settings.initialInvestment);
    const annualContribution =
      settings.annualContribution === ""
        ? 0
        : parseFloat(settings.annualContribution);
    const annualReturn =
      settings.annualReturn === "" ? 0 : parseFloat(settings.annualReturn);
    const retirementAge =
      settings.retirementAge === "" ? 65 : parseFloat(settings.retirementAge);
    const contributionFrequency = settings.contributionFrequency;

    let freq = 1; // yearly by default
    if (contributionFrequency === "monthly") freq = 12;
    if (contributionFrequency === "quarterly") freq = 4;

    const r = annualReturn / 100;
    const periodRate = r / freq;
    const contributionPerPeriod = annualContribution / freq;

    const rows: ResultRow[] = [];
    let value = initialInvestment;

    // Use 0 if investor age fields are empty
    const startAge =
      investor.startAge === "" ? 0 : parseFloat(investor.startAge);
    const stopAge = investor.stopAge === "" ? 0 : parseFloat(investor.stopAge);

    for (let age = startAge; age <= retirementAge; age++) {
      let invest = 0;
      for (let p = 1; p <= freq; p++) {
        if (age <= stopAge) {
          invest += contributionPerPeriod;
          value =
            value * (1 + periodRate) + contributionPerPeriod * (1 + periodRate);
        } else {
          value = value * (1 + periodRate);
        }
      }

      rows.push({
        age,
        invest: invest,
        value: value,
      });
    }

    return rows;
  };

  // Add a ref to your results section
  const resultsRef = useRef<HTMLDivElement>(null);

  const calculateAllResults = () => {
    setIsCalculating(true);
    // Simulate calculation time for loading state
    setTimeout(() => {
      const allResults = investors.map((investor) => {
        console.log(parseInt(investor?.startAge));
        const isStartAgeGreater =
          parseInt(investor?.startAge) >= parseInt(investor?.stopAge);
        if (isStartAgeGreater) {
          toast.error(
            "Start age should not be greater than or equal to stop age!"
          );
        }
        return calculateResults(investor);
      });

      setResults(allResults);
      setIsCalculating(false);
      // Scroll to results section with 100px offset from top
      if (resultsRef.current) {
        const elementPosition = resultsRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 102;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 800);
  };

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getMaxAge = (): number => {
    const retirementAge =
      settings.retirementAge === "" ? 65 : parseFloat(settings.retirementAge);
    const investorAges = investors.map((i) =>
      i.startAge === "" ? 0 : parseFloat(i.startAge)
    );
    return Math.max(...investorAges, retirementAge);
  };

  const getMinAge = (): number => {
    const investorAges = investors.map((i) =>
      i.startAge === "" ? 0 : parseFloat(i.startAge)
    );
    return Math.min(...investorAges);
  };

  // Helper function to determine if a cell should have background color
  const shouldHighlightCell = (investorIndex: number, age: number): boolean => {
    const investor = investors[investorIndex];
    const startAge =
      investor.startAge === "" ? 0 : parseFloat(investor.startAge);
    const stopAge = investor.stopAge === "" ? 0 : parseFloat(investor.stopAge);
    return age >= startAge && age <= stopAge;
  };

  // Prepare data for the chart
  const prepareChartData = () => {
    if (results.length === 0) return [];

    const minAge = getMinAge();
    const maxAge = getMaxAge();
    const chartData = [];

    for (let age = minAge; age <= maxAge; age++) {
      const dataPoint: any = { age };

      investors.forEach((investor, idx) => {
        const result = results[idx]?.find((r) => r.age === age);
        if (result) {
          dataPoint[`investor${idx}Value`] = result.value;
          dataPoint[`investor${idx}Name`] =
            investor.name || `Investor ${idx + 1}`;
        } else {
          dataPoint[`investor${idx}Value`] = null;
          dataPoint[`investor${idx}Name`] =
            investor.name || `Investor ${idx + 1}`;
        }
      });

      chartData.push(dataPoint);
    }

    return chartData;
  };

  const chartData = prepareChartData();

  // Colors for the chart lines
  const chartColors = ["#10b981", "#f59e0b", "#8b5cf6"];

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

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
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  {/* Investment Growth Calculator */}
                  Compound Interest Scenario/Comparison Calculator
                </h1>
                <p className="opacity-90">
                  See how starting early vs. starting late impacts your
                  financial future.
                </p>
              </div>
              <ExportMortgagePDFModal
                setIsGeneratingPDF={setIsGeneratingPDF}
                isGeneratingPDF={isGeneratingPDF}
                setPdfError={setPdfError}
                targetRef={targetRef}
                toPDF={toPDF}
              />
              {pdfError && (
                <p className="text-red-500 font-semibold text-right my-2">
                  Error: PDF could not be downloaded!
                </p>
              )}
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            {/* Investor Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {investors.map((inv, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-xl shadow-md border-t-4 ${inv.color} border-emerald-400 transition-all hover:shadow-lg`}
                >
                  <h2 className="font-bold text-lg mb-4 flex items-center">
                    <i className="fas fa-user-circle mr-2 text-emerald-600"></i>
                    Investor {idx + 1}
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={inv.name}
                        onChange={(e) =>
                          handleInvestorChange(idx, "name", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                        placeholder="Enter name"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                          Start Age
                        </label>
                        <input
                          type="number"
                          value={inv.startAge}
                          onChange={(e) =>
                            handleInvestorChange(
                              idx,
                              "startAge",
                              e.target.value
                            )
                          }
                          onWheel={preventScrollChange}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                          placeholder="Start age"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                          Stop Age
                        </label>
                        <input
                          type="number"
                          value={inv.stopAge}
                          onChange={(e) =>
                            handleInvestorChange(idx, "stopAge", e.target.value)
                          }
                          onWheel={preventScrollChange}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                          placeholder="Stop age"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Shared Settings */}
            <div className="bg-gray-50 p-6 rounded-xl shadow border border-gray-200">
              {/* <h2 className="font-bold text-xl mb-6 flex items-center">
              <i className="fas fa-cog mr-2 text-emerald-600"></i>
              Investment Settings
            </h2> */}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Initial Investment
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={settings.initialInvestment}
                      onChange={(e) =>
                        handleSettingChange("initialInvestment", e.target.value)
                      }
                      onWheel={preventScrollChange}
                      className="w-full pl-8 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Annual Contribution
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={settings.annualContribution}
                      onChange={(e) =>
                        handleSettingChange(
                          "annualContribution",
                          e.target.value
                        )
                      }
                      onWheel={preventScrollChange}
                      className="w-full pl-8 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Annual Return Rate (%)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                      %
                    </span>
                    <input
                      type="number"
                      value={settings.annualReturn}
                      onChange={(e) =>
                        handleSettingChange("annualReturn", e.target.value)
                      }
                      onWheel={preventScrollChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Retirement Age
                  </label>
                  <input
                    type="number"
                    value={settings.retirementAge}
                    onChange={(e) =>
                      handleSettingChange("retirementAge", e.target.value)
                    }
                    onWheel={preventScrollChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    placeholder="65"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Compounding Frequency
                  </label>
                  <select
                    value={settings.compounding}
                    onChange={(e) =>
                      handleSettingChange("compounding", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  >
                    <option value="yearly">Yearly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Contribution Frequency
                  </label>
                  <select
                    value={settings.contributionFrequency}
                    onChange={(e) =>
                      handleSettingChange(
                        "contributionFrequency",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  >
                    <option value="yearly">Yearly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={resetAllFields}
                  className="px-4 py-2 rounded-lg flex items-center transition bg-gray-500 hover:bg-gray-600 text-white"
                >
                  <i className="fas fa-redo mr-2"></i>
                  Reset
                </button>
                <button
                  onClick={calculateAllResults}
                  disabled={isCalculating}
                  className={`px-4 py-2 rounded-lg flex items-center transition ${
                    isCalculating
                      ? "bg-emerald-400 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  } text-white`}
                >
                  {isCalculating ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Calculating...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-calculator mr-2"></i>
                      Calculate
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Results Table */}
            <div
              ref={resultsRef}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
            >
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                <h2 className="font-bold text-xl flex items-center">
                  <i className="fas fa-table mr-2 text-emerald-600"></i>
                  Investment Growth Projection
                  {isCalculating && (
                    <span className="ml-2 text-sm font-normal text-emerald-600 flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-1 h-4 w-4 text-emerald-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating...
                    </span>
                  )}
                </h2>
              </div>

              {isCalculating ? (
                <div className="p-12 flex justify-center items-center">
                  <div className="text-center">
                    <svg
                      className="animate-spin mx-auto h-8 w-8 text-emerald-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <p className="mt-2 text-gray-600">Calculating results...</p>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        {investors.map((inv, idx) => (
                          <th
                            key={idx}
                            colSpan={3}
                            className={`p-4 text-center font-bold text-gray-700 border-r last:border-r-0 border-l-4 first:border-l-0 border-l-gray-300 ${inv.color}`}
                          >
                            <div className="flex items-center justify-center">
                              {inv.name ? (
                                <div>
                                  <p>
                                    <span className="font-extrabold text-[17px]">
                                      {inv.name}
                                    </span>{" "}
                                    is Investing at Age {inv.startAge}
                                  </p>
                                  <p>
                                    ( {settings.annualReturn}% Annual Return )
                                  </p>
                                </div>
                              ) : (
                                `Investor ${idx + 1} 's Investment`
                              )}
                            </div>
                          </th>
                        ))}
                      </tr>
                      <tr className="bg-gray-50">
                        {investors.map((_, idx) => (
                          <React.Fragment key={idx}>
                            <th className="p-2 border-r font-bold text-gray-600 border-l-4 first:border-l-0 border-l-gray-300">
                              Age
                            </th>
                            <th className="p-2 border-r font-bold text-gray-600">
                              Invested
                            </th>
                            <th className="p-2 border-r font-bold text-gray-600 last:border-r-0">
                              Value
                            </th>
                          </React.Fragment>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {results.length > 0 ? (
                        Array.from(
                          { length: getMaxAge() - getMinAge() + 1 },
                          (_, i) => i + getMinAge()
                        ).map((age) => (
                          <tr
                            key={age}
                            className="hover:bg-gray-100 transition"
                          >
                            {investors.map((inv, idx) => {
                              const row = results[idx]?.find(
                                (r) => r.age === age
                              );
                              const isInvestmentPeriod = shouldHighlightCell(
                                idx,
                                age
                              );
                              return row ? (
                                <React.Fragment key={idx}>
                                  <td className="p-3 border-r font-medium border-l-4 first:border-l-0 border-l-gray-300 text-center">
                                    {row.age}
                                  </td>
                                  <td
                                    className={`p-3 border-r text-center ${
                                      isInvestmentPeriod
                                        ? `${inv.color} font-medium`
                                        : ""
                                    }`}
                                  >
                                    {row.invest > 0
                                      ? formatCurrency(row.invest)
                                      : "-"}
                                  </td>
                                  <td className="p-3 border-r last:border-r-0 font-medium text-black text-center">
                                    {formatCurrency(row.value)}
                                  </td>
                                </React.Fragment>
                              ) : (
                                <React.Fragment key={idx}>
                                  <td className="p-3 border-r border-l-4 first:border-l-0 border-l-gray-300 text-center">
                                    {age}
                                  </td>
                                  <td
                                    className={`p-3 border-r text-center ${
                                      shouldHighlightCell(idx, age)
                                        ? `${inv.color}`
                                        : ""
                                    }`}
                                  >
                                    -
                                  </td>
                                  <td className="p-3 border-r last:border-r-0 text-center">
                                    -
                                  </td>
                                </React.Fragment>
                              );
                            })}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={investors.length * 3}
                            className="p-8 text-center text-gray-500"
                          >
                            <i className="fas fa-calculator text-3xl mb-3 text-emerald-400"></i>
                            <p>
                              Click "Calculate" to see your investment
                              projections
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Chart Section */}
            {results.length > 0 && (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                  <h2 className="font-bold text-xl flex items-center">
                    <i className="fas fa-chart-line mr-2 text-emerald-600"></i>
                    Investment Growth Comparison Chart
                  </h2>
                </div>
                <div className="p-4 h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="age"
                        label={{
                          value: "Age",
                          position: "insideBottomRight",
                          offset: -5,
                        }}
                      />
                      <YAxis
                        tickFormatter={(value) => `$${value / 1000}k`}
                        label={{
                          value: "Value",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip
                        formatter={(value, name) => {
                          const investorName = name
                            .toString()
                            .replace(" Value", "");
                          return [
                            `$${Number(value).toLocaleString()}`,
                            investorName,
                          ];
                        }}
                        labelFormatter={(value) => `Age: ${value}`}
                      />
                      <Legend />
                      {investors.map((investor, idx) => (
                        <Line
                          key={idx}
                          type="monotone"
                          dataKey={`investor${idx}Value`}
                          name={investor.name || `Investor ${idx + 1}`}
                          stroke={chartColors[idx]}
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 6 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {investors.map((inv, idx) => {
                const finalResult = results[idx]?.find(
                  (r) =>
                    r.age ===
                    (settings.retirementAge === ""
                      ? 65
                      : parseFloat(settings.retirementAge))
                );
                const totalInvested =
                  results[idx]?.reduce((sum, row) => sum + row.invest, 0) || 0;

                return (
                  <div
                    key={idx}
                    className={`p-5 rounded-xl shadow-md border-t-4 ${inv.color} border-emerald-400`}
                  >
                    <h3 className="font-bold text-lg mb-4 flex items-center">
                      <span
                        className={`w-3 h-3 rounded-full ${inv.color.replace(
                          "bg-",
                          "bg-"
                        )} mr-2`}
                      ></span>
                      {inv.name || `Investor ${idx + 1}`}'s Summary
                    </h3>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Invested:</span>
                        <span className="font-medium">
                          {results.length > 0
                            ? formatCurrency(totalInvested)
                            : "-"}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Final Value:</span>
                        <span className="font-medium text-emerald-600">
                          {finalResult
                            ? formatCurrency(finalResult.value)
                            : "-"}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Investment Period:
                        </span>
                        <span className="font-medium">
                          {inv.startAge === "" ? "-" : inv.startAge} -{" "}
                          {inv.stopAge === "" ? "-" : inv.stopAge}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Growth Rate Period:
                        </span>
                        <span className="font-medium">
                          {inv.startAge === "" ? "-" : inv.startAge} -{" "}
                          {settings.retirementAge === ""
                            ? "-"
                            : settings.retirementAge}
                        </span>
                      </div>

                      <div className="pt-3 border-t">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Growth Rate:</span>
                          <span className="font-medium text-emerald-600">
                            {finalResult && totalInvested > 0
                              ? `${Math.round(
                                  ((finalResult.value - totalInvested) /
                                    totalInvested) *
                                    100
                                )}%`
                              : "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
     
      {/* PDF Hidden Content  */}
      <div
        ref={targetRef}
        style={{
          display: "none",
          fontFamily: "Arial, sans-serif",
          fontSize: "16px",
        }}
      >
        <FixedWidthInvestmentGrowthPDFTemplate
          investors={investors}
          settings={settings}
          results={results}
        />
      </div>
    </>
  );
}
