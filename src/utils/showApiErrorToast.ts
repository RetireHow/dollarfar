/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

/**
 * Displays an error toast message based on an RTK Query or generic error object.
 *
 * @param error The error object returned from RTK Query or other async calls.
 */
export function showApiErrorToast(error: unknown) {
  if (typeof error === "object" && error !== null) {
    // RTK Query: FetchBaseQueryError
    if ("data" in error) {
      const fetchError = error as FetchBaseQueryError;
      const message =
        (fetchError.data as any)?.message ??
        (fetchError.data as any)?.error ??
        "An unknown error occurred";
      toast.error(message);
      return;
    }

    // RTK Query: SerializedError or generic JS Error
    if ("message" in error && typeof (error as any).message === "string") {
      toast.error((error as any).message);
      return;
    }
  }

  // Fallback
  toast.error("An unknown error occurred");
}
