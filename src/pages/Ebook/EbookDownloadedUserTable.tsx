import { useEffect, useState } from "react";
import { baseUrl } from "../../api/apiConstant";
import { toast } from "react-toastify";
import moment from "moment";
import EbookDownloadUserTableSkeletonLoader from "./EbookDownloadUserTableSkeletonLoader";
import EbookDownloadUserCardSkeletonLoader from "./EbookDownloadUserCardSkeletonLoader";

type TUser = {
  fullName: string;
  mobile: string;
  email: string;
  city: string;
  ebookName: string;
  createdAt: string;
  updatedAt: string;
};

const EbookDownloadedUserTable = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${baseUrl}/ebook-downloaded-users/all-users`);
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
  }, []);
  return (
    <div className="container mx-auto px-4 py-6 mb-10">
      <h1 className="text-[1.5rem] font-semibold mb-2">
        Ebook Downloaded Users List
      </h1>
      <div className="overflow-x-auto md:block hidden">
        <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
          <thead className="bg-gray-100 dark:bg-neutral-900">
            <tr>
              <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300">
                No.
              </th>
              <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300">
                Full Name
              </th>
              <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300">
                City
              </th>
              <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300">
                Phone
              </th>
              <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300">
                Email
              </th>
              <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300">
                Downloaded At
              </th>
            </tr>
          </thead>
          {isLoading ? (
            <EbookDownloadUserTableSkeletonLoader />
          ) : (
            <tbody className="bg-white dark:bg-neutral-900 divide-y divide-gray-300">
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300">
                    {user.fullName}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300">
                    {user.city}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300">
                    {user.mobile}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                    {moment(user.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* Mobile view */}
      {isLoading ? (
        <EbookDownloadUserCardSkeletonLoader />
      ) : (
        <div className="md:hidden space-y-4">
          {users.map((user, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-sm space-y-2"
            >
              <p className="text-sm">
                <span className="font-semibold">Name:</span>{" "}
                <span>{user.fullName}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold">Phone:</span>{" "}
                <span>{user.mobile}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold">Email:</span>{" "}
                <span>{user.email}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold">City:</span>{" "}
                <span>{user.city}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold">Downloaded At:</span>{" "}
                <span>
                  {moment(user.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EbookDownloadedUserTable;
