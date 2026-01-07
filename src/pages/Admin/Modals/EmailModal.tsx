import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { showApiErrorToast } from "../../../utils/showApiErrorToast";
import { toast } from "react-toastify";
import {
  useAddRetirementEmailMutation,
  useGetAllRetirementEmailQuery,
} from "../../../redux/features/APIEndpoints/retirementEmailApi/retirementEmailApi";
import { useGetMeQuery } from "../../../redux/features/APIEndpoints/userApi/userApi";
import { TEmail } from "../types/email.type";
import { TSession } from "../types/session.type";
const getContactInfo = (record: TSession) => record.contact || {};

export const EmailModal = ({
  onClose,
  selectedRecordForAction,
}: {
  onClose: () => void;
  selectedRecordForAction: TSession;
}) => {
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const { data, isLoading: isLoadingHistory } = useGetAllRetirementEmailQuery(
    selectedRecordForAction?._id
  );
  const [
    addRetirementEmail,
    {
      isLoading: isAddingEmail,
      error: addEmailError,
      isError: isAddEmailError,
    },
  ] = useAddRetirementEmailMutation(undefined);

  const { data: user } = useGetMeQuery(undefined);

  const handleSendEmailSubmit = async () => {
    if (!emailSubject.trim() || !emailBody.trim() || !selectedRecordForAction) {
      toast.error("Please fill in both subject and body");
      return;
    }

    const newEmailData = {
      subject: emailSubject,
      body: emailBody,
      planId: selectedRecordForAction?._id,
      userId:
        user?.data?.role === "superAdmin" ? user?.data?._id : user?.data?.user,
    };

    const res = await addRetirementEmail(newEmailData);
    if (res?.error) return;
    toast.success(`Email sent to ${contactInfo.name}!`);
  };

  const handleReuseEmail = (email: any) => {
    setEmailSubject(email.subject);
    setEmailBody(email.body);
    setShowHistory(false);
    // Scroll to top smoothly
    document
      .querySelector(".bg-white")
      ?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const contactInfo = getContactInfo(selectedRecordForAction);

  useEffect(() => {
    if (!isAddingEmail && isAddEmailError && addEmailError) {
      showApiErrorToast(addEmailError);
    }
  }, [isAddingEmail, isAddEmailError, addEmailError]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-[1000] top-0">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[88vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-2xl z-10">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Send Email to {contactInfo?.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {contactInfo?.email}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-red-100 hover:bg-red-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full transition-colors flex-shrink-0"
            >
              <Icon
                icon="mdi:close"
                className="text-2xl text-red-500 dark:text-gray-400"
              />
            </button>
          </div>
        </div>

        {/* Email Form */}
        <div className="space-y-6 p-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Subject
            </label>
            <input
              type="text"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Email subject..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
              Email Body
            </label>
            <textarea
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              rows={8}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              placeholder="Write your email content here..."
            />
          </div>

          <div className="space-y-3">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Recipient: {contactInfo?.email}</p>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleSendEmailSubmit}
                disabled={
                  !emailSubject.trim() || !emailBody.trim() || isAddingEmail
                }
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium w-full"
              >
                {isAddingEmail ? "Sending..." : "Send Email"}
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Previously Sent Emails Section */}
        <div className="border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="w-full p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-center">
              <Icon
                icon={showHistory ? "mdi:chevron-down" : "mdi:chevron-right"}
                className="text-xl text-gray-500 mr-3 transition-transform"
              />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Previously Sent Emails
              </h3>
              <span className="ml-2 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                {data?.data?.length}
              </span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Click to {showHistory ? "collapse" : "expand"}
            </span>
          </button>

          {showHistory && (
            <div className="p-4 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
              {isLoadingHistory ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                </div>
              ) : data?.data?.length === 0 ? (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                  <Icon
                    icon="mdi:email-outline"
                    className="text-3xl mx-auto mb-3 opacity-50"
                  />
                  <p>No emails sent yet</p>
                  <p className="text-sm mt-1">
                    Start by sending your first email above
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {data?.data?.map((email: TEmail) => (
                    <div
                      key={email._id}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm flex-1 mr-3">
                          {email.subject}
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap shrink-0">
                          {formatDate(email.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                        {email.body}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          <Icon icon="mdi:check" className="w-3 h-3 mr-1" />
                          Sent
                        </span>
                        <button
                          onClick={() => handleReuseEmail(email)}
                          className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 flex items-center font-medium"
                        >
                          <Icon icon="mdi:replay" className="w-4 h-4 mr-1" />
                          Reuse Template
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
