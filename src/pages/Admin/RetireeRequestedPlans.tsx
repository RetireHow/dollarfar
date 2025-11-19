/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import DashboardDownloadSkeleton from "../../components/UI/LoadingSkeletons/DashboardDownloadSkeleton";
import {
  useAddRetirementPlanNoteMutation,
  useGetAllRetirementPlanNotesQuery,
  useRemoveRetirementPlanNoteMutation,
  useUpdateRetirementPlanNoteMutation,
} from "../../redux/features/APIEndpoints/retirementPlanNoteApi/retirementPlanNote";
import { showApiErrorToast } from "../../utils/showApiErrorToast";
import { useGetAllRetirementPlansQuery } from "../../redux/features/APIEndpoints/retirementPlansApi/retirementPlansApi";
import { useGetMeQuery } from "../../redux/features/APIEndpoints/userApi/userApi";

/**
 * Updated Type Definitions to match form structure
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

// Main Retirement Data Type matching form structure
type RetirementData = {
  _id: string;
  createdAt: string;
  updatedAt?: string;
  contact: ContactInfo;
  retirement_snapshot: RetirementSnapshot;
  housing_equity: HousingEquity;
  dollarfar_planning: DollarFarPlanning;
  travel_planning: TravelPlanning;
  budget_estimates: BudgetEstimates;
  travel_purpose: string[];
  privacy_acknowledgements: PrivacyAcknowledgements;
};

// Helper functions to safely access nested data
const getContactInfo = (record: RetirementData) => record.contact || {};
const getRetirementSnapshot = (record: RetirementData) =>
  record.retirement_snapshot || {};
const getHousingEquity = (record: RetirementData) =>
  record.housing_equity || {};
const getDollarFarPlanning = (record: RetirementData) =>
  record.dollarfar_planning || {};
const getTravelPlanning = (record: RetirementData) =>
  record.travel_planning || {};
const getBudgetEstimates = (record: RetirementData) =>
  record.budget_estimates || {};
const getPrivacyAcknowledgements = (record: RetirementData) =>
  record.privacy_acknowledgements || {};

interface Note {
  _id: string;
  content: string;
  retirementPlan: string;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}

//Note Loading Skeleton
const NoteLoadingSkeleton = () => {
  return (
    <section className="space-y-5">
      {/* Note 1 */}
      <div className="bg-gray-50 dark:bg-gray-700 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-600 animate-pulse">
        <div className="md:flex justify-between items-center md:space-x-3">
          {/* Note content skeleton */}
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
      {/* Note 2 */}
      <div className="bg-gray-50 dark:bg-gray-700 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-600 animate-pulse">
        <div className="md:flex justify-between items-center md:space-x-3">
          {/* Note content skeleton */}
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
      {/* Note 3 */}
      <div className="bg-gray-50 dark:bg-gray-700 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-600 animate-pulse">
        <div className="md:flex justify-between items-center md:space-x-3">
          {/* Note content skeleton */}
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

// Notes Modal Component
const NotesModal = ({
  onClose,
  selectedRecordForAction,
}: {
  onClose: () => void;
  selectedRecordForAction: RetirementData;
}) => {
  const [newNote, setNewNote] = useState<string>("");
  const [editingNote, setEditingNote] = useState<Note | null>();
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);

  const {
    data,
    isLoading: isLoadingNotes,
    isError: isErrorFetchingNote,
  } = useGetAllRetirementPlanNotesQuery(selectedRecordForAction._id);
  const { data: user } = useGetMeQuery(undefined);

  const [
    addRetirementPlanNote,
    {
      isLoading: isAddingNewNote,
      isError: isErrorAddingNewNote,
      error: noteAddError,
    },
  ] = useAddRetirementPlanNoteMutation();

  const [
    updateRetirementPlanNote,
    {
      isLoading: isUpdatingNote,
      isError: isErrorUpdatingNote,
      error: noteUpdateError,
    },
  ] = useUpdateRetirementPlanNoteMutation();

  const [
    removeRetirementPlanNote,
    {
      isLoading: isRemovingNote,
      isError: isErrorRemovingNote,
      error: noteRemoveError,
    },
  ] = useRemoveRetirementPlanNoteMutation();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSaveNote = async () => {
    if (!newNote.trim() || !selectedRecordForAction) return;
    const currentUserName = user?.data?.name;
    const newNoteData = {
      retirementPlan: selectedRecordForAction._id,
      content: newNote,
      createdBy: currentUserName,
    };
    const res = await addRetirementPlanNote(newNoteData);
    if (res?.error) return;
    setNewNote("");
    toast.success("A new note is added successfully.");
  };

  const handleEditNote = async (note: Note) => {
    setEditingNote(note);
    setNewNote(note.content);
    const modalContent = document.querySelector(".modal-content-scrollable");
    if (modalContent) {
      modalContent.scrollTo({ behavior: "smooth", top: 0 });
    }
  };

  const handleUpdateNote = async () => {
    const updateNoteData = { noteId: editingNote?._id, content: newNote };
    const res = await updateRetirementPlanNote(updateNoteData);
    if (res?.error) return;
    setNewNote("");
    setEditingNote(null);
    toast.success("The note is updated successfully.");
  };

  const handleDeleteNote = async (noteId: string) => {
    const isConfirmed = window.confirm("Are you sure to delete this note?");
    if (!isConfirmed) return;
    setDeletingNoteId(noteId);
    const res = await removeRetirementPlanNote(noteId);
    setDeletingNoteId("");
    if (res?.error) return;
    toast.success("The note is deleted successfully.");
  };

  const filteredNotes = data?.data?.filter(
    (note: Note) => note.retirementPlan === selectedRecordForAction._id
  );

  const handleCancelNote = () => {
    setEditingNote(null);
    setNewNote("");
  };

  useEffect(() => {
    if (!isAddingNewNote && isErrorAddingNewNote && noteAddError) {
      showApiErrorToast(noteAddError);
    } else if (!isUpdatingNote && isErrorUpdatingNote && noteUpdateError) {
      showApiErrorToast(noteUpdateError);
    } else if (!isRemovingNote && isErrorRemovingNote && noteRemoveError) {
      showApiErrorToast(noteRemoveError);
    }
  }, [
    isAddingNewNote,
    isErrorAddingNewNote,
    noteAddError,
    isUpdatingNote,
    isErrorUpdatingNote,
    noteUpdateError,
    isRemovingNote,
    isErrorRemovingNote,
    noteRemoveError,
  ]);

  const contactInfo = getContactInfo(selectedRecordForAction);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-[1000] top-0">
      <div className="modal-content-scrollable bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[88vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-2xl z-10">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Notes for {contactInfo?.full_name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Add and manage notes for this client
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

        <div className="p-6 space-y-6">
          {/* Add New Note */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
              Add New Note
            </h3>
            <textarea
              value={newNote}
              onChange={(e) => {
                setNewNote(e.target.value);
              }}
              placeholder="Enter your notes here..."
              className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex justify-end mt-3">
              {editingNote ? (
                <button
                  onClick={handleUpdateNote}
                  disabled={!newNote.trim() || isUpdatingNote}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium w-[9rem] flex justify-center items-center"
                >
                  {isUpdatingNote ? (
                    <Icon icon="line-md:loading-loop" width="24" height="24" />
                  ) : (
                    "Update Note"
                  )}
                </button>
              ) : (
                <button
                  onClick={handleSaveNote}
                  disabled={!newNote.trim() || isAddingNewNote}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium w-[9rem] flex justify-center items-center"
                >
                  {isAddingNewNote ? (
                    <Icon icon="line-md:loading-loop" width="24" height="24" />
                  ) : (
                    "Save Note"
                  )}
                </button>
              )}
              {(editingNote || newNote) && (
                <button
                  onClick={handleCancelNote}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium w-[9rem] flex justify-center items-center ml-3"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Existing Notes */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Previous Notes ({filteredNotes?.length})
            </h3>
            {isLoadingNotes ? (
              <NoteLoadingSkeleton />
            ) : isErrorFetchingNote ? (
              <div className="flex justify-center items-center p-5">
                <p className="text-red-500">Error: Notes could not be loaded</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto pb-10">
                {filteredNotes?.length > 0 ? (
                  filteredNotes?.map((note: Note) => (
                    <div
                      key={note._id}
                      className="bg-gray-50 dark:bg-gray-700 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                    >
                      <div className="md:flex justify-between items-center md:space-x-3">
                        <p className="text-gray-700 md:mb-0 mb-2 dark:text-gray-300 whitespace-pre-wrap">
                          {note.content}
                        </p>
                        <div className="flex items-center gap-3">
                          <button
                            title="Edit this note."
                            className="border-[1px] md:mr-0 mr-3 border-gray-300 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 duration-300 text-white font-bold"
                            onClick={() => handleEditNote(note)}
                          >
                            <Icon icon="uil:edit" width="24" height="24" />
                          </button>
                          <button
                            title="Delete this note."
                            className="border-[1px] border-gray-300 px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 duration-300 text-white font-bold"
                            onClick={() => handleDeleteNote(note._id)}
                            disabled={deletingNoteId === note._id}
                          >
                            {deletingNoteId === note._id ? (
                              <Icon
                                icon="line-md:loading-loop"
                                width="24"
                                height="24"
                              />
                            ) : (
                              <Icon
                                icon="material-symbols:delete-outline"
                                width="24"
                                height="24"
                              />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>By: {note.createdBy}</span>
                        <span>{formatDate(note.createdAt)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    No notes yet. Add your first note above.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Email Modal Component (updated)
const EmailModal = ({
  onClose,
  selectedRecordForAction,
  setEmailModalOpen,
}: {
  onClose: () => void;
  selectedRecordForAction: RetirementData;
  setEmailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] =
    useState<EmailTemplate | null>(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  useEffect(() => {
    const templates: EmailTemplate[] = [
      {
        id: "1",
        name: "Welcome & Next Steps",
        subject: "Welcome to Our Retirement Planning Service",
        body: `Dear {name},\n\nThank you for your interest in our retirement planning services. We've received your information and would like to discuss the next steps in creating your personalized retirement plan.\n\nBest regards,\nThe Retirement Planning Team`,
      },
      {
        id: "2",
        name: "Travel Consultation",
        subject: "Discussing Your Travel Retirement Plans",
        body: `Hello {name},\n\nWe noticed you're interested in retiring abroad and would love to discuss your travel preferences and how we can help you achieve your dream retirement lifestyle.\n\nPlease let us know when would be a good time for a consultation.\n\nBest regards,\nTravel Retirement Specialist`,
      },
      {
        id: "3",
        name: "Wealth Plan Discussion",
        subject: "Comprehensive Wealth Plan Consultation",
        body: `Dear {name},\n\nThank you for your interest in our Comprehensive Wealth Plan. We'd like to schedule a meeting to discuss your financial goals and create a customized strategy for your retirement.\n\nLooking forward to speaking with you.\n\nSincerely,\nWealth Management Team`,
      },
    ];
    setEmailTemplates(templates);
  }, []);

  const handleTemplateSelect = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setEmailSubject(template.subject);
    const contactInfo = getContactInfo(selectedRecordForAction);
    setEmailBody(
      template.body.replace(/{name}/g, contactInfo?.full_name || "Client")
    );
  };

  const handleSendEmailSubmit = async () => {
    if (!emailSubject.trim() || !emailBody.trim() || !selectedRecordForAction) {
      toast.error("Please fill in both subject and body");
      return;
    }

    try {
      const contactInfo = getContactInfo(selectedRecordForAction);
      console.log("Sending email to:", contactInfo.email);
      console.log("Subject:", emailSubject);
      console.log("Body:", emailBody);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(`Email sent to ${contactInfo.full_name}!`);
      setEmailModalOpen(false);
    } catch (error: any) {
      toast.error("Failed to send email", error.message);
    }
  };

  const contactInfo = getContactInfo(selectedRecordForAction);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-[1000] top-0">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[88vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-2xl z-10">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Send Email to {contactInfo?.full_name}
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

        <div className="p-6 space-y-6">
          {/* Email Templates */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Email Templates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {emailTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    selectedTemplate?.id === template.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700"
                  }`}
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {template.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                    {template.subject}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Email Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Body
              </label>
              <textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                rows={12}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder="Write your email content here..."
              />
            </div>

            <div className="flex justify-between items-center pt-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>Recipient: {contactInfo?.email}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendEmailSubmit}
                  disabled={!emailSubject.trim() || !emailBody.trim()}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Detail Modal Component
const DetailModal = ({
  record,
  onClose,
}: {
  record: RetirementData;
  onClose: () => void;
}) => {
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
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getComfortLevelColor = (comfort: string) => {
    switch (comfort) {
      case "comfortable":
        return "bg-black text-white border-black";
      case "open":
        return "bg-gray-800 text-white border-gray-800";
      case "none":
        return "bg-gray-600 text-white border-gray-600";
      default:
        return "bg-gray-400 text-black border-gray-400";
    }
  };

  const getStatusBadge = (status: boolean, label: string) => {
    return (
      <div
        className={`flex items-center justify-center p-3 rounded-xl border-2 ${
          status
            ? "bg-black text-white border-black"
            : "bg-gray-400 text-black border-gray-400"
        }`}
      >
        <Icon
          icon={status ? "mdi:check-circle" : "mdi:close-circle"}
          className="text-xl lg:text-2xl mr-2"
        />
        <div className="text-left">
          <div className="font-semibold text-sm lg:text-base">{label}</div>
          <div className="text-xs lg:text-sm">{status ? "Yes" : "No"}</div>
        </div>
      </div>
    );
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

  const { data, isLoading: isLoadingNotes } = useGetAllRetirementPlanNotesQuery(
    record._id
  );
  const notes: Note[] = data?.data || [];

  // Extract data using helper functions
  const contactInfo = getContactInfo(record);
  const retirementSnapshot = getRetirementSnapshot(record);
  const housingEquity = getHousingEquity(record);
  const dollarfarPlanning = getDollarFarPlanning(record);
  const travelPlanning = getTravelPlanning(record);
  const budgetEstimates = getBudgetEstimates(record);
  const privacyAcknowledgements = getPrivacyAcknowledgements(record);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-2 sm:p-4 z-[999] top-0">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-black border-b-2 border-gray-300 dark:border-gray-700 p-4 sm:p-6 rounded-t-2xl z-10">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black dark:text-white mb-2 sm:mb-3">
                {contactInfo.full_name}'s Retirement Plan
              </h1>
              <div className="md:flex hidden flex-wrap gap-3 sm:gap-6 text-base sm:text-lg">
                <div className="flex items-center gap-2 sm:gap-3 bg-gray-100 dark:bg-gray-800 px-3 sm:px-4 py-2 rounded-xl">
                  <Icon
                    icon="mdi:calendar"
                    className="text-xl sm:text-2xl text-black dark:text-gray-300"
                  />
                  <div>
                    <div className="text-xs sm:text-sm text-black dark:text-gray-400 font-medium">
                      Submitted
                    </div>
                    <div className="text-sm sm:text-base lg:text-lg text-black dark:text-white font-semibold">
                      {formatDate(record.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 bg-gray-100 dark:bg-gray-800 px-3 sm:px-4 py-2 rounded-xl">
                  <Icon
                    icon="mdi:map-marker"
                    className="text-xl sm:text-2xl text-black dark:text-gray-300"
                  />
                  <div>
                    <div className="text-xs sm:text-sm text-black dark:text-gray-400 font-medium">
                      Region
                    </div>
                    <div className="text-sm sm:text-base lg:text-lg text-black dark:text-white font-semibold">
                      {contactInfo.region || "Not specified"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 sm:p-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-xl transition-colors flex-shrink-0 ml-2"
              aria-label="Close modal"
            >
              <Icon
                icon="mdi:close"
                className="text-xl sm:text-2xl text-black dark:text-gray-300"
              />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* SECTION A: Contact Information */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-700">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black dark:text-white mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-black dark:bg-gray-700 rounded-xl">
                <Icon
                  icon="mdi:account-box"
                  className="text-2xl sm:text-3xl text-white dark:text-gray-300"
                />
              </div>
              A. Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <Icon
                    icon="mdi:account"
                    className="text-xl sm:text-2xl text-black dark:text-gray-300"
                  />
                  <div>
                    <div className="text-sm sm:text-base lg:text-lg font-semibold text-black dark:text-gray-300">
                      Full Name
                    </div>
                    <div className="text-base sm:text-lg lg:text-xl text-black dark:text-white font-medium">
                      {contactInfo.full_name}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <Icon
                    icon="mdi:email"
                    className="text-xl sm:text-2xl text-black dark:text-gray-300"
                  />
                  <div>
                    <div className="text-sm sm:text-base lg:text-lg font-semibold text-black dark:text-gray-300">
                      Email Address
                    </div>
                    <div className="text-base sm:text-lg lg:text-xl text-black dark:text-white font-medium break-all">
                      {contactInfo.email}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <Icon
                    icon="mdi:phone"
                    className="text-xl sm:text-2xl text-black dark:text-gray-300"
                  />
                  <div>
                    <div className="text-sm sm:text-base lg:text-lg font-semibold text-black dark:text-gray-300">
                      Phone Number
                    </div>
                    <div className="text-base sm:text-lg lg:text-xl text-black dark:text-white font-medium">
                      {contactInfo.phone}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <Icon
                    icon="mdi:earth"
                    className="text-xl sm:text-2xl text-black dark:text-gray-300"
                  />
                  <div>
                    <div className="text-sm sm:text-base lg:text-lg font-semibold text-black dark:text-gray-300">
                      Province/State
                    </div>
                    <div className="text-base sm:text-lg lg:text-xl text-black dark:text-white font-medium">
                      {contactInfo.region || "Not specified"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION B: Retirement Snapshot */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-700">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black dark:text-white mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-black dark:bg-gray-700 rounded-xl">
                <Icon
                  icon="mdi:finance"
                  className="text-2xl sm:text-3xl text-white dark:text-gray-300"
                />
              </div>
              B. Retirement Snapshot
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <Icon
                    icon="mdi:calendar-clock"
                    className="text-xl sm:text-2xl text-black dark:text-gray-300"
                  />
                  <div>
                    <div className="text-sm sm:text-base lg:text-lg font-semibold text-black dark:text-gray-300">
                      Target Retirement Age
                    </div>
                    <div className="text-base sm:text-lg lg:text-xl text-black dark:text-white font-medium">
                      {retirementSnapshot.target_age || "Not specified"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <Icon
                    icon="mdi:cash"
                    className="text-xl sm:text-2xl text-black dark:text-gray-300"
                  />
                  <div>
                    <div className="text-sm sm:text-base lg:text-lg font-semibold text-black dark:text-gray-300">
                      Desired Annual Income
                    </div>
                    <div className="text-base sm:text-lg lg:text-xl text-black dark:text-white font-medium">
                      {formatCurrency(
                        retirementSnapshot.desired_income as string
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <Icon
                    icon="mdi:bank"
                    className="text-xl sm:text-2xl text-black dark:text-gray-300"
                  />
                  <div>
                    <div className="text-sm sm:text-base lg:text-lg font-semibold text-black dark:text-gray-300">
                      Estimated Total Savings
                    </div>
                    <div className="text-base sm:text-lg lg:text-xl text-black dark:text-white font-medium">
                      {formatCurrency(
                        retirementSnapshot?.estimated_savings as string
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION C: Housing & Real Estate Equity */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-700">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black dark:text-white mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-black dark:bg-gray-700 rounded-xl">
                <Icon
                  icon="mdi:home-analytics"
                  className="text-2xl sm:text-3xl text-white dark:text-gray-300"
                />
              </div>
              C. Housing & Real Estate Equity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <Icon
                    icon="mdi:home"
                    className="text-xl sm:text-2xl text-black dark:text-gray-300"
                  />
                  <div>
                    <div className="text-sm sm:text-base lg:text-lg font-semibold text-black dark:text-gray-300">
                      Estimated Home Equity
                    </div>
                    <div className="text-base sm:text-lg lg:text-xl text-black dark:text-white font-medium">
                      {formatCurrency(
                        housingEquity.estimated_home_equity as string
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <Icon
                    icon="mdi:heart-outline"
                    className="text-xl sm:text-2xl text-black dark:text-gray-300"
                  />
                  <div>
                    <div className="text-sm sm:text-base lg:text-lg font-semibold text-black dark:text-gray-300">
                      Comfort with Tapping Home Equity
                    </div>
                    <div
                      className={`inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 rounded-xl text-sm sm:text-base lg:text-lg font-semibold border-2 mt-2 ${getComfortLevelColor(
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
                        className="mr-1 sm:mr-2 text-lg sm:text-xl"
                      />
                      {housingEquity.equity_comfort || "Not specified"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION D: DollarFar — Pre-Retirement Planning */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-700">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black dark:text-white mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-black dark:bg-gray-700 rounded-xl">
                <Icon
                  icon="mdi:calculator"
                  className="text-2xl sm:text-3xl text-white dark:text-gray-300"
                />
              </div>
              D. DollarFar — Pre-Retirement Planning
            </h2>

            {/* Selected Calculators */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-black dark:text-gray-300 mb-2 sm:mb-3">
                Selected Calculators
              </h3>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {dollarfarPlanning.calculators?.map((calculator, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 rounded-xl text-xs sm:text-sm lg:text-base bg-gray-200 text-black dark:bg-gray-700 dark:text-white font-semibold border-2 border-gray-300 dark:border-gray-600"
                  >
                    <Icon
                      icon="mdi:check-circle"
                      className="mr-1 sm:mr-2 text-sm sm:text-lg"
                    />
                    {calculator}
                  </span>
                ))}
                {(!dollarfarPlanning.calculators ||
                  dollarfarPlanning.calculators.length === 0) && (
                  <span className="text-black dark:text-gray-400 italic text-sm sm:text-base lg:text-lg">
                    No calculators selected
                  </span>
                )}
              </div>
            </div>

            {/* Interpretation Services */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <Icon
                    icon="mdi:account-voice"
                    className="text-xl sm:text-2xl text-black dark:text-gray-300"
                  />
                  <div>
                    <div className="text-sm sm:text-base lg:text-lg font-semibold text-black dark:text-gray-300">
                      Interpretation Services
                    </div>
                    <div className="text-base sm:text-lg lg:text-xl text-black dark:text-white font-medium">
                      {dollarfarPlanning.interpretation_toggle
                        ? "Enabled"
                        : "Disabled"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <Icon
                    icon="mdi:card-account-details"
                    className="text-xl sm:text-2xl text-black dark:text-gray-300"
                  />
                  <div>
                    <div className="text-sm sm:text-base lg:text-lg font-semibold text-black dark:text-gray-300">
                      Subscription Status
                    </div>
                    <div className="text-base sm:text-lg lg:text-xl text-black dark:text-white font-medium">
                      {getSubscriptionStatus(
                        dollarfarPlanning.subscription_status || ""
                      )}
                    </div>
                    {dollarfarPlanning.subscription_payment_intent && (
                      <div className="text-xs sm:text-sm text-black dark:text-gray-400 mt-1">
                        Payment Intent:{" "}
                        {dollarfarPlanning.subscription_payment_intent}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Preferred Consultation Time */}
            {dollarfarPlanning.interpretation_toggle &&
              dollarfarPlanning.time_pre && (
                <div className="mt-3 sm:mt-4 bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <Icon
                      icon="mdi:clock-outline"
                      className="text-xl sm:text-2xl text-black dark:text-gray-300"
                    />
                    <div>
                      <div className="text-sm sm:text-base lg:text-lg font-semibold text-black dark:text-gray-300">
                        Preferred Consultation Time
                      </div>
                      <div className="text-base sm:text-lg lg:text-xl text-black dark:text-white font-medium">
                        {dollarfarPlanning.time_pre}
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>

          {/* SECTION E: Travel Planning */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-700">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black dark:text-white mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-black dark:bg-gray-700 rounded-xl">
                <Icon
                  icon="mdi:airplane"
                  className="text-2xl sm:text-3xl text-white dark:text-gray-300"
                />
              </div>
              E. Travel Planning — Book Now vs Future Interest
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Travel Details */}
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <Icon
                      icon="mdi:calendar-month"
                      className="text-xl sm:text-2xl text-black dark:text-gray-300"
                    />
                    <div>
                      <div className="text-sm sm:text-base lg:text-lg font-semibold text-black dark:text-gray-300">
                        Months Abroad Per Year
                      </div>
                      <div className="text-base sm:text-lg lg:text-xl text-black dark:text-white font-medium">
                        {travelPlanning.months_abroad || "Not specified"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <Icon
                      icon="mdi:clock-outline"
                      className="text-xl sm:text-2xl text-black dark:text-gray-300"
                    />
                    <div>
                      <div className="text-sm sm:text-base lg:text-lg font-semibold text-black dark:text-gray-300">
                        Earliest Start Timeline
                      </div>
                      <div className="text-base sm:text-lg lg:text-xl text-black dark:text-white font-medium">
                        {travelPlanning.start_timeline || "Not specified"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <Icon
                      icon="mdi:bed"
                      className="text-xl sm:text-2xl text-black dark:text-gray-300"
                    />
                    <div>
                      <div className="text-sm sm:text-base lg:text-lg font-semibold text-black dark:text-gray-300">
                        Accommodation Style
                      </div>
                      <div className="text-base sm:text-lg lg:text-xl text-black dark:text-white font-medium">
                        {travelPlanning.travel_style || "Not specified"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location & Travel Readiness */}
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <Icon
                      icon="mdi:map-marker-radius"
                      className="text-xl sm:text-2xl text-black dark:text-gray-300"
                    />
                    <div>
                      <div className="text-sm sm:text-base lg:text-lg font-semibold text-black dark:text-gray-300">
                        Country/Region Interest
                      </div>
                      <div className="text-base sm:text-lg lg:text-xl text-black dark:text-white font-medium">
                        {travelPlanning.country_region_interest ||
                          "Not specified"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <Icon
                      icon="mdi:map-search"
                      className="text-xl sm:text-2xl text-black dark:text-gray-300"
                    />
                    <div>
                      <div className="text-sm sm:text-base lg:text-lg font-semibold text-black dark:text-gray-300">
                        Ideal Locations Interest
                      </div>
                      <div className="text-base sm:text-lg lg:text-xl text-black dark:text-white font-medium">
                        {travelPlanning.ideal_locations_interest ||
                          "Not specified"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <Icon
                      icon="mdi:walk"
                      className="text-xl sm:text-2xl text-black dark:text-gray-300"
                    />
                    <div>
                      <div className="text-sm sm:text-base lg:text-lg font-semibold text-black dark:text-gray-300">
                        Independent Travel Acknowledgement
                      </div>
                      <div className="text-base sm:text-lg lg:text-xl text-black dark:text-white font-medium">
                        {travelPlanning.independent_travel_ack ? "Yes" : "No"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION F: Budget Estimates */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-700">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black dark:text-white mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-black dark:bg-gray-700 rounded-xl">
                <Icon
                  icon="mdi:wallet-outline"
                  className="text-2xl sm:text-3xl text-white dark:text-gray-300"
                />
              </div>
              F. Budget Estimates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-center">
                <Icon
                  icon="mdi:home-currency-usd"
                  className="text-3xl sm:text-4xl text-black dark:text-gray-300 mb-2 sm:mb-3"
                />
                <div className="text-sm sm:text-base lg:text-lg font-semibold text-black dark:text-gray-300 mb-1">
                  Monthly Home Budget
                </div>
                <div className="text-base sm:text-lg lg:text-xl font-bold text-black dark:text-white">
                  {formatCurrency(budgetEstimates.home_spend_monthly as string)}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-center">
                <Icon
                  icon="mdi:passport"
                  className="text-3xl sm:text-4xl text-black dark:text-gray-300 mb-2 sm:mb-3"
                />
                <div className="text-sm sm:text-base lg:text-lg font-semibold text-black dark:text-gray-300 mb-1">
                  Monthly Abroad Budget
                </div>
                <div className="text-base sm:text-lg lg:text-xl font-bold text-black dark:text-white">
                  {formatCurrency(
                    budgetEstimates?.abroad_budget_season as string
                  )}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-center">
                <Icon
                  icon="mdi:airplane-ticket"
                  className="text-3xl sm:text-4xl text-black dark:text-gray-300 mb-2 sm:mb-3"
                />
                <div className="text-sm sm:text-base lg:text-lg font-semibold text-black dark:text-gray-300 mb-1">
                  Flight & Insurance Budget
                </div>
                <div className="text-sm sm:text-base lg:text-lg font-bold text-black dark:text-white">
                  {budgetEstimates.flights_insurance_budget || "Not specified"}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-center">
                <Icon
                  icon="mdi:airplane-seat"
                  className="text-3xl sm:text-4xl text-black dark:text-gray-300 mb-2 sm:mb-3"
                />
                <div className="text-sm sm:text-base lg:text-lg font-semibold text-black dark:text-gray-300 mb-1">
                  Preferred Flight Class
                </div>
                <div className="text-base sm:text-lg lg:text-xl font-bold text-black dark:text-white">
                  {budgetEstimates.flight_class || "Not specified"}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION G: Purpose of Travel */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-700">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black dark:text-white mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-black dark:bg-gray-700 rounded-xl">
                <Icon
                  icon="mdi:heart-multiple"
                  className="text-2xl sm:text-3xl text-white dark:text-gray-300"
                />
              </div>
              G. Purpose of Travel
            </h2>
            <div className="bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-black dark:text-gray-300 mb-2 sm:mb-3 flex items-center gap-2">
                <Icon icon="mdi:target" />
                Selected Travel Purposes
              </h3>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {record.travel_purpose.map((purpose, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 rounded-xl text-xs sm:text-sm lg:text-base bg-gray-200 text-black dark:bg-gray-700 dark:text-white font-semibold border-2 border-gray-300 dark:border-gray-600"
                  >
                    <Icon
                      icon="mdi:check-circle"
                      className="mr-1 sm:mr-2 text-sm sm:text-lg"
                    />
                    {purpose}
                  </span>
                ))}
                {record.travel_purpose.length === 0 && (
                  <span className="text-black dark:text-gray-400 italic text-sm sm:text-base lg:text-lg">
                    No travel purposes specified
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* SECTION H: Privacy & Pricing */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-700">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black dark:text-white mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-black dark:bg-gray-700 rounded-xl">
                <Icon
                  icon="mdi:shield-check"
                  className="text-2xl sm:text-3xl text-white dark:text-gray-300"
                />
              </div>
              H. Privacy & Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-700">
            <div className="mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black dark:text-white mb-1">
                Client Notes
              </h2>
              <p className="text-black dark:text-gray-400 text-sm sm:text-base">
                Track all conversations, meetings, and important details with
                this client
              </p>
            </div>

            {isLoadingNotes ? (
              <NoteLoadingSkeleton />
            ) : notes.length > 0 ? (
              <div className="space-y-3 sm:space-y-4 max-h-96 overflow-y-auto">
                {notes.map((note) => (
                  <div
                    key={note._id}
                    className="bg-white dark:bg-gray-900 rounded-xl p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-2 sm:mb-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="p-1 sm:p-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
                          <Icon
                            icon="mdi:account"
                            className="text-black dark:text-gray-300 text-lg sm:text-xl"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-black dark:text-white text-sm sm:text-base">
                            {note.createdBy}
                          </p>
                          <p className="text-xs sm:text-sm text-black dark:text-gray-400">
                            {formatDate(note.createdAt)}
                          </p>
                        </div>
                      </div>
                      {note.updatedAt && note.updatedAt !== note.createdAt && (
                        <div className="text-xs text-black dark:text-gray-500">
                          Edited {formatDate(note.updatedAt)}
                        </div>
                      )}
                    </div>
                    <p className="text-black dark:text-gray-300 whitespace-pre-wrap text-sm sm:text-base">
                      {note.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 sm:py-8">
                <Icon
                  icon="mdi:note-off"
                  className="text-3xl sm:text-4xl text-black dark:text-gray-500 mx-auto mb-2 sm:mb-3"
                />
                <p className="text-black dark:text-gray-400 text-sm sm:text-base lg:text-lg">
                  No notes have been added for this client yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Retirement Plan Stats Loading Skeleton
const RetirementPlanStatsSkeleton = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {/* Total Submissions Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full ml-4"></div>
        </div>
      </div>

      {/* Active Regions Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full ml-4"></div>
        </div>
      </div>

      {/* Ready to Travel Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full ml-4"></div>
        </div>
      </div>

      {/* This Month Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full ml-4"></div>
        </div>
      </div>
    </section>
  );
};

// Main Component
export default function RetireeRequestedPlans() {
  const [selectedRecord, setSelectedRecord] = useState<RetirementData | null>(
    null
  );

  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [selectedRecordForAction, setSelectedRecordForAction] =
    useState<RetirementData | null>(null);

  const { data, isLoading } = useGetAllRetirementPlansQuery(undefined);
  const retirementPlans: RetirementData[] = data?.data || [];

  // Get unique regions for filter
  const regions = Array.from(
    new Set(
      retirementPlans
        ?.map((record) => getContactInfo(record).region)
        .filter(Boolean)
    )
  );

  // Filter travel ready plans
  const travelReadyPlans = retirementPlans?.filter(
    (plan) => getTravelPlanning(plan).independent_travel_ack
  );

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

  const handleAddNote = async (record: RetirementData) => {
    setSelectedRecordForAction(record);
    setNotesModalOpen(true);
  };

  return (
    <div className="dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <div>
        {/* Stats Cards */}
        {isLoading ? (
          <RetirementPlanStatsSkeleton />
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Total Submissions
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {retirementPlans?.length}
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
                    {travelReadyPlans.length}
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
                      retirementPlans?.filter((d) => {
                        return (
                          new Date(d.createdAt).getMonth() ===
                          new Date().getMonth()
                        );
                      }).length
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
        <section className="mb-12">
          <h1 className="text-[1.5rem] font-semibold mb-2 dark:text-white">
            All Requested Plans
          </h1>
          <div className="overflow-x-auto border border-gray-300 dark:border-gray-700 rounded-lg">
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
              {isLoading ? (
                <DashboardDownloadSkeleton />
              ) : (
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
                              {contactInfo.full_name}
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
                        <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => setSelectedRecord(record)}
                              className="inline-flex items-center px-4 py-2 bg-neutral-600 dark:bg-neutral-700 text-white rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-600 transition-colors font-medium"
                            >
                              Details
                            </button>
                            <button
                              onClick={() => handleAddNote(record)}
                              className="inline-flex items-center px-4 py-2 bg-emerald-600 dark:bg-emerald-700 text-white rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors font-medium"
                            >
                              Notes
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          </div>
        </section>

        {/* Travel Ready Plans Table */}
        <section className="mb-12">
          <h1 className="text-[1.5rem] font-semibold mb-2 dark:text-white">
            Requested Plans (Travel Ready)
          </h1>
          <div className="overflow-x-auto border border-gray-300 dark:border-gray-700 rounded-lg">
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-green-50 dark:bg-green-900/30">
                <tr>
                  <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                    Client
                  </th>
                  <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                    Contact
                  </th>
                  <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                    Travel Readiness
                  </th>
                  <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                    Destination
                  </th>
                  <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                    Timeline
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
                  {travelReadyPlans?.map((record) => {
                    const contactInfo = getContactInfo(record);
                    const travelPlanning = getTravelPlanning(record);

                    return (
                      <tr
                        key={record._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {contactInfo.full_name}
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
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200">
                              <Icon icon="mdi:check-circle" className="mr-1" />
                              Independent Travel
                            </span>
                            <p className="text-sm">
                              <span className="font-medium dark:text-white">
                                Style:
                              </span>{" "}
                              <span className="dark:text-gray-300">
                                {travelPlanning.travel_style || "Not set"}
                              </span>
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                          <div className="space-y-1">
                            <p className="text-sm">
                              <span className="font-medium dark:text-white">
                                Region:
                              </span>{" "}
                              <span className="dark:text-gray-300">
                                {travelPlanning.country_region_interest ||
                                  "Not set"}
                              </span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium dark:text-white">
                                Locations:
                              </span>{" "}
                              <span className="dark:text-gray-300">
                                {travelPlanning.ideal_locations_interest ||
                                  "Not set"}
                              </span>
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                          <div className="space-y-1">
                            <p className="text-sm">
                              <span className="font-medium dark:text-white">
                                Start:
                              </span>{" "}
                              <span className="dark:text-gray-300">
                                {travelPlanning.start_timeline || "Not set"}
                              </span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium dark:text-white">
                                Duration:
                              </span>{" "}
                              <span className="dark:text-gray-300">
                                {travelPlanning.months_abroad || "Not set"}{" "}
                                months
                              </span>
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => setSelectedRecord(record)}
                              className="inline-flex items-center px-4 py-2 bg-neutral-600 dark:bg-neutral-700 text-white rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-600 transition-colors font-medium"
                            >
                              Details
                            </button>
                            <button
                              onClick={() => handleAddNote(record)}
                              className="inline-flex items-center px-4 py-2 bg-emerald-600 dark:bg-emerald-700 text-white rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors font-medium"
                            >
                              Notes
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
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

      {/* Notes Modal */}
      {notesModalOpen && (
        <NotesModal
          onClose={() => setNotesModalOpen(false)}
          selectedRecordForAction={selectedRecordForAction as RetirementData}
        />
      )}

      {/* Email Modal */}
      {emailModalOpen && (
        <EmailModal
          onClose={() => setEmailModalOpen(false)}
          selectedRecordForAction={selectedRecordForAction as RetirementData}
          setEmailModalOpen={setEmailModalOpen}
        />
      )}
    </div>
  );
}
