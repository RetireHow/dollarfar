/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { TPlan } from "../types/plan.type";
import { useGetAllRetirementPlansQuery } from "../../../redux/features/APIEndpoints/retirementPlansApi/retirementPlansApi";
import { NotesModal } from "../Modals/NotesModal";
import { EmailModal } from "../Modals/EmailModal";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

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
export const NoteLoadingSkeleton = () => {
  return (
    <section className="space-y-5">
      {/* TNote 1 */}
      <div className="bg-gray-50 dark:bg-gray-700 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-600 animate-pulse">
        <div className="md:flex justify-between items-center md:space-x-3">
          {/* TNote content skeleton */}
          <div className="md:mb-0 mb-2 w-full">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          </div>

          {/* Action buttons skeleton */}
          <div className="flex items-center gap-3">
            <div className="border-[1px] md:mr-0 mr-3 border-gray-300 px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-600">
              <div className="w-6 h-5"></div>
            </div>
            <div className="border-[1px] border-gray-300 px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-600">
              <div className="w-6 h-5"></div>
            </div>
          </div>
        </div>

        {/* Footer skeleton */}
        <div className="flex justify-between items-center mt-2 text-sm">
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
        </div>
      </div>
      {/* TNote 2 */}
      <div className="bg-gray-50 dark:bg-gray-700 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-600 animate-pulse">
        <div className="md:flex justify-between items-center md:space-x-3">
          {/* TNote content skeleton */}
          <div className="md:mb-0 mb-2 w-full">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          </div>

          {/* Action buttons skeleton */}
          <div className="flex items-center gap-3">
            <div className="border-[1px] md:mr-0 mr-3 border-gray-300 px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-600">
              <div className="w-6 h-5"></div>
            </div>
            <div className="border-[1px] border-gray-300 px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-600">
              <div className="w-6 h-5"></div>
            </div>
          </div>
        </div>

        {/* Footer skeleton */}
        <div className="flex justify-between items-center mt-2 text-sm">
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
        </div>
      </div>
      {/* TNote 3 */}
      <div className="bg-gray-50 dark:bg-gray-700 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-600 animate-pulse">
        <div className="md:flex justify-between items-center md:space-x-3">
          {/* TNote content skeleton */}
          <div className="md:mb-0 mb-2 w-full">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          </div>

          {/* Action buttons skeleton */}
          <div className="flex items-center gap-3">
            <div className="border-[1px] md:mr-0 mr-3 border-gray-300 px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-600">
              <div className="w-6 h-5"></div>
            </div>
            <div className="border-[1px] border-gray-300 px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-600">
              <div className="w-6 h-5"></div>
            </div>
          </div>
        </div>

        {/* Footer skeleton */}
        <div className="flex justify-between items-center mt-2 text-sm">
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
        </div>
      </div>
    </section>
  );
};

/*=====================| Main Component |=================*/
export default function NextStepPlans() {
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [selectedRecordForAction, setSelectedRecordForAction] =
    useState<TPlan | null>(null);

  const { data, isLoading } = useGetAllRetirementPlansQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const retirementPlans: TPlan[] = data?.data || [];

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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleAddNote = async (record: TPlan) => {
    setSelectedRecordForAction(record);
    setNotesModalOpen(true);
  };

  const handleEmailModal = async (record: TPlan) => {
    setSelectedRecordForAction(record);
    setEmailModalOpen(true);
  };

  // Show skeleton if data is loading
  if (isLoading) {
    return <h1 className="font-bold text-[2rem] animate-pulse">Loading...</h1>;
  }

  return (
    <div className="dark:bg-gray-900 dark:text-gray-100">
      <div>
        {/* All Plans */}
        <section className="mb-12">
          <h1 className="text-[1.5rem] font-semibold mb-2 dark:text-white">
            Retirement Next Step Plans
          </h1>
          <div className="overflow-x-auto border border-gray-100 dark:border-gray-700 rounded-lg">
            {retirementPlans?.length > 0 ? (
              <table className="divide-y divide-gray-200 dark:divide-gray-700 w-full">
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
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-300 dark:divide-gray-700">
                  {retirementPlans?.map((record) => {
                    const contactInfo = getContactInfo(record);
                    const retirementSnapshot = getRetirementSnapshot(record);
                    const travelPlanning = getTravelPlanning(record);

                    return (
                      <tr
                        key={record._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {contactInfo.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {contactInfo.region || "No region"}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                          <div>
                            <p className="text-gray-900 dark:text-white">
                              {contactInfo.email}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {contactInfo.phone}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                          <div className="space-y-1">
                            <p className="text-sm">
                              <span className="font-medium dark:text-white">
                                Age:
                              </span>{" "}
                              <span className="dark:text-gray-300">
                                {retirementSnapshot.target_age || "Not set"}
                              </span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium dark:text-white">
                                Income:
                              </span>{" "}
                              <span className="dark:text-gray-300">
                                {formatCurrency(
                                  retirementSnapshot.desired_income as string
                                )}
                              </span>
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                          <div className="space-y-1">
                            <p className="text-sm">
                              <span className="font-medium dark:text-white">
                                Destination:
                              </span>{" "}
                              <span className="dark:text-gray-300">
                                {travelPlanning.country_region_interest ||
                                  "Not set"}
                              </span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium dark:text-white">
                                Timeline:
                              </span>{" "}
                              <span className="dark:text-gray-300">
                                {travelPlanning.start_timeline || "Not set"}
                              </span>
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(record.createdAt)}
                          </p>
                        </td>
                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-2">
                            <Link to={`plan-details/${record._id}`}>
                              <button className="w-full px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors font-medium text-sm">
                                View Details
                              </button>
                            </Link>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleAddNote(record)}
                                className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                              >
                                Note
                              </button>
                              <button
                                onClick={() => handleEmailModal(record)}
                                className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                              >
                                Email
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12 border border-gray-200 dark:border-gray-700 rounded-lg">
                <Icon
                  icon="mdi:calendar-check"
                  className="text-4xl text-gray-400 dark:text-gray-500 mx-auto mb-3"
                />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  No retirement next step plans
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  There are no retirement next step plans submitted.
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Total plans in system: {retirementPlans.length}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Notes Modal */}
      {notesModalOpen && (
        <NotesModal
          onClose={() => setNotesModalOpen(false)}
          selectedRecordForAction={selectedRecordForAction as TPlan}
        />
      )}

      {/* Email Modal */}
      {emailModalOpen && (
        <EmailModal
          onClose={() => setEmailModalOpen(false)}
          selectedRecordForAction={selectedRecordForAction as TPlan}
        />
      )}
    </div>
  );
}
