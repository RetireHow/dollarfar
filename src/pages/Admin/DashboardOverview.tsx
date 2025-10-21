/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { baseUrl } from "../../api/apiConstant";
import { toast } from "react-toastify";
import {
  Users,
  Download,
  MessageSquareText,
  FileText,
  BookOpen,
  TrendingUp,
  Calendar,
} from "lucide-react";
import DashboardStatsSkeleton from "../../components/UI/LoadingSkeletons/DashboardStatsSkeleton";
import { Link } from "react-router-dom";

interface DashboardStats {
  totalRetirementPlans: number;
  totalPdfDownloads: number;
  totalEbookDownloads: number;
  totalFeedbacks: number;
  recentRetirementPlans: number; // Last 7 days
  recentPdfDownloads: number; // Last 7 days
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setIsLoading(true);
        // You might want to create a dedicated endpoint for dashboard stats
        const [plansRes, pdfRes, ebookRes, feedbackRes] = await Promise.all([
          fetch(`${baseUrl}/retirement-next-step/get`),
          fetch(`${baseUrl}/report-downloaded-users/all-users`),
          fetch(`${baseUrl}/ebook-downloaded-users/all-users`),
          fetch(`${baseUrl}/feedbacks/get-feedbacks`),
        ]);

        if (!plansRes.ok || !pdfRes.ok || !ebookRes.ok || !feedbackRes.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const plansData = await plansRes.json();
        const pdfData = await pdfRes.json();
        const ebookData = await ebookRes.json();
        const feedbackData = await feedbackRes.json();

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const dashboardStats: DashboardStats = {
          totalRetirementPlans: plansData?.data?.length || 0,
          totalPdfDownloads: pdfData?.data?.length || 0,
          totalEbookDownloads: ebookData?.data?.length || 0,
          totalFeedbacks: feedbackData?.data?.length || 0,
          recentRetirementPlans:
            plansData?.data?.filter(
              (plan: any) => new Date(plan.createdAt) > oneWeekAgo
            ).length || 0,
          recentPdfDownloads:
            pdfData?.data?.filter(
              (user: any) => new Date(user.createdAt) > oneWeekAgo
            ).length || 0,
        };

        setStats(dashboardStats);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        toast.error(`There was a problem loading dashboard: ${message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const statCards = [
    {
      title: "Retirement Plans",
      value: stats?.totalRetirementPlans || 0,
      recent: stats?.recentRetirementPlans || 0,
      icon: Users,
      color: "blue",
      description: "Total requested retirement plans",
    },
    {
      title: "PDF Reports",
      value: stats?.totalPdfDownloads || 0,
      recent: stats?.recentPdfDownloads || 0,
      icon: FileText,
      color: "green",
      description: "Total PDF downloads",
    },
    {
      title: "Ebook Downloads",
      value: stats?.totalEbookDownloads || 0,
      recent: 0, // You can calculate this similarly
      icon: BookOpen,
      color: "purple",
      description: "Total ebook downloads",
    },
    {
      title: "Feedbacks",
      value: stats?.totalFeedbacks || 0,
      recent: 0, // You can calculate this similarly
      icon: MessageSquareText,
      color: "orange",
      description: "Total user feedbacks",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600",
    };
    return colors[color] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome to Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Select an option from the sidebar to view detailed analytics and
          manage your content.
        </p>
      </div>

      {/* Stats Grid */}
      {isLoading ? (
        <DashboardStatsSkeleton numOfCards={4} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {card.value}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">
                      +{card.recent} this week
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {card.description}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-full ${getColorClasses(card.color)}`}
                >
                  <card.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link to="retiree-requests">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">
                    View Retirement Plans
                  </span>
                  <Users className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            </Link>

            <Link to="pdf-reports">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">
                    Check PDF Downloads
                  </span>
                  <Download className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            </Link>

            <Link to="ebook-downloads">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">
                    Check Ebook Downloads
                  </span>
                  <Download className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            </Link>

            <Link to="ebook-feedbacks">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">
                    Review Feedbacks
                  </span>
                  <MessageSquareText className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            </Link>
          </div>
        </div>

        {/* Recent Activity Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-gray-400 mr-3" />
                <span className="text-sm text-gray-700">
                  New retirement plans today
                </span>
              </div>
              <span className="font-semibold text-gray-900">
                {stats?.recentRetirementPlans || 0}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Download className="w-4 h-4 text-gray-400 mr-3" />
                <span className="text-sm text-gray-700">
                  PDF downloads this week
                </span>
              </div>
              <span className="font-semibold text-gray-900">
                {stats?.recentPdfDownloads || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
