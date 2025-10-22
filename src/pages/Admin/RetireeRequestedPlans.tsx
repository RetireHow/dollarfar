import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { baseUrl } from "../../api/apiConstant";
import { toast } from "react-toastify";
import DashboardDownloadSkeleton from "../../components/UI/LoadingSkeletons/DashboardDownloadSkeleton";
import DashboardStatsSkeleton from "../../components/UI/LoadingSkeletons/DashboardStatsSkeleton";

interface RetirementData {
  _id: string;
  full_name: string;
  phone: string;
  email: string;
  region: string;
  target_age: string;
  desired_income: string;
  estimated_savings: string;
  estimated_home_equity: string;
  equity_comfort: string;
  country_region: string;
  ideal_locations: string;
  months_abroad: string;
  start_timeline: string;
  travel_style: string;
  independent_travel_ack: boolean;
  home_spend_monthly: string;
  abroad_budget_season: string;
  flights_insurance_budget: string;
  flight_class: string;
  travel_purpose: string[];
  interests: string[];
  fee_ack: boolean;
  consent_contact: boolean;
  consent_marketing: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function RetireeRequestedPlans() {
  const [selectedRecord, setSelectedRecord] = useState<RetirementData | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(true);
  const [requestedPlans, setRequestedPlans] = useState<RetirementData[]>([]);

  useEffect(() => {
    const fetchRequestedPlans = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${baseUrl}/retirement-next-step/get`);
        if (!res.ok) throw new Error("Failed to fetch users");
        // Parse JSON response
        const data = await res.json();
        // Sort by createdAt descending
        console.log("Loaded Requested Data===================> ", data?.data);

        setRequestedPlans(data?.data);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        toast.error(`There was a problem fetching users: ${message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequestedPlans();
  }, []);

  // Get unique regions for filter
  const regions = Array.from(
    new Set(requestedPlans.map((record) => record.region).filter(Boolean))
  );

  const formatCurrency = (amount: string) => {
    if (!amount) return "Not specified";
    const num = parseFloat(amount);
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

  const getComfortLevelColor = (comfort: string) => {
    switch (comfort) {
      case "comfortable":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "open":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "none":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const DetailModal = ({
    record,
    onClose,
  }: {
    record: RetirementData;
    onClose: () => void;
  }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50 top-16">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[70vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {record.full_name}'s Retirement Plan
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Submitted on {formatDate(record.createdAt)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <Icon icon="mdi:close" className="text-2xl text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Contact Information */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
              <Icon icon="mdi:account-outline" className="text-blue-600 dark:text-blue-400" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Email
                </label>
                <p className="text-blue-900 dark:text-blue-100">{record.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Phone
                </label>
                <p className="text-blue-900 dark:text-blue-100">{record.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Region
                </label>
                <p className="text-blue-900 dark:text-blue-100">
                  {record.region || "Not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Retirement Snapshot */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
              <Icon icon="mdi:finance" className="text-green-600 dark:text-green-400" />
              Retirement Snapshot
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-green-700 dark:text-green-300">
                  Target Age
                </label>
                <p className="text-green-900 dark:text-green-100">
                  {record.target_age || "Not specified"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-green-700 dark:text-green-300">
                  Desired Income
                </label>
                <p className="text-green-900 dark:text-green-100">
                  {formatCurrency(record.desired_income)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-green-700 dark:text-green-300">
                  Estimated Savings
                </label>
                <p className="text-green-900 dark:text-green-100">
                  {formatCurrency(record.estimated_savings)}
                </p>
              </div>
            </div>
          </div>

          {/* Housing & Real Estate */}
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-2">
              <Icon icon="mdi:home-outline" className="text-amber-600 dark:text-amber-400" />
              Housing & Real Estate
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-amber-700 dark:text-amber-300">
                  Home Equity
                </label>
                <p className="text-amber-900 dark:text-amber-100">
                  {formatCurrency(record.estimated_home_equity)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-amber-700 dark:text-amber-300">
                  Equity Comfort
                </label>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getComfortLevelColor(
                    record.equity_comfort
                  )}`}
                >
                  {record.equity_comfort || "Not specified"}
                </span>
              </div>
            </div>
          </div>

          {/* Travel Preferences */}
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4 flex items-center gap-2">
              <Icon icon="mdi:airplane" className="text-purple-600 dark:text-purple-400" />
              Travel Preferences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    Destination
                  </label>
                  <p className="text-purple-900 dark:text-purple-100">
                    {record.country_region || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    Ideal Locations
                  </label>
                  <p className="text-purple-900 dark:text-purple-100">
                    {record.ideal_locations || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    Months Abroad
                  </label>
                  <p className="text-purple-900 dark:text-purple-100">
                    {record.months_abroad || "Not specified"}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    Start Timeline
                  </label>
                  <p className="text-purple-900 dark:text-purple-100">
                    {record.start_timeline || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    Travel Style
                  </label>
                  <p className="text-purple-900 dark:text-purple-100">
                    {record.travel_style || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    Flight Class
                  </label>
                  <p className="text-purple-900 dark:text-purple-100">
                    {record.flight_class || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Budget & Interests */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-4 flex items-center gap-2">
                <Icon icon="mdi:wallet-outline" className="text-indigo-600 dark:text-indigo-400" />
                Budget Estimates
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                    Monthly Home Spend
                  </label>
                  <p className="text-indigo-900 dark:text-indigo-100">
                    {formatCurrency(record.home_spend_monthly)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                    Seasonal Abroad Budget
                  </label>
                  <p className="text-indigo-900 dark:text-indigo-100">
                    {formatCurrency(record.abroad_budget_season)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                    Flights & Insurance
                  </label>
                  <p className="text-indigo-900 dark:text-indigo-100">
                    {record.flights_insurance_budget || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-lime-50 dark:bg-lime-900/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-lime-900 dark:text-lime-100 mb-4 flex items-center gap-2">
                <Icon icon="mdi:heart-outline" className="text-lime-600 dark:text-lime-400" />
                Travel Purpose
              </h3>
              <div className="flex flex-wrap gap-2">
                {record.travel_purpose.map((purpose, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-lime-100 text-lime-800 dark:bg-lime-800 dark:text-lime-200"
                  >
                    <Icon icon="mdi:check-circle" className="mr-1" />
                    {purpose}
                  </span>
                ))}
                {record.travel_purpose.length === 0 && (
                  <span className="text-lime-700 dark:text-lime-300">No purposes specified</span>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Icon icon="mdi:information-outline" className="text-gray-600 dark:text-gray-400" />
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Icon
                  icon={
                    record.independent_travel_ack
                      ? "mdi:check-circle"
                      : "mdi:close-circle"
                  }
                  className={
                    record.independent_travel_ack
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Independent Travel Capable
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon
                  icon={
                    record.fee_ack ? "mdi:check-circle" : "mdi:close-circle"
                  }
                  className={record.fee_ack ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}
                />
                <span className="text-gray-700 dark:text-gray-300">Fee Acknowledgment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <div className="p-6">
        {/* Stats Cards */}
        {isLoading ? (
          <DashboardStatsSkeleton numOfCards={4} />
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Total Submissions
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {requestedPlans.length}
                  </p>
                </div>
                <Icon
                  icon="mdi:account-group"
                  className="text-3xl text-blue-500 dark:text-blue-400"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    Active Regions
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {regions.length}
                  </p>
                </div>
                <Icon
                  icon="mdi:map-marker"
                  className="text-3xl text-green-500 dark:text-green-400"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                    Ready to Travel
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {
                      requestedPlans.filter((d) => d.independent_travel_ack)
                        .length
                    }
                  </p>
                </div>
                <Icon
                  icon="mdi:airplane"
                  className="text-3xl text-purple-500 dark:text-purple-400"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                    This Month
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {
                      requestedPlans.filter(
                        (d) =>
                          new Date(d.createdAt).getMonth() ===
                          new Date().getMonth()
                      ).length
                    }
                  </p>
                </div>
                <Icon
                  icon="mdi:calendar-month"
                  className="text-3xl text-amber-500 dark:text-amber-400"
                />
              </div>
            </div>
          </section>
        )}

        {/* Data Table */}
        <section>
          <h1 className="text-[1.5rem] font-semibold mb-2 dark:text-white">
            Retiree Requested Plans
          </h1>
          <div className="overflow-x-auto border border-gray-300 dark:border-gray-700 rounded-lg">
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                    Client
                  </th>
                  <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                    Contact
                  </th>
                  <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                    Retirement Goals
                  </th>
                  <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                    Travel Preferences
                  </th>
                  <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                    Submitted
                  </th>
                  <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              {isLoading ? (
                <DashboardDownloadSkeleton />
              ) : (
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-300 dark:divide-gray-700">
                  {requestedPlans?.map((record) => (
                    <tr
                      key={record._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {record.full_name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {record.region || "No region"}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                        <div>
                          <p className="text-gray-900 dark:text-white">{record.email}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {record.phone}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="font-medium dark:text-white">Age:</span>{" "}
                            <span className="dark:text-gray-300">{record.target_age || "Not set"}</span>
                          </p>
                          <p className="text-sm">
                            <span className="font-medium dark:text-white">Income:</span>{" "}
                            <span className="dark:text-gray-300">{formatCurrency(record.desired_income)}</span>
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="font-medium dark:text-white">Destination:</span>{" "}
                            <span className="dark:text-gray-300">{record.country_region || "Not set"}</span>
                          </p>
                          <p className="text-sm">
                            <span className="font-medium dark:text-white">Timeline:</span>{" "}
                            <span className="dark:text-gray-300">{record.start_timeline || "Not set"}</span>
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(record.createdAt)}
                        </p>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                        <button
                          onClick={() =>
                            setSelectedRecord(record as RetirementData)
                          }
                          className="inline-flex items-center px-4 py-2 bg-neutral-600 dark:bg-neutral-700 text-white rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-600 transition-colors font-medium"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </section>
      </div>

      {/* Detail Modal */}
      {selectedRecord && (
        <DetailModal
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      )}
    </div>
  );
}