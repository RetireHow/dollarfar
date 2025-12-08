import { Icon } from "@iconify/react/dist/iconify.js";
import { TPlan } from "../types/plan.type";
import { useGetAllRetirementPlanNotesQuery } from "../../../redux/features/APIEndpoints/retirementPlanNoteApi/retirementPlanNote";
import { TNote } from "../types/note.type";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleRetirementPlanQuery } from "../../../redux/features/APIEndpoints/retirementPlansApi/retirementPlansApi";

const formatCurrency = (amount: string) => {
  if (!amount) return "Not specified";
  const num = parseFloat(amount.replace(/,/g, ""));
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
  });
};

const getComfortLevelColor = (comfort: string) => {
  switch (comfort) {
    case "comfortable":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "open":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "none":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getSubscriptionStatus = (status: string) => {
  switch (status) {
    case "have":
      return "Has Subscription";
    case "start":
      return "Starting Subscription";
    case "paid":
      return "Subscription Paid";
    default:
      return "No Subscription";
  }
};

/*=====================| Helper functions to safely access nested data |=================*/
export const getContactInfo = (record: TPlan) => record.contact || {};
export const getRetirementSnapshot = (record: TPlan) =>
  record.retirement_snapshot || {};
export const getHousingEquity = (record: TPlan) => record.housing_equity || {};
export const getDollarFarPlanning = (record: TPlan) =>
  record.dollarfar_planning || {};
export const getTravelPlanning = (record: TPlan) =>
  record.travel_planning || {};
export const getBudgetEstimates = (record: TPlan) =>
  record.budget_estimates || {};
export const getPrivacyAcknowledgements = (record: TPlan) =>
  record.privacy_acknowledgements || {};

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

const getStatusBadge = (status: boolean, label: string) => {
  return (
    <div
      className={`flex items-center p-3 rounded-lg border ${
        status
          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
          : "bg-gray-50 text-gray-800 border-gray-200"
      }`}
    >
      <Icon
        icon={status ? "mdi:check-circle" : "mdi:close-circle"}
        className={`text-lg mr-2 ${
          status ? "text-emerald-600" : "text-gray-500"
        }`}
      />
      <div className="text-left">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs">{status ? "Yes" : "No"}</div>
      </div>
    </div>
  );
};

function NextStepPlanDetailsPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div>
        {/* Back Button Skeleton */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse">
            <div className="h-5 w-5 bg-gray-400 dark:bg-gray-600 rounded"></div>
            <div className="h-4 w-28 bg-gray-400 dark:bg-gray-600 rounded"></div>
          </div>
        </div>

        {/* Main Content Card Skeleton */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden animate-pulse">
          {/* Header Skeleton */}
          <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 px-6 py-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                  <div className="h-8 w-40 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections Skeleton */}
          <div className="p-6 space-y-6">
            {/* SECTION A: Contact Information Skeleton */}
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
                    <div className="h-6 w-36 bg-gray-400 dark:bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION B: Retirement Snapshot Skeleton */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                <div className="h-6 w-56 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                    <div className="h-8 w-28 bg-gray-400 dark:bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION C: Housing & Real Estate Equity Skeleton */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                <div className="h-6 w-64 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-4 w-36 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                    <div className="h-8 w-32 bg-gray-400 dark:bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION D: DollarFar — Pre-Retirement Planning Skeleton */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                <div className="h-6 w-72 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>

              {/* Selected Calculators Skeleton */}
              <div className="mb-6">
                <div className="h-4 w-36 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
                <div className="flex flex-wrap gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-8 w-24 bg-gray-300 dark:bg-gray-600 rounded-lg"
                    ></div>
                  ))}
                </div>
              </div>

              {/* Interpretation Services & Subscription Skeleton */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-4 w-36 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                    <div className="h-6 w-40 bg-gray-400 dark:bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>

              {/* Preferred Consultation Time Skeleton */}
              <div className="mt-4 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-4 w-44 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
                <div className="h-6 w-32 bg-gray-400 dark:bg-gray-700 rounded mt-2"></div>
              </div>
            </div>

            {/* SECTION E: Travel Planning Skeleton */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                <div className="h-6 w-80 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="h-4 w-36 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                      <div className="h-6 w-28 bg-gray-400 dark:bg-gray-700 rounded"></div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="h-4 w-40 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                      <div className="h-6 w-32 bg-gray-400 dark:bg-gray-700 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SECTION F: Budget Estimates Skeleton */}
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
                    <div className="flex flex-col items-center text-center">
                      <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
                      <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                      <div className="h-6 w-28 bg-gray-400 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION G: Purpose of Travel Skeleton */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="h-4 w-44 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
                <div className="flex flex-wrap gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-8 w-28 bg-gray-300 dark:bg-gray-600 rounded-lg"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* SECTION H: Privacy & Pricing Skeleton */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center p-3 rounded-lg border bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  >
                    <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded mr-2"></div>
                    <div className="text-left">
                      <div className="h-4 w-40 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                      <div className="h-3 w-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Notes Section Skeleton */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="mb-4">
                <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
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

export default function NextStepPlanDetailsPage() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { data: planData, isLoading: planLoading } =
    useGetSingleRetirementPlanQuery(planId);
  const record = planData?.data || {};

  const { data, isLoading: isLoadingNotes } = useGetAllRetirementPlanNotesQuery(
    record?._id
  );
  const notes: TNote[] = data?.data || [];

  // Extract data using helper functions
  const contactInfo = getContactInfo(record);
  const retirementSnapshot = getRetirementSnapshot(record);
  const housingEquity = getHousingEquity(record);
  const dollarfarPlanning = getDollarFarPlanning(record);
  const travelPlanning = getTravelPlanning(record);
  const budgetEstimates = getBudgetEstimates(record);
  const privacyAcknowledgements = getPrivacyAcknowledgements(record);

  if (planLoading) {
    return <NextStepPlanDetailsPageSkeleton />;
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
            Back to Plans
          </button>
        </div>

        {/* Main Content Card */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* Header */}
          <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 px-6 py-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {contactInfo.name}'s Retirement Plan
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <Icon
                      icon="mdi:calendar"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      Submitted {formatDate(record.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <Icon
                      icon="mdi:map-marker"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      {contactInfo.region || "Region not specified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="p-6 space-y-6">
            {/* SECTION A: Contact Information */}
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
                      Province/State
                    </h3>
                  </div>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {contactInfo.region || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION B: Retirement Snapshot */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <Icon icon="mdi:finance" className="text-xl text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Retirement Snapshot
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:calendar-clock"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Target Retirement Age
                    </h3>
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {retirementSnapshot.target_age || "Not specified"}
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:cash"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Desired Annual Income
                    </h3>
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(
                      retirementSnapshot.desired_income as string
                    )}
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:bank"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Estimated Total Savings
                    </h3>
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(
                      retirementSnapshot?.estimated_savings as string
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION C: Housing & Real Estate Equity */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <Icon
                    icon="mdi:home-analytics"
                    className="text-xl text-white"
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Housing & Real Estate Equity
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:home"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Estimated Home Equity
                    </h3>
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(
                      housingEquity.estimated_home_equity as string
                    )}
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:heart-outline"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Comfort with Tapping Home Equity
                    </h3>
                  </div>
                  <div
                    className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border ${getComfortLevelColor(
                      housingEquity.equity_comfort as string
                    )}`}
                  >
                    <Icon
                      icon={
                        housingEquity.equity_comfort === "comfortable"
                          ? "mdi:check-circle"
                          : housingEquity.equity_comfort === "open"
                          ? "mdi:help-circle"
                          : housingEquity.equity_comfort === "none"
                          ? "mdi:close-circle"
                          : "mdi:information"
                      }
                      className="mr-2"
                    />
                    {housingEquity.equity_comfort || "Not specified"}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION D: DollarFar — Pre-Retirement Planning */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <Icon icon="mdi:calculator" className="text-xl text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  DollarFar — Pre-Retirement Planning
                </h2>
              </div>

              {/* Selected Calculators */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                  Selected Calculators
                </h3>
                <div className="flex flex-wrap gap-2">
                  {dollarfarPlanning.calculators?.map((calculator, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1.5 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-700"
                    >
                      <Icon
                        icon="mdi:check-circle"
                        className="mr-1.5 text-emerald-600"
                      />
                      {calculator}
                    </span>
                  ))}
                  {(!dollarfarPlanning?.calculators ||
                    dollarfarPlanning?.calculators?.length === 0) && (
                    <span className="text-gray-500 dark:text-gray-400 italic text-sm">
                      No calculators selected
                    </span>
                  )}
                </div>
              </div>

              {/* Interpretation Services & Subscription */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:account-voice"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Interpretation Services
                    </h3>
                  </div>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {dollarfarPlanning.interpretation_toggle
                      ? "Enabled"
                      : "Disabled"}
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon="mdi:card-account-details"
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Subscription Status
                    </h3>
                  </div>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {getSubscriptionStatus(
                      dollarfarPlanning.subscription_status || ""
                    )}
                  </p>
                  {dollarfarPlanning.subscription_payment_intent && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Payment Intent:{" "}
                      {dollarfarPlanning.subscription_payment_intent}
                    </p>
                  )}
                </div>
              </div>

              {/* Preferred Consultation Time */}
              {dollarfarPlanning.interpretation_toggle &&
                dollarfarPlanning.time_pre && (
                  <div className="mt-4 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <Icon
                        icon="mdi:clock-outline"
                        className="text-gray-600 dark:text-gray-400"
                      />
                      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Preferred Consultation Time
                      </h3>
                    </div>
                    <p className="text-base font-semibold text-gray-900 dark:text-white mt-2">
                      {dollarfarPlanning.time_pre}
                    </p>
                  </div>
                )}
            </div>

            {/* SECTION E: Travel Planning */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <Icon icon="mdi:airplane" className="text-xl text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Travel Planning — Book Now vs Future Interest
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Months Abroad Per Year
                    </h3>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {travelPlanning.months_abroad || "Not specified"}
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Earliest Start Timeline
                    </h3>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {travelPlanning.start_timeline || "Not specified"}
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Accommodation Style
                    </h3>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {travelPlanning.travel_style || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Country/Region Interest
                    </h3>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {travelPlanning.country_region_interest ||
                        "Not specified"}
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Ideal Locations Interest
                    </h3>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {travelPlanning.ideal_locations_interest ||
                        "Not specified"}
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Independent Travel Acknowledgement
                    </h3>
                    <p
                      className={`text-base font-semibold ${
                        travelPlanning.independent_travel_ack
                          ? "text-emerald-600"
                          : "text-gray-600"
                      }`}
                    >
                      {travelPlanning.independent_travel_ack ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION F: Budget Estimates */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <Icon
                    icon="mdi:wallet-outline"
                    className="text-xl text-white"
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Budget Estimates
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col items-center text-center">
                    <Icon
                      icon="mdi:home-currency-usd"
                      className="text-2xl text-gray-600 dark:text-gray-400 mb-3"
                    />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Monthly Home Budget
                    </h3>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatCurrency(
                        budgetEstimates.home_spend_monthly as string
                      )}
                    </p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col items-center text-center">
                    <Icon
                      icon="mdi:passport"
                      className="text-2xl text-gray-600 dark:text-gray-400 mb-3"
                    />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Monthly Abroad Budget
                    </h3>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatCurrency(
                        budgetEstimates?.abroad_budget_season as string
                      )}
                    </p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col items-center text-center">
                    <Icon
                      icon="mdi:airplane-ticket"
                      className="text-2xl text-gray-600 dark:text-gray-400 mb-3"
                    />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Flight & Insurance Budget
                    </h3>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {budgetEstimates.flights_insurance_budget ||
                        "Not specified"}
                    </p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col items-center text-center">
                    <Icon
                      icon="mdi:airplane-seat"
                      className="text-2xl text-gray-600 dark:text-gray-400 mb-3"
                    />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Preferred Flight Class
                    </h3>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {budgetEstimates.flight_class || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION G: Purpose of Travel */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <Icon
                    icon="mdi:heart-multiple"
                    className="text-xl text-white"
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Purpose of Travel
                </h2>
              </div>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                  Selected Travel Purposes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {record.travel_purposes?.map(
                    (purpose: string, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1.5 text-sm bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg border border-blue-200 dark:border-blue-800"
                      >
                        <Icon icon="mdi:check-circle" className="mr-1.5" />
                        {purpose}
                      </span>
                    )
                  )}
                  {record?.travel_purposes?.length === 0 && (
                    <span className="text-gray-500 dark:text-gray-400 italic text-sm">
                      No travel purposes specified
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION H: Privacy & Pricing */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <Icon
                    icon="mdi:shield-check"
                    className="text-xl text-white"
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Privacy & Pricing
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {getStatusBadge(
                  privacyAcknowledgements.ack_poc || false,
                  "Proof of Concept Acknowledgement"
                )}
                {getStatusBadge(
                  privacyAcknowledgements.consent_contact || false,
                  "Contact Consent"
                )}
                {getStatusBadge(
                  privacyAcknowledgements.ack_scope || false,
                  "Scope Acknowledgment"
                )}
              </div>
            </div>

            {/* Client Notes Section */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Client Notes
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Track all conversations, meetings, and important details with
                  this client
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
                    No notes have been added for this client yet.
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
