
const EstimatedCostLoadingSkeleton = () => {
  const skeletonRows = Array.from({ length: 6 });

  return (
    <section>
      {/* Summary Skeleton */}
      <div className="mb-5">
        <div className="border border-gray-300 rounded-lg p-5 mb-5 bg-[#FBFBF8] dark:bg-darkModeBgColor dark:text-darkModeNormalTextColor inline-block w-full animate-pulse">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          </div>
          <ul className="list-disc ml-8 text-[14px] space-y-2 mt-3">
            <li className="h-4 bg-gray-300 rounded w-5/6"></li>
          </ul>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto">
        <h3 className="font-semibold text-[1rem] mb-1 dark:text-darkModeHeadingTextColor">
          Estimated Cost Breakdown
        </h3>
        <table className="w-full text-left border bg-[#FBFBF8] dark:bg-darkModeBgColor dark:text-darkModeNormalTextColor text-[14px] animate-pulse">
          <thead>
            <tr>
              <th className="border border-gray-300 md:p-3 p-2">Category</th>
              <th className="border border-gray-300 md:p-3 p-2">Estimated Cost</th>
            </tr>
          </thead>
          <tbody>
            {skeletonRows.map((_, index) => (
              <tr key={index} className="hover:bg-[#42c6c623]">
                <td className="border border-gray-300 md:p-3 p-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </td>
                <td className="border border-gray-300 md:p-3 p-2">
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default EstimatedCostLoadingSkeleton;
