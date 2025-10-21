import { useEffect, useState } from "react";
import { baseUrl } from "../../api/apiConstant";
import { toast } from "react-toastify";
import moment from "moment";
import { BarChart2, Calendar, MessageSquareText } from "lucide-react";
import DashboardDownloadSkeleton from "../../components/UI/LoadingSkeletons/DashboardDownloadSkeleton";
import DashboardStatsSkeleton from "../../components/UI/LoadingSkeletons/DashboardStatsSkeleton";

type TFeedback = {
  name: string;
  email: string;
  city: string;
  rating: number;
  comments: string;
  createdAt: string;
};

const EbookReaderFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<TFeedback[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${baseUrl}/feedbacks/get-feedbacks`);
        if (!res.ok) throw new Error("Failed to fetch feedbacks");
        // Parse JSON response
        const data = await res.json();
        // Sort by createdAt descending
        setFeedbacks(data?.data);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        toast.error(`There was a problem fetching feedbacks: ${message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  // Calculate statistics
  const totalFeedbacks = feedbacks.length;
  const todayFeedbacks = feedbacks.filter((feedback) =>
    moment(feedback.createdAt).isSame(moment(), "day")
  ).length;
  const thisWeekFeedbacks = feedbacks.filter((feedback) =>
    moment(feedback.createdAt).isSame(moment(), "week")
  ).length;

  return (
    <>
      {/* Summary Statistics Section */}
      {isLoading ? (
        <DashboardStatsSkeleton numOfCards={3} />
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Feedbacks
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalFeedbacks}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <MessageSquareText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Today's Feedbacks
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {todayFeedbacks}
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
                  {thisWeekFeedbacks}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <BarChart2 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </section>
      )}

      <section>
        <h1 className="text-[1.5rem] font-semibold mb-2">
          Ebook Reader Feedbacks
        </h1>
        <div className="overflow-x-auto border border-gray-300 rounded-lg">
          <table className="divide-y divide-gray-200 w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300">
                  No.
                </th>
                <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300">
                  Name
                </th>
                <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300">
                  Email
                </th>
                <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300">
                  City
                </th>
                <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300">
                  Comments
                </th>
                <th className="text-left px-4 py-2 text-[1rem] font-bold text-gray-700 dark:text-white border border-gray-300">
                  Created At
                </th>
              </tr>
            </thead>

            {isLoading ? (
              <DashboardDownloadSkeleton />
            ) : (
              <tbody className="divide-y divide-gray-300 bg-white">
                {feedbacks?.map((feedback, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300">
                      {feedback.name}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300">
                      {feedback.email}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300">
                      {feedback.city}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 border border-gray-300">
                      {feedback.comments}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                      {moment(feedback.createdAt).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
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

export default EbookReaderFeedbacks;
