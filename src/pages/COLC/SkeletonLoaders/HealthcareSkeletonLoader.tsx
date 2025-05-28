const HealthcareSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Header Section */}
      <div className="border border-gray-300 p-3 mb-12 mt-4 rounded-lg bg-[#FBFBF8] dark:bg-darkModeBgColor dark:text-darkModeNormalTextColor">
        <div className="flex justify-between items-center mb-2">
          <div className="h-6 w-40 bg-gray-300 rounded"></div>
          <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
        </div>
        <div className="h-4 w-60 bg-gray-300 rounded"></div>
      </div>

      {/* Table Section */}
      <div className="mb-2">
        <div className="h-6 w-80 bg-gray-300 rounded mb-6"></div>
        <div className="overflow-x-auto">
          <table className="w-full bg-[#FBFBF8] dark:bg-darkModeBgColor dark:text-darkModeNormalTextColor border-collapse">
            <thead>
              <tr>
                <th className="border p-2">
                  <div className="h-4 w-48 bg-gray-300 rounded"></div>
                </th>
                <th colSpan={3} className="border p-2">
                  <div className="h-4 w-32 bg-gray-300 rounded mx-auto"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }).map((_, idx) => (
                <tr key={idx}>
                  <td className="border p-2">
                    <div className="h-4 w-64 bg-gray-300 rounded"></div>
                  </td>
                  <td className="border p-2">
                    <div className="h-4 w-40 bg-gray-300 rounded"></div>
                  </td>
                  <td className="border p-2">
                    <div className="h-4 w-12 bg-gray-300 rounded"></div>
                  </td>
                  <td className="border p-2">
                    <div className="h-4 w-20 bg-gray-300 rounded mx-auto"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Section */}
      <div className="space-y-2 dark:text-darkModeNormalTextColor mt-4">
        <div className="h-4 w-48 bg-gray-300 rounded"></div>
        <div className="h-4 w-40 bg-gray-300 rounded"></div>
        <div className="h-4 w-72 bg-gray-300 rounded"></div>
        <div className="h-4 w-80 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default HealthcareSkeleton;
