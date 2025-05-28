const CrimeSkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      {/* Header Section */}
      <div className="border border-gray-300 p-3 mb-12 mt-4 rounded-lg bg-[#FBFBF8] dark:bg-darkModeBgColor dark:text-darkModeNormalTextColor">
        <div className="flex justify-between items-center mb-2">
          <div className="h-6 w-48 bg-gray-300 rounded"></div>
          <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Crime Rates Section */}
      <div className="space-y-4 mb-12">
        <div className="h-6 w-48 bg-gray-300 rounded"></div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-[#FBFBF8] dark:bg-darkModeBgColor dark:text-darkModeNormalTextColor border-collapse">
            <tbody>
              {Array.from({ length: 13 }).map((_, index) => (
                <tr key={index}>
                  <td className="border p-2">
                    <div className="h-4 w-64 bg-gray-300 rounded"></div>
                  </td>
                  <td className="border p-2">
                    <div className="h-4 w-48 bg-gray-300 rounded"></div>
                  </td>
                  <td className="border p-2">
                    <div className="h-4 w-12 bg-gray-300 rounded"></div>
                  </td>
                  <td className="border p-2">
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Safety Section */}
      <div className="space-y-4">
        <div className="h-6 w-48 bg-gray-300 rounded"></div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-[#FBFBF8] dark:bg-darkModeBgColor dark:text-darkModeNormalTextColor border-collapse">
            <tbody>
              {Array.from({ length: 2 }).map((_, index) => (
                <tr key={index}>
                  <td className="border p-2">
                    <div className="h-4 w-64 bg-gray-300 rounded"></div>
                  </td>
                  <td className="border p-2">
                    <div className="h-4 w-48 bg-gray-300 rounded"></div>
                  </td>
                  <td className="border p-2">
                    <div className="h-4 w-12 bg-gray-300 rounded"></div>
                  </td>
                  <td className="border p-2">
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-2 space-y-2 dark:text-darkModeNormalTextColor">
        <div className="h-4 w-48 bg-gray-300 rounded"></div>
        <div className="h-4 w-64 bg-gray-300 rounded"></div>
        <div className="h-4 w-80 bg-gray-300 rounded"></div>
        <div className="h-4 w-80 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default CrimeSkeletonLoader;
