import { useGetRecentComparisonsQuery } from "../../redux/features/APIEndpoints/numbioApi/numbioApi";
export interface IRecentComparison {
  _id: string;
  cityA: string;
  cityB: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  percentage: number;
  relation: string;
  reference: string;
}

function RecentComparisonsSkeleton() {
  return (
    <div className="bg-[#FBFBF8] rounded-xl shadow p-4 mb-10 animate-pulse">
      {/* Title skeleton */}
      <div className="mb-3">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-48"></div>
      </div>

      {/* List items skeleton */}
      <ul className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <li key={i} className="text-md">
            <div className="flex items-center gap-1 flex-wrap">
              {/* City B placeholder */}
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>

              {/* "is" text - no skeleton needed */}
              <div className="h-4 w-4"></div>

              {/* Percentage placeholder */}
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-8"></div>

              {/* Relation placeholder */}
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>

              {/* "than" text - no skeleton needed */}
              <div className="h-4 w-8"></div>

              {/* City A placeholder */}
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RecentComparisons() {
  const { data: recent, isLoading } = useGetRecentComparisonsQuery(undefined);
  if (isLoading) {
    return <RecentComparisonsSkeleton />;
  }
  return (
    <div className="bg-[#FBFBF8] rounded-xl shadow p-4 mb-10">
      <h3 className="text-xl font-semibold mb-3">Recent Comparisons</h3>

      <ul className="space-y-3">
        {recent?.map((rc: IRecentComparison, i: number) => (
          <li key={i} className="text-lg text-gray-700">
            {rc.cityB} is {rc.percentage}%{" "}
            <span
              className={`${
                rc.relation == "cheaper" ? "text-green-600" : "text-red-600"
              }`}
            >
              {rc.relation}
            </span>{" "}
            than {rc.cityA}
          </li>
        ))}
      </ul>
    </div>
  );
}
