/* eslint-disable @typescript-eslint/no-explicit-any */
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

// Notes Modal Component
const NotesModal = ({
  onClose,
  selectedRecordForAction,
}: {
  onClose: () => void;
  selectedRecordForAction: RetirementData;
}) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<string>("");
  const [editingNote, setEditingNote] = useState<Note | null>();
  console.log(selectedRecordForAction);

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

    try {
      // save notes to API
      const currentUser = localStorage.getItem("name");
      const res = await fetch(`${baseUrl}/retirement-plan-notes/create`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          retirementPlan: selectedRecordForAction._id,
          content: newNote,
          createdBy: currentUser,
        }),
      });
      if (!res.ok) {
        return toast.error("Failed to create this new notes.");
      }
      await res.json();

      const newNoteObj: Note = {
        _id: Date.now().toString(),
        content: newNote,
        retirementPlan: selectedRecordForAction._id,
        createdAt: new Date().toISOString(),
        createdBy: currentUser as string, // This would come from auth context
      };
      setNotes((prev) => [newNoteObj, ...prev]);
      setNewNote("");
      toast.success("Note added successfully!");
    } catch (error: any) {
      toast.error("Failed to save this new note", error?.message);
    }
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
    try {
      const res = await fetch(`${baseUrl}/retirement-plan-notes/update`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ noteId: editingNote?._id, content: newNote }),
      });
      if (!res.ok) {
        return toast.error("Failed to update this note.");
      }
      await res.json();

      const updateNoteIndex = notes?.findIndex(
        (note) => note._id == editingNote?._id
      );
      if (updateNoteIndex >= 0) {
        const updatedNotes = [...notes];
        updatedNotes[updateNoteIndex].content = newNote;
        setNotes(updatedNotes);
      }
      setEditingNote(null);
      setNewNote("");
      toast.success("Note updated successfully!");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update this note.");
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    const isConfirmed = window.confirm("Are you sure to delete this note?");
    if (!isConfirmed) return;

    try {
      const res = await fetch(
        `${baseUrl}/retirement-plan-notes/remove/${noteId}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        return toast.error("Failed to delete this note.");
      }
      await res.json();
      const filteredNotes = notes.filter((note) => note._id !== noteId);
      setNotes(filteredNotes);
      toast.success("Note deleted successfully!");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to delete this note");
    }
  };

  const filteredNotes = notes.filter(
    (note) => note.retirementPlan === selectedRecordForAction._id
  );

  const loadNotes = async () => {
    try {
      const res = await fetch(
        `${baseUrl}/retirement-plan-notes/get/${selectedRecordForAction._id}`
      );
      if (!res.ok) {
        return toast.error("Failed to fetch notes.");
      }
      const data = await res.json();
      setNotes(data?.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to fetch notes.");
    }
  };

  // Initialize notes
  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-[1000] top-0">
      <div className="modal-content-scrollable bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[88vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-2xl z-10">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Notes for {selectedRecordForAction?.full_name}
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
                  disabled={!newNote.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Update Note
                </button>
              ) : (
                <button
                  onClick={handleSaveNote}
                  disabled={!newNote.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Save Note
                </button>
              )}
            </div>
          </div>

          {/* Existing Notes */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Previous Notes ({filteredNotes.length})
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note) => (
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
                        >
                          <Icon
                            icon="material-symbols:delete-outline"
                            width="24"
                            height="24"
                          />
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
          </div>
        </div>
      </div>
    </div>
  );
};

// Email Modal Component
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
  // Initialize email templates
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
    setEmailBody(
      template.body.replace(
        /{name}/g,
        selectedRecordForAction?.full_name || "Client"
      )
    );
  };

  const handleSendEmailSubmit = async () => {
    if (!emailSubject.trim() || !emailBody.trim() || !selectedRecordForAction) {
      toast.error("Please fill in both subject and body");
      return;
    }

    try {
      // In a real app, you would integrate with your email service
      console.log("Sending email to:", selectedRecordForAction.email);
      console.log("Subject:", emailSubject);
      console.log("Body:", emailBody);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(`Email sent to ${selectedRecordForAction.full_name}!`);
      setEmailModalOpen(false);
    } catch (error: any) {
      toast.error("Failed to send email", error.message);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-[1000] top-0">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[88vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-2xl z-10">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Send Email to {selectedRecordForAction?.full_name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {selectedRecordForAction?.email}
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
                <p>Recipient: {selectedRecordForAction?.email}</p>
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-[999] top-16">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-2xl z-10">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {record.full_name}'s Retirement Plan
              </h2>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1">
                  <Icon icon="mdi:calendar" className="text-lg" />
                  <span>Submitted: {formatDate(record.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon icon="mdi:update" className="text-lg" />
                  <span>Updated: {formatDate(record.updatedAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon icon="mdi:map-marker" className="text-lg" />
                  <span>Region: {record.region || "Not specified"}</span>
                </div>
              </div>
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
          {/* Contact Information */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                <Icon
                  icon="mdi:account-outline"
                  className="text-2xl text-blue-600 dark:text-blue-400"
                />
              </div>
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center gap-2">
                  <Icon icon="mdi:email" className="text-lg" />
                  Email Address
                </label>
                <p className="text-blue-900 dark:text-blue-100 text-lg font-medium">
                  {record.email}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center gap-2">
                  <Icon icon="mdi:phone" className="text-lg" />
                  Phone Number
                </label>
                <p className="text-blue-900 dark:text-blue-100 text-lg font-medium">
                  {record.phone}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center gap-2">
                  <Icon icon="mdi:earth" className="text-lg" />
                  Country Region
                </label>
                <p className="text-blue-900 dark:text-blue-100 text-lg font-medium">
                  {record.country_region || "Not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Retirement Goals */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-100 dark:border-green-800">
            <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                <Icon
                  icon="mdi:finance"
                  className="text-2xl text-green-600 dark:text-green-400"
                />
              </div>
              Retirement Snapshot
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                <Icon
                  icon="mdi:calendar-clock"
                  className="text-3xl text-green-600 dark:text-green-400 mb-2"
                />
                <label className="text-sm font-medium text-green-700 dark:text-green-300 block mb-1">
                  Target Age
                </label>
                <p className="text-green-900 dark:text-green-100 text-xl font-bold">
                  {record.target_age || "Not set"}
                </p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                <Icon
                  icon="mdi:cash"
                  className="text-3xl text-green-600 dark:text-green-400 mb-2"
                />
                <label className="text-sm font-medium text-green-700 dark:text-green-300 block mb-1">
                  Desired Income
                </label>
                <p className="text-green-900 dark:text-green-100 text-xl font-bold">
                  {formatCurrency(record.desired_income)}
                </p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                <Icon
                  icon="mdi:bank"
                  className="text-3xl text-green-600 dark:text-green-400 mb-2"
                />
                <label className="text-sm font-medium text-green-700 dark:text-green-300 block mb-1">
                  Estimated Savings
                </label>
                <p className="text-green-900 dark:text-green-100 text-xl font-bold">
                  {formatCurrency(record.estimated_savings)}
                </p>
              </div>
            </div>
          </div>

          {/* Housing & Real Estate */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-amber-100 dark:border-amber-800">
            <h3 className="text-xl font-semibold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-800 rounded-lg">
                <Icon
                  icon="mdi:home-outline"
                  className="text-2xl text-amber-600 dark:text-amber-400"
                />
              </div>
              Housing & Real Estate Equity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                <Icon
                  icon="mdi:home-analytics"
                  className="text-4xl text-amber-600 dark:text-amber-400 mb-3"
                />
                <label className="text-sm font-medium text-amber-700 dark:text-amber-300 block mb-2">
                  Home Equity
                </label>
                <p className="text-amber-900 dark:text-amber-100 text-2xl font-bold mb-3">
                  {formatCurrency(record.estimated_home_equity)}
                </p>
              </div>
              <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                <Icon
                  icon="mdi:heart-outline"
                  className="text-4xl text-amber-600 dark:text-amber-400 mb-3"
                />
                <label className="text-sm font-medium text-amber-700 dark:text-amber-300 block mb-2">
                  Equity Comfort Level
                </label>
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold ${getComfortLevelColor(
                    record.equity_comfort
                  )}`}
                >
                  <Icon
                    icon={
                      record.equity_comfort === "comfortable"
                        ? "mdi:check-circle"
                        : record.equity_comfort === "open"
                        ? "mdi:help-circle"
                        : record.equity_comfort === "none"
                        ? "mdi:close-circle"
                        : "mdi:information"
                    }
                    className="mr-2 text-xl"
                  />
                  {record.equity_comfort || "Not specified"}
                </span>
              </div>
            </div>
          </div>

          {/* Travel Preferences */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-800">
            <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-4 flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
                <Icon
                  icon="mdi:airplane"
                  className="text-2xl text-purple-600 dark:text-purple-400"
                />
              </div>
              Part-Time Abroad Preferences
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                    <label className="text-sm font-medium text-purple-700 dark:text-purple-300 flex items-center gap-2 mb-2">
                      <Icon icon="mdi:map-marker-radius" />
                      Destination Region
                    </label>
                    <p className="text-purple-900 dark:text-purple-100 font-medium">
                      {record.country_region || "Not specified"}
                    </p>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                    <label className="text-sm font-medium text-purple-700 dark:text-purple-300 flex items-center gap-2 mb-2">
                      <Icon icon="mdi:clock-outline" />
                      Start Timeline
                    </label>
                    <p className="text-purple-900 dark:text-purple-100 font-medium">
                      {record.start_timeline || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                  <label className="text-sm font-medium text-purple-700 dark:text-purple-300 flex items-center gap-2 mb-2">
                    <Icon icon="mdi:map-search" />
                    Ideal Locations
                  </label>
                  <p className="text-purple-900 dark:text-purple-100 font-medium text-lg">
                    {record.ideal_locations || "Not specified"}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                    <label className="text-sm font-medium text-purple-700 dark:text-purple-300 flex items-center gap-2 mb-2">
                      <Icon icon="mdi:calendar-month" />
                      Months Abroad
                    </label>
                    <p className="text-purple-900 dark:text-purple-100 font-medium">
                      {record.months_abroad || "Not specified"}
                    </p>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                    <label className="text-sm font-medium text-purple-700 dark:text-purple-300 flex items-center gap-2 mb-2">
                      <Icon icon="mdi:airplane-seat" />
                      Flight Class
                    </label>
                    <p className="text-purple-900 dark:text-purple-100 font-medium">
                      {record.flight_class || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                  <label className="text-sm font-medium text-purple-700 dark:text-purple-300 flex items-center gap-2 mb-2">
                    <Icon icon="mdi:walk" />
                    Travel Style
                  </label>
                  <p className="text-purple-900 dark:text-purple-100 font-medium text-lg">
                    {record.travel_style || "Not specified"}
                  </p>
                </div>

                <div className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                  <label className="text-sm font-medium text-purple-700 dark:text-purple-300 flex items-center gap-2 mb-3">
                    <Icon icon="mdi:target" />
                    Travel Purpose
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {record.travel_purpose.map((purpose, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-2 rounded-full text-sm bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-200 font-medium"
                      >
                        <Icon
                          icon="mdi:check-circle"
                          className="mr-1 text-lg"
                        />
                        {purpose}
                      </span>
                    ))}
                    {record.travel_purpose.length === 0 && (
                      <span className="text-purple-700 dark:text-purple-300 italic">
                        No purposes specified
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                  <label className="text-sm font-medium text-purple-700 dark:text-purple-300 flex items-center gap-2 mb-3">
                    <Icon icon="mdi:heart-multiple" />
                    Interests & Services
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {record.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-2 rounded-full text-sm bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-200 font-medium"
                      >
                        <Icon icon="mdi:star" className="mr-1 text-lg" />
                        {interest}
                      </span>
                    ))}
                    {record.interests.length === 0 && (
                      <span className="text-pink-700 dark:text-pink-300 italic">
                        No interests specified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Budget Estimates */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800">
            <h3 className="text-xl font-semibold text-indigo-900 dark:text-indigo-100 mb-4 flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-800 rounded-lg">
                <Icon
                  icon="mdi:wallet-outline"
                  className="text-2xl text-indigo-600 dark:text-indigo-400"
                />
              </div>
              Budget Estimates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                <Icon
                  icon="mdi:home-currency-usd"
                  className="text-4xl text-indigo-600 dark:text-indigo-400 mb-3"
                />
                <label className="text-sm font-medium text-indigo-700 dark:text-indigo-300 block mb-2">
                  Monthly Home Spend
                </label>
                <p className="text-indigo-900 dark:text-indigo-100 text-2xl font-bold">
                  {formatCurrency(record.home_spend_monthly)}
                </p>
              </div>
              <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                <Icon
                  icon="mdi:passport"
                  className="text-4xl text-indigo-600 dark:text-indigo-400 mb-3"
                />
                <label className="text-sm font-medium text-indigo-700 dark:text-indigo-300 block mb-2">
                  Seasonal Abroad Budget
                </label>
                <p className="text-indigo-900 dark:text-indigo-100 text-2xl font-bold">
                  {formatCurrency(record.abroad_budget_season)}
                </p>
              </div>
              <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                <Icon
                  icon="mdi:airplane-ticket"
                  className="text-4xl text-indigo-600 dark:text-indigo-400 mb-3"
                />
                <label className="text-sm font-medium text-indigo-700 dark:text-indigo-300 block mb-2">
                  Flights & Insurance
                </label>
                <p className="text-indigo-900 dark:text-indigo-100 text-xl font-bold">
                  {record.flights_insurance_budget || "Not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Information & Consents */}
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-700 dark:to-slate-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-600 rounded-lg">
                <Icon
                  icon="mdi:information-outline"
                  className="text-2xl text-gray-600 dark:text-gray-400"
                />
              </div>
              Additional Information & Consents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                className={`p-4 rounded-xl text-center ${
                  record.independent_travel_ack
                    ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200"
                    : "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200"
                }`}
              >
                <Icon
                  icon={
                    record.independent_travel_ack
                      ? "mdi:check-circle"
                      : "mdi:close-circle"
                  }
                  className="text-3xl mb-2"
                />
                <p className="font-semibold">Independent Travel</p>
                <p className="text-sm">
                  {record.independent_travel_ack ? "Capable" : "Not Capable"}
                </p>
              </div>

              <div
                className={`p-4 rounded-xl text-center ${
                  record.fee_ack
                    ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200"
                    : "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200"
                }`}
              >
                <Icon
                  icon={
                    record.fee_ack ? "mdi:check-circle" : "mdi:close-circle"
                  }
                  className="text-3xl mb-2"
                />
                <p className="font-semibold">Fee Acknowledgment</p>
                <p className="text-sm">
                  {record.fee_ack ? "Accepted" : "Not Accepted"}
                </p>
              </div>

              <div
                className={`p-4 rounded-xl text-center ${
                  record.consent_contact
                    ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200"
                    : "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200"
                }`}
              >
                <Icon
                  icon={
                    record.consent_contact
                      ? "mdi:check-circle"
                      : "mdi:close-circle"
                  }
                  className="text-3xl mb-2"
                />
                <p className="font-semibold">Contact Consent</p>
                <p className="text-sm">
                  {record.consent_contact ? "Granted" : "Not Granted"}
                </p>
              </div>

              <div
                className={`p-4 rounded-xl text-center ${
                  record.consent_marketing
                    ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200"
                    : "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200"
                }`}
              >
                <Icon
                  icon={
                    record.consent_marketing
                      ? "mdi:check-circle"
                      : "mdi:close-circle"
                  }
                  className="text-3xl mb-2"
                />
                <p className="font-semibold">Marketing Consent</p>
                <p className="text-sm">
                  {record.consent_marketing ? "Granted" : "Not Granted"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function RetireeRequestedPlans() {
  const [selectedRecord, setSelectedRecord] = useState<RetirementData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [requestedPlans, setRequestedPlans] = useState<RetirementData[]>([]);
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [selectedRecordForAction, setSelectedRecordForAction] =
    useState<RetirementData | null>(null);

  useEffect(() => {
    const fetchRequestedPlans = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${baseUrl}/retirement-next-step/get`);
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
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

  // Filter travel ready plans (those who are capable of independent travel)
  const travelReadyPlans = requestedPlans.filter(
    (plan) => plan.independent_travel_ack
  );

  // Filter comprehensive wealth plans (those who selected "Comprehensive Wealth Plan" in interests)
  const comprehensiveWealthPlans = requestedPlans.filter((plan) =>
    plan.interests.includes("Comprehensive Wealth Plan")
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

  const handleAddNote = async (record: RetirementData) => {
    setSelectedRecordForAction(record);
    setNotesModalOpen(true);
    // In a real app, you would fetch existing notes from your API
  };

  const handleSendEmail = (record: RetirementData) => {
    setSelectedRecordForAction(record);
    setEmailModalOpen(true);
  };

  return (
    <div className="dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <div>
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
        <section className="mb-12">
          <h1 className="text-[1.5rem] font-semibold mb-2 dark:text-white">
            Retiree Requested Plans
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
                          <p className="text-gray-900 dark:text-white">
                            {record.email}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {record.phone}
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
                              {record.target_age || "Not set"}
                            </span>
                          </p>
                          <p className="text-sm">
                            <span className="font-medium dark:text-white">
                              Income:
                            </span>{" "}
                            <span className="dark:text-gray-300">
                              {formatCurrency(record.desired_income)}
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
                              {record.country_region || "Not set"}
                            </span>
                          </p>
                          <p className="text-sm">
                            <span className="font-medium dark:text-white">
                              Timeline:
                            </span>{" "}
                            <span className="dark:text-gray-300">
                              {record.start_timeline || "Not set"}
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
                            View Details
                          </button>
                          <button
                            onClick={() => handleAddNote(record)}
                            className="inline-flex items-center px-4 py-2 bg-emerald-600 dark:bg-emerald-700 text-white rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors font-medium"
                          >
                            Add Notes
                          </button>
                          <button
                            onClick={() => handleSendEmail(record)}
                            className="inline-flex items-center px-4 py-2 bg-violet-600 dark:bg-violet-700 text-white rounded-lg hover:bg-violet-700 dark:hover:bg-violet-600 transition-colors font-medium"
                          >
                            Send Email
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </section>

        {/* Travel Ready Plans Table */}
        <section className="mb-12">
          <h1 className="text-[1.5rem] font-semibold mb-2 dark:text-white">
            Travel Ready Plans
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
                  {travelReadyPlans?.map((record) => (
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
                          <p className="text-gray-900 dark:text-white">
                            {record.email}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {record.phone}
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
                              {record.travel_style || "Not set"}
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
                              {record.country_region || "Not set"}
                            </span>
                          </p>
                          <p className="text-sm">
                            <span className="font-medium dark:text-white">
                              Locations:
                            </span>{" "}
                            <span className="dark:text-gray-300">
                              {record.ideal_locations || "Not set"}
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
                              {record.start_timeline || "Not set"}
                            </span>
                          </p>
                          <p className="text-sm">
                            <span className="font-medium dark:text-white">
                              Duration:
                            </span>{" "}
                            <span className="dark:text-gray-300">
                              {record.months_abroad || "Not set"} months
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
                            Add Notes
                          </button>
                          <button
                            onClick={() => handleSendEmail(record)}
                            className="inline-flex items-center px-4 py-2 bg-violet-600 dark:bg-violet-700 text-white rounded-lg hover:bg-violet-700 dark:hover:bg-violet-600 transition-colors font-medium"
                          >
                            Send Email
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </section>

        {/* Comprehensive Wealth Plan Requests Table */}
        <section>
          <h1 className="text-[1.5rem] font-semibold mb-2 dark:text-white">
            Comprehensive Wealth Plan Requests
          </h1>
          <div className="overflow-x-auto border border-gray-300 dark:border-gray-700 rounded-lg">
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-blue-50 dark:bg-blue-900/30">
                <tr>
                  <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                    Client
                  </th>
                  <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                    Contact
                  </th>
                  <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                    Financial Overview
                  </th>
                  <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                    Real Estate Equity
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
                  {comprehensiveWealthPlans?.map((record) => (
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
                          <p className="text-gray-900 dark:text-white">
                            {record.email}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {record.phone}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="font-medium dark:text-white">
                              Savings:
                            </span>{" "}
                            <span className="dark:text-gray-300">
                              {formatCurrency(record.estimated_savings)}
                            </span>
                          </p>
                          <p className="text-sm">
                            <span className="font-medium dark:text-white">
                              Desired Income:
                            </span>{" "}
                            <span className="dark:text-gray-300">
                              {formatCurrency(record.desired_income)}
                            </span>
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="font-medium dark:text-white">
                              Home Equity:
                            </span>{" "}
                            <span className="dark:text-gray-300">
                              {formatCurrency(record.estimated_home_equity)}
                            </span>
                          </p>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getComfortLevelColor(
                              record.equity_comfort
                            )}`}
                          >
                            {record.equity_comfort || "Not specified"}
                          </span>
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
                            Add Notes
                          </button>
                          <button
                            onClick={() => handleSendEmail(record)}
                            className="inline-flex items-center px-4 py-2 bg-violet-600 dark:bg-violet-700 text-white rounded-lg hover:bg-violet-700 dark:hover:bg-violet-600 transition-colors font-medium"
                          >
                            Send Email
                          </button>
                        </div>
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
