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
    <>
      {/* Summary Statistics Section */}
      {isLoading ? (
        <DashboardStatsSkeleton numOfCards={3}/>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Downloads
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalDownloads}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Download className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Today's Downloads
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {todayDownloads}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">
                  {thisWeekDownloads}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </section>
      )}

      <section>
        <h1 className="text-[1.5rem] font-semibold mb-2">
          Ebook Downloaded Users List
        </h1>
        <div className="overflow-x-auto border border-gray-300 rounded-lg">
          <table className="w-full divide-y divide-gray-200">
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
              <DashboardDownloadSkeleton />
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
      </section>
    </>
  );
};

export default EbookDownloadedUserTable;
