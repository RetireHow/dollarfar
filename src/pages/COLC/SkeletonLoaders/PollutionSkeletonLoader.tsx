const PollutionSkeletonLoader = () => {
  return (
    <div>
      {/* WHO Air Pollution Data Section */}
      <div className="border-[1px] bg-[#FBFBF8] dark:bg-darkModeBgColor border-gray-300 p-3 mb-[1rem] mt-[1rem] rounded-lg w-full">
        <div className="mb-2 text-[1rem]">
          <h3 className="font-bold text-[1.5rem] h-8 w-1/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></h3>
          <p className="h-4 w-2/3 mt-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></p>
        </div>
        <div className="space-y-[0.5rem]">
          <div className="flex items-center">
            <span className="flex-1 h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></span>
            <span className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></span>
          </div>
          <div className="flex items-center">
            <span className="flex-1 h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></span>
            <span className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></span>
          </div>
        </div>
      </div>

      {/* Pollution Index Section */}
      <div className="border-[1px] bg-[#FBFBF8] dark:bg-darkModeBgColor border-gray-300 p-3 mb-[1rem] mt-[1rem] rounded-lg w-full">
        <div className="font-bold mb-2 text-[1rem] flex justify-between items-center">
          <h3 className="font-bold text-[1.5rem] h-8 w-1/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></h3>
          <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        </div>
        <div className="space-y-[0.5rem]">
          <div className="flex items-center">
            <span className="flex-1 h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></span>
            <span className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></span>
          </div>
        </div>
      </div>

      {/* Pollution Table Section */}
      <div className="space-y-[1rem] mt-[3rem]">
        <h3 className="md:text-[1.3rem] font-semibold h-7 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></h3>
        <div className="overflow-x-auto">
          <table className="border-collapse bg-[#FBFBF8] dark:bg-darkModeBgColor w-full">
            <tbody>
              {[...Array(8)].map((_, i) => (
                <tr key={`pollution-${i}`}>
                  <td className="border p-2 h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></td>
                  <td className="border p-2 min-w-[50px]">
                    <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </td>
                  <td className="border p-2 h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></td>
                  <td className="border p-2 h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Purity and Cleanliness Table Section */}
      <div className="space-y-[1rem] mt-[3rem]">
        <h3 className="md:text-[1.3rem] font-semibold h-7 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></h3>
        <div className="overflow-x-auto">
          <table className="border-collapse bg-[#FBFBF8] dark:bg-darkModeBgColor w-full">
            <tbody>
              {[...Array(8)].map((_, i) => (
                <tr key={`purity-${i}`}>
                  <td className="border p-2 h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></td>
                  <td className="border p-2 min-w-[50px]">
                    <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </td>
                  <td className="border p-2 h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></td>
                  <td className="border p-2 h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Information */}
      <div className="mt-[0.5rem] space-y-[0.3rem]">
        <p className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></p>
        <p className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></p>
        <p className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></p>
        <p className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></p>
      </div>
    </div>
  );
};

export default PollutionSkeletonLoader;
