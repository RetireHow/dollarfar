import { useEffect, useState } from "react";
import { baseUrl } from "../../api/apiConstant";
import { toast } from "react-toastify";
import moment from "moment";
import { Icon } from "@iconify/react/dist/iconify.js";

// const usersData = [
//   {
//     name: "Alice Johnson",
//     phone: "+1234567890",
//     email: "alice@example.com",
//     downloadedFiles: [
//       {
//         downloadedFileName: "report_2024.pdf",
//         createdAt: "2025-04-25T10:30:00.000Z",
//         updatedAt: "2025-04-25T10:30:00.000Z",
//       },
//       {
//         downloadedFileName: "invoice_march.csv",
//         createdAt: "2025-04-26T12:00:00.000Z",
//         updatedAt: "2025-04-26T12:00:00.000Z",
//       },
//     ],
//   },
//   {
//     name: "Bob Smith",
//     phone: "+1987654321",
//     email: "bob@example.com",
//     downloadedFiles: [
//       {
//         downloadedFileName: "presentation.pptx",
//         createdAt: "2025-04-27T09:15:00.000Z",
//         updatedAt: "2025-04-27T09:15:00.000Z",
//       },
//     ],
//   },
//   {
//     name: "Charlie Lee",
//     phone: "+1123456789",
//     email: "charlie@example.com",
//     downloadedFiles: [],
//   },
// ];

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

const PdfDownloadedUserTable = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
      <h1 className="text-[1.5rem] font-semibold mb-2">
        PDF Report Downloaded Users List
      </h1>
      <div className="overflow-x-auto md:block hidden">
        <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 border border-gray-300">
                Name
              </th>
              <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 border border-gray-300">
                Phone
              </th>
              <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 border border-gray-300">
                Email
              </th>
              <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 border border-gray-300">
                Downloaded Reports
              </th>
              <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 border border-gray-300">
                User Created At
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
            <tbody className="bg-white divide-y divide-gray-300">
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800 border border-gray-300">
                    {user.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800 border border-gray-300">
                    {user.phone}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800 border border-gray-300">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800 border border-gray-300">
                    <tr>
                      <th className="pl-2 text-left border border-gray-300 bg-gray-100">
                        Name
                      </th>
                      <th className="pl-2 text-left border border-gray-300 bg-gray-100">
                        Downloaded At
                      </th>
                    </tr>

                    {user.downloadedFiles?.map((file, index) => (
                      <tr key={index}>
                        <td className=" pl-2 text-left w-[250px] border border-gray-300">
                          {file?.downloadedFileName}
                        </td>
                        <td className="pl-2  text-left border border-gray-300">
                          {moment(file.createdAt).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </td>
                      </tr>
                    ))}
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
                <span className="font-semibold">User Created At:</span>{" "}
                {moment(user.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
              </p>
              <div className="text-sm">
                <span className="font-semibold">Downloaded Reports:</span>{" "}
                <ul className="list-disc list-inside space-y-1 mt-1">
                  {user.downloadedFiles?.map((file, index) => (
                    <li key={index}>
                      <span>{file?.downloadedFileName}</span> (
                      <span>
                        {moment(file.createdAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </span>
                      )
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PdfDownloadedUserTable;
