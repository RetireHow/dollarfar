import { useEffect, useState } from "react";
import { baseUrl } from "../../api/apiConstant";
import { toast } from "react-toastify";
import moment from "moment";
import { Icon } from "@iconify/react/dist/iconify.js";

type TUser = {
  name: string;
  phone: string;
  email: string;
  downloadedFiles: string[];
  createdAt: string;
  updatedAt: string;
};

const UserTable = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
  }, []);
  return (
    <div className="container mx-auto px-4 py-6 min-h-screen">
      <h1 className="text-[1.5rem] font-semibold mb-2">Users List</h1>
      <div className="overflow-x-auto md:block hidden">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">
                Phone
              </th>
              <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">
                Downloaded Reports
              </th>
              <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">
                Downloaded At
              </th>
            </tr>
          </thead>
          {isLoading ? (
            <tr>
              <td colSpan={5}>
                <div className="py-5 text-green-600 font-bold text-[2rem] md:flex hidden justify-center items-center gap-1">
                  <Icon icon="line-md:loading-loop" width="35" height="35" />
                  <p>Loading...</p>
                </div>
              </td>
            </tr>
          ) : (
            <tbody className="bg-white divide-y divide-gray-100">
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {user.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {user.phone}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {user.downloadedFiles.join(", ")}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
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
        <div className="md:hidden py-5 text-green-600 font-bold text-[2rem] flex justify-center items-center gap-1">
          <Icon icon="line-md:loading-loop" width="35" height="35" />
          <p>Loading...</p>
        </div>
      ) : (
        <div className="md:hidden space-y-4">
          {users.map((user, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-sm bg-white space-y-2"
            >
              <p className="text-sm">
                <span className="font-semibold">Name:</span> {user.name}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Phone:</span> {user.phone}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Downloaded Reports:</span>{" "}
                {user.downloadedFiles.join(", ")}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Downloaded At:</span>{" "}
                {moment(user.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserTable;
