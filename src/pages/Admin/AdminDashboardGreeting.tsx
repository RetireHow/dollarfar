import { useEffect, useState } from "react";
import { baseUrl } from "../../api/apiConstant";
import { toast } from "react-toastify";
import AdminDashboardGreetingSkeleton from "./AdminDashboardGreetingSkeleton";

type DownloadedFile = {
  downloadedFileName: string;
  createdAt: string;
  updatedAt: string;
};

type TUser = {
  name: string;
  phone: string;
  email: string;
  downloadedFiles: DownloadedFile[];
  createdAt: string;
  updatedAt: string;
};

const AdminDashboardGreeting = () => {
  const [reportUsers, setReportUsers] = useState<TUser[]>([]);
  const [ebookUsers, setEbookUsers] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingEbook, setIsLoadingEbook] = useState<boolean>(false);
  const [loggedInUserName, setLoggedInUserName] = useState("");

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today

  const reportDownloadedToday = reportUsers?.filter((item) => {
    const createdAt = new Date(item.createdAt);
    return createdAt >= today;
  })?.length;

  const ebookDownloadedToday = ebookUsers?.reduce((total, curr) => {
    const createdAt = new Date(curr.createdAt);
    return createdAt >= today ? total + 1 : total;
  }, 0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${baseUrl}/report-downloaded-users/all-users`);
        if (!res.ok) throw new Error("Failed to fetch users");
        // Parse JSON response
        const data = await res.json();
        // Sort by createdAt descending
        const sortedUsers = data?.data?.sort(
          (a: TUser, b: TUser) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setReportUsers(sortedUsers);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        toast.error(`There was a problem fetching users: ${message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();

    const loggedInUserName = localStorage.getItem("name");
    if (loggedInUserName) {
      setLoggedInUserName(loggedInUserName);
    }
    // const loggedInUserEmail = localStorage.getItem('email');
  }, []);

  useEffect(() => {
    const fetchEbookUsers = async () => {
      try {
        setIsLoadingEbook(true);
        const res = await fetch(`${baseUrl}/ebook-downloaded-users/all-users`);
        if (!res.ok) throw new Error("Failed to fetch ebook users");
        // Parse JSON response
        const data = await res.json();
        // Sort by createdAt descending
        const sortedUsers = data?.data?.sort(
          (a: TUser, b: TUser) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setEbookUsers(sortedUsers);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        toast.error(`There was a problem fetching users: ${message}`);
      } finally {
        setIsLoadingEbook(false);
      }
    };
    fetchEbookUsers();

    const loggedInUserName = localStorage.getItem("name");
    if (loggedInUserName) {
      setLoggedInUserName(loggedInUserName);
    }
    // const loggedInUserEmail = localStorage.getItem('email');
  }, []);
  return (
    <>
      {isLoading || isLoadingEbook ? (
        <AdminDashboardGreetingSkeleton />
      ) : (
        <div className="bg-white dark:bg-neutral-900 border-[1px] border-gray-300 dark:border-gray-600 shadow-lg rounded-xl p-8 max-w-4xl mx-auto mt-10">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-3xl font-semibold">
                Welcome back, {loggedInUserName}!
              </h2>
              <p className="mt-1 text-lg">
                Your dashboard is ready to assist you in managing users,
                monitoring system activities, and accessing analytics.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-md border-[1px] border-gray-200 dark:border-gray-600 flex items-center space-x-4">
              <div className="p-4 bg-gray-100 dark:bg-neutral-700 dark:text-white rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-600 dark:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
                  Total
                </h3>
                <div className="flex items-center gap-1">
                  <p className="text-neutral-700 dark:text-white">
                    Report Downloaded:
                  </p>
                  <p className="text-gray-600 dark:text-white">
                    <span>{reportUsers?.length}</span>
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <p className="text-neutral-700 dark:text-white">
                    Ebook Downloaded:
                  </p>
                  <p className="text-gray-600 dark:text-white">
                    <span>{ebookUsers?.length}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-md border-[1px] border-gray-200 dark:border-gray-600 flex items-center space-x-4">
              <div className="p-4 bg-gray-100 dark:bg-neutral-700 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-600 dark:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
                  Today
                </h3>
                <div className="flex items-center gap-1">
                  <p className="text-neutral-700 dark:text-white">
                    Report Downloaded:
                  </p>
                  <p className="text-gray-600 dark:text-white">
                    <span>{reportDownloadedToday}</span>
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <p className="text-neutral-700 dark:text-white">
                    Ebook Downloaded:
                  </p>
                  <p className="text-gray-600 dark:text-white">
                    <span>{ebookDownloadedToday}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboardGreeting;
