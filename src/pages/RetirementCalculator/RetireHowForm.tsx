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
import { ArrowBigRight } from "lucide-react";
import { useGetSingleConsultationSubscriptionQuery } from "../../redux/features/APIEndpoints/consultationSubscriptionApi/consultationSubscription";
import { useBookConsultationSessoinMutation } from "../../redux/features/APIEndpoints/consultationSessionApi/consultationSessionApi";
import moment from "moment";
import { Icon } from "@iconify/react/dist/iconify.js";

// const STRIPE_LIVE_SECRET_KEY =
//   "pk_live_51RplAhBYC7YMMAFC7uODsfkBdTVL0v5Qhq5EOZ0MryrKf9P74f2l2zXjTS9i6kQXMGpPFvGMJD4ttj20WMHZH9CX004Xd966hu";
const STRIPE_TEST_SECRET_KEY =
  "pk_test_51RppIt4G0lMbEIGhQ3ltvcDSaNOOZaRalURZRSahGnm2EUCDMPU14eTNz9FiTodU9TV3hQhxzM8cMZVQeaMJXR4L00aUu5KTyR";

const stripePromise = loadStripe(STRIPE_TEST_SECRET_KEY);

/**
 * Organized Form State Types by Category
 */
type ContactInfo = {
  name: string;
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
  consultation_time: string;
  payment_status?: "" | "start" | "paid";
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
  travel_purposes: string[];
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

// Add this polling function
const pollForPaymentData = async (
  email: string,
  maxAttempts = 10
): Promise<any> => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const res = await fetch(
        `${baseUrl}/consultation-subscription/user/${email}`
      );

      if (res.status === 200) {
        const data = await res.json();
        if (data?.data) {
          return data.data;
        }
      }

      // Wait 2 seconds before next attempt
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Polling attempt ${attempt + 1} failed:`, error);
    }
  }

  throw new Error("Payment data not found in database after multiple attempts");
};
/**
 * PaymentModal uses Stripe hooks - must be wrapped in Elements
 */
function PaymentModalComponent({
  open,
  onClose,
  onPaid,
  contactInfo,
}: {
  open: boolean;
  onClose: () => void;
  onPaid: (paymentIntentId: string) => void;
  contactInfo: ContactInfo;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  if (!contactInfo.name || !contactInfo.email || !contactInfo.phone) {
    onClose();
    toast.error(
      "Please provide the required contact informations before start subscription!",
      { autoClose: 15000 }
    );
    return null;
  }

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
        `${baseUrl}/consultation-subscription/payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactInfo),
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
        // Wait for webhook to store payment in DB
        const paymentData = await pollForPaymentData(contactInfo.email);
        console.log("🎉 Payment fully processed:", paymentData);
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
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-2xl border border-gray-300 dark:border-gray-600">
        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
          Complete Subscription
        </h3>
        <p className="mb-4 text-md text-gray-700 dark:text-gray-300">
          Your plan includes two 30-minute consultations within 12 months.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 rounded-lg border border-gray-400 dark:border-gray-500 p-3 hover:border-gray-600 dark:hover:border-gray-400 transition-colors bg-white dark:bg-gray-700">
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
            <div className="mb-3 text-center text-md text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 py-2 px-3 rounded-lg border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              className="rounded-xl bg-gray-900 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-600 px-4 py-3 text-white font-semibold disabled:opacity-60 transition-colors shadow-md"
              type="submit"
              disabled={loading || !stripe}
            >
              {loading ? "Processing..." : "Pay $199 CAD"}
            </button>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-gray-400 dark:border-gray-500 hover:border-gray-600 dark:hover:border-gray-400 px-4 py-3 font-semibold text-gray-800 dark:text-gray-200 disabled:opacity-60 transition-colors bg-white dark:bg-gray-700"
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
}) => (
  <Elements stripe={stripePromise}>
    <PaymentModalComponent {...props} />
  </Elements>
);

/**
 * Main form component
 */
export default function RetireHowForm(): JSX.Element {
  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, []);
  const [form, setForm] = useState<FormState>({
    contact: {
      name: "",
      phone: "",
      email: "",
    },
    retirement_snapshot: {},
    housing_equity: {},
    dollarfar_planning: {
      payment_status: "",
      consultation_time: "",
    },
    travel_planning: {},
    budget_estimates: {},
    travel_purposes: [], // FIXED: Changed from {} to []
    privacy_acknowledgements: {},
  });

  const [paymentOpen, setPaymentOpen] = useState(false);
  const [showError, setShowError] = useState(false);

  // ===========================================|| RTK Query ||==============================================
  const [addRetirementPlan, { isLoading: submitting, isError, error }] =
    useAddRetirementPlanMutation();

  const {
    data,
    isLoading: isLoadingSubscription,
    refetch: refetchSubscription,
  } = useGetSingleConsultationSubscriptionQuery(form.contact.email, {
    refetchOnMountOrArgChange: true,
    skip: !form.dollarfar_planning.interpretation_toggle,
  });

  const [
    bookConsultationSession,
    {
      isLoading: isBookingSession,
      isError: isBookingError,
      error: bookingError,
    },
  ] = useBookConsultationSessoinMutation();

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
  const handleCheckboxChange = async (
    e: React.ChangeEvent<HTMLInputElement> | CheckboxChangeEvent
  ) => {
    const { name, value, checked } = e.target as {
      name: string;
      value: string;
      checked: boolean;
    };

    // Validate Interpretation Eable Button
    if (
      name === "dollarfar_planning.interpretation_toggle" &&
      checked &&
      (!form.contact.name || !form.contact.email || !form.contact.phone)
    ) {
      return toast.error(
        "Oops! Please fill in the required fields in the Contact Information section above to enable this service!",
        { autoClose: 30000 }
      );
    }

    // Extract category and field name
    const [category, fieldName] = name.includes(".")
      ? name.split(".")
      : [null, name];

    // Handle travel_purposes (direct array)
    if (name === "travel_purposes") {
      setForm((prev) => ({
        ...prev,
        travel_purposes: checked
          ? [...prev.travel_purposes, value]
          : prev.travel_purposes.filter((item) => item !== value),
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
              consultation_time: "",
            },
          }));
        }
      }
      return;
    }
  };

  // Helper to check if travel purpose is selected
  const isTravelPurposeSelected = (value: string): boolean => {
    return form.travel_purposes.includes(value);
  };

  // When user clicks 'Start subscription' -> open payment modal
  const onStartSubscription = () => {
    setForm((prev) => ({
      ...prev,
      dollarfar_planning: {
        ...prev.dollarfar_planning,
        payment_status: "start",
      },
    }));
    setPaymentOpen(true);
  };

  // Called by PaymentModal when payment success
  const onPaymentSuccess = async (paymentIntentId: string) => {
    try {
      setForm((prev) => ({
        ...prev,
        dollarfar_planning: {
          ...prev.dollarfar_planning,
          payment_status: "paid",
          subscription_payment_intent: paymentIntentId,
        },
      }));
      setPaymentOpen(false);
      // Immediately refetch subscription data
      if (form.contact.email) {
        await refetchSubscription();
      }
      toast.success("Payment successful. You can now submit the main form.", {
        autoClose: 15000,
      });
    } catch (error) {
      console.error("❌ Failed to verify payment storage:", error);
      toast.error(
        "Payment processed but verification failed. Please contact support."
      );
    }
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

  useEffect(() => {
    if (isError && !submitting && error) {
      showApiErrorToast(error);
    }
  }, [submitting, isError, error]);

  useEffect(() => {
    if (!isBookingSession && isBookingError && bookingError) {
      showApiErrorToast(bookingError);
    }
  }, [isBookingSession, isBookingError, bookingError]);

  // final submit - parse comma numbers before sending
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate required contact fields
    if (!form.contact.name || !form.contact.phone || !form.contact.email) {
      setShowError(true);
      toast.error("Please provide all the required informations.");
      window.scrollTo({ top: 340, behavior: "smooth" });
      return;
    }

    if (!emailReg.test(form.contact.email)) {
      setShowError(true);
      toast.error("Please provide a valid email address!", {
        autoClose: 10000,
      });
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
      data?.data?.status !== "active"
    ) {
      toast.error("Please start subscription for interpretation services.");
      setShowError(true);
      return;
    }

    //Validate Preferred Consultation Time
    if (
      form.dollarfar_planning.interpretation_toggle &&
      !form.dollarfar_planning.consultation_time
    ) {
      toast.error("Please input your preferred consultation time.");
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

    // Call api conditionally
    const {
      contact,
      budget_estimates,
      housing_equity,
      privacy_acknowledgements,
      retirement_snapshot,
      travel_purposes,
      travel_planning,
      dollarfar_planning,
    } = form;
    if (
      form.dollarfar_planning.interpretation_toggle &&
      data?.data?.status === "active"
    ) {
      const subscription = data?.data?._id;
      const newSessionData = {
        subscription,
        contact,
        budget_estimates,
        housing_equity,
        privacy_acknowledgements,
        retirement_snapshot,
        travel_purposes,
        travel_planning,
        dollarfar_planning: {
          calculators: dollarfar_planning?.calculators,
          interpretation_toggle: true,
          consultation_time: dollarfar_planning?.consultation_time,
        },
      };

      const res = await bookConsultationSession(newSessionData);
      if (res?.error) return;
      toast.success(
        "Your consultation session is booked successfully. A member of RetireHow Team will contact you.",
        { autoClose: 15000 }
      );
    } else {
      const res = await addRetirementPlan(submitData);
      if (res?.error) return;
      toast.success(
        "Form submitted successfully. A member of RetireHow Team will contact you.",
        { autoClose: 15000 }
      );
    }

    // Reset form - FIXED: Proper type matching
    setForm({
      contact: {
        name: "",
        phone: "",
        email: "",
        region: "",
      },
      retirement_snapshot: {},
      housing_equity: {},
      dollarfar_planning: {
        payment_status: "",
        interpretation_toggle: false,
        consultation_time: "",
      },
      travel_planning: {},
      budget_estimates: {},
      travel_purposes: [],
      privacy_acknowledgements: {},
    });
  };

  const toggleErrorBorderColor = (value: string | boolean, field: string) => {
    if (field === "name") {
      return showError && !value
        ? "border-red-500 dark:border-red-400 border-[2px] outline-red-500 focus:ring-red-500"
        : "border-gray-400 dark:border-gray-500";
    } else if (field === "phone") {
      return showError && (!value || !phoneReg.test(value as string))
        ? "border-red-500 dark:border-red-400 border-[2px] outline-red-500 focus:ring-red-500"
        : "border-gray-400 dark:border-gray-500";
    } else if (field === "email") {
      return showError && (!value || !emailReg.test(value as string))
        ? "border-red-500 dark:border-red-400 border-[2px] outline-red-500 focus:ring-red-500"
        : "border-gray-400 dark:border-gray-500";
    } else if (field === "ack_scope") {
      return showError && !value
        ? "border-red-500 dark:border-red-400 border-[2px] outline-red-500 focus:ring-red-500"
        : "border-gray-400 dark:border-gray-500 hover:border-gray-600 dark:hover:border-gray-400";
    } else if (field === "consent_contact") {
      return showError && !value
        ? "border-red-500 dark:border-red-400 border-[2px] outline-red-500 focus:ring-red-500"
        : "border-gray-400 dark:border-gray-500 hover:border-gray-600 dark:hover:border-gray-400";
    } else if (field === "ack_poc") {
      return showError && !value
        ? "border-red-500 dark:border-red-400 border-[2px] outline-red-500 focus:ring-red-500"
        : "border-gray-400 dark:border-gray-500 hover:border-gray-600 dark:hover:border-gray-400";
    } else if (field === "consultation_time") {
      return showError && !value
        ? "border-red-500 dark:border-red-400 border-[2px] outline-red-500 focus:ring-red-500"
        : "border-gray-400 dark:border-gray-500 hover:border-gray-600 dark:hover:border-gray-400";
    }
  };

  return (
    <Elements stripe={stripePromise}>
      {paymentOpen && (
        <PaymentModal
          open={paymentOpen}
          onClose={() => setPaymentOpen(false)}
          onPaid={onPaymentSuccess}
          contactInfo={form.contact}
        />
      )}

      {/* Page Hero Section  */}
      <section
        className="bg-black dark:bg-gray-900 text-white md:px-[5rem] px-[2rem] py-[2.5rem] space-y-[1.5rem] relative"
        data-html2canvas-ignore
      >
        <Link to="/retirement-simulator">
          <button className="flex items-center gap-[1rem] border-[1px] border-[#EAECF0] dark:border-gray-600 rounded-[10px] px-[1.5rem] py-[0.5rem] md:text-[18px] text-[14px] font-bold text-white dark:text-gray-200 hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors">
            <img className="md:w-auto w-[20px]" src={assets.leftArrow} alt="" />
            <span>Back</span>
          </button>
        </Link>
        <h3 className="md:text-[28px] text-[23px] font-extrabold text-white dark:text-white">
          💡 Retirement Simulator Results
        </h3>
        <div className="space-y-3 md:text-[1.3rem] text-[1.1rem]">
          <p className="text-gray-300 dark:text-gray-300 md:mr-[8rem]">
            Instant insights tailored to your retirement readiness — and ways to
            make your plan go further.
          </p>
          <p className="text-gray-300 dark:text-gray-300 md:mr-[8rem]">
            👉 Ready to explore your next step? Complete the short form below
            and we’ll tailor a plan to maintain or elevate your lifestyle — at
            home or abroad.
          </p>
        </div>
        <div className="absolute bottom-0 right-0 flex justify-end">
          <img
            className="md:w-auto w-[80px]"
            src={assets.compoundInterestCalcIcon}
            alt=""
          />
        </div>
      </section>

      <main className="mx-auto max-w-6xl md:p-6 p-3">
        <section className="rounded-2xl bg-white dark:bg-gray-800 md:p-6 p-3 shadow-lg border border-gray-300 dark:border-gray-700">
          <form
            id="df-retire-form"
            onSubmit={handleSubmit}
            className="md:space-y-12 space-y-10"
          >
            {/* SECTION A: Contact Information */}
            <div className="border-l-4 border-gray-800 dark:border-gray-300 pl-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                A. Contact Information
              </h2>
              <p className="mb-4 text-md text-gray-700 dark:text-gray-300">
                Basic details so we can reach you with your personalized plan
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact.name"
                    className="block font-semibold mb-2 text-gray-800 dark:text-gray-200"
                  >
                    <div className="flex justify-between items-center">
                      <p>
                        Full Name
                        <RedStar />
                      </p>
                      {showError && !form.contact.name && (
                        <p className="text-red-500 dark:text-red-400 font-bold md:text-[1rem] text-md">
                          Required*
                        </p>
                      )}
                    </div>
                  </label>
                  <input
                    id="contact.name"
                    name="contact.name"
                    type="text"
                    minLength={2}
                    maxLength={80}
                    value={getFieldValue("contact", "name")}
                    onChange={handleChange}
                    autoComplete="name"
                    placeholder="Enter your full name"
                    className={`w-full rounded-2xl border px-4 py-3 focus:border-gray-700 dark:focus:border-gray-300 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${toggleErrorBorderColor(
                      form.contact.name,
                      "name"
                    )}`}
                  />
                  <p className="block text-gray-600 dark:text-gray-400 mt-1">
                    Why we ask: So we can address you properly in your
                    personalized plan.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="contact.phone"
                    className="block font-semibold mb-2 text-gray-800 dark:text-gray-200"
                  >
                    <div className="flex justify-between items-center">
                      <p>
                        Phone
                        <RedStar />
                      </p>
                      {showError && !form.contact.phone && (
                        <p className="text-red-500 dark:text-red-400 font-bold md:text-[1rem] text-md">
                          Required*
                        </p>
                      )}
                      {showError &&
                        form.contact.phone &&
                        !phoneReg.test(form.contact.phone) && (
                          <p className="text-red-500 dark:text-red-400 font-bold md:text-[1rem] text-md">
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
                    className={`w-full rounded-2xl border px-4 py-3 focus:border-gray-700 dark:focus:border-gray-300 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${toggleErrorBorderColor(
                      form.contact.phone,
                      "phone"
                    )}`}
                  />
                  <p className="block text-gray-600 dark:text-gray-400 mt-1">
                    Why we ask: We'll need a reliable number to coordinate
                    details and confirm preferences quickly.
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact.email"
                    className="block font-semibold mb-2 text-gray-800 dark:text-gray-200"
                  >
                    <div className="flex justify-between items-center">
                      <p>
                        Email
                        <RedStar />
                      </p>
                      {showError && !form.contact.email && (
                        <p className="text-red-500 dark:text-red-400 font-bold md:text-[1rem] text-md">
                          Required*
                        </p>
                      )}
                      {showError &&
                        form.contact.email &&
                        !emailReg.test(form.contact.email) && (
                          <p className="text-red-500 dark:text-red-400 font-bold md:text-[1rem] text-md">
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
                    className={`w-full rounded-2xl border px-4 py-3 focus:border-gray-700 dark:focus:border-gray-300 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${toggleErrorBorderColor(
                      form.contact.email,
                      "email"
                    )}`}
                  />
                  <p className="block text-gray-600 dark:text-gray-400 mt-1">
                    Why we ask: To deliver your summary and follow ups.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="contact.region"
                    className="block font-semibold mb-2 text-gray-800 dark:text-gray-200"
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
                    className="w-full rounded-2xl border border-gray-400 dark:border-gray-500 px-4 py-3 focus:border-gray-700 dark:focus:border-gray-300 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <p className="block text-gray-600 dark:text-gray-400 mt-1">
                    Why we ask: Benefits/taxes and travel rules may vary by
                    region.
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION B: Retirement Snapshot */}
            <div className="border-l-4 border-gray-700 dark:border-gray-400 pl-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                B. Retirement Snapshot
              </h2>
              <p className="mb-4 text-md text-gray-700 dark:text-gray-300">
                Help us understand your retirement goals and current financial
                picture
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="retirement_snapshot.target_age"
                    className="block font-semibold mb-2 text-gray-800 dark:text-gray-200"
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
                    className="w-full rounded-2xl border border-gray-400 dark:border-gray-500 px-4 py-3 focus:border-gray-700 dark:focus:border-gray-300 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <p className="block text-gray-600 dark:text-gray-400 mt-1">
                    Why we ask: Timing affects benefits, drawdown order, and
                    travel windows.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="retirement_snapshot.desired_income"
                    className="block font-semibold mb-2 text-gray-800 dark:text-gray-200"
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
                    className="w-full rounded-2xl border border-gray-400 dark:border-gray-500 px-4 py-3 focus:border-gray-700 dark:focus:border-gray-300 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <p className="block text-gray-600 dark:text-gray-400 mt-1">
                    Why we ask: Sets your lifestyle target so we can compare
                    home vs. abroad.
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="retirement_snapshot.estimated_savings"
                  className="block font-semibold mb-2 text-gray-800 dark:text-gray-200"
                >
                  Estimated total savings and investments (including registered
                  and non-registered money such as RRSPs, TFSAs, 401(k)s, SIPPs,
                  ISAs, FDs, CDs, GICs, or similar accounts)
                </label>
                <p className="block text-gray-600 dark:text-gray-400 mb-2">
                  💬 Include everything you've set aside for retirement —
                  investments, savings, or deposits, whether registered,
                  non-registered, or held abroad.
                </p>
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
                  className="w-full rounded-2xl border border-gray-400 dark:border-gray-500 px-4 py-3 focus:border-gray-700 dark:focus:border-gray-300 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <p className="block text-gray-600 dark:text-gray-400 mt-1">
                  Why we ask: A rough picture helps us size safe withdrawal
                  rates and gaps.
                </p>
              </div>
            </div>

            {/* SECTION C: Housing & Real Estate Equity */}
            <div className="border-l-4 border-gray-600 dark:border-gray-500 pl-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                C. Housing & Real Estate Equity
              </h2>
              <p className="mb-4 text-md text-gray-700 dark:text-gray-300">
                Understanding your housing situation helps us explore all
                financial options
              </p>

              <div>
                <label
                  htmlFor="housing_equity.estimated_home_equity"
                  className="block font-semibold mb-2 text-gray-800 dark:text-gray-200"
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
                  className="w-full rounded-2xl border border-gray-400 dark:border-gray-500 px-4 py-3 focus:border-gray-700 dark:focus:border-gray-300 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <p className="block text-gray-600 dark:text-gray-400 mt-1">
                  Why we ask: Renters can leave this blank; for homeowners, an
                  estimate of net equity (value minus debt) helps us understand
                  flexibility and retirement optionality.
                </p>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="housing_equity.equity_comfort"
                  className="block font-semibold mb-2 text-gray-800 dark:text-gray-200"
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
                  className="w-full rounded-2xl border border-gray-400 dark:border-gray-500 px-4 py-3 focus:border-gray-700 dark:focus:border-gray-300 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer"
                >
                  <option value="">Select...</option>
                  <option value="Open to discuss">Open to discuss</option>
                  <option value="Comfortable within limits">
                    Comfortable within limits
                  </option>
                  <option value="Not comfortable">Not comfortable</option>
                </select>
                <p className="block text-gray-600 dark:text-gray-400 mt-1">
                  Why we ask: Some clients prefer to preserve home equity;
                  others use a limited portion to fund experiences or cover
                  gaps.
                </p>
              </div>
            </div>

            {/* SECTION D: DollarFar — Pre-Retirement Planning */}
            <div className="border-l-4 border-gray-500 dark:border-gray-600 pl-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                D. DollarFar — Pre-Retirement Planning
              </h2>

              <div className="mb-3 flex items-center justify-between rounded-lg border border-gray-400 dark:border-gray-500 bg-gray-50 dark:bg-gray-700 p-3">
                <div className="flex items-center gap-3">
                  <span className="inline-block h-3 w-3 rounded-full bg-gray-700 dark:bg-gray-300" />
                  <span className="font-bold text-gray-900 dark:text-white">
                    DollarFar — Pre-Retirement Planning
                  </span>
                </div>
                <a
                  href="https://DollarFar.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-gray-500 dark:border-gray-400 px-3 py-1 text-md font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  Visit DollarFar
                </a>
              </div>

              <p className="mb-3 text-md text-gray-700 dark:text-gray-300">
                Together, DollarFar's six free calculators turn scattered
                numbers into clarity — revealing how long savings last, where
                money goes further, and how lifestyle choices shape retirement.
                For those who want deeper insight, guided interpretation
                connects the dots and turns data into confident decisions.
              </p>

              <label className="mb-2 block font-bold text-gray-900 dark:text-white">
                Choose Calculators (optional)
              </label>

              {/* calculators (multi) */}
              <div className="grid gap-4 md:grid-cols-2">
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
                    tip: "Compares your current city with lower‑cost alternatives to reveal how far your dollars go in each location.",
                  },
                  {
                    label: "Retirement Money Stretch",
                    value: "Retirement Money Stretch",
                    tip: "Displays how long your financial portfolio can be stretched by choosing a seasonal‑living geography with a weaker currency — the currency translation effect acts like 'Cost Escape' or 'purchasing power' dividends that extend portfolio longevity without market risk.",
                  },
                  {
                    label: "Retirement Simulator",
                    value: "Retirement Simulator",
                    tip: "Built to help retirees take control of their future and inform their decisions in less than 60 seconds. Traditionally, a retirement plan can take hours to prepare — this simulator eliminates guesswork. Like a flight simulator trains pilots in a safe environment before flying, the Retirement Simulator lets retirees test financial outcomes safely before making real‑life decisions.",
                  },
                  {
                    label: "Real Estate Equity Access",
                    value: "Real Estate Equity Access",
                    tip: "Shows how home equity can support lifestyle through a HELOC or a Reverse Mortgage — letting you compare lifetime cost and the remaining equity at the end for each path.",
                  },
                  {
                    label: "Cost Escape™ Toolkit",
                    value: "Cost Escape™ Toolkit",
                    tip: "Guides the Cost Escape™ approach: test seasonal living in warmer, lower‑cost regions to extend savings without sacrificing comfort.",
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-start gap-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-3 hover:border-gray-500 dark:hover:border-gray-400 transition-colors select-none cursor-pointer"
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
                      <div className="font-semibold text-gray-800 dark:text-gray-200">
                        {option.value}
                      </div>
                      <div className="text-md text-gray-600 dark:text-gray-400">
                        {option.tip}
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Guided Sessions / Subscription (Optional) */}
              <div className="mt-6 rounded-xl border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 p-4">
                <div className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  Request Human Interpretation
                </div>
                <p className="mb-3 text-md text-gray-700 dark:text-gray-300">
                  Have a specialist walk through results with you.
                </p>

                <section className="space-y-5">
                  {/* Enable Interpretation Services  */}
                  <div>
                    <label className="flex items-center justify-between rounded-xl border border-green-400 hover:border-green-600 duration-300 p-3 font-bold select-none cursor-pointer bg-green-100 dark:bg-green-500">
                      <span className="text-gray-700 dark:text-white">
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
                  </div>

                  {getFieldValue(
                    "dollarfar_planning",
                    "interpretation_toggle"
                  ) && (
                    <>
                      <div>
                        <p className="text-gray-800 dark:text-gray-200 text-md font-bold flex items-center gap-1">
                          <ArrowBigRight className="text-green-500" size={25} />
                          We'll contact you using the information provided in
                          Section A
                        </p>
                      </div>
                      {/* Consultion Preference Time Input Field  */}
                      <div>
                        <label className="block font-semibold text-gray-800 dark:text-gray-200 mb-1">
                          <div className="flex items-center justify-between">
                            <p>
                              Preferred Consultation Time (local)
                              <RedStar />
                            </p>
                            {showError &&
                              !form.dollarfar_planning.consultation_time && (
                                <p className="text-red-500 dark:text-red-400 font-bold md:text-[1rem] text-md">
                                  Required*
                                </p>
                              )}
                          </div>
                        </label>
                        <input
                          type="text"
                          name="dollarfar_planning.consultation_time"
                          value={getFieldValue(
                            "dollarfar_planning",
                            "consultation_time"
                          )}
                          onChange={handleChange}
                          placeholder="e.g., Weekday mornings, Tuesday afternoons"
                          className={`w-full rounded-2xl border px-4 py-3 focus:border-gray-700 dark:focus:border-gray-300 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${toggleErrorBorderColor(
                            form.dollarfar_planning.consultation_time,
                            "consultation_time"
                          )}`}
                        />
                        <p className="block text-gray-600 dark:text-gray-400 mt-1">
                          Let us know your preferred days/times for the
                          consultation
                        </p>
                      </div>
                      {/* Subscription Start Button  */}
                      <div>
                        {isLoadingSubscription ? (
                          <div className="rounded-xl border px-3 py-2 font-semibold transition-colors h-12 w-full flex justify-center items-center bg-gray-200 animate-pulse">
                            <Icon
                              className="text-gray-900"
                              icon="line-md:loading-loop"
                              width="30"
                              height="30"
                            />
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={onStartSubscription}
                            disabled={data?.data?.status === "active"}
                            className={`rounded-xl border px-3 py-2 font-semibold transition-colors w-full ${
                              data?.data?.status === "active"
                                ? "border-green-600 bg-green-500 text-white"
                                : "border-gray-700 bg-gray-700 hover:border-gray-900 hover:bg-gray-900 duration-300 text-white"
                            }`}
                          >
                            {data?.data?.status === "active"
                              ? "✓ Subscription Active — $199 CAD Paid ( + taxes )"
                              : "Start subscription with this request — $199 CAD ( + taxes )"}
                          </button>
                        )}
                      </div>

                      {/* Subscribed Warning Box */}
                      {data?.data?.status === "active" && (
                        <div className="w-full">
                          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                            <div className="">
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-2">
                                  Complete The Form to Schedule Your Sessions
                                </h4>

                                {/* Essential Subscription Info */}
                                <div className="flex flex-wrap items-center gap-4 text-lg text-amber-700 dark:text-amber-400 mb-3">
                                  <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-800/30 px-3 py-1 rounded-lg">
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
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                      />
                                    </svg>
                                    <span>
                                      <strong>
                                        {data?.data?.sessionsPurchased -
                                          (data?.data?.sessionsUsed || 0)}{" "}
                                        session
                                        {data?.data?.sessionsUsed === 0
                                          ? "s"
                                          : ""}{" "}
                                        available
                                      </strong>
                                      <span className="text-md ml-1">
                                        ({data?.data?.sessionsUsed || 0}/
                                        {data?.data?.sessionsPurchased} used)
                                      </span>
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-800/30 px-3 py-1 rounded-lg">
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
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                    <span>
                                      <strong>Expires:</strong>{" "}
                                      {moment(data?.data?.expiryDate).format(
                                        "LLLL"
                                      )}
                                    </span>
                                  </div>
                                </div>

                                {/* Renewal Information */}
                                <div className=" text-amber-700 dark:text-amber-400 bg-amber-100/50 dark:bg-amber-800/30 rounded-lg p-3">
                                  <p className="font-bold mb-1">
                                    Renewal Process:
                                  </p>
                                  <p>
                                    You'll need to subscribe again after using
                                    all sessions or when your subscription
                                    expires. Submit this form each time to book
                                    available sessions.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Subscription Instructions  */}
                      <div>
                        <ul className="ml-4 list-disc text-md text-gray-600 dark:text-gray-400 space-y-2">
                          <li>
                            Pay-as-you-go: covers <strong>2 × 30-minute</strong>{" "}
                            online consultations.
                          </li>
                          <li>
                            Validity: use both sessions within{" "}
                            <strong>12 months</strong> of purchase.
                          </li>
                          <li>
                            No carry-forward: unused sessions do not roll over
                            to the next year.
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                </section>
              </div>
            </div>

            {/* SECTION E: Travel Planning — Book Now vs Future Interest */}
            <div className="border-l-4 border-gray-400 dark:border-gray-700 pl-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                E. Travel Planning — Book Now vs Future Interest
              </h2>
              <p className="mb-4 text-md text-gray-700 dark:text-gray-300">
                Explore available destinations and express interest for future
                locations
              </p>

              <div className="rounded-xl border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 p-4 mb-3 space-y-5">
                <div className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  Book Now — Vijayawada (Pilot 2026–2027)
                </div>
                <div className="mb-3 rounded-md bg-gray-50 dark:bg-gray-600 p-3 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-500">
                  <span className="font-bold">Available:</span> On-ground
                  concierge support in{" "}
                  <span className="font-bold">Vijayawada</span> only during the
                  pilot.
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-gray-800 dark:text-gray-200">
                    Months abroad per year
                  </label>
                  <select
                    name="travel_planning.months_abroad"
                    value={getFieldValue("travel_planning", "months_abroad")}
                    onChange={handleChange}
                    className="mb-2 w-full rounded-2xl border border-gray-400 dark:border-gray-500 px-4 py-3 focus:border-gray-700 dark:focus:border-gray-300 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer"
                  >
                    <option value="">Select duration...</option>
                    <option value="1 month">1 month</option>
                    <option value="1–2 months">1–2 months</option>
                    <option value="2–3 months">2–3 months</option>
                    <option value="3–4 months">3–4 months</option>
                    <option value="4–5 months">4–5 months</option>
                  </select>
                  <label className="mb-2 block font-medium text-gray-500 dark:text-gray-200">
                    Helps tailor accommodation and seasonal planning.
                  </label>
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-gray-800 dark:text-gray-200">
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
                    className="mb-2 w-full rounded-2xl border border-gray-400 dark:border-gray-500 px-4 py-3 focus:border-gray-700 dark:focus:border-gray-300 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <p className="block text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Bookings open January 2026</strong> for stays
                    beginning <strong>November 2026</strong> onward.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-gray-800 dark:text-gray-200">
                    Accommodation style
                  </label>
                  <select
                    name="travel_planning.travel_style"
                    value={getFieldValue("travel_planning", "travel_style")}
                    onChange={handleChange}
                    className="mb-2 w-full rounded-2xl border border-gray-400 dark:border-gray-500 px-4 py-3 focus:border-gray-700 dark:focus:border-gray-300 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer"
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
                  <label className="mb-2 block font-medium text-gray-500 dark:text-gray-200">
                    Options reflect properties supported in the Vijayawada
                    pilot.
                  </label>
                </div>

                <div>
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
                    <span className="text-gray-700 dark:text-gray-300">
                      I can travel independently without mobility assistance. I
                      understand some destinations abroad may be less accessible
                      than in Canada, the USA, the UK, or Europe.
                    </span>
                  </label>
                  <p className="block text-gray-600 dark:text-gray-400 mt-1">
                    Ensures practical, safe options for you.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 p-4">
                <div className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  Future Hubs — Express Interest (Not Bookable Yet)
                </div>

                <label className="mb-2 block font-semibold text-gray-800 dark:text-gray-200">
                  Select location
                </label>
                <select
                  name="travel_planning.country_region_interest"
                  value={getFieldValue(
                    "travel_planning",
                    "country_region_interest"
                  )}
                  onChange={handleChange}
                  className="mb-2 w-full rounded-2xl border border-gray-400 dark:border-gray-500 px-4 py-3 focus:border-gray-700 dark:focus:border-gray-300 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer"
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
                <p className="block text-gray-600 dark:text-gray-400 mb-2">
                  Choose Vijayawada to book now, or other locations to express
                  interest for future Cost Escape™ hubs.
                </p>

                <label className="mb-2 block font-semibold text-gray-800 dark:text-gray-200">
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
                  className="w-full rounded-2xl border border-gray-400 dark:border-gray-500 px-4 py-3 focus:border-gray-700 dark:focus:border-gray-300 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <p className="block text-gray-600 dark:text-gray-400 mt-1">
                  Your interest helps us prioritize next hubs and early-access
                  invites.
                </p>
              </div>
            </div>

            {/* SECTION F: Budget Estimates */}
            <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                F. Budget Estimates
              </h2>
              <p className="mb-4 text-md text-gray-700 dark:text-gray-300">
                Help us understand your spending preferences and travel style
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-semibold text-gray-800 dark:text-gray-200">
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
                    className="w-full rounded-2xl border border-gray-400 dark:border-gray-500 px-4 py-3 focus:border-gray-700 dark:focus:border-gray-300 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <p className="block text-gray-600 dark:text-gray-400 mt-1">
                    Why we ask: Baseline to compare vs. abroad.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-gray-800 dark:text-gray-200">
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
                    className="w-full rounded-2xl border border-gray-400 dark:border-gray-500 px-4 py-3 focus:border-gray-700 dark:focus:border-gray-300 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <p className="block text-gray-600 dark:text-gray-400 mt-1">
                    Why we ask: Helps right-size destinations and accommodation
                    type.
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 block font-semibold text-gray-800 dark:text-gray-200">
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
                  className="w-full rounded-2xl border border-gray-400 dark:border-gray-500 px-4 py-3 focus:border-gray-700 dark:focus:border-gray-300 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <p className="block text-gray-600 dark:text-gray-400 mt-1">
                  Why we ask: Costs vary widely; free-form lets you enter ranges
                  or notes.
                </p>
              </div>

              <div className="mt-4">
                <label className="mb-2 block font-semibold text-gray-800 dark:text-gray-200">
                  Preferred flight class
                </label>
                <select
                  name="budget_estimates.flight_class"
                  value={getFieldValue("budget_estimates", "flight_class")}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-400 dark:border-gray-500 px-4 py-3 focus:border-gray-700 dark:focus:border-gray-300 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer"
                >
                  <option value="">Select flight class...</option>
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Business">Business</option>
                  <option value="First">First</option>
                </select>
                <p className="block text-gray-600 dark:text-gray-400 mt-1">
                  Why we ask: Class of travel affects airfare budgets
                  substantially.
                </p>
              </div>
            </div>

            {/* SECTION G: Purpose of Travel */}
            <div className="border-l-4 border-gray-200 dark:border-gray-700 pl-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                G. Purpose of Travel
              </h2>
              <p className="mb-4 text-md text-gray-700 dark:text-gray-300">
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
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg border border-transparent hover:border-gray-300 dark:hover:border-gray-500 transition-colors select-none cursor-pointer"
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
                        name="travel_purposes"
                        value={option.value}
                        checked={isTravelPurposeSelected(option.value)}
                        onChange={handleCheckboxChange}
                      />
                    </ConfigProvider>
                    <span className="text-gray-700 dark:text-gray-300">
                      {option.t}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* SECTION H: Privacy & Pricing */}
            <div className="border-l-4 border-gray-100 dark:border-gray-800 pl-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                H. Privacy & Pricing
              </h2>
              <p className="mb-4 text-md text-gray-700 dark:text-gray-300 text-">
                Final acknowledgements and consent
              </p>

              <div className="rounded-lg bg-gray-50 dark:bg-gray-700 p-4 mb-4 border border-gray-300 dark:border-gray-600">
                <p className="text-md text-gray-700 dark:text-gray-300 leading-7">
                  <strong>Transparency first.</strong> We collect{" "}
                  <strong>estimates only</strong> — no account statements. When
                  you ask us to coordinate, we work only with{" "}
                  <strong>vetted local partners</strong> — including housing,
                  concierge support, transport, and curated experiences.
                  <br />
                  <br />
                  <h3 className="font-bold text-[1.1rem] mb-1">
                    Our products include:
                  </h3>
                  <ul className="list-disc list-inside mb-5">
                    <li>
                      Concierge support —{" "}
                      <strong>airport pickup and arrival assistance</strong>,
                      SIM/Wi-Fi setup, local orientation, and vetted household
                      helpers.
                    </li>

                    <li>
                      Housing coordination — matched to your comfort level and
                      budget.
                    </li>

                    <li>
                      Optional curated cultural experiences and short-haul
                      getaways.
                    </li>

                    <li>
                      Luxury packages include a dedicated
                      <strong> Car &amp; Driver</strong> service.
                    </li>
                  </ul>
                  <em>
                    (RetireHow does not coordinate visas, insurance, medical, or
                    legal matters. Our focus is on comfort, connection, and
                    on-ground lifestyle support.)
                  </em>
                </p>
              </div>

              <div className="grid gap-3">
                <label
                  className={`flex items-start gap-3 p-3 bg-white dark:bg-gray-700 rounded-lg border transition-colors select-none cursor-pointer ${toggleErrorBorderColor(
                    form.privacy_acknowledgements.ack_poc as boolean,
                    "ack_poc"
                  )}`}
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
                      name="privacy_acknowledgements.ack_poc"
                      checked={
                        getFieldValue("privacy_acknowledgements", "ack_poc") ||
                        false
                      }
                      onChange={handleCheckboxChange}
                    />
                  </ConfigProvider>
                  <span className="text-gray-700 dark:text-gray-300 font-bold">
                    I acknowledge that during the proof-of-concept stage, I will
                    only pay actual vendor costs and agree to share feedback on
                    my experience.
                  </span>
                </label>

                <label
                  className={`flex items-start gap-3 p-3 bg-white dark:bg-gray-700 rounded-lg border transition-colors select-none cursor-pointer ${toggleErrorBorderColor(
                    form.privacy_acknowledgements.consent_contact as boolean,
                    "consent_contact"
                  )}`}
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
                  <span className="text-gray-700 dark:text-gray-300 font-bold">
                    I would like to be contacted by RetireHow Inc. to discuss my
                    submission.
                  </span>
                </label>

                <label
                  className={`flex items-start gap-3 p-3 bg-white dark:bg-gray-700 rounded-lg border transition-colors select-none cursor-pointer ${toggleErrorBorderColor(
                    form.privacy_acknowledgements.ack_scope as boolean,
                    "ack_scope"
                  )}`}
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
                  <span className="text-gray-700 dark:text-gray-300 font-bold">
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
                  <p className="text-red-500 dark:text-red-400 my-3 font-bold">
                    Please check all the Privacy & Pricing checkboxes above.
                  </p>
                )}
            </div>

            {/* Submit Section */}
            <div className="text-center">
              <button
                type="submit"
                disabled={submitting}
                className="w-full max-w-md rounded-full bg-gray-900 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-600 px-6 py-4 text-lg font-semibold text-white disabled:opacity-60 transition-colors shadow-lg"
              >
                {submitting ? "Submitting..." : "Submit & Request My Plan"}
              </button>

              <div className="mt-4 border-t border-gray-300 dark:border-gray-600 pt-4 text-center text-lg text-gray-600 dark:text-gray-400">
                DollarFar.com is provided by{" "}
                <strong className="text-gray-800 dark:text-gray-200">
                  RetireHow Inc.
                </strong>{" "}
                as part of our commitment to bring financial know-how to
                everyone. A member of the{" "}
                <strong className="text-gray-800 dark:text-gray-200">
                  RetireHow
                </strong>{" "}
                team will contact you directly after submission.
              </div>
            </div>
          </form>
        </section>
      </main>
    </Elements>
  );
}
