import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Error from "../../components/UI/Error";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import {
  User,
  Target,
  Home,
  Plane,
  Wallet,
  MapPin,
  Heart,
  Shield,
} from "lucide-react";
import { Checkbox, ConfigProvider } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useAddRetirementPlanMutation } from "../../redux/features/APIEndpoints/retirementPlansApi/retirementPlansApi";
import { showApiErrorToast } from "../../utils/showApiErrorToast";

interface FormData {
  // Contact Information
  full_name: string;
  phone: string;
  email: string;
  region: string;

  // Retirement Snapshot
  target_age: string;
  desired_income: string;
  estimated_savings: string;

  // Housing & Real Estate Equity
  estimated_home_equity: string;
  equity_comfort: string;

  // Part-Time Abroad Preferences
  country_region: string;
  ideal_locations: string;
  months_abroad: string;
  start_timeline: string;
  travel_style: string;
  independent_travel_ack: boolean;

  // Budget Estimates
  home_spend_monthly: string;
  abroad_budget_season: string;
  flights_insurance_budget: string;
  flight_class: string;

  // Purpose of Travel
  travel_purpose: string[];

  // Interests & Services
  interests: string[];

  // Privacy & Pricing
  fee_ack: boolean;
  consent_contact: boolean;
  consent_marketing: boolean;
}

interface RetirementNextStepFormProps {
  setIsModalVisible: (visible: boolean) => void;
}

const RetirementNextStepForm = ({
  setIsModalVisible,
}: RetirementNextStepFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    phone: "",
    email: "",
    region: "",
    target_age: "",
    desired_income: "",
    estimated_savings: "",
    estimated_home_equity: "",
    equity_comfort: "none",
    country_region: "",
    ideal_locations: "",
    months_abroad: "",
    start_timeline: "",
    travel_style: "",
    independent_travel_ack: false,
    home_spend_monthly: "",
    abroad_budget_season: "",
    flights_insurance_budget: "",
    flight_class: "",
    travel_purpose: [],
    interests: [],
    fee_ack: false,
    consent_contact: false,
    consent_marketing: false,
  });
  const [showError, setShowError] = useState(false);

  // Helper function to format numbers with commas
  const formatNumberWithCommas = (value: string): string => {
    // Remove all non-digit characters except decimal point
    const numericValue = value.replace(/[^\d.]/g, "");

    if (numericValue === "") return "";

    // Split into whole and decimal parts
    const parts = numericValue.split(".");
    let wholePart = parts[0];
    const decimalPart = parts.length > 1 ? `.${parts[1]}` : "";

    // Add commas to whole number part
    wholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return wholePart + decimalPart;
  };

  // Helper function to remove commas for storage
  const removeCommas = (value: string): string => {
    return value.replace(/,/g, "");
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      | CheckboxChangeEvent
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name as string]: checked,
      }));
    } else {
      // Handle numeric fields with comma formatting
      if (
        name === "desired_income" ||
        name === "estimated_savings" ||
        name === "estimated_home_equity" ||
        name === "home_spend_monthly" ||
        name === "abroad_budget_season"
      ) {
        const formattedValue = formatNumberWithCommas(value);
        setFormData((prev) => ({
          ...prev,
          [name as string]: formattedValue,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name as string]: value,
        }));
      }
    }
  };

  const handleCheckboxGroupChange = (e: CheckboxChangeEvent) => {
    const { name, value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name as string]: checked
        ? [...(prev[name as keyof FormData] as string[]), value]
        : (prev[name as keyof FormData] as string[]).filter(
            (item) => item !== value
          ),
    }));
  };

  // Prevent input value change on scroll
  const preventScrollChange = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  const [addRetirementPlan, { isLoading, isError, error }] =
    useAddRetirementPlanMutation();

  useEffect(() => {
    if (isError && !isLoading && error) {
      showApiErrorToast(error);
    }
  }, [isLoading, isError, error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      full_name,
      phone,
      email,
      fee_ack,
      consent_contact,
      consent_marketing,
    } = formData;
    if (
      !full_name ||
      !phone ||
      !email ||
      !fee_ack ||
      !consent_contact ||
      !consent_marketing
    ) {
      return setShowError(true);
    }

    // Prepare data for submission - remove commas from numeric fields
    const submissionData = {
      ...formData,
      desired_income: removeCommas(formData.desired_income),
      estimated_savings: removeCommas(formData.estimated_savings),
      estimated_home_equity: removeCommas(formData.estimated_home_equity),
      home_spend_monthly: removeCommas(formData.home_spend_monthly),
      abroad_budget_season: removeCommas(formData.abroad_budget_season),
    };

    const res = await addRetirementPlan(submissionData);
    if (res?.error) return;
    toast.success(
      "Submission confirmed! A RetireHow specialist will contact you to begin crafting your personalized retirement transition strategy.",
      { autoClose: 15000 }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 px-2 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 md:p-8 p-3 mb-8 transform hover:shadow-2xl transition-all duration-300">
          {/* Enhanced Banner */}
          <div className="bg-gradient-to-r from-emerald-500 to-purple-600 rounded-2xl md:p-6 p-3 text-white">
            <div className="flex md:flex-row flex-col items-start gap-4">
              <Icon
                icon="mdi:rocket-launch"
                className="text-2xl flex-shrink-0 mt-1"
              />
              <div>
                <h3 className="font-bold text-2xl mb-2">
                  Ready to explore your next step?
                </h3>
                <p className="text-blue-100 leading-relaxed text-lg">
                  Complete the short form below and we'll tailor a plan to
                  maintain or elevate your lifestyle — at home or abroad.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <form onSubmit={handleSubmit} className="md:p-8 p-3">
            {/* A. Contact Information */}
            <div className="border-l-4 border-blue-500 mb-8 bg-blue-100 dark:bg-blue-900/20 p-4 rounded-2xl">
              {/* Header Section  */}
              <div className="mb-6">
                <div className="flex md:flex-row flex-col md:items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-lg font-bold">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">
                      Contact Information
                    </h3>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="full_name"
                      className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2"
                    >
                      <Icon
                        icon="mdi:account-outline"
                        className="text-blue-500"
                      />
                      Full name*
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      name="full_name"
                      minLength={2}
                      maxLength={80}
                      autoComplete="name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your full name"
                    />
                    <small className="block text-gray-500 dark:text-gray-400 text-sm mt-2 flex items-center gap-1">
                      <Icon
                        icon="mdi:information-outline"
                        className="text-blue-400"
                      />
                      Why we ask: So we can address you properly in your
                      personalized plan.
                    </small>
                    {showError && !formData?.full_name && (
                      <Error message="This field is required" />
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2"
                    >
                      <Icon
                        icon="mdi:phone-outline"
                        className="text-blue-500"
                      />
                      Phone*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-blue-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700 dark:text-white"
                      placeholder="Your phone number"
                    />
                    <small className="text-gray-500 dark:text-gray-400 text-sm mt-2 flex items-center gap-1">
                      <Icon
                        icon="mdi:information-outline"
                        className="text-blue-400"
                      />
                      Why we ask: We'll need a reliable number to coordinate
                      details and confirm preferences quickly.
                    </small>
                    {showError && !formData?.phone && (
                      <Error message="This field is required" />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2"
                    >
                      <Icon
                        icon="mdi:email-outline"
                        className="text-blue-500"
                      />
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-blue-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700 dark:text-white"
                      placeholder="your.email@example.com"
                    />
                    <small className="block text-gray-500 dark:text-gray-400 text-sm mt-2 flex items-center gap-1">
                      <Icon
                        icon="mdi:information-outline"
                        className="text-blue-400"
                      />
                      Why we ask: To deliver your summary and follow ups.
                    </small>
                    {showError && !formData?.email && (
                      <Error message="This field is required" />
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="region"
                      className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2"
                    >
                      <Icon
                        icon="mdi:map-marker-outline"
                        className="text-blue-500"
                      />
                      Province/State of residence
                    </label>
                    <input
                      type="text"
                      id="region"
                      name="region"
                      minLength={2}
                      maxLength={60}
                      value={formData.region}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-blue-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700 dark:text-white"
                      placeholder="Your region"
                    />
                    <small className="block text-gray-500 dark:text-gray-400 text-sm mt-2 flex items-center gap-1">
                      <Icon
                        icon="mdi:information-outline"
                        className="text-blue-400"
                      />
                      Why we ask: Benefits/taxes and travel rules may vary by
                      region.
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* B. Retirement Snapshot */}
            <div className="border-l-4 border-green-500 mb-8 bg-green-100 dark:bg-green-900/20 p-4 rounded-2xl">
              {/* Header Section  */}
              <div className="mb-6">
                <div className="flex md:flex-row flex-col md:items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-lg font-bold">
                    <Target className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-green-900 dark:text-green-100">
                      Retirement Snapshot
                    </h3>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="target_age"
                      className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2"
                    >
                      <Icon
                        icon="mdi:calendar-outline"
                        className="text-green-500"
                      />
                      Target retirement age
                    </label>
                    <input
                      type="number"
                      id="target_age"
                      name="target_age"
                      value={formData.target_age}
                      onChange={handleInputChange}
                      onWheel={preventScrollChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-green-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., 65"
                    />
                    <small className="block text-gray-500 dark:text-gray-400 text-sm mt-2 flex items-center gap-1">
                      <Icon
                        icon="mdi:information-outline"
                        className="text-green-400"
                      />
                      Why we ask: Timing affects benefits, drawdown order, and
                      travel windows.
                    </small>
                  </div>

                  <div>
                    <label
                      htmlFor="desired_income"
                      className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2"
                    >
                      <Icon
                        icon="mdi:cash-usd-outline"
                        className="text-green-500"
                      />
                      Desired annual retirement income (local currency)
                    </label>
                    <input
                      type="text"
                      id="desired_income"
                      name="desired_income"
                      value={formData.desired_income}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-green-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., 75,000"
                    />
                    <small className="block text-gray-500 dark:text-gray-400 text-sm mt-2 flex items-center gap-1">
                      <Icon
                        icon="mdi:information-outline"
                        className="text-green-400"
                      />
                      Why we ask: Sets your lifestyle target so we can compare
                      home vs. abroad.
                    </small>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="estimated_savings"
                    className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2"
                  >
                    <Icon
                      icon="mdi:piggy-bank-outline"
                      className="text-green-500"
                    />
                    Estimated total savings (RRSP/TFSA/401k/etc.)
                  </label>
                  <input
                    type="text"
                    id="estimated_savings"
                    name="estimated_savings"
                    value={formData.estimated_savings}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-green-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., 500,000"
                  />
                  <small className="block text-gray-500 dark:text-gray-400 text-sm mt-2 flex items-center gap-1">
                    <Icon
                      icon="mdi:information-outline"
                      className="text-green-400"
                    />
                    Why we ask: A rough picture helps us size safe withdrawal
                    rates and gaps.
                  </small>
                </div>
              </div>
            </div>

            {/* C. Housing & Real Estate Equity */}
            <div className="border-l-4 border-amber-500 mb-8 bg-amber-100 dark:bg-amber-900/20 p-4 rounded-2xl">
              {/* Header Section  */}
              <div className="mb-6">
                <div className="flex md:flex-row flex-col md:items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-amber-500 text-white rounded-lg font-bold">
                    <Home className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">
                      Housing & Real Estate Equity
                    </h3>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="estimated_home_equity"
                    className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2"
                  >
                    <Icon icon="mdi:home-outline" className="text-amber-500" />
                    Estimated home equity (net value of real estate)
                  </label>
                  <input
                    type="text"
                    id="estimated_home_equity"
                    name="estimated_home_equity"
                    value={formData.estimated_home_equity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-amber-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., 350,000"
                  />
                  <small className="block text-gray-500 dark:text-gray-400 text-sm mt-2 flex items-center gap-1">
                    <Icon
                      icon="mdi:information-outline"
                      className="text-amber-400"
                    />
                    Why we ask: Renters can leave this blank; for homeowners, an
                    estimate of net equity (value minus debt) helps us
                    understand flexibility and retirement optionality.
                  </small>
                </div>

                <div>
                  <label
                    htmlFor="equity_comfort"
                    className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2"
                  >
                    <Icon
                      icon="mdi:handshake-outline"
                      className="text-amber-500"
                    />
                    Comfort with tapping home equity as a last resort?
                  </label>
                  <select
                    id="equity_comfort"
                    name="equity_comfort"
                    value={formData.equity_comfort}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 cursor-pointer border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-amber-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select...</option>
                    <option value="Not comfortable">Not comfortable</option>
                    <option value="Open to discuss">Open to discuss</option>
                    <option value="Comfortable within limits">
                      Comfortable within limits
                    </option>
                  </select>
                  <small className="block text-gray-500 dark:text-gray-400 text-sm mt-2 flex items-center gap-1">
                    <Icon
                      icon="mdi:information-outline"
                      className="text-amber-400"
                    />
                    Why we ask: Some clients prefer to preserve home equity;
                    others use a limited portion to fund experiences or cover
                    gaps.
                  </small>
                </div>
              </div>
            </div>

            {/* D. Part-Time Abroad Preferences */}
            <div className="border-l-4 border-purple-500 mb-8 bg-purple-100 dark:bg-purple-900/20 p-4 rounded-2xl">
              {/* Header Section  */}
              <div className="mb-6">
                <div className="flex md:flex-row flex-col md:items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-500 text-white rounded-lg font-bold">
                    <Plane className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100">
                      Part-Time Abroad Preferences
                    </h3>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="country_region"
                      className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2"
                    >
                      <Icon icon="mdi:earth" className="text-purple-500" />
                      Preferred country/region
                    </label>
                    <select
                      id="country_region"
                      name="country_region"
                      value={formData.country_region}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-purple-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700 dark:text-white cursor-pointer"
                    >
                      <option value="">Select…</option>
                      <option value="South India">South India</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Other">Other</option>
                    </select>
                    <small className="block text-gray-500 dark:text-gray-400 text-sm mt-2 flex items-center gap-1">
                      <Icon
                        icon="mdi:information-outline"
                        className="text-purple-400"
                      />
                      Why we ask: Country choice sets visa, healthcare access,
                      and baseline costs.
                    </small>
                  </div>

                  <div>
                    <label
                      htmlFor="ideal_locations"
                      className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2"
                    >
                      <Icon
                        icon="mdi:city-variant-outline"
                        className="text-purple-500"
                      />
                      Preferred city/area
                    </label>
                    <input
                      type="text"
                      id="ideal_locations"
                      name="ideal_locations"
                      placeholder="e.g., Goa or Kochi (South India); Lisbon or Porto (Portugal); Mérida or Playa del Carmen (Mexico)"
                      minLength={2}
                      maxLength={120}
                      value={formData.ideal_locations}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-purple-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700 dark:text-white"
                    />
                    <small className="block text-gray-500 dark:text-gray-400 text-sm mt-2 flex items-center gap-1">
                      <Icon
                        icon="mdi:information-outline"
                        className="text-purple-400"
                      />
                      Why we ask: City/area drives housing, safety, transit, and
                      community fit.
                    </small>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="months_abroad"
                      className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2"
                    >
                      <Icon
                        icon="mdi:calendar-month-outline"
                        className="text-purple-500"
                      />
                      Months abroad per year
                    </label>
                    <select
                      id="months_abroad"
                      name="months_abroad"
                      value={formData.months_abroad}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-purple-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700 dark:text-white cursor-pointer"
                    >
                      <option value="">Select…</option>
                      <option>30 Days Minimum</option>
                      <option>2–3</option>
                      <option>4–5</option>
                      <option>6+</option>
                      <option>Undecided</option>
                    </select>
                    <small className="block text-gray-500 dark:text-gray-400 text-sm mt-2 flex items-center gap-1">
                      <Icon
                        icon="mdi:information-outline"
                        className="text-purple-400"
                      />
                      Why we ask: Determines accommodation strategy and visa
                      approach.
                    </small>
                  </div>

                  <div>
                    <label
                      htmlFor="start_timeline"
                      className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2"
                    >
                      <Icon
                        icon="mdi:clock-outline"
                        className="text-purple-500"
                      />
                      Earliest start (season/year)
                    </label>
                    <select
                      id="start_timeline"
                      name="start_timeline"
                      value={formData.start_timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-purple-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700 dark:text-white cursor-pointer"
                    >
                      <option value="">Select...</option>
                      <option value="November 2026">November 2026</option>
                      <option value="December 2026">December 2026</option>
                      <option value="January 2027">January 2027</option>
                      <option value="February 2027">February 2027</option>
                      <option value="March 2027">March 2027</option>
                      <option value="April 2027">April 2027</option>
                      <option value="May 2027">May 2027</option>
                      <option value="June 2027">June 2027</option>
                      <option value="July 2027">July 2027</option>
                      <option value="August 2027">August 2027</option>
                      <option value="September 2027">September 2027</option>
                      <option value="October 2027">October 2027</option>
                      <option value="November 2027">November 2027</option>
                      <option value="December 2027">December 2027</option>
                      <option value="January 2028">January 2028</option>
                      <option value="February 2028">February 2028</option>
                      <option value="March 2028">March 2028</option>
                      <option value="April 2028">April 2028</option>
                      <option value="May 2028">May 2028</option>
                      <option value="June 2028">June 2028</option>
                      <option value="July 2028">July 2028</option>
                      <option value="August 2028">August 2028</option>
                      <option value="September 2028">September 2028</option>
                      <option value="October 2028">October 2028</option>
                    </select>
                    <small className="block text-gray-500 dark:text-gray-400 text-sm mt-2 flex items-center gap-1">
                      <Icon
                        icon="mdi:information-outline"
                        className="text-amber-400"
                      />
                      Why we ask: Some clients prefer to preserve home equity;
                      others use a limited portion to fund experiences or cover
                      gaps.
                    </small>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="travel_style"
                    className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2"
                  >
                    <Icon icon="mdi:luggage" className="text-purple-500" />
                    Travel style for immersive living
                  </label>
                  <select
                    id="travel_style"
                    name="travel_style"
                    value={formData.travel_style}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-purple-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700 dark:text-white cursor-pointer"
                  >
                    <option value="">Select…</option>
                    <option value="Apartment/Condo (2 bedrooms)">
                      Apartment/Condo (2 bedrooms)
                    </option>
                    <option value="Apartment/Condo (3 bedrooms)">
                      Apartment/Condo (3 bedrooms)
                    </option>
                    <option value="Villa/Bungalow (4 bedrooms)">
                      Villa/Bungalow (4 bedrooms)
                    </option>
                    <option value="Extended‑stay">Extended‑stay</option>
                  </select>
                  <small className="block text-gray-500 dark:text-gray-400 text-sm mt-2 flex items-center gap-1">
                    <Icon
                      icon="mdi:information-outline"
                      className="text-purple-400"
                    />
                    Why we ask: Different styles shift costs and comfort.
                  </small>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl border border-purple-200 dark:border-purple-700">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: "#581c87",
                          colorBorder: "#581c87",
                        },
                      }}
                    >
                      <Checkbox
                        name="independent_travel_ack"
                        onChange={handleInputChange}
                      />
                    </ConfigProvider>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      I can travel independently without mobility assistance. I
                      understand some destinations abroad may be less accessible
                      than in Canada/USA.
                    </span>
                  </label>
                  <small className="block text-gray-500 dark:text-gray-400 text-sm mt-2 flex items-center gap-1">
                    <Icon
                      icon="mdi:information-outline"
                      className="text-purple-400"
                    />
                    Why we ask: Ensures the options we propose are practical and
                    safe for you.
                  </small>
                </div>
              </div>
            </div>

            {/* E. Budget Estimates */}
            <div className="border-l-4 border-indigo-500 mb-8 bg-indigo-100 dark:bg-indigo-900/20 p-4 rounded-2xl">
              {/* Header Section  */}
              <div className="mb-6">
                <div className="flex md:flex-row flex-col md:items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-indigo-500 text-white rounded-lg font-bold">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-100">
                      Budget Estimates
                    </h3>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="home_spend_monthly"
                      className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2"
                    >
                      <Icon
                        icon="mdi:home-currency-usd"
                        className="text-indigo-500"
                      />
                      Home-country monthly spend (estimate)
                    </label>
                    <input
                      type="text"
                      id="home_spend_monthly"
                      name="home_spend_monthly"
                      placeholder="e.g., 3,500"
                      value={formData.home_spend_monthly}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-indigo-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700 dark:text-white"
                    />
                    <small className="block text-gray-500 dark:text-gray-400 text-sm mt-2 flex items-center gap-1">
                      <Icon
                        icon="mdi:information-outline"
                        className="text-indigo-400"
                      />
                      Why we ask: Baseline to compare vs. abroad.
                    </small>
                  </div>

                  <div>
                    <label
                      htmlFor="abroad_budget_season"
                      className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2"
                    >
                      <Icon icon="mdi:airplane" className="text-indigo-500" />
                      Abroad seasonal budget for your duration of stay (per
                      winter season, estimate)
                    </label>
                    <input
                      type="text"
                      id="abroad_budget_season"
                      name="abroad_budget_season"
                      placeholder="e.g., 12,000"
                      value={formData.abroad_budget_season}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-indigo-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700 dark:text-white"
                    />
                    <small className="block text-gray-500 dark:text-gray-400 text-sm mt-2 flex items-center gap-1">
                      <Icon
                        icon="mdi:information-outline"
                        className="text-indigo-400"
                      />
                      Why we ask: Helps right‑size destinations and
                      accommodation type.
                    </small>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="flights_insurance_budget"
                    className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2"
                  >
                    <Icon
                      icon="mdi:wallet-travel"
                      className="text-indigo-500"
                    />
                    Typical flight & insurance budget (open input)
                  </label>
                  <input
                    type="text"
                    id="flights_insurance_budget"
                    name="flights_insurance_budget"
                    placeholder="e.g., $1,500 economy / $4,000 premium economy / $7,000 business (round trip)"
                    value={formData.flights_insurance_budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-indigo-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700 dark:text-white"
                  />
                  <small className="block text-gray-500 dark:text-gray-400 text-sm mt-2 flex items-center gap-1">
                    <Icon
                      icon="mdi:information-outline"
                      className="text-indigo-400"
                    />
                    Why we ask: Costs vary widely; free‑form lets you enter
                    ranges or notes.
                  </small>
                </div>

                <div>
                  <label
                    htmlFor="flight_class"
                    className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2"
                  >
                    <Icon
                      icon="mdi:seat-passenger"
                      className="text-indigo-500"
                    />
                    Preferred flight class
                  </label>
                  <select
                    id="flight_class"
                    name="flight_class"
                    value={formData.flight_class}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-indigo-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700 dark:text-white cursor-pointer"
                  >
                    <option value="">Select…</option>
                    <option>Economy</option>
                    <option>Premium Economy</option>
                    <option>Business</option>
                    <option>First</option>
                  </select>
                  <small className="block text-gray-500 dark:text-gray-400 text-sm mt-2 flex items-center gap-1">
                    <Icon
                      icon="mdi:information-outline"
                      className="text-indigo-400"
                    />
                    Why we ask: Class of travel affects airfare budgets
                    substantially.
                  </small>
                </div>
              </div>
            </div>

            {/* F. Purpose of Travel */}
            <div className="border-l-4 border-teal-500 mb-8 bg-teal-100 dark:bg-teal-900/20 p-4 rounded-2xl">
              {/* Header Section  */}
              <div className="mb-6">
                <div className="flex md:flex-row flex-col md:items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-teal-500 text-white rounded-lg font-bold">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-teal-900 dark:text-teal-100">
                      Purpose of Travel
                    </h3>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  {
                    value: "Escape winter",
                    label: "Escape winter",
                    icon: "mdi:snowflake",
                  },
                  {
                    value: "Explore other cultures and immersive global living",
                    label: "Explore other cultures and immersive global living",
                    icon: "mdi:earth",
                  },
                  {
                    value: "Reduce cost of living",
                    label: "Reduce cost of living",
                    icon: "mdi:cash-remove",
                  },
                  {
                    value: "Travel on budget",
                    label: "Travel on budget",
                    icon: "mdi:wallet-outline",
                  },
                  {
                    value: "Stretch my dollars further",
                    label: "Stretch my dollars further",
                    icon: "mdi:chart-line",
                  },
                  {
                    value: "Leisure travel",
                    label: "Leisure travel",
                    icon: "mdi:umbrella-beach",
                  },
                  {
                    value: "Medical tourism",
                    label: "Medical tourism",
                    icon: "mdi:medical-bag",
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-start gap-3 p-3 hover:bg-teal-200 dark:hover:bg-teal-800 rounded-lg transition-colors duration-200 border-[1px] border-teal-400 dark:border-teal-600 cursor-pointer"
                  >
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: "#2dd4bf",
                          colorBorder: "#2dd4bf",
                        },
                      }}
                    >
                      <Checkbox
                        name="travel_purpose"
                        value={option.value}
                        onChange={handleCheckboxGroupChange}
                      />
                    </ConfigProvider>
                    <div className="flex md:flex-row flex-col md:items-center gap-2">
                      <Icon
                        icon={option.icon}
                        className="text-teal-700 dark:text-teal-400 text-lg"
                      />
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300 select-none">
                        {option.label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* G. Interests & Services */}
            <div className="border-l-4 border-lime-500 mb-8 bg-lime-100 dark:bg-lime-900/20 text- p-4 rounded-2xl">
              {/* Header Section  */}
              <div className="mb-6">
                <div className="flex md:flex-row flex-col md:items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-lime-500 text-white rounded-lg font-bold">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-lime-900 dark:text-lime-100">
                      Interests & Services
                    </h3>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  {
                    value: "Cost of Living Comparison",
                    label: "Cost of Living Comparison",
                    icon: "mdi:scale-balance",
                  },
                  {
                    value: "Part‑Time Abroad (Warm Destinations)",
                    label: "Part‑Time Abroad (Warm Destinations)",
                    icon: "mdi:sun-thermometer",
                  },
                  {
                    value: "Comprehensive Wealth Plan",
                    label: "Comprehensive Wealth Plan",
                    icon: "mdi:finance",
                  },
                  {
                    value: "RRSP/TFSA/Pension Optimization",
                    label: "RRSP/TFSA/Pension Optimization",
                    icon: "mdi:calculator",
                  },
                  {
                    value: "Real Estate/Relocation Strateg",
                    label: "Real Estate/Relocation Strategy",
                    icon: "mdi:home-group",
                  },
                  {
                    value: "Tax‑Efficient Drawdown",
                    label: "Tax‑Efficient Drawdown",
                    icon: "mdi:chart-arc",
                  },
                  {
                    value: "Healthcare/Insurance Guidance",
                    label: "Healthcare/Insurance Guidance",
                    icon: "mdi:heart-pulse",
                  },
                  {
                    value: "Visa/Residency Pathways",
                    label: "Visa/Residency Pathways",
                    icon: "mdi:passport",
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-start gap-3 p-3 hover:bg-lime-200 dark:hover:bg-lime-800 rounded-lg transition-colors duration-200 border-[1px] border-lime-400 dark:border-lime-600 cursor-pointer"
                  >
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: "#a3e635",
                          colorBorder: "#a3e635",
                        },
                      }}
                    >
                      <Checkbox
                        name="interests"
                        value={option.value}
                        onChange={handleCheckboxGroupChange}
                      />
                    </ConfigProvider>
                    <div className="flex md:flex-row flex-col md:items-center gap-2">
                      <Icon
                        icon={option.icon}
                        className="text-lime-700 dark:text-lime-400 text-lg"
                      />
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300 select-none">
                        {option.label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* H. Privacy & Pricing */}
            <div className="border-l-4 border-cyan-500 mb-8 bg-cyan-100 dark:bg-cyan-900/20 p-4 rounded-2xl text-">
              {/* Header Section  */}
              <div className="mb-6">
                <div className="flex md:flex-row flex-col md:items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-cyan-500 text-white rounded-lg font-bold">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-cyan-900 dark:text-cyan-100">
                      Privacy & Pricing
                    </h3>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl md:p-6 p-2 border border-gray-200 dark:border-gray-700">
                  <div className="flex md:flex-row flex-col items-start gap-3 mb-4">
                    <Icon
                      icon="mdi:shield-check-outline"
                      className="text-blue-500 text-2xl"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                        Transparency First
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mt-2">
                        We collect <strong>estimates only</strong> — no account
                        statements. When you ask us to coordinate, we work with
                        vetted experts (e.g., travel, lodging, drivers,
                        hospitals, insurance, visas, tour operators, destination
                        managers etc.). We show you the{" "}
                        <strong>actual third‑party invoices</strong> and{" "}
                        <strong>credit back any commissions</strong> we receive.
                        To cover our planning, booking, and coordination work,
                        we charge a{" "}
                        <strong>flat 10% service delivery fee</strong> on total
                        project costs.
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mt-3">
                        This is not financial advice. If you choose a{" "}
                        <strong>Comprehensive Wealth Plan</strong>, RetireHow
                        collaborates with{" "}
                        <strong>fee‑only financial planners</strong> and
                        introduces you to trusted financial experts as needed —
                        ensuring objective, client‑focused guidance tailored to
                        your goals.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-700 transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-800 cursor-pointer">
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: "#1e40af",
                          colorBorder: "#1e40af",
                        },
                      }}
                    >
                      <Checkbox name="fee_ack" onChange={handleInputChange} />
                    </ConfigProvider>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300 select-none">
                      I acknowledge the pricing model (actuals + 10% service
                      delivery fee; any third‑party commissions credited back to
                      me) and would like to be contacted.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-200 dark:border-green-700 transition-all duration-200 hover:bg-green-100 dark:hover:bg-green-800 cursor-pointer">
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: "#15803d",
                          colorBorder: "#15803d",
                        },
                      }}
                    >
                      <Checkbox
                        name="consent_contact"
                        onChange={handleInputChange}
                      />
                    </ConfigProvider>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300 select-none">
                      I consent to be contacted by{" "}
                      <span className="text-orange-400">RetireHow Inc.</span>{" "}
                      for educational and informational purposes regarding my
                      inquiry.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl border border-purple-200 dark:border-purple-700 transition-all duration-200 hover:bg-purple-100 dark:hover:bg-purple-800 cursor-pointer">
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: "#7e22ce",
                          colorBorder: "#7e22ce",
                        },
                      }}
                    >
                      <Checkbox
                        name="consent_marketing"
                        onChange={handleInputChange}
                      />
                    </ConfigProvider>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300 select-none">
                      I agree to receive occasional updates from RetireHow Inc.
                      about tools and resources (unsubscribe anytime).
                    </span>
                  </label>
                </div>
                {showError &&
                  (!formData.fee_ack ||
                    !formData.consent_contact ||
                    !formData.consent_marketing) && (
                    <Error message="Please check all the Privacy & Pricing checkboxes above." />
                  )}
              </div>
            </div>

            {/* Submit Section */}
            <div className="mt-12 text-center">
              <div className="flex md:flex-row flex-col justify-center gap-5">
                {isLoading ? (
                  <div className="flex justify-center">
                    <ThreeDots color="purple" height="60" width="60" />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-emerald-600 to-purple-600 hover:from-emerald-700 hover:to-purple-700 text-white font-bold py-5 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-lg"
                  >
                    <div className="flex md:flex-row flex-col items-center justify-center gap-3">
                      <Icon icon="mdi:rocket-launch" className="text-xl" />
                      <span>Submit & Request My Personalized Plan</span>
                    </div>
                  </button>
                )}
                <button
                  className="bg-gradient-to-r from-emerald-600 to-purple-600 hover:from-emerald-700 hover:to-purple-700 text-white font-bold py-5 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-lg"
                  onClick={() => setIsModalVisible(false)}
                >
                  <div className="flex md:flex-row flex-col items-center justify-center gap-3">
                    <Icon icon="mingcute:close-fill" className="text-xl" />
                    <span>Close</span>
                  </div>
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mt-6 max-w-2xl mx-auto leading-relaxed">
                We protect your data, never sell it, and only charge actual
                costs plus a 10% delivery fee if you engage us. Your retirement
                journey starts with this single step.
              </p>

              <div className="border-t border-gray-200 dark:border-gray-700 my-8 max-w-2xl mx-auto"></div>

              <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl p-6 max-w-2xl mx-auto">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  DollarFar.com is provided by{" "}
                  <strong className="text-orange-400">RetireHow Inc.</strong> as
                  part of our commitment to bring financial know‑how to
                  everyone. A member of the{" "}
                  <strong className="text-orange-400">RetireHow</strong> team
                  will contact you directly after submission.
                </p>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <Icon
                    icon="mdi:shield-check"
                    className="text-green-500 text-2xl"
                  />
                  <Icon
                    icon="mdi:lock-outline"
                    className="text-blue-500 text-2xl"
                  />
                  <Icon
                    icon="mdi:heart-outline"
                    className="text-red-500 text-2xl"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RetirementNextStepForm;
