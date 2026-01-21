import { useGetSingleConsultationSubscriptionQuery } from "../../redux/features/APIEndpoints/consultationSubscriptionApi/consultationSubscription";
import { useGetScheduleConfigSlotsQuery } from "../../redux/features/APIEndpoints/ScheduleConfigApi/ShceduleConfigApi";
import { useBookConsultationSessoinMutation } from "../../redux/features/APIEndpoints/consultationSessionApi/consultationSessionApi";
import { Select, Tooltip } from "antd";
import { Clock } from "lucide-react";
import RedStar from "../../components/UI/RedStar";
import { FormEvent, useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import timezoneMap from "../RetirementCalculator/timezone.json"; // IANA ↔ Windows mapping

const standardTimezoneMap = timezoneMap.map((tz) => ({
  label: tz.tz_windows,
  value: tz.tz_iana,
}));

const STRIPE_LIVE_SECRET_KEY =
  "pk_live_51RplAhBYC7YMMAFC7uODsfkBdTVL0v5Qhq5EOZ0MryrKf9P74f2l2zXjTS9i6kQXMGpPFvGMJD4ttj20WMHZH9CX004Xd966hu";

// const STRIPE_TEST_SECRET_KEY =
//   "pk_test_51RppIt4G0lMbEIGhQ3ltvcDSaNOOZaRalURZRSahGnm2EUCDMPU14eTNz9FiTodU9TV3hQhxzM8cMZVQeaMJXR4L00aUu5KTyR";

const stripePromise = loadStripe(STRIPE_LIVE_SECRET_KEY);

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { baseUrl } from "../../api/apiConstant";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react/dist/iconify.js";
import moment from "moment";
import { showApiErrorToast } from "../../utils/showApiErrorToast";

type ContactInfo = {
  name: string;
  phone: string;
  email: string;
  region: string;
  country: string;
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
  setShowError,
}: {
  open: boolean;
  onClose: () => void;
  onPaid: (paymentIntentId: string) => void;
  contactInfo: ContactInfo;
  setShowError: (value: boolean) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  if (
    !contactInfo.name ||
    !contactInfo.email ||
    !contactInfo.phone ||
    !contactInfo.country ||
    !contactInfo.region
  ) {
    onClose();
    toast.error(
      "Please fill in the required input fields before start subscription!",
      { autoClose: 15000 }
    );
    setShowError(true);
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
  setShowError: (value: boolean) => void;
}) => (
  <Elements stripe={stripePromise}>
    <PaymentModalComponent {...props} />
  </Elements>
);

export default function HumanGuidance(): JSX.Element {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [showError, setShowError] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTZ, setSelectedTZ] = useState<{
    label: string;
    value: string;
  } | null>(null);

  // Contact Info
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const {
    data,
    isLoading: isLoadingSubscription,
    refetch: refetchSubscription,
  } = useGetSingleConsultationSubscriptionQuery(email, {
    refetchOnMountOrArgChange: true,
  });

  const { data: slotsData, isLoading: slotLoading } =
    useGetScheduleConfigSlotsQuery(selectedDate, {
      refetchOnMountOrArgChange: true,
    });
  const availableSlots = slotsData?.data;

  const [
    bookConsultationSession,
    {
      isLoading: isBookingSession,
      isError: isBookingError,
      error: bookingError,
    },
  ] = useBookConsultationSessoinMutation();

  useEffect(() => {
    if (!isBookingSession && isBookingError && bookingError) {
      showApiErrorToast(bookingError);
    }
  }, [isBookingSession, isBookingError, bookingError]);

  // When user clicks 'Start subscription' -> open payment modal
  const onStartSubscription = () => {
    setPaymentOpen(true);
  };

  // Called by PaymentModal when payment success
  const onPaymentSuccess = async () => {
    try {
      setPaymentOpen(false);
      // Immediately refetch subscription data
      if (email) {
        await refetchSubscription();
      }
      toast.success(
        "Payment successful. You can now book consultation session.",
        {
          autoClose: 15000,
        }
      );
    } catch (error) {
      console.error("❌ Failed to verify payment storage:", error);
      toast.error(
        "Payment processed but verification failed. Please contact support."
      );
    }
  };

  const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const toggleErrorBorderColor = (value: string | boolean, field: string) => {
    if (field === "name") {
      return showError && !value
        ? "border-red-500 dark:border-red-400 border-[2px] outline-red-500 focus:ring-red-500"
        : "border-gray-400 dark:border-gray-500";
    } else if (field === "email") {
      return showError && (!value || !emailReg.test(value as string))
        ? "border-red-500 dark:border-red-400 border-[2px] outline-red-500 focus:ring-red-500"
        : "border-gray-400 dark:border-gray-500";
    } else if (field === "phone") {
      return showError && !value
        ? "border-red-500 dark:border-red-400 border-[2px] outline-red-500 focus:ring-red-500"
        : "border-gray-400 dark:border-gray-500";
    } else if (field === "region") {
      return showError && !value
        ? "border-red-500 dark:border-red-400 border-[2px] outline-red-500 focus:ring-red-500"
        : "border-gray-400 dark:border-gray-500";
    } else if (field === "country") {
      return showError && !value
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
    }
  };

  const handleBookGuidance = async () => {
    if (
      !name ||
      !email ||
      !phone ||
      !country ||
      !region ||
      !selectedDate ||
      !selectedTZ ||
      !selectedSlot
    ) {
      toast.error(
        "Please fill in the required input fields before start subscription!",
        { autoClose: 15000 }
      );
      return setShowError(true);
    }
    const subscription = data?.data?._id;
    const newSessionData = {
      subscription,
      contact: { name, email, phone, country, region },
      slot: selectedSlot,
      userTZ: selectedTZ?.label,
      userTZ_IANA: selectedTZ?.value,
    };

    const res = await bookConsultationSession(newSessionData);
    if (res?.error) return;
    toast.success(
      "Your consultation session is booked successfully. A member of RetireHow Team will contact you.",
      { autoClose: 15000 }
    );
  };

  return (
    <main className="lg:mx-[5rem] md:mx-[2rem] mx-[1rem] mb-12 shadow-lg md:p-8 p-3 border-[1px] border-gray-300 dark:border-gray-600 rounded-xl bg-teal-50 dark:bg-gray-900">
      <Elements stripe={stripePromise}>
        {paymentOpen && (
          <PaymentModal
            open={paymentOpen}
            onClose={() => setPaymentOpen(false)}
            onPaid={onPaymentSuccess}
            contactInfo={{ name, phone, email, region, country }}
            setShowError={setShowError}
          />
        )}

        <h2 className="mb-[10px] border-l-[5px] border-orange-500 pl-[10px] text-xl font-semibold text-[var(--navy)] dark:text-blue-50">
          Human Guidance for Your Financial Journey
        </h2>
        <p className="mb-4 text-[14px] text-[var(--muted)] dark:text-gray-400">
          DollarFar’s six free calculators turn scattered numbers into clarity — showing how long savings may last and where money can go further. Optional guided interpretation walks through results and trade-offs. The $199 subscription includes two 30-minute sessions with the RetireHow team — not advice, just clarity before decisions are tested.
        </p>
        <section className="space-y-5">
          {/* SECTION : Contact Information */}
          <div className="border-l-4 border-orange-400 dark:border-orange-500 pl-4">
            <p className="mb-4 text-md text-gray-700 dark:text-gray-300">
              Provide your contact information to start subscription for human
              guidance.
            </p>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block font-semibold mb-2 text-gray-800 dark:text-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <p>
                      Name
                      <RedStar />
                    </p>
                    {showError && !name && (
                      <p className="text-red-500 dark:text-red-400 font-bold md:text-[1rem] text-md">
                        Required*
                      </p>
                    )}
                  </div>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  minLength={2}
                  maxLength={80}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  placeholder="Enter your full name"
                  className={`w-full rounded-2xl border px-4 py-3 focus:border-gray-700 dark:focus:border-gray-300 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${toggleErrorBorderColor(
                    name,
                    "name"
                  )}`}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block font-semibold mb-2 text-gray-800 dark:text-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <p>
                      Phone
                      <RedStar />
                    </p>
                    {showError && !phone && (
                      <p className="text-red-500 dark:text-red-400 font-bold md:text-[1rem] text-md">
                        Required*
                      </p>
                    )}
                  </div>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  placeholder="e.g., +15551234567"
                  className={`w-full rounded-2xl border px-4 py-3 focus:border-gray-700 dark:focus:border-gray-300 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${toggleErrorBorderColor(
                    phone,
                    "phone"
                  )}`}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-semibold mb-2 text-gray-800 dark:text-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <p>
                      Email
                      <RedStar />
                    </p>
                    {showError && !email && (
                      <p className="text-red-500 dark:text-red-400 font-bold md:text-[1rem] text-md">
                        Required*
                      </p>
                    )}
                    {showError && email && !emailReg.test(email) && (
                      <p className="text-red-500 dark:text-red-400 font-bold md:text-[1rem] text-md">
                        Required a valid email!
                      </p>
                    )}
                  </div>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className={`w-full rounded-2xl border px-4 py-3 focus:border-gray-700 dark:focus:border-gray-300 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${toggleErrorBorderColor(
                    email,
                    "email"
                  )}`}
                />
              </div>

              <div>
                <label
                  htmlFor="region"
                  className="block font-semibold mb-2 text-gray-800 dark:text-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <p>
                      Province/State <RedStar />
                    </p>
                    {showError && !region && (
                      <p className="text-red-500 dark:text-red-400 font-bold md:text-[1rem] text-md">
                        Required*
                      </p>
                    )}
                  </div>
                </label>
                <input
                  id="region"
                  name="region"
                  type="text"
                  minLength={2}
                  maxLength={60}
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="Enter state/province"
                  className={`w-full rounded-2xl border px-4 py-3 focus:border-gray-700 dark:focus:border-gray-300 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${toggleErrorBorderColor(
                    region,
                    "region"
                  )}`}
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block font-semibold mb-2 text-gray-800 dark:text-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <p>
                      Country <RedStar />
                    </p>
                    {showError && !country && (
                      <p className="text-red-500 dark:text-red-400 font-bold md:text-[1rem] text-md">
                        Required*
                      </p>
                    )}
                  </div>
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  minLength={2}
                  maxLength={60}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Enter country"
                  className={`w-full rounded-2xl border px-4 py-3 focus:border-gray-700 dark:focus:border-gray-300 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${toggleErrorBorderColor(
                    country,
                    "country"
                  )}`}
                />
              </div>
            </div>
          </div>

          {/* Subscription Start Button  */}
          <div>
            {isLoadingSubscription ? (
              <div className="rounded-3xl border px-3 py-6 font-semibold transition-colors h-12 w-full flex justify-center items-center bg-gray-200 dark:bg-gray-700 animate-pulse">
                <Icon
                  className="text-gray-900 dark:text-gray-300"
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
                className={`rounded-2xl border px-3 py-3 font-semibold transition-colors w-full ${
                  data?.data?.status === "active"
                    ? "border-teal-600 bg-teal-500 text-white dark:border-teal-500 dark:bg-teal-600"
                    : "border-gray-700 bg-gray-800 hover:border-gray-900 hover:bg-gray-900 duration-300 text-white dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                }`}
              >
                {data?.data?.status === "active"
                  ? "✓ Subscription Active — $199 CAD Paid ( + taxes )"
                  : "Start subscription with this request — $199 CAD ( + taxes )"}
              </button>
            )}
          </div>

          {data?.data?.status === "active" && (
            <div>
              {/* 2. BOOKING INSTRUCTIONS */}
              <div className="bg-teal-50 dark:bg-blue-900/20 border border-teal-200 dark:border-blue-800 rounded-xl p-4">
                <h5 className="font-semibold dark:text-gray-300 mb-2">
                  📅 How to Book Your Session:
                </h5>
                <ol className="list-decimal pl-5 space-y-2 dark:text-gray-400">
                  <li>Select your timezone below</li>
                  <li>Choose your preferred consultation date</li>
                  <li>Pick an available time slot</li>
                  <li>Click "Book Now" to confirm your session</li>
                </ol>
              </div>
              {/* Time Zone Field  */}
              <div className="my-4">
                <div className="font-semibold mb-1 flex justify-between items-center dark:text-gray-200">
                  <p>
                    Your Timezone <RedStar />
                  </p>
                  {showError && !selectedTZ && (
                    <p className="text-red-500 dark:text-red-400">Required*</p>
                  )}
                </div>
                <Select
                  size="large"
                  status={showError && !selectedTZ ? "error" : ""}
                  className="w-full !h-[48px] dark:[&_.ant-select-selector]:bg-gray-700 dark:[&_.ant-select-selector]:text-white dark:[&_.ant-select-selector]:border-gray-600"
                  value={selectedTZ}
                  onChange={(_, option) => {
                    setSelectedTZ(option as { label: string; value: string });
                  }}
                  options={standardTimezoneMap}
                  suffixIcon={
                    <Icon
                      className="text-[1.5rem] text-gray-600 dark:text-gray-400"
                      icon="iconamoon:arrow-down-2"
                    />
                  }
                  placeholder="Type City & select timezone. e.g., Toronto"
                  showSearch={true}
                  allowClear
                ></Select>
              </div>
              {/* Consultion Preference Date Input Field  */}
              <div>
                <label className="block font-semibold text-gray-800 dark:text-gray-200 mb-1">
                  <div className="flex items-center justify-between">
                    <p>
                      Preferred Consultation Date
                      <RedStar />
                    </p>
                    {showError && !selectedDate && (
                      <p className="text-red-500 dark:text-red-400 font-bold md:text-[1rem] text-md">
                        Required*
                      </p>
                    )}
                  </div>
                </label>

                <div>
                  <DatePicker
                    className="w-full py-3 px-4 rounded-xl border-gray-400 hover:border-gray-500 dark:border-gray-600 dark:hover:border-gray-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Select Consultation Date"
                    status={showError && !selectedDate ? "error" : ""}
                    onChange={(__, dateString) => {
                      setSelectedDate(dateString as string);
                    }}
                    disabledDate={(current: Dayjs | null) => {
                      if (!current) return false;
                      // Use dayjs directly - it has the same API as moment
                      return current
                        .startOf("day")
                        .isBefore(dayjs().startOf("day"));
                    }}
                  />

                  {/* Show available slots if date is selected  */}
                  {selectedDate && (
                    <div>
                      <h3
                        className="font-bold mb-2 dark:text-gray-300"
                        style={{ marginTop: 20 }}
                      >
                        Available Slots
                      </h3>
                      <div className="flex items-center flex-wrap gap-3">
                        {slotLoading ? (
                          <p className="font-bold text-lg dark:text-gray-300">
                            Loading...
                          </p>
                        ) : (
                          availableSlots?.map(
                            (
                              slot: {
                                utc: string;
                                available: boolean;
                                providerTime: string;
                              },
                              index: number
                            ) => (
                              <Tooltip
                                title={
                                  !slot.available
                                    ? "This is already booked!"
                                    : ""
                                }
                                key={index}
                              >
                                <button
                                  type="button"
                                  className={`border-[1px] border-orange-300 dark:border-orange-500 rounded-md px-2 py-1 ${
                                    selectedSlot === slot.utc
                                      ? "bg-orange-500 dark:bg-orange-600 text-white"
                                      : !slot.available
                                      ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                                      : "hover:border-orange-600 dark:hover:border-orange-400"
                                  }`}
                                  onClick={() => setSelectedSlot(slot.utc)}
                                  disabled={!slot.available}
                                >
                                  <div className="flex items-center gap-2">
                                    <Clock
                                      className={`${
                                        selectedSlot === slot.utc
                                          ? "text-white"
                                          : "text-gray-500 dark:text-gray-400"
                                      }`}
                                      size={18}
                                    />
                                    <p className="dark:text-gray-300">
                                      {moment(slot.utc).format("LT")}
                                    </p>
                                  </div>
                                </button>
                              </Tooltip>
                            )
                          )
                        )}
                      </div>
                      {showError && !slotLoading && !selectedSlot && (
                        <p className="text-red-500 dark:text-red-400 font-semibold mt-1">
                          Time slot is required*
                        </p>
                      )}

                      {availableSlots?.length == 0 && (
                        <p className="text-red-500 dark:text-red-400 font-semibold mt-1">
                          No slot is available for this date! Please select
                          another date.
                        </p>
                      )}
                      <p className="block text-gray-600 dark:text-gray-400 mt-2">
                        ☝️ Choose an available time slot for your consultation.
                        Gray slots are already booked.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleBookGuidance}
                  type="button"
                  className={`duration-300 text-white px-6 py-3 rounded-lg mt-5 ${
                    isBookingSession
                      ? "bg-gray-300 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600"
                      : "bg-teal-500 dark:bg-teal-600 hover:bg-teal-600 dark:hover:bg-teal-500"
                  }`}
                  disabled={isBookingSession}
                >
                  {isBookingSession ? "Booking..." : "Book Now"}
                </button>
              </div>
            </div>
          )}

          {/* Subscribed Warning Box */}
          {data?.data?.status === "active" && (
            <div className="w-full">
              <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                <div className="">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-2">
                      Your active subscription status
                    </h4>

                    {/* Essential Subscription Info */}
                    <div className="flex flex-wrap items-center gap-4 text-lg text-amber-700 dark:text-amber-400 mb-3">
                      <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-800/40 px-3 py-1 rounded-lg">
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
                            {data?.data?.sessionsUsed === 0 ? "s" : ""}{" "}
                            available
                          </strong>
                          <span className="text-md ml-1 dark:text-amber-300">
                            ({data?.data?.sessionsUsed || 0}/
                            {data?.data?.sessionsPurchased} used)
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-800/40 px-3 py-1 rounded-lg">
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
                          {moment(data?.data?.expiryDate).format("LLLL")}
                        </span>
                      </div>
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
                Pay-as-you-go: covers <strong>2 × 30-minute</strong> online
                consultations.
              </li>
              <li>
                Validity: use both sessions within <strong>12 months</strong> of
                purchase.
              </li>
              <li>
                No carry-forward: unused sessions do not roll over to the next
                year.
              </li>
            </ul>
          </div>
        </section>
      </Elements>
    </main>
  );
}
