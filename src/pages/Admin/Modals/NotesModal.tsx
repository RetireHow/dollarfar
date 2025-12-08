import { Icon } from "@iconify/react/dist/iconify.js";
import { TNote } from "../types/note.type";
import {
  useAddRetirementPlanNoteMutation,
  useGetAllRetirementPlanNotesQuery,
  useRemoveRetirementPlanNoteMutation,
  useUpdateRetirementPlanNoteMutation,
} from "../../../redux/features/APIEndpoints/retirementPlanNoteApi/retirementPlanNote";
import { useGetMeQuery } from "../../../redux/features/APIEndpoints/userApi/userApi";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { showApiErrorToast } from "../../../utils/showApiErrorToast";
import { TPlan } from "../types/plan.type";

/*=====================| Loading Skeleton |=================*/
const NoteLoadingSkeleton = () => {
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

const getContactInfo = (record: TPlan) => record.contact || {};

export const NotesModal = ({
  onClose,
  selectedRecordForAction,
}: {
  onClose: () => void;
  selectedRecordForAction: TPlan;
}) => {
  const [newNote, setNewNote] = useState<string>("");
  const [editingNote, setEditingNote] = useState<TNote | null>();
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

  const handleEditNote = async (note: TNote) => {
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
    (note: TNote) => note.retirementPlan === selectedRecordForAction._id
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
                Notes for {contactInfo?.name}
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
          {/* Add New TNote */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
              Add New TNote
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
                    "Update TNote"
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
                    "Save TNote"
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
                  filteredNotes?.map((note: TNote) => (
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
