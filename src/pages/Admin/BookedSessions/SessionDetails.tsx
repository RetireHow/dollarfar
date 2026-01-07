import { Icon } from "@iconify/react/dist/iconify.js";
import { useGetAllRetirementPlanNotesQuery } from "../../../redux/features/APIEndpoints/retirementPlanNoteApi/retirementPlanNote";
import { TNote } from "../types/note.type";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetConsultationSessoinDetailsQuery } from "../../../redux/features/APIEndpoints/consultationSessionApi/consultationSessionApi";
import { TSession, Subscription, Contact } from "../types/session.type";
import { useEffect } from "react";
import { convertUTCToTimeZone } from "../admin.utils";

const formatCurrency = (amount: number | string) => {
  if (!amount) return "Not specified";
  const num =
    typeof amount === "string" ? parseFloat(amount.replace(/,/g, "")) : amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getSessionStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "scheduled":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "completed":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "cancelled":
      return "bg-rose-100 text-rose-800 border-rose-200";
    case "used":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getSubscriptionStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "used":
      return "bg-gray-100 text-gray-800 border-gray-200";
    case "expired":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "cancelled":
      return "bg-rose-100 text-rose-800 border-rose-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

/*=====================| Loading Skeleton |=================*/
const NoteLoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 animate-pulse"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
            <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
            <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

function SessionDetailsSkeleton() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto">
        {/* Back Button Skeleton */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse">
            <div className="h-5 w-5 bg-gray-400 dark:bg-gray-600 rounded"></div>
            <div className="h-4 w-32 bg-gray-400 dark:bg-gray-600 rounded"></div>
          </div>
        </div>

        {/* Main Content Card Skeleton */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden animate-pulse">
          {/* Header Skeleton */}
          <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 px-6 py-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                  <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                  <div className="h-8 w-40 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections Skeleton */}
          <div className="p-6 space-y-6">
            {/* SECTION A: Session & Subscription Info Skeleton */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                <div className="h-6 w-64 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                    <div className="h-8 w-20 bg-gray-400 dark:bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>

              {/* Subscription Details Skeleton */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="h-4 w-28 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                    <div className="h-6 w-36 bg-gray-400 dark:bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION B: Contact Information Skeleton */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                    <div className="h-6 w-40 bg-gray-400 dark:bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Notes Section Skeleton */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="mb-4">
                <div className="h-6 w-36 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 w-80 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>

              {/* Notes Loading Skeleton */}
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700 animate-pulse"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
                          <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        </div>
                        <div>
                          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                          <div className="h-3 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        </div>
                      </div>
                      <div className="h-3 w-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-3 w-2/3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SessionDetails() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { data: sessionData, isLoading: sessionLoading } =
    useGetConsultationSessoinDetailsQuery(sessionId);

  const record: TSession = sessionData?.data || ({} as TSession);
  const subscription: Subscription =
    record.subscription || ({} as Subscription);
  const contactInfo: Contact = record.contact || ({} as Contact);

  const { data, isLoading: isLoadingNotes } = useGetAllRetirementPlanNotesQuery(
    record?._id
  );
  const notes: TNote[] = data?.data || [];

  if (sessionLoading) {
    return <SessionDetailsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div>
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Icon icon="mdi:arrow-left" className="text-lg" />
            Back to Sessions
          </button>
        </div>

        {/* Main Content Card */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* Header */}
          <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 px-6 py-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Session #{record.session_number} • {contactInfo.name}'s
                  Consultation
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <div
                    className={`inline-flex items-center px-3 py-1.5 rounded-lg border ${getSessionStatusColor(
                      record.status
                    )}`}
                  >
                    <Icon
                      icon={
                        record.status === "scheduled"
                          ? "mdi:calendar-clock"
                          : record.status === "completed"
                          ? "mdi:check-circle"
                          : record.status === "cancelled"
                          ? "mdi:close-circle"
                          : "mdi:information"
                      }
                      className="mr-1.5"
                    />
                    <span className="font-medium capitalize">
                      {record.status || "Not specified"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <Icon
                      icon="mdi:calendar"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      {record.slot
                        ? `Scheduled for: ${record.slot}`
                        : "Not scheduled"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <Icon
                      icon="mdi:clock-outline"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      Duration: {record.session_duration || 30} minutes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="p-6 space-y-6">
            {/* SECTION A: Session & Subscription Info */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <Icon
                    icon="mdi:ticket-confirmation"
                    className="text-xl text-white"
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Session & Subscription Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:numeric"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Session Number
                    </h3>
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    #{record.session_number}
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:calendar-check"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Sessions Remaining
                    </h3>
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {record.sessions_remaining} of{" "}
                    {subscription.sessionsPurchased}
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:account-cash"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Subscription Status
                    </h3>
                  </div>
                  <div
                    className={`inline-flex items-center px-3 py-1.5 rounded-lg border ${getSubscriptionStatusColor(
                      subscription.status
                    )}`}
                  >
                    <Icon
                      icon={
                        subscription.status === "active"
                          ? "mdi:check-circle"
                          : subscription.status === "used"
                          ? "mdi:check-all"
                          : subscription.status === "expired"
                          ? "mdi:clock-alert"
                          : "mdi:information"
                      }
                      className="mr-1.5"
                    />
                    <span className="font-medium capitalize">
                      {subscription.status || "Not specified"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Subscription Details */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Amount Paid
                  </h3>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatCurrency(subscription.amountPaid)}{" "}
                    {subscription.currency}
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Purchase Date
                  </h3>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {subscription.purchaseDate
                      ? formatDate(subscription.purchaseDate)
                      : "Not specified"}
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Expiry Date
                  </h3>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {subscription.expiryDate
                      ? formatDate(subscription.expiryDate)
                      : "Not specified"}
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Payment Intent ID
                  </h3>
                  <p className="text-sm font-mono text-gray-900 dark:text-white truncate">
                    {subscription.paymentIntentId || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION B: Contact Information */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <Icon icon="mdi:account-box" className="text-xl text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Contact Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:account"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Full Name
                    </h3>
                  </div>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {contactInfo.name}
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:email"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Email Address
                    </h3>
                  </div>
                  <p className="text-base font-semibold text-gray-900 dark:text-white break-all">
                    {contactInfo.email}
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:phone"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Phone Number
                    </h3>
                  </div>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {contactInfo.phone}
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:earth"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Residence
                    </h3>
                  </div>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {contactInfo.region || contactInfo.country
                      ? `${contactInfo.region || ""}${
                          contactInfo.region && contactInfo.country ? ", " : ""
                        }${contactInfo.country || ""}`
                      : "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            {/* Time Zone Information */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <Icon
                    icon="mdi:clock-outline"
                    className="text-xl text-white"
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Time Zone Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:account-clock"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      User Time Zone
                    </h3>
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {record.userTZ || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:briefcase-clock"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Consultant Time Zone
                    </h3>
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {record.consultantTZ || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Session Details */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <Icon
                    icon="mdi:calendar-text"
                    className="text-xl text-white"
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Session Details
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:calendar-clock"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Scheduled Slot
                    </h3>
                  </div>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {convertUTCToTimeZone(
                      record.slot,
                      record.consultantTZ_IANA
                    )}
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:account-supervisor"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Scheduled By
                    </h3>
                  </div>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {record.scheduled_by || "Not specified"}
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:calendar-edit"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Last Updated
                    </h3>
                  </div>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {record.updatedAt
                      ? formatDate(record.updatedAt)
                      : "Not specified"}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:calendar-plus"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Created Date
                    </h3>
                  </div>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {record.createdAt
                      ? formatDate(record.createdAt)
                      : "Not specified"}
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:account-cancel"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Deletion Status
                    </h3>
                  </div>
                  <div
                    className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border ${
                      record.isDeleted
                        ? "bg-rose-100 text-rose-800 border-rose-200"
                        : "bg-emerald-100 text-emerald-800 border-emerald-200"
                    }`}
                  >
                    <Icon
                      icon={
                        record.isDeleted ? "mdi:delete" : "mdi:check-circle"
                      }
                      className="mr-2"
                    />
                    {record.isDeleted ? "Deleted" : "Active"}
                  </div>
                </div>
              </div>
            </div>

            {/* Client Notes Section */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Session Notes
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Track all conversations, meetings, and important details for
                  this session
                </p>
              </div>

              {isLoadingNotes ? (
                <NoteLoadingSkeleton />
              ) : notes?.length > 0 ? (
                <div className="space-y-3">
                  {notes.map((note) => (
                    <div
                      key={note._id}
                      className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <Icon
                              icon="mdi:account"
                              className="text-gray-600 dark:text-gray-400"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              {note.createdBy}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDate(note.createdAt)}
                            </p>
                          </div>
                        </div>
                        {note.updatedAt &&
                          note.updatedAt !== note.createdAt && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Edited
                            </span>
                          )}
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {note.content}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Icon
                    icon="mdi:note-off"
                    className="text-3xl text-gray-400 dark:text-gray-500 mx-auto mb-3"
                  />
                  <p className="text-gray-500 dark:text-gray-400">
                    No notes have been added for this session yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
