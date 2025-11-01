import { useEffect, useState } from "react";
import { baseUrl } from "../../api/apiConstant";
import { toast } from "react-toastify";
import moment from "moment";
import { Calendar, Download, Users } from "lucide-react";
import DashboardDownloadSkeleton from "../../components/UI/LoadingSkeletons/DashboardDownloadSkeleton";
import DashboardStatsSkeleton from "../../components/UI/LoadingSkeletons/DashboardStatsSkeleton";

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

  // Calculate statistics
  const totalDownloads = users.length;
  const todayDownloads = users.filter((user) =>
    moment(user.createdAt).isSame(moment(), "day")
  ).length;
  const thisWeekDownloads = users.filter((user) =>
    moment(user.createdAt).isSame(moment(), "week")
  ).length;

  return (
    <div className="dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      {/* Summary Statistics Section */}
      {isLoading ? (
        <DashboardStatsSkeleton numOfCards={3} />
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Downloads
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalDownloads}
                </p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
                <Download className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Today's Downloads
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {todayDownloads}
                </p>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  This Week
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {thisWeekDownloads}
                </p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </section>
      )}

      <section>
        <h1 className="text-[1.5rem] font-semibold mb-2 dark:text-white">
          Ebook Downloaded Users List
        </h1>
        <div className="overflow-x-auto border border-gray-300 dark:border-gray-700 rounded-lg">
          <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                  No.
                </th>
                <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                  Full Name
                </th>
                <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                  City
                </th>
                <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                  Phone
                </th>
                <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                  Email
                </th>
                <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                  Downloaded At
                </th>
              </tr>
            </thead>
            {isLoading ? (
              <DashboardDownloadSkeleton />
            ) : (
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-300 dark:divide-gray-700">
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                      {user.fullName}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                      {user.city}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                      {user.mobile}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                      {user.email}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                      {moment(user.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </section>
    </div>
  );
};

export default EbookDownloadedUserTable;
