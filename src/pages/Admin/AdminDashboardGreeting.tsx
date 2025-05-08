import { useEffect, useState } from "react";
import { baseUrl } from "../../api/apiConstant";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react/dist/iconify.js";

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
  const [users, setUsers] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loggedInUserName, setLoggedInUserName] = useState("");

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of the day
  const usersAddedToday = users.filter((user) => {
    const createdAt = new Date(user.createdAt);
    return createdAt >= today;
  });

  console.log(`Total users added today: ${usersAddedToday.length}`);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${baseUrl}/api/pdf-downloaded-users`);
        if (!res.ok) throw new Error("Failed to fetch users");
        // Parse JSON response
        const data = await res.json();
        // Sort by createdAt descending
        const sortedUsers = data?.data?.sort(
          (a: TUser, b: TUser) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setUsers(sortedUsers);
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
  return (
    <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 text-white shadow-lg rounded-xl p-8 max-w-4xl mx-auto mt-10">
      <div className="flex items-center space-x-4">
        <div>
          <h2 className="text-3xl font-semibold">
            Welcome back, {loggedInUserName}!
          </h2>
          <p className="mt-1 text-lg">
            Your dashboard is ready to assist you in managing users, monitoring
            system activities, and accessing analytics.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
          <div className="p-4 bg-indigo-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-indigo-600"
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
            <h3 className="text-xl font-semibold text-gray-700">Total Users</h3>
            <p className="text-gray-600">
              {isLoading ? (
                <Icon
                  className="text-gray-500"
                  icon="line-md:loading-loop"
                  width="20"
                  height="20"
                />
              ) : (
                <span>{users?.length}</span>
              )}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
          <div className="p-4 bg-indigo-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-indigo-600"
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
            <h3 className="text-xl font-semibold text-gray-700">
              Users Added Today
            </h3>
            <p className="text-gray-600">
              {isLoading ? (
                <Icon
                  className="text-gray-500"
                  icon="line-md:loading-loop"
                  width="20"
                  height="20"
                />
              ) : (
                <span>{usersAddedToday?.length}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardGreeting;
