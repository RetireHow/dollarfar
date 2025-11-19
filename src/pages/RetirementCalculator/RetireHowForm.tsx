/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Checkbox, ConfigProvider } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { baseUrl } from "../../api/apiConstant";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import RedStar from "../../components/UI/RedStar";
import { useAddRetirementPlanMutation } from "../../redux/features/APIEndpoints/retirementPlansApi/retirementPlansApi";
import { showApiErrorToast } from "../../utils/showApiErrorToast";

const STRIPE_PK = import.meta.env.VITE_STRIPE_PK!;
const stripePromise = loadStripe(STRIPE_PK);

/**
 * Organized Form State Types by Category
 */
type ContactInfo = {
  full_name: string;
  phone: string;
  email: string;
  region?: string;
};

type RetirementSnapshot = {
  target_age?: string;
  desired_income?: string;
  estimated_savings?: string;
};

type HousingEquity = {
  estimated_home_equity?: string;
  equity_comfort?: string;
};

type DollarFarPlanning = {
  calculators?: string[];
  interpretation_toggle?: boolean;
  name_pre?: string;
  email_pre?: string;
  phone_pre?: string;
  time_pre?: string;
  subscription_status?: "" | "have" | "start" | "paid";
  subscription_payment_intent?: string;
};

type TravelPlanning = {
  months_abroad?: string;
  start_timeline?: string;
  travel_style?: string;
  independent_travel_ack?: boolean;
  country_region_interest?: string;
  ideal_locations_interest?: string;
};

type BudgetEstimates = {
  home_spend_monthly?: string;
  abroad_budget_season?: string;
  flights_insurance_budget?: string;
  flight_class?: string;
};

type PrivacyAcknowledgements = {
  ack_poc?: boolean;
  consent_contact?: boolean;
  ack_scope?: boolean;
};

type FormState = {
  contact: ContactInfo;
  retirement_snapshot: RetirementSnapshot;
  housing_equity: HousingEquity;
  dollarfar_planning: DollarFarPlanning;
  travel_planning: TravelPlanning;
  budget_estimates: BudgetEstimates;
  travel_purpose: string[];
  privacy_acknowledgements: PrivacyAcknowledgements;
};

/**
 * Format number with commas for readability
 */
const formatNumberWithCommas = (value: string): string => {
  const numericValue = value.replace(/[^\d.]/g, "");

  if (!numericValue) return "";

  const parts = numericValue.split(".");
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (parts.length > 1) {
    return `${integerPart}.${parts[1]}`;
  }

  return integerPart;
};

/**
 * Parse comma-separated number back to raw value
 */
const parseCommaNumber = (value: string): string => {
  return value.replace(/,/g, "");
};

/**
 * PaymentModal uses Stripe hooks - must be wrapped in Elements
 */
function PaymentModalComponent({
  open,
  onClose,
  onPaid,
  contactInfo,
  setIsSubscribeClicked,
}: {
  open: boolean;
  onClose: () => void;
  onPaid: (paymentIntentId: string) => void;
  contactInfo: ContactInfo;
  setIsSubscribeClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  if (!contactInfo.email || !contactInfo.phone || !contactInfo.full_name) {
    setIsSubscribeClicked(true);
    return null;
  }

  if (!open) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!stripe || !elements) {
      setError("Payment system is not ready. Please try again in a moment.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${baseUrl}/retirement-next-step-plans/create-retirehow-payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          errorText || `Payment failed with status: ${res.status}`
        );
      }

      const data = await res.json();
      const clientSecret = data?.data?.clientSecret;
      if (!clientSecret) throw new Error("Missing client secret from server");

      const card = elements.getElement(CardElement);
      if (!card) throw new Error("Card element not available");

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

      if (result.error) {
        setError(result.error.message || "Payment failed");
        setLoading(false);
        return;
      }

      if (result.paymentIntent?.status === "succeeded") {
        onPaid(result.paymentIntent.id);
        setLoading(false);
      } else {
        setError("Payment not completed. Please try again.");
        setLoading(false);
      }
    } catch (err: any) {
      setError(err?.message || "Payment failed");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-gray-300">
        <h3 className="mb-2 text-xl font-bold text-gray-900">
          Complete Subscription
        </h3>
        <p className="mb-4 text-sm text-gray-700">
          Your plan includes two 30-minute consultations within 12 months.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 rounded-lg border border-gray-400 p-3 hover:border-gray-600 transition-colors">
            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#1a202c",
                    "::placeholder": {
                      color: "#718096",
                    },
                  },
                },
              }}
            />
          </div>

          {error && (
            <div className="mb-3 text-center text-sm text-red-600 bg-red-50 py-2 px-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              className="rounded-xl bg-gray-900 hover:bg-black px-4 py-3 text-white font-semibold disabled:opacity-60 transition-colors shadow-md"
              type="submit"
              disabled={loading || !stripe}
            >
              {loading ? "Processing..." : "Pay $199 CAD"}
            </button>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-gray-400 hover:border-gray-600 px-4 py-3 font-semibold text-gray-800 disabled:opacity-60 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Wrap PaymentModal with Elements for Stripe hooks to work
const PaymentModal = (props: {
  open: boolean;
  onClose: () => void;
  onPaid: (paymentIntentId: string) => void;
  contactInfo: ContactInfo;
  setIsSubscribeClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <Elements stripe={stripePromise}>
    <PaymentModalComponent {...props} />
  </Elements>
);

/**
 * Main form component
 */
export default function RetireHowForm(): JSX.Element {
  const [form, setForm] = useState<FormState>({
    contact: {
      full_name: "",
      phone: "",
      email: "",
    },
    retirement_snapshot: {},
    housing_equity: {},
    dollarfar_planning: {
      subscription_status: "",
    },
    travel_planning: {},
    budget_estimates: {},
    travel_purpose: [], // FIXED: Changed from {} to []
    privacy_acknowledgements: {},
  });

  const [paymentOpen, setPaymentOpen] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSubscribeClicked, setIsSubscribeClicked] = useState(false);

  // Enhanced change handler with number formatting
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      return;
    }

    // Handle number fields with comma formatting
    const numberFields = [
      "desired_income",
      "estimated_savings",
      "estimated_home_equity",
      "home_spend_monthly",
      "abroad_budget_season",
    ];

    // Extract category and field name from the name attribute
    const [category, fieldName] = name.includes(".")
      ? name.split(".")
      : [null, name];

    if (numberFields.includes(fieldName) && category && category in form) {
      const formattedValue = formatNumberWithCommas(value);
      setForm((prev) => ({
        ...prev,
        [category]: {
          ...prev[category as keyof FormState],
          [fieldName]: formattedValue,
        },
      }));
      return;
    }

    if (category && fieldName && category in form) {
      setForm((prev) => ({
        ...prev,
        [category]: {
          ...prev[category as keyof FormState],
          [fieldName]: value,
        },
      }));
    }
  };

  // Checkbox handler: supports single boolean checkboxes and multi-value groups
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement> | CheckboxChangeEvent
  ) => {
    const { name, value, checked } = e.target as {
      name: string;
      value: string;
      checked: boolean;
    };

    // Extract category and field name
    const [category, fieldName] = name.includes(".")
      ? name.split(".")
      : [null, name];

    // Handle travel_purpose (direct array)
    if (name === "travel_purpose") {
      setForm((prev) => ({
        ...prev,
        travel_purpose: checked
          ? [...prev.travel_purpose, value]
          : prev.travel_purpose.filter((item) => item !== value),
      }));
      return;
    }

    // Multi checkbox groups for calculators
    if (fieldName === "calculators") {
      if (category && category in form) {
        setForm((prev) => {
          const currentCategory = prev[category as keyof FormState] as any;
          const currentValue = currentCategory?.[fieldName];
          const arr = Array.isArray(currentValue) ? [...currentValue] : [];

          if (checked) {
            if (!arr.includes(value)) arr.push(value);
          } else {
            const idx = arr.indexOf(value);
            if (idx !== -1) arr.splice(idx, 1);
          }
          return {
            ...prev,
            [category]: {
              ...currentCategory,
              [fieldName]: arr,
            },
          };
        });
      }
      return;
    }

    // Single boolean checkboxes
    const booleanFields = [
      "ack_poc",
      "consent_contact",
      "ack_scope",
      "independent_travel_ack",
      "interpretation_toggle",
    ];

    if (fieldName && booleanFields.includes(fieldName)) {
      if (category && category in form) {
        setForm((prev) => ({
          ...prev,
          [category]: {
            ...prev[category as keyof FormState],
            [fieldName]: checked,
          },
        }));

        // Clear interpretation fields when toggle is turned off
        if (fieldName === "interpretation_toggle" && !checked) {
          setForm((prev) => ({
            ...prev,
            dollarfar_planning: {
              ...prev.dollarfar_planning,
              name_pre: "",
              email_pre: "",
              phone_pre: "",
              time_pre: "",
            },
          }));
        }
      }
      return;
    }
  };

  // Helper to check if travel purpose is selected
  const isTravelPurposeSelected = (value: string): boolean => {
    return form.travel_purpose.includes(value);
  };

  // When user clicks 'I have a subscription'
  const onHaveSubscription = () => {
    setForm((prev) => ({
      ...prev,
      dollarfar_planning: {
        ...prev.dollarfar_planning,
        subscription_status: "have",
      },
    }));
  };

  // When user clicks 'Start subscription' -> open payment modal
  const onStartSubscription = () => {
    setForm((prev) => ({
      ...prev,
      dollarfar_planning: {
        ...prev.dollarfar_planning,
        subscription_status: "start",
      },
    }));
    setPaymentOpen(true);
  };

  // Called by PaymentModal when payment success
  const onPaymentSuccess = (paymentIntentId: string) => {
    setForm((prev) => ({
      ...prev,
      dollarfar_planning: {
        ...prev.dollarfar_planning,
        subscription_status: "paid",
        subscription_payment_intent: paymentIntentId,
      },
    }));
    setPaymentOpen(false);
    toast.success("Payment successful. You can now submit the main form.", {
      autoClose: 15000,
    });
  };

  // Helper function to get field value from nested structure
  const getFieldValue = (category: keyof FormState, field: string): any => {
    const categoryData = form[category] as any;
    return categoryData?.[field] ?? "";
  };

  // Helper function to check if array field includes value
  const getArrayFieldIncludes = (
    category: keyof FormState,
    field: string,
    value: string
  ): boolean => {
    const categoryData = form[category] as any;
    const fieldValue = categoryData?.[field];
    return Array.isArray(fieldValue) && fieldValue.includes(value);
  };

  const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const phoneReg = /^[+]?[1-9][\d]{0,15}$/;

  const [addRetirementPlan, { isLoading: submitting, isError, error }] =
    useAddRetirementPlanMutation();

  useEffect(() => {
    if (isError && !submitting && error) {
      showApiErrorToast(error);
    }
  }, [submitting, isError, error]);

  // final submit - parse comma numbers before sending
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate required contact fields
    if (!form.contact.full_name || !form.contact.phone || !form.contact.email) {
      setShowError(true);
      toast.error("Please provide all the required informations.");
      return;
    }

    if (!emailReg.test(form.contact.email)) {
      setShowError(true);
      toast.error("Please provide a valid email address!");
      return;
    }
    if (!phoneReg.test(form.contact.phone)) {
      setShowError(true);
      toast.error("Please provide a valid phone number!");
      return;
    }

    // Basic client validation: required ack checkboxes
    if (
      !form.privacy_acknowledgements.ack_poc ||
      !form.privacy_acknowledgements.consent_contact ||
      !form.privacy_acknowledgements.ack_scope
    ) {
      setShowError(true);
      return;
    }

    // Validate subscription if interpretation is enabled
    if (
      form.dollarfar_planning.interpretation_toggle &&
      form.dollarfar_planning.subscription_status !== "have" &&
      form.dollarfar_planning.subscription_status !== "paid"
    ) {
      toast.error(
        "Please select either have an existing subscription or start a new one for interpretation services."
      );
      setShowError(true);
      return;
    }
    // Prepare form data by parsing comma numbers
    const submitData = { ...form };

    // Parse number fields back to raw values
    const numberFields = [
      "desired_income",
      "estimated_savings",
      "estimated_home_equity",
      "home_spend_monthly",
      "abroad_budget_season",
    ];

    // Process nested number fields
    Object.keys(submitData).forEach((category) => {
      const categoryData = submitData[category as keyof FormState] as any;
      if (typeof categoryData === "object" && categoryData !== null) {
        numberFields.forEach((field) => {
          if (categoryData[field]) {
            categoryData[field] = parseCommaNumber(categoryData[field]);
          }
        });
      }
    });

    const res = await addRetirementPlan(submitData);
    if (res?.error) return;

    toast.success(
      "Form submitted successfully. A member of RetireHow Team will contact you.",
      { autoClose: 15000 }
    );
    // Reset form - FIXED: Proper type matching
    // setForm({
    //   contact: {
    //     full_name: "",
    //     phone: "",
    //     email: "",
    //   },
    //   retirement_snapshot: {},
    //   housing_equity: {},
    //   dollarfar_planning: {
    //     subscription_status: "",
    //     interpretation_toggle: false,
    //   },
    //   travel_planning: {},
    //   budget_estimates: {},
    //   travel_purpose: [], // FIXED: Changed from {} to []
    //   privacy_acknowledgements: {},
    // });
  };

  return (
    <Elements stripe={stripePromise}>
      {paymentOpen && (
        <PaymentModal
          open={paymentOpen}
          onClose={() => setPaymentOpen(false)}
          onPaid={onPaymentSuccess}
          contactInfo={form.contact}
          setIsSubscribeClicked={setIsSubscribeClicked}
        />
      )}

      {/* Page Hero Section  */}
      <section
        className="bg-black text-white md:px-[5rem] px-[2rem] py-[2.5rem] space-y-[1.5rem] relative"
        data-html2canvas-ignore
      >
        <Link to="/retirement-simulator">
          <button className="flex items-center gap-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] px-[1.5rem] py-[0.5rem] md:text-[18px] text-[14px] font-bold">
            <img className="md:w-auto w-[20px]" src={assets.leftArrow} alt="" />
            <span>Back</span>
          </button>
        </Link>
        <h3 className="md:text-[28px] text-[23px] font-extrabold dark:text-darkModeHeadingTextColor">
          Ready to explore your next step?
        </h3>
        <p className="md:text-[20px] text-[#DADADA] dark:text-darkModeNormalTextColor md:leading-[35px] leading-[27px] md:mr-[8rem]">
          Complete the short form below to share your retirement vision, and
          we'll create a personalized roadmap to optimize your finances, explore
          global living opportunities, and achieve your ideal lifestyle —
          whether staying local or going abroad.
        </p>
        <div className="absolute bottom-0 right-0 flex justify-end">
          <img
            className="md:w-auto w-[80px]"
            src={assets.compoundInterestCalcIcon}
            alt=""
          />
        </div>
      </section>

      <main className="mx-auto max-w-4xl md:p-6 p-3">
        <section className="rounded-2xl bg-white md:p-6 p-3 shadow-lg border border-gray-300">
          <form
            id="df-retire-form"
            onSubmit={handleSubmit}
            className="md:space-y-12 space-y-10"
          >
            {/* SECTION A: Contact Information */}
            <div className="border-l-4 border-gray-800 pl-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                A. Contact Information
              </h2>
              <p className="mb-4 text-sm text-gray-700">
                Basic details so we can reach you with your personalized plan
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact.full_name"
                    className="block font-semibold mb-2 text-gray-800"
                  >
                    <div className="flex justify-between items-center">
                      <p>
                        Full Name
                        <RedStar />
                      </p>
                      {showError && !form.contact.full_name && (
                        <p className="text-red-500 font-bold md:text-[1rem] text-sm">
                          Required*
                        </p>
                      )}
                    </div>
                  </label>
                  <input
                    id="contact.full_name"
                    name="contact.full_name"
                    type="text"
                    minLength={2}
                    maxLength={80}
                    value={getFieldValue("contact", "full_name")}
                    onChange={handleChange}
                    autoComplete="name"
                    placeholder="Enter your full name"
                    className="w-full rounded-2xl border border-gray-400 px-4 py-3 focus:border-gray-700 focus:ring-2 focus:ring-gray-200 transition-colors"
                  />
                  <small className="block text-gray-600 mt-1">
                    Why we ask: So we can address you properly in your
                    personalized plan.
                  </small>
                </div>

                <div>
                  <label
                    htmlFor="contact.phone"
                    className="block font-semibold mb-2 text-gray-800"
                  >
                    <div className="flex justify-between items-center">
                      <p>
                        Phone
                        <RedStar />
                      </p>
                      {showError && !form.contact.phone && (
                        <p className="text-red-500 font-bold md:text-[1rem] text-sm">
                          Required*
                        </p>
                      )}
                      {showError &&
                        form.contact.phone &&
                        !phoneReg.test(form.contact.phone) && (
                          <p className="text-red-500 font-bold md:text-[1rem] text-sm">
                            Required a valid phone number!
                          </p>
                        )}
                    </div>
                  </label>
                  <input
                    id="contact.phone"
                    name="contact.phone"
                    type="tel"
                    inputMode="tel"
                    value={getFieldValue("contact", "phone")}
                    onChange={handleChange}
                    autoComplete="tel"
                    placeholder="e.g., +15551234567"
                    className="w-full rounded-2xl border border-gray-400 px-4 py-3 focus:border-gray-700 focus:ring-2 focus:ring-gray-200 transition-colors"
                  />
                  <small className="block text-gray-600 mt-1">
                    Why we ask: We'll need a reliable number to coordinate
                    details and confirm preferences quickly.
                  </small>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact.email"
                    className="block font-semibold mb-2 text-gray-800"
                  >
                    <div className="flex justify-between items-center">
                      <p>
                        Email
                        <RedStar />
                      </p>
                      {showError && !form.contact.email && (
                        <p className="text-red-500 font-bold md:text-[1rem] text-sm">
                          Required*
                        </p>
                      )}
                      {showError &&
                        form.contact.email &&
                        !emailReg.test(form.contact.email) && (
                          <p className="text-red-500 font-bold md:text-[1rem] text-sm">
                            Required a valid email!
                          </p>
                        )}
                    </div>
                  </label>
                  <input
                    id="contact.email"
                    name="contact.email"
                    type="email"
                    autoComplete="email"
                    value={getFieldValue("contact", "email")}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full rounded-2xl border border-gray-400 px-4 py-3 focus:border-gray-700 focus:ring-2 focus:ring-gray-200 transition-colors"
                  />
                  <small className="block text-gray-600 mt-1">
                    Why we ask: To deliver your summary and follow ups.
                  </small>
                </div>

                <div>
                  <label
                    htmlFor="contact.region"
                    className="block font-semibold mb-2 text-gray-800"
                  >
                    Province/State of residence
                  </label>
                  <input
                    id="contact.region"
                    name="contact.region"
                    type="text"
                    minLength={2}
                    maxLength={60}
                    value={getFieldValue("contact", "region")}
                    onChange={handleChange}
                    placeholder="Enter your province or state"
                    className="w-full rounded-2xl border border-gray-400 px-4 py-3 focus:border-gray-700 focus:ring-2 focus:ring-gray-200 transition-colors"
                  />
                  <small className="block text-gray-600 mt-1">
                    Why we ask: Benefits/taxes and travel rules may vary by
                    region.
                  </small>
                </div>
              </div>
            </div>

            {/* SECTION B: Retirement Snapshot */}
            <div className="border-l-4 border-gray-700 pl-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                B. Retirement Snapshot
              </h2>
              <p className="mb-4 text-sm text-gray-700">
                Help us understand your retirement goals and current financial
                picture
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="retirement_snapshot.target_age"
                    className="block font-semibold mb-2 text-gray-800"
                  >
                    Target retirement age
                  </label>
                  <input
                    id="retirement_snapshot.target_age"
                    name="retirement_snapshot.target_age"
                    type="number"
                    min={35}
                    max={95}
                    value={getFieldValue("retirement_snapshot", "target_age")}
                    onChange={handleChange}
                    placeholder="Enter target retirement age, e.g., 65"
                    className="w-full rounded-2xl border border-gray-400 px-4 py-3 focus:border-gray-700 focus:ring-2 focus:ring-gray-200 transition-colors"
                  />
                  <small className="block text-gray-600 mt-1">
                    Why we ask: Timing affects benefits, drawdown order, and
                    travel windows.
                  </small>
                </div>

                <div>
                  <label
                    htmlFor="retirement_snapshot.desired_income"
                    className="block font-semibold mb-2 text-gray-800"
                  >
                    Desired annual retirement income (local currency)
                  </label>
                  <input
                    id="retirement_snapshot.desired_income"
                    name="retirement_snapshot.desired_income"
                    type="text"
                    value={getFieldValue(
                      "retirement_snapshot",
                      "desired_income"
                    )}
                    onChange={handleChange}
                    placeholder="Enter desired annual income, e.g., 60,000"
                    className="w-full rounded-2xl border border-gray-400 px-4 py-3 focus:border-gray-700 focus:ring-2 focus:ring-gray-200 transition-colors"
                  />
                  <small className="block text-gray-600 mt-1">
                    Why we ask: Sets your lifestyle target so we can compare
                    home vs. abroad.
                  </small>
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="retirement_snapshot.estimated_savings"
                  className="block font-semibold mb-2 text-gray-800"
                >
                  Estimated total savings and investments
                </label>
                <small className="block text-gray-600 mb-2">
                  💬 Include everything you've set aside for retirement —
                  investments, savings, or deposits, whether registered,
                  non-registered, or held abroad.
                </small>
                <input
                  id="retirement_snapshot.estimated_savings"
                  name="retirement_snapshot.estimated_savings"
                  type="text"
                  value={getFieldValue(
                    "retirement_snapshot",
                    "estimated_savings"
                  )}
                  onChange={handleChange}
                  placeholder="Enter total savings amount, e.g., 500,000"
                  className="w-full rounded-2xl border border-gray-400 px-4 py-3 focus:border-gray-700 focus:ring-2 focus:ring-gray-200 transition-colors"
                />
                <small className="block text-gray-600 mt-1">
                  Why we ask: A rough picture helps us size safe withdrawal
                  rates and gaps.
                </small>
              </div>
            </div>

            {/* SECTION C: Housing & Real Estate Equity */}
            <div className="border-l-4 border-gray-600 pl-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                C. Housing & Real Estate Equity
              </h2>
              <p className="mb-4 text-sm text-gray-700">
                Understanding your housing situation helps us explore all
                financial options
              </p>

              <div>
                <label
                  htmlFor="housing_equity.estimated_home_equity"
                  className="block font-semibold mb-2 text-gray-800"
                >
                  Estimated home equity (net value of real estate)
                </label>
                <input
                  id="housing_equity.estimated_home_equity"
                  name="housing_equity.estimated_home_equity"
                  type="text"
                  value={getFieldValue(
                    "housing_equity",
                    "estimated_home_equity"
                  )}
                  onChange={handleChange}
                  placeholder="Enter home equity amount, e.g., 300,000"
                  className="w-full rounded-2xl border border-gray-400 px-4 py-3 focus:border-gray-700 focus:ring-2 focus:ring-gray-200 transition-colors"
                />
                <small className="block text-gray-600 mt-1">
                  Why we ask: Renters can leave this blank; for homeowners, an
                  estimate of net equity (value minus debt) helps us understand
                  flexibility and retirement optionality.
                </small>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="housing_equity.equity_comfort"
                  className="block font-semibold mb-2 text-gray-800"
                >
                  Comfort with tapping home equity as a last resort (or to
                  enhance travel in active years)?
                </label>
                <select
                  id="housing_equity.equity_comfort"
                  name="housing_equity.equity_comfort"
                  value={
                    getFieldValue("housing_equity", "equity_comfort") ?? "open"
                  }
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-400 px-4 py-3 focus:border-gray-700 focus:ring-2 focus:ring-gray-200 transition-colors cursor-pointer"
                >
                  <option value="">Select...</option>
                  <option value="Open to discuss">Open to discuss</option>
                  <option value="Comfortable within limits">
                    Comfortable within limits
                  </option>
                  <option value="Not comfortable">Not comfortable</option>
                </select>
                <small className="block text-gray-600 mt-1">
                  Why we ask: Some clients prefer to preserve home equity;
                  others use a limited portion to fund experiences or cover
                  gaps.
                </small>
              </div>
            </div>

            {/* SECTION D: DollarFar — Pre-Retirement Planning */}
            <div className="border-l-4 border-gray-500 pl-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                D. DollarFar — Pre-Retirement Planning
              </h2>
              <p className="mb-4 text-sm text-gray-700">
                Explore our free calculators and optional guided interpretation
                services
              </p>

              <div className="mb-3 flex items-center justify-between rounded-lg border border-gray-400 bg-gray-50 p-3">
                <div className="flex items-center gap-3">
                  <span className="inline-block h-3 w-3 rounded-full bg-gray-700" />
                  <span className="font-bold text-gray-900">
                    DollarFar — Pre-Retirement Planning
                  </span>
                </div>
                <a
                  href="https://DollarFar.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-gray-500 px-3 py-1 text-sm font-semibold text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  Visit DollarFar
                </a>
              </div>

              <p className="mb-3 text-sm text-gray-700">
                Together, DollarFar's six free calculators turn scattered
                numbers into clarity — revealing how long savings last, where
                money goes further, and how lifestyle choices shape retirement.
                For those who want deeper insight, guided interpretation
                connects the dots and turns data into confident decisions.
              </p>

              <label className="mb-2 block font-bold text-gray-900">
                Choose Calculators (optional)
              </label>

              {/* calculators (multi) */}
              <div className="grid gap-2 md:grid-cols-2">
                {[
                  {
                    label: "Net Worth",
                    value: "Net Worth",
                    tip: "Snapshot of everything you own and owe — across personal, business, and real estate — to anchor all planning decisions.",
                  },
                  {
                    label: "Budget & Cashflow",
                    value: "Budget & Cashflow",
                    tip: "Tracks income and spending; separates essentials from discretionary and shows how long your cashflow supports your lifestyle.",
                  },
                  {
                    label: "Cost-of-Living Comparison",
                    value: "Cost-of-Living Comparison",
                    tip: "Compares your current city with lower-cost alternatives to reveal how far your dollars go in each location.",
                  },
                  {
                    label: "Retirement Money Stretch",
                    value: "Retirement Money Stretch",
                    tip: "Displays how long your financial portfolio can be stretched by choosing a seasonal-living geography with a weaker currency.",
                  },
                  {
                    label: "Retirement Simulator",
                    value: "Retirement Simulator",
                    tip: "Built to help retirees take control of their future and inform their decisions in less than 60 seconds.",
                  },
                  {
                    label: "Real Estate Equity Access",
                    value: "Real Estate Equity Access",
                    tip: "Shows how home equity can support lifestyle through a HELOC or a Reverse Mortgage.",
                  },
                  {
                    label: "Cost Escape™ Toolkit",
                    value: "Cost Escape™ Toolkit",
                    tip: "Guides the Cost Escape™ approach: test seasonal living in warmer, lower-cost regions to extend savings.",
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-start gap-3 rounded-xl border border-gray-300 bg-white p-3 hover:border-gray-500 transition-colors select-none cursor-pointer"
                  >
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: "#000",
                          colorBorder: "#808080",
                        },
                      }}
                    >
                      <Checkbox
                        name="dollarfar_planning.calculators"
                        value={option.value}
                        checked={getArrayFieldIncludes(
                          "dollarfar_planning",
                          "calculators",
                          option.value
                        )}
                        onChange={handleCheckboxChange}
                      />
                    </ConfigProvider>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {option.value}
                      </div>
                      <div className="text-sm text-gray-600">{option.tip}</div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Guided Sessions / Subscription (Optional) */}
              <div className="mt-6 rounded-xl border border-gray-400 bg-white p-4">
                <div className="mb-2 text-xl font-bold text-gray-900">
                  Request Human Interpretation
                </div>
                <p className="mb-3 text-sm text-gray-700">
                  Have a specialist walk through results with you.
                </p>

                <label className="mb-3 flex items-center justify-between rounded-xl border border-gray-400 hover:border-gray-600 duration-300 p-3 font-bold select-none cursor-pointer">
                  <span className="text-gray-700">
                    Enable Interpretation Services
                  </span>
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "#000",
                        colorBorder: "#808080",
                      },
                    }}
                  >
                    <Checkbox
                      name="dollarfar_planning.interpretation_toggle"
                      checked={
                        getFieldValue(
                          "dollarfar_planning",
                          "interpretation_toggle"
                        ) || false
                      }
                      onChange={handleCheckboxChange}
                    />
                  </ConfigProvider>
                </label>

                {/* Interpretation fields - only show if enabled */}
                {getFieldValue(
                  "dollarfar_planning",
                  "interpretation_toggle"
                ) && (
                  <div className="mb-3">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                      <p className="text-gray-800 text-sm font-bold">
                        📞 We'll contact you using the information provided in
                        Section A
                      </p>
                      <div className="mt-2 text-sm text-gray-700 space-y-2">
                        <p>
                          <strong>Name:</strong> {form.contact.full_name}
                        </p>
                        <p>
                          <strong>Email:</strong> {form.contact.email}
                        </p>
                        <p>
                          <strong>Phone:</strong> {form.contact.phone}
                        </p>
                      </div>
                    </div>

                    {/* Only show preferred time field */}
                    <div>
                      <label className="mb-2 block font-semibold text-gray-800">
                        Preferred Consultation Time
                      </label>
                      <input
                        type="text"
                        name="dollarfar_planning.time_pre"
                        value={getFieldValue("dollarfar_planning", "time_pre")}
                        onChange={handleChange}
                        placeholder="e.g., Weekday mornings, Tuesday afternoons"
                        className="w-full rounded-2xl border border-gray-400 px-4 py-3 focus:border-gray-700 focus:ring-2 focus:ring-gray-200 transition-colors"
                      />
                      <small className="block text-gray-600 mt-1">
                        Let us know your preferred days/times for the
                        consultation
                      </small>
                    </div>
                  </div>
                )}

                {getFieldValue(
                  "dollarfar_planning",
                  "interpretation_toggle"
                ) && (
                  <div className="mb-3 space-y-3">
                    <input
                      type="hidden"
                      name="dollarfar_planning.subscription_status"
                      value={getFieldValue(
                        "dollarfar_planning",
                        "subscription_status"
                      )}
                    />
                    <div className="flex gap-3 flex-wrap">
                      <button
                        type="button"
                        onClick={onHaveSubscription}
                        className={`rounded-xl border px-3 py-2 font-semibold transition-colors ${
                          getFieldValue(
                            "dollarfar_planning",
                            "subscription_status"
                          ) === "have"
                            ? "border-green-600 bg-green-500 text-white"
                            : "border-gray-400 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        I have a subscription
                      </button>

                      <button
                        type="button"
                        onClick={onStartSubscription}
                        disabled={
                          getFieldValue(
                            "dollarfar_planning",
                            "subscription_status"
                          ) === "paid"
                        }
                        className={`rounded-xl border px-3 py-2 font-semibold transition-colors ${
                          getFieldValue(
                            "dollarfar_planning",
                            "subscription_status"
                          ) === "paid"
                            ? "border-green-600 bg-green-500 text-white"
                            : "border-gray-400 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {getFieldValue(
                          "dollarfar_planning",
                          "subscription_status"
                        ) === "paid"
                          ? "✓ Subscription Active — $199 CAD Paid"
                          : "Start subscription with this request — $199 CAD"}
                      </button>
                    </div>

                    {/* Display contact info missing error  */}
                    {form.dollarfar_planning.interpretation_toggle &&
                      isSubscribeClicked &&
                      (!form.contact.email ||
                        !form.contact.phone ||
                        !form.contact.full_name) && (
                        <p className="text-red-500">
                          Please fill in the contact info input fields first
                          before starting subscription.
                        </p>
                      )}

                    {/* Senior UI/UX Designed Warning Box */}
                    {getFieldValue(
                      "dollarfar_planning",
                      "subscription_status"
                    ) === "paid" && (
                      <div className="w-full mt-4">
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 shadow-sm">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center">
                                <svg
                                  className="w-5 h-w-5 text-amber-600"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-amber-800 mb-1">
                                Important: Complete Your Form Submission
                              </h4>
                              <p className="text-sm text-amber-700 leading-relaxed">
                                Your subscription is active, but{" "}
                                <strong>
                                  your consultation request is not yet submitted
                                </strong>
                                . Please complete and submit the entire form
                                below to schedule your sessions. Your payment
                                secures the subscription, but we need your full
                                details to proceed.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      {showError &&
                        form.dollarfar_planning.interpretation_toggle &&
                        form.dollarfar_planning.subscription_status !==
                          "have" &&
                        form.dollarfar_planning.subscription_status !==
                          "paid" && (
                          <p className="text-red-500">
                            Please select either have an existing subscription
                            or start a new one for interpretation services.
                          </p>
                        )}
                    </div>

                    <div className="ml-2 rounded-md border border-gray-400 px-3 py-2 font-bold text-gray-800 inline-block">
                      Support Subscription — $199 CAD{" "}
                      <span className="block text-xs font-normal text-gray-600">
                        (applicable tax is implied)
                      </span>
                    </div>
                  </div>
                )}

                {getFieldValue(
                  "dollarfar_planning",
                  "interpretation_toggle"
                ) && (
                  <ul className="ml-4 list-disc text-sm text-gray-600">
                    <li>
                      Pay-as-you-go: covers <strong>2 × 30-minute</strong>{" "}
                      online consultations.
                    </li>
                    <li>
                      Validity: use both sessions within{" "}
                      <strong>12 months</strong> of purchase.
                    </li>
                    <li>
                      No carry-forward: unused sessions do not roll over to the
                      next year.
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {/* SECTION E: Travel Planning — Book Now vs Future Interest */}
            <div className="border-l-4 border-gray-400 pl-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                E. Travel Planning — Book Now vs Future Interest
              </h2>
              <p className="mb-4 text-sm text-gray-700">
                Explore available destinations and express interest for future
                locations
              </p>

              <div className="rounded-xl border border-gray-400 bg-white p-4 mb-3">
                <div className="mb-2 text-xl font-bold text-gray-900">
                  Book Now — Vijayawada (Pilot 2026–2027)
                </div>
                <div className="mb-3 rounded-md bg-gray-50 p-3 font-semibold text-gray-800 border border-gray-300">
                  Available: On-ground concierge support in Vijayawada only
                  during the pilot.
                </div>

                <label className="mb-2 block font-semibold text-gray-800">
                  Months abroad per year
                </label>
                <select
                  name="travel_planning.months_abroad"
                  value={getFieldValue("travel_planning", "months_abroad")}
                  onChange={handleChange}
                  className="mb-2 w-full rounded-2xl border border-gray-400 px-4 py-3 focus:border-gray-700 focus:ring-2 focus:ring-gray-200 transition-colors cursor-pointer"
                >
                  <option value="">Select duration...</option>
                  <option value="1 month">1 month</option>
                  <option value="1–2 months">1–2 months</option>
                  <option value="2–3 months">2–3 months</option>
                  <option value="3–4 months">3–4 months</option>
                  <option value="4–5 months">4–5 months</option>
                </select>

                <label className="mb-2 block font-semibold text-gray-800">
                  Earliest start (season / year / month)
                </label>
                <input
                  name="travel_planning.start_timeline"
                  type="text"
                  placeholder="Enter start timeline, e.g., Winter 2026"
                  minLength={2}
                  maxLength={40}
                  value={getFieldValue("travel_planning", "start_timeline")}
                  onChange={handleChange}
                  className="mb-2 w-full rounded-2xl border border-gray-400 px-4 py-3 focus:border-gray-700 focus:ring-2 focus:ring-gray-200 transition-colors"
                />
                <small className="block text-gray-600 mb-2">
                  <strong>Bookings open January 2026</strong> for stays
                  beginning <strong>November 2026</strong> onward.
                </small>

                <label className="mb-2 block font-semibold text-gray-800">
                  Accommodation style
                </label>
                <select
                  name="travel_planning.travel_style"
                  value={getFieldValue("travel_planning", "travel_style")}
                  onChange={handleChange}
                  className="mb-2 w-full rounded-2xl border border-gray-400 px-4 py-3 focus:border-gray-700 focus:ring-2 focus:ring-gray-200 transition-colors cursor-pointer"
                >
                  <option value="">Select accommodation type...</option>
                  <option value="2-Bedroom Condo">2-Bedroom Condo</option>
                  <option value="3-Bedroom Condo">3-Bedroom Condo</option>
                  <option
                    value="4-Bedroom Villa (Large Family / Circle of Friends / Travel
                    Buddies)"
                  >
                    4-Bedroom Villa (Large Family / Circle of Friends / Travel
                    Buddies)
                  </option>
                </select>

                <label className="mb-2 block font-semibold text-gray-800">
                  Independent travel acknowledgement
                </label>
                <label className="flex items-start gap-3 select-none cursor-pointer">
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "#000",
                        colorBorder: "#808080",
                      },
                    }}
                  >
                    <Checkbox
                      name="travel_planning.independent_travel_ack"
                      checked={
                        getFieldValue(
                          "travel_planning",
                          "independent_travel_ack"
                        ) || false
                      }
                      onChange={handleCheckboxChange}
                    />
                  </ConfigProvider>
                  <span className="text-gray-700">
                    I can travel independently without mobility assistance. I
                    understand some destinations abroad may be less accessible
                    than in Canada, the USA, the UK, or Europe.
                  </span>
                </label>
                <small className="block text-gray-600 mt-1">
                  Ensures practical, safe options for you.
                </small>
              </div>

              <div className="rounded-xl border border-gray-400 bg-white p-4">
                <div className="mb-2 text-xl font-bold text-gray-900">
                  Future Hubs — Express Interest (Not Bookable Yet)
                </div>

                <label className="mb-2 block font-semibold text-gray-800">
                  Select location
                </label>
                <select
                  name="travel_planning.country_region_interest"
                  value={getFieldValue(
                    "travel_planning",
                    "country_region_interest"
                  )}
                  onChange={handleChange}
                  className="mb-2 w-full rounded-2xl border border-gray-400 px-4 py-3 focus:border-gray-700 focus:ring-2 focus:ring-gray-200 transition-colors cursor-pointer"
                >
                  <optgroup label="Book Now (Pilot 2026–2027)">
                    <option value="">Select a location...</option>
                    <option value="South India — Vijayawada">
                      South India — Vijayawada
                    </option>
                  </optgroup>
                  <optgroup label="Future Hubs (Interest Only)">
                    <option value="South India — Goa">South India — Goa</option>
                    <option value="South India — Kochi">
                      South India — Kochi
                    </option>
                    <option value="Portugal">Portugal</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Other">Other</option>
                  </optgroup>
                </select>
                <small className="block text-gray-600 mb-2">
                  Choose Vijayawada to book now, or other locations to express
                  interest for future Cost Escape™ hubs.
                </small>

                <label className="mb-2 block font-semibold text-gray-800">
                  City / area (interest)
                </label>
                <input
                  name="travel_planning.ideal_locations_interest"
                  type="text"
                  placeholder="Enter preferred cities or areas, e.g., Goa — Panaji, Lisbon, Mérida"
                  minLength={2}
                  maxLength={120}
                  value={getFieldValue(
                    "travel_planning",
                    "ideal_locations_interest"
                  )}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-400 px-4 py-3 focus:border-gray-700 focus:ring-2 focus:ring-gray-200 transition-colors"
                />
                <small className="block text-gray-600 mt-1">
                  Your interest helps us prioritize next hubs and early-access
                  invites.
                </small>
              </div>
            </div>

            {/* SECTION F: Budget Estimates */}
            <div className="border-l-4 border-gray-300 pl-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                F. Budget Estimates
              </h2>
              <p className="mb-4 text-sm text-gray-700">
                Help us understand your spending preferences and travel style
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-semibold text-gray-800">
                    Home-country monthly budget (estimate)
                  </label>
                  <input
                    name="budget_estimates.home_spend_monthly"
                    type="text"
                    value={getFieldValue(
                      "budget_estimates",
                      "home_spend_monthly"
                    )}
                    onChange={handleChange}
                    placeholder="Enter monthly home budget, e.g., 3,000"
                    className="w-full rounded-2xl border border-gray-400 px-4 py-3 focus:border-gray-700 focus:ring-2 focus:ring-gray-200 transition-colors"
                  />
                  <small className="block text-gray-600 mt-1">
                    Why we ask: Baseline to compare vs. abroad.
                  </small>
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-gray-800">
                    Abroad monthly budget (estimate)
                  </label>
                  <input
                    name="budget_estimates.abroad_budget_season"
                    type="text"
                    value={getFieldValue(
                      "budget_estimates",
                      "abroad_budget_season"
                    )}
                    onChange={handleChange}
                    placeholder="Enter monthly abroad budget, e.g., 2,000"
                    className="w-full rounded-2xl border border-gray-400 px-4 py-3 focus:border-gray-700 focus:ring-2 focus:ring-gray-200 transition-colors"
                  />
                  <small className="block text-gray-600 mt-1">
                    Why we ask: Helps right-size destinations and accommodation
                    type.
                  </small>
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 block font-semibold text-gray-800">
                  Typical flight & insurance budget (open input)
                </label>
                <input
                  name="budget_estimates.flights_insurance_budget"
                  type="text"
                  placeholder="Enter flight and insurance budget, e.g., $1,500 economy / $4,000 premium economy / $7,000 business (round trip)"
                  value={getFieldValue(
                    "budget_estimates",
                    "flights_insurance_budget"
                  )}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-400 px-4 py-3 focus:border-gray-700 focus:ring-2 focus:ring-gray-200 transition-colors"
                />
                <small className="block text-gray-600 mt-1">
                  Why we ask: Costs vary widely; free-form lets you enter ranges
                  or notes.
                </small>
              </div>

              <div className="mt-4">
                <label className="mb-2 block font-semibold text-gray-800">
                  Preferred flight class
                </label>
                <select
                  name="budget_estimates.flight_class"
                  value={getFieldValue("budget_estimates", "flight_class")}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-400 px-4 py-3 focus:border-gray-700 focus:ring-2 focus:ring-gray-200 transition-colors cursor-pointer"
                >
                  <option value="">Select flight class...</option>
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Business">Business</option>
                  <option value="First">First</option>
                </select>
                <small className="block text-gray-600 mt-1">
                  Why we ask: Class of travel affects airfare budgets
                  substantially.
                </small>
              </div>
            </div>

            {/* SECTION G: Purpose of Travel */}
            <div className="border-l-4 border-gray-200 pl-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                G. Purpose of Travel
              </h2>
              <p className="mb-4 text-sm text-gray-700">
                Select all that apply to help us understand your travel
                motivations
              </p>

              <div className="grid gap-2">
                {[
                  {
                    label: "Escape winter",
                    value: "Escape winter",
                    t: "Escape winter",
                  },
                  {
                    label: "Explore other cultures and immersive global living",
                    value: "Explore other cultures and immersive global living",
                    t: "Explore other cultures and immersive global living",
                  },
                  {
                    label: "Reduce cost of living",
                    value: "Reduce cost of living",
                    t: "Reduce cost of living",
                  },
                  {
                    label: "Travel on budget",
                    value: "Travel on budget",
                    t: "Travel on budget",
                  },
                  {
                    label: "Stretch my dollars further",
                    value: "Stretch my dollars further",
                    t: "Stretch my dollars further",
                  },
                  {
                    label: "Leisure travel",
                    value: "Leisure travel",
                    t: "Leisure travel",
                  },
                  {
                    label: "Medical tourism",
                    value: "Medical tourism",
                    t: "Medical tourism",
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-300 transition-colors select-none cursor-pointer"
                  >
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: "#000",
                          colorBorder: "#808080",
                        },
                      }}
                    >
                      <Checkbox
                        name="travel_purpose"
                        value={option.value}
                        checked={isTravelPurposeSelected(option.value)}
                        onChange={handleCheckboxChange}
                      />
                    </ConfigProvider>
                    <span className="text-gray-700">{option.t}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* SECTION H: Privacy & Pricing */}
            <div className="border-l-4 border-gray-100 pl-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                H. Privacy & Pricing
              </h2>
              <p className="mb-4 text-sm text-gray-700">
                Final acknowledgements and consent
              </p>

              <div className="rounded-lg bg-gray-50 p-4 mb-4 border border-gray-300">
                <p className="text-sm text-gray-700">
                  <strong>Transparency first.</strong> We collect{" "}
                  <strong>estimates only</strong> — no account statements. When
                  you ask us to coordinate, we work only with{" "}
                  <strong>vetted local partners</strong> — including housing,
                  concierge support, transport, and curated experiences.
                  <br />
                  <br />
                  <strong>Our products include:</strong>
                  <br />• Concierge support —{" "}
                  <strong>airport pickup and arrival assistance</strong>,
                  SIM/Wi-Fi setup, local orientation, and vetted household
                  helpers.
                  <br />
                  • Housing coordination — matched to your comfort level and
                  budget.
                  <br />
                  • Optional curated cultural experiences and short-haul
                  getaways.
                  <br />• <em>Luxury packages</em> include a dedicated{" "}
                  <strong>Car &amp; Driver</strong> service.
                  <br />
                  <br />
                  <em>
                    (RetireHow does not coordinate visas, insurance, medical, or
                    legal matters. Our focus is on comfort, connection, and
                    on-ground lifestyle support.)
                  </em>
                </p>
              </div>

              <div className="grid gap-3">
                <label className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-400 hover:border-gray-600 transition-colors select-none cursor-pointer">
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "#000",
                        colorBorder: "#808080",
                      },
                    }}
                  >
                    <Checkbox
                      name="privacy_acknowledgements.ack_poc"
                      checked={
                        getFieldValue("privacy_acknowledgements", "ack_poc") ||
                        false
                      }
                      onChange={handleCheckboxChange}
                    />
                  </ConfigProvider>
                  <span className="text-gray-700">
                    I acknowledge that during the proof-of-concept stage, I will
                    only pay actual vendor costs and agree to share feedback on
                    my experience.
                  </span>
                </label>

                <label className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-400 hover:border-gray-600 transition-colors select-none cursor-pointer">
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "#000",
                        colorBorder: "#808080",
                      },
                    }}
                  >
                    <Checkbox
                      name="privacy_acknowledgements.consent_contact"
                      checked={
                        getFieldValue(
                          "privacy_acknowledgements",
                          "consent_contact"
                        ) || false
                      }
                      onChange={handleCheckboxChange}
                    />
                  </ConfigProvider>
                  <span className="text-gray-700">
                    I would like to be contacted by RetireHow Inc. to discuss my
                    submission.
                  </span>
                </label>

                <label className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-400 hover:border-gray-600 transition-colors select-none cursor-pointer">
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "#000",
                        colorBorder: "#808080",
                      },
                    }}
                  >
                    <Checkbox
                      name="privacy_acknowledgements.ack_scope"
                      checked={
                        getFieldValue(
                          "privacy_acknowledgements",
                          "ack_scope"
                        ) || false
                      }
                      onChange={handleCheckboxChange}
                    />
                  </ConfigProvider>
                  <span className="text-gray-700">
                    I understand that RetireHow and DollarFar provide lifestyle
                    optimization, cost-management, and travel-planning guidance
                    — not investment or financial advice.
                  </span>
                </label>
              </div>
              {showError &&
                (!form.privacy_acknowledgements.ack_poc ||
                  !form.privacy_acknowledgements.ack_scope ||
                  !form.privacy_acknowledgements.consent_contact) && (
                  <p className="text-red-500 my-3 font-bold">
                    Please check all the Privacy & Pricing checkboxes above.
                  </p>
                )}
            </div>

            {/* Submit Section */}
            <div className="text-center">
              <button
                type="submit"
                disabled={submitting}
                className="w-full max-w-md rounded-full bg-gray-900 hover:bg-black px-6 py-4 text-lg font-semibold text-white disabled:opacity-60 transition-colors shadow-lg"
              >
                {submitting ? "Submitting..." : "Submit & Request My Plan"}
              </button>

              <div className="mt-4 border-t border-gray-300 pt-4 text-center text-lg text-gray-600">
                DollarFar.com is provided by{" "}
                <strong className="text-gray-800">RetireHow Inc.</strong> as
                part of our commitment to bring financial know-how to everyone.
                A member of the{" "}
                <strong className="text-gray-800">RetireHow</strong> team will
                contact you directly after submission.
              </div>
            </div>
          </form>
        </section>
      </main>
    </Elements>
  );
}
