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
        return "bg-green-100 text-green-800";
      case "open":
        return "bg-yellow-100 text-yellow-800";
      case "none":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const DetailModal = ({
    record,
    onClose,
  }: {
    record: RetirementData;
    onClose: () => void;
  }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 top-16">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[70vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {record.full_name}'s Retirement Plan
              </h2>
              <p className="text-gray-600">
                Submitted on {formatDate(record.createdAt)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Icon icon="mdi:close" className="text-2xl text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Contact Information */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
              <Icon icon="mdi:account-outline" className="text-blue-600" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-blue-700">
                  Email
                </label>
                <p className="text-blue-900">{record.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-blue-700">
                  Phone
                </label>
                <p className="text-blue-900">{record.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-blue-700">
                  Region
                </label>
                <p className="text-blue-900">
                  {record.region || "Not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Retirement Snapshot */}
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
              <Icon icon="mdi:finance" className="text-green-600" />
              Retirement Snapshot
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-green-700">
                  Target Age
                </label>
                <p className="text-green-900">
                  {record.target_age || "Not specified"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-green-700">
                  Desired Income
                </label>
                <p className="text-green-900">
                  {formatCurrency(record.desired_income)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-green-700">
                  Estimated Savings
                </label>
                <p className="text-green-900">
                  {formatCurrency(record.estimated_savings)}
                </p>
              </div>
            </div>
          </div>

          {/* Housing & Real Estate */}
          <div className="bg-amber-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
              <Icon icon="mdi:home-outline" className="text-amber-600" />
              Housing & Real Estate
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-amber-700">
                  Home Equity
                </label>
                <p className="text-amber-900">
                  {formatCurrency(record.estimated_home_equity)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-amber-700">
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
          <div className="bg-purple-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center gap-2">
              <Icon icon="mdi:airplane" className="text-purple-600" />
              Travel Preferences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-purple-700">
                    Destination
                  </label>
                  <p className="text-purple-900">
                    {record.country_region || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-purple-700">
                    Ideal Locations
                  </label>
                  <p className="text-purple-900">
                    {record.ideal_locations || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-purple-700">
                    Months Abroad
                  </label>
                  <p className="text-purple-900">
                    {record.months_abroad || "Not specified"}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-purple-700">
                    Start Timeline
                  </label>
                  <p className="text-purple-900">
                    {record.start_timeline || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-purple-700">
                    Travel Style
                  </label>
                  <p className="text-purple-900">
                    {record.travel_style || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-purple-700">
                    Flight Class
                  </label>
                  <p className="text-purple-900">
                    {record.flight_class || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Budget & Interests */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:wallet-outline" className="text-indigo-600" />
                Budget Estimates
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-indigo-700">
                    Monthly Home Spend
                  </label>
                  <p className="text-indigo-900">
                    {formatCurrency(record.home_spend_monthly)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-indigo-700">
                    Seasonal Abroad Budget
                  </label>
                  <p className="text-indigo-900">
                    {formatCurrency(record.abroad_budget_season)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-indigo-700">
                    Flights & Insurance
                  </label>
                  <p className="text-indigo-900">
                    {record.flights_insurance_budget || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-lime-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-lime-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:heart-outline" className="text-lime-600" />
                Travel Purpose
              </h3>
              <div className="flex flex-wrap gap-2">
                {record.travel_purpose.map((purpose, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-lime-100 text-lime-800"
                  >
                    <Icon icon="mdi:check-circle" className="mr-1" />
                    {purpose}
                  </span>
                ))}
                {record.travel_purpose.length === 0 && (
                  <span className="text-lime-700">No purposes specified</span>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Icon icon="mdi:information-outline" className="text-gray-600" />
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
                      ? "text-green-600"
                      : "text-red-600"
                  }
                />
                <span className="text-gray-700">
                  Independent Travel Capable
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon
                  icon={
                    record.fee_ack ? "mdi:check-circle" : "mdi:close-circle"
                  }
                  className={record.fee_ack ? "text-green-600" : "text-red-600"}
                />
                <span className="text-gray-700">Fee Acknowledgment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div>
        {/* Stats Cards */}
        {isLoading ? (
          <DashboardStatsSkeleton numOfCards={4} />
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">
                    Total Submissions
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {requestedPlans.length}
                  </p>
                </div>
                <Icon
                  icon="mdi:account-group"
                  className="text-3xl text-blue-500"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">
                    Active Regions
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {regions.length}
                  </p>
                </div>
                <Icon
                  icon="mdi:map-marker"
                  className="text-3xl text-green-500"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">
                    Ready to Travel
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {
                      requestedPlans.filter((d) => d.independent_travel_ack)
                        .length
                    }
                  </p>
                </div>
                <Icon
                  icon="mdi:airplane"
                  className="text-3xl text-purple-500"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-600">
                    This Month
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
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
                  className="text-3xl text-amber-500"
                />
              </div>
            </div>
          </section>
        )}

        {/* Data Table */}
        <section>
          <h1 className="text-[1.5rem] font-semibold mb-2">
            Retiree Requested Plans
          </h1>
          <div className="overflow-x-auto border border-gray-300 rounded-lg">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 dark:bg-neutral-900">
                <tr>
                  <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300">
                    Client
                  </th>
                  <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300">
                    Contact
                  </th>
                  <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300">
                    Retirement Goals
                  </th>
                  <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300">
                    Travel Preferences
                  </th>
                  <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300">
                    Submitted
                  </th>
                  <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              {isLoading ? (
                <DashboardDownloadSkeleton />
              ) : (
                <tbody className="bg-white dark:bg-neutral-900 divide-y divide-gray-300">
                  {requestedPlans?.map((record) => (
                    <tr
                      key={record._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {record.full_name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {record.region || "No region"}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300">
                        <div>
                          <p className="text-gray-900">{record.email}</p>
                          <p className="text-sm text-gray-500">
                            {record.phone}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300">
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">Age:</span>{" "}
                            {record.target_age || "Not set"}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Income:</span>{" "}
                            {formatCurrency(record.desired_income)}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300">
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">Destination:</span>{" "}
                            {record.country_region || "Not set"}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Timeline:</span>{" "}
                            {record.start_timeline || "Not set"}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300">
                        <p className="text-sm text-gray-500">
                          {formatDate(record.createdAt)}
                        </p>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300">
                        <button
                          onClick={() =>
                            setSelectedRecord(record as RetirementData)
                          }
                          className="inline-flex items-center px-4 py-2 bg-neutral-600 text-white rounded-lg hover:bg-neutral-800 transition-colors font-medium"
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
