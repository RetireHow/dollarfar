/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Users,
  Download,
  MessageSquareText,
  FileText,
  BookOpen,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useGetAllReportUsersQuery } from "../../redux/features/APIEndpoints/reportUsersApi/reportUsersApi";
import { useGetAllEbookUsersQuery } from "../../redux/features/APIEndpoints/ebookUsersApi/ebookUsersApi";
import { useGetAllEbookFeedbacksQuery } from "../../redux/features/APIEndpoints/ebookFeedbacksApi/ebookFeedbackApis";
import { useEffect } from "react";
import { useGetAllPOCInterestsQuery } from "../../redux/features/APIEndpoints/POCInterestApi/POCInterestApi";

interface DashboardStats {
  totalPOCInterest: number;
  totalPdfDownloads: number;
  totalEbookDownloads: number;
  totalFeedbacks: number;
  recentRetirementPlans: number; // Last 7 days
  recentPdfDownloads: number; // Last 7 days
}

const DashboardOverviewSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {/* Title skeleton */}
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>

              {/* Value skeleton */}
              <div className="h-7 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mt-3 mb-4"></div>

              {/* Trend skeleton */}
              <div className="flex items-center mt-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4 mr-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              </div>

              {/* Description skeleton */}
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mt-4"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mt-2"></div>
            </div>

            {/* Icon skeleton */}
            <div className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 ml-4">
              <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function DashboardOverview() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { data: plansData, isLoading } =
    useGetAllPOCInterestsQuery(undefined);
  const { data: pdfData } = useGetAllReportUsersQuery(undefined);
  const { data: ebookData } = useGetAllEbookUsersQuery(undefined);
  const { data: feedbackData } = useGetAllEbookFeedbacksQuery(undefined);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const stats: DashboardStats = {
    totalPOCInterest: plansData?.data?.length || 0,
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

  const statCards = [
    {
      title: "POC Interests",
      value: stats?.totalPOCInterest || 0,
      recent: stats?.recentRetirementPlans || 0,
      icon: Users,
      color: "blue",
      description: "Total requested POC interest",
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
    const colors: { [key: string]: { light: string; dark: string } } = {
      blue: {
        light: "bg-blue-100 text-blue-600",
        dark: "bg-blue-900/20 text-blue-400",
      },
      green: {
        light: "bg-green-100 text-green-600",
        dark: "bg-green-900/20 text-green-400",
      },
      purple: {
        light: "bg-purple-100 text-purple-600",
        dark: "bg-purple-900/20 text-purple-400",
      },
      orange: {
        light: "bg-orange-100 text-orange-600",
        dark: "bg-orange-900/20 text-orange-400",
      },
    };
    const colorSet = colors[color] || {
      light: "bg-gray-100 text-gray-600",
      dark: "bg-gray-700 text-gray-400",
    };
    return `${colorSet.light} dark:${colorSet.dark}`;
  };

  return (
    <div className="space-y-6 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome to Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Select an option from the sidebar to view detailed analytics and
          manage your content.
        </p>
      </div>

      {/* Stats Grid */}
      {isLoading ? (
        <DashboardOverviewSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {card.value}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 dark:text-green-400 mr-1" />
                    <span className="text-sm text-green-600 dark:text-green-400">
                      +{card.recent} this week
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link to="retirement-panel">
              <button className="w-full text-left p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    View POC Interests
                  </span>
                  <Users className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
              </button>
            </Link>

            <Link to="pdf-reports">
              <button className="w-full text-left p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Check PDF Downloads
                  </span>
                  <Download className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
              </button>
            </Link>

            <Link to="ebook-downloads">
              <button className="w-full text-left p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Check Ebook Downloads
                  </span>
                  <Download className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
              </button>
            </Link>

            <Link to="ebook-feedbacks">
              <button className="w-full text-left p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Review Feedbacks
                  </span>
                  <MessageSquareText className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
              </button>
            </Link>
          </div>
        </div>

        {/* Recent Activity Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-3" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  New POC Interest today
                </span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {stats?.recentRetirementPlans || 0}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Download className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-3" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  PDF downloads this week
                </span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {stats?.recentPdfDownloads || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
