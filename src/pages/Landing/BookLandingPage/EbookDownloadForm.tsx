import { useState } from "react";
import { toast } from "react-toastify";
import { ConfigProvider, theme as antdTheme, Modal } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../api/apiConstant";

export const EbookDownloadFormPopup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
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
    setIsModalOpen(false);
    setShowError(false);
    setFormData({
      fullName: "",
      email: "",
      mobile: "",
      city: "",
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
      !formData.fullName.trim() ||
      !formData.mobile.trim()
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

    try {
      const res = await fetch(`${baseUrl}/ebook-downloaded-users/create-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
          city: formData.city,
        }),
      });

      if (!res.ok) {
        return toast.error("Failed to submit details");
      }

      await res.json();
      toast.success("A confirmation email has been sent.", {
        position: "top-center",
      });
    } catch (error: unknown) {
      console.error("Email sending failed:", error);
      const errorMessage = "Unexpected error occurred";
      toast.error(`Failed to send report: ${errorMessage}`, {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
      setShowError(false);
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
        className="bg-black rounded-lg text-white md:px-5 px-2 py-3 md:w-auto w-full"
        type="button"
        onClick={showModal}
        disabled={isLoading}
        aria-label="Export as PDF"
      >
        Download Now
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
            <Icon
              icon="ion:close"
              width={30}
              height={30}
              className="text-red-500"
            />
          </button>

          <div className="p-8">
            {/* Header */}
            <h3 className="font-bold text-[1.5rem]">
              Enter details to download the Ebook
            </h3>

            {/* Form */}
            <div className="space-y-5">
              <div>
                <label
                  className={`block text-sm font-medium mb-1.5 ${
                    isDarkMode ? "text-gray-300" : "text-[#2b6777]"
                  }`}
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="fullName"
                    name="fullName"
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      showError && !formData.fullName.trim()
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
                    value={formData.fullName}
                    aria-required="true"
                  />
                  <Icon
                    icon="mdi:account-outline"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
                  />
                </div>
                {showError && !formData.fullName.trim() && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <Icon icon="mdi:alert-circle-outline" className="text-sm" />
                    Please enter your full name
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
                  htmlFor="mobile"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    id="mobile"
                    name="mobile"
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      showError && !formData.mobile.trim()
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
                    value={formData.mobile}
                    aria-required="true"
                  />
                  <Icon
                    icon="mdi:phone-outline"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
                  />
                </div>
                {showError && !formData.mobile.trim() && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <Icon icon="mdi:alert-circle-outline" className="text-sm" />
                    Please enter your phone number
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1.5 ${
                    isDarkMode ? "text-gray-300" : "text-[#2b6777]"
                  }`}
                  htmlFor="city"
                >
                  City
                </label>
                <div className="relative">
                  <input
                    id="city"
                    name="city"
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      showError && !formData.city.trim()
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 ${
                      isDarkMode
                        ? "focus:ring-[#52ab98]"
                        : "focus:ring-[#2b6777]"
                    } focus:border-transparent transition-all pl-11`}
                    type="text"
                    placeholder="Toronto"
                    onChange={handleInputChange}
                    value={formData.city}
                    aria-required="true"
                  />
                  <Icon
                    icon="mdi:city"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
                  />
                </div>
                {showError && !formData.city.trim() && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <Icon icon="mdi:alert-circle-outline" className="text-sm" />
                    Please enter your city name
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
                <Icon icon="material-symbols:download" className="text-xl" />
                {isLoading ? "Downloading..." : "Download Now"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};
