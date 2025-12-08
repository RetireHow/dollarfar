import { useState } from "react";
import { useGetAllConsultationSessoinsQuery } from "../../../redux/features/APIEndpoints/consultationSessionApi/consultationSessionApi";

import { NotesModal } from "../Modals/NotesModal";
import { EmailModal } from "../Modals/EmailModal";
import { TSession } from "../types/session.type";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import moment from "moment";

export const getContactInfo = (record: TSession) => record.contact || {};
export const getDollarFarPlanning = (record: TSession) =>
  record.dollarfar_planning || {};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getSessionStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "scheduled":
      return "bg-green-100 text-green-800";
    case "completed":
      return "bg-emerald-100 text-emerald-800";
    case "cancelled":
      return "bg-rose-100 text-rose-800";
    case "used":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Function to check if a session is upcoming
const isUpcomingSession = (session: TSession): boolean => {
  const consultationTime = session.dollarfar_planning?.consultation_time;
  if (!consultationTime) return false;

  const now = new Date();
  const scheduledTime = new Date(consultationTime);

  // Check if session is in the future AND has status "scheduled"
  return scheduledTime >= now && session.status?.toLowerCase() === "scheduled";
};

function BookedSessionsSkeleton() {
  return (
    <>
      {/* Upcoming Sessions Section Skeleton */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Upcoming Consultation Sessions
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              View and manage upcoming scheduled consultations
            </p>
          </div>
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>

        <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {[...Array(4)].map((_, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                  >
                    <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {[...Array(5)].map((_, rowIndex) => (
                <tr key={rowIndex} className="animate-pulse">
                  {/* Session Column */}
                  <td className="px-6 py-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-28 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        <div className="h-5 w-14 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                      <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </td>

                  {/* Client Column */}
                  <td className="px-6 py-4">
                    <div className="space-y-3">
                      <div className="h-5 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </td>

                  {/* Scheduled Time Column */}
                  <td className="px-6 py-4">
                    <div className="space-y-3">
                      <div className="h-5 w-40 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4">
                    <div className="space-y-3">
                      <div className="h-10 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="flex gap-2">
                        <div className="flex-1 h-9 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="flex-1 h-9 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Completed Sessions Section Skeleton */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Completed Consultation Sessions
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              View and manage completed scheduled consultations
            </p>
          </div>
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>

        <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {[...Array(4)].map((_, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                  >
                    <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {[...Array(3)].map((_, rowIndex) => (
                <tr key={rowIndex} className="animate-pulse">
                  {/* Session Column */}
                  <td className="px-6 py-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-28 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        <div className="h-5 w-14 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                      <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </td>

                  {/* Client Column */}
                  <td className="px-6 py-4">
                    <div className="space-y-3">
                      <div className="h-5 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </td>

                  {/* Scheduled Time Column */}
                  <td className="px-6 py-4">
                    <div className="space-y-3">
                      <div className="h-5 w-40 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4">
                    <div className="space-y-3">
                      <div className="h-10 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="flex gap-2">
                        <div className="flex-1 h-9 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="flex-1 h-9 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default function BookedSessions() {
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [selectedRecordForAction, setSelectedRecordForAction] =
    useState<TSession | null>(null);

  const { data, isLoading } = useGetAllConsultationSessoinsQuery(undefined);
  const allSessions: TSession[] = data?.data || [];

  // Filter only upcoming scheduled sessions
  const upcomingSessions = allSessions.filter(isUpcomingSession);

  // Sort by scheduled time (earliest first)
  const sortedSessions = [...upcomingSessions].sort((a, b) => {
    const timeA = a.dollarfar_planning?.consultation_time
      ? new Date(a.dollarfar_planning.consultation_time).getTime()
      : 0;
    const timeB = b.dollarfar_planning?.consultation_time
      ? new Date(b.dollarfar_planning.consultation_time).getTime()
      : 0;
    return timeA - timeB;
  });

  // Calculate completed/past sessions
  const completedSessions = allSessions?.filter((session: TSession) => {
    const now = new Date();
    const consultationTime = session.dollarfar_planning?.consultation_time;
    if (!consultationTime) return false;

    const scheduledTime = new Date(consultationTime);
    return scheduledTime <= now;
  });

  // Sort by scheduled time (latest first)
  const sortedCompletedSessions = [...completedSessions].sort((a, b) => {
    const timeA = a.dollarfar_planning?.consultation_time
      ? new Date(a.dollarfar_planning.consultation_time).getTime()
      : 0;
    const timeB = b.dollarfar_planning?.consultation_time
      ? new Date(b.dollarfar_planning.consultation_time).getTime()
      : 0;
    return timeB - timeA;
  });

  const handleAddNote = async (record: TSession) => {
    setSelectedRecordForAction(record);
    setNotesModalOpen(true);
  };

  const handleEmailModal = async (record: TSession) => {
    setSelectedRecordForAction(record);
    setEmailModalOpen(true);
  };

  const getTimeUntilSession = (consultationTime: string): string => {
    if (!consultationTime) return "";

    const now = moment();
    const scheduled = moment(consultationTime);

    if (scheduled.isBefore(now)) {
      return "Started";
    }

    return scheduled.fromNow(); // Returns "in 2 days", "in 3 hours", etc.
  };

  // Show skeleton if data is loading
  if (isLoading) {
    return <BookedSessionsSkeleton />;
  }

  return (
    <>
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Upcoming Consultation Sessions
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              View and manage upcoming scheduled consultations
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">
                {sortedSessions.length}
              </span>{" "}
              upcoming •{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {allSessions.length - sortedSessions.length}
              </span>{" "}
              others
            </div>
          </div>
        </div>

        {sortedSessions.length > 0 ? (
          <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Session
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Scheduled Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {sortedSessions.map((record: TSession) => {
                  const contactInfo = getContactInfo(record);
                  const dollarfarPlanning = getDollarFarPlanning(record);
                  const consultationTime = dollarfarPlanning.consultation_time;

                  // Calculate if session is today
                  const isToday = consultationTime
                    ? new Date(consultationTime).toDateString() ===
                      new Date().toDateString()
                    : false;

                  return (
                    <tr
                      key={record._id}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                        isToday ? "bg-green-50/50 dark:bg-green-900/10" : ""
                      }`}
                    >
                      {/* Session */}
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 dark:text-white">
                              Session #{record.session_number}
                            </span>
                            {isToday && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                Today
                              </span>
                            )}
                          </div>
                          <div
                            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getSessionStatusColor(
                              record.status
                            )}`}
                          >
                            {record.status || "Unknown"}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {record.session_duration || 30} min
                          </div>
                        </div>
                      </td>

                      {/* Client */}
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {contactInfo.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {contactInfo.email}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {contactInfo.phone}
                          </div>
                        </div>
                      </td>

                      {/* Scheduled Time */}
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {consultationTime
                              ? formatDate(consultationTime)
                              : "Not scheduled"}
                          </div>
                          {/* Added time until session */}
                          {consultationTime && (
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {getTimeUntilSession(consultationTime)}
                            </div>
                          )}
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {record.sessions_remaining} sessions remaining
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2">
                          <Link to={`session-details/${record._id}`}>
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
          </div>
        ) : (
          <div className="text-center py-12 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Icon
              icon="mdi:calendar-check"
              className="text-4xl text-gray-400 dark:text-gray-500 mx-auto mb-3"
            />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              No upcoming sessions
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              There are no upcoming consultation sessions scheduled.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Total sessions in system: {allSessions.length}
            </div>
          </div>
        )}

        {/* Notes Modal */}
        {notesModalOpen && (
          <NotesModal
            onClose={() => setNotesModalOpen(false)}
            selectedRecordForAction={selectedRecordForAction as TSession}
          />
        )}

        {/* Email Modal */}
        {emailModalOpen && (
          <EmailModal
            onClose={() => setEmailModalOpen(false)}
            selectedRecordForAction={selectedRecordForAction as TSession}
          />
        )}
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Completed Consultation Sessions
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              View and manage completed scheduled consultations
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">
                {sortedSessions.length}
              </span>{" "}
              upcoming •{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {allSessions.length - sortedSessions.length}
              </span>{" "}
              others
            </div>
          </div>
        </div>

        {sortedCompletedSessions.length > 0 ? (
          <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Session
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Scheduled Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {sortedCompletedSessions.map((record: TSession) => {
                  const contactInfo = getContactInfo(record);
                  const dollarfarPlanning = getDollarFarPlanning(record);
                  const consultationTime = dollarfarPlanning.consultation_time;

                  // Calculate if session is today
                  const isToday = consultationTime
                    ? new Date(consultationTime).toDateString() ===
                      new Date().toDateString()
                    : false;

                  return (
                    <tr
                      key={record._id}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                        isToday ? "bg-green-50/50 dark:bg-green-900/10" : ""
                      }`}
                    >
                      {/* Session */}
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 dark:text-white">
                              Session #{record.session_number}
                            </span>
                            {isToday && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                Today
                              </span>
                            )}
                          </div>
                          <div
                            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getSessionStatusColor(
                              record.status
                            )}`}
                          >
                            {record.status || "Unknown"}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {record.session_duration || 30} min
                          </div>
                        </div>
                      </td>

                      {/* Client */}
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {contactInfo.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {contactInfo.email}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {contactInfo.phone}
                          </div>
                        </div>
                      </td>

                      {/* Scheduled Time */}
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {consultationTime
                              ? formatDate(consultationTime)
                              : "Not scheduled"}
                          </div>
                          {/* Added time until session */}
                          {consultationTime && (
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {getTimeUntilSession(consultationTime)}
                            </div>
                          )}
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {record.sessions_remaining} sessions remaining
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2">
                          <Link to={`session-details/${record._id}`}>
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
          </div>
        ) : (
          <div className="text-center py-12 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Icon
              icon="mdi:calendar-check"
              className="text-4xl text-gray-400 dark:text-gray-500 mx-auto mb-3"
            />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              No completed sessions
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              There are no completed consultation sessions.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Total completed sessions in system: {completedSessions.length}
            </div>
          </div>
        )}

        {/* Notes Modal */}
        {notesModalOpen && (
          <NotesModal
            onClose={() => setNotesModalOpen(false)}
            selectedRecordForAction={selectedRecordForAction as TSession}
          />
        )}

        {/* Email Modal */}
        {emailModalOpen && (
          <EmailModal
            onClose={() => setEmailModalOpen(false)}
            selectedRecordForAction={selectedRecordForAction as TSession}
          />
        )}
      </section>
    </>
  );
}
