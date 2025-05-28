const SkeletonBlock = ({ width = "100%", height = "1rem", style = {} }) => (
  <div
    className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded"
    style={{ width, height, ...style }}
  />
);

export const TrafficSkeletonLoader = () => {
  return (
    <div className="space-y-6 p-4 border rounded-lg bg-[#FBFBF8] dark:bg-darkModeBgColor">
      {/* Title */}
      <SkeletonBlock width="30%" height="1.5rem" />

      {/* CO2 info block */}
      <div className="space-y-2 border p-3 rounded">
        <SkeletonBlock width="80%" height="1rem" />
        <SkeletonBlock width="60%" height="1rem" />
        <SkeletonBlock width="90%" height="1rem" />
      </div>

      {/* Pie chart placeholder */}
      <div className="h-[300px] bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />

      {/* Indexes box */}
      <div className="border p-4 rounded space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex justify-between">
            <SkeletonBlock width="40%" height="1rem" />
            <SkeletonBlock width="15%" height="1rem" />
          </div>
        ))}
      </div>

      {/* Main Means Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {[...Array(8)].map((_, i) => (
              <tr key={i} className="border-b">
                <td className="border p-2">
                  <SkeletonBlock width="6rem" height="1rem" />
                </td>
                <td className="border p-2 min-w-[50px]">
                  <SkeletonBlock width="80%" height="1.2rem" />
                </td>
                <td className="border p-2">
                  <SkeletonBlock width="3rem" height="1rem" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TrafficTable placeholders for each mode */}
      {[...Array(7)].map((_, i) => (
        <section
          key={i}
          className="space-y-[1rem] mt-[3rem] border rounded p-4 bg-gray-100 dark:bg-gray-900"
        >
          <SkeletonBlock width="40%" height="1.2rem" />

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                {[...Array(5)].map((__, j) => (
                  <tr key={j} className="border-b">
                    <td className="border p-2">
                      <SkeletonBlock width="5rem" height="1rem" />
                    </td>
                    <td className="border p-2 min-w-[50px]">
                      <SkeletonBlock width="80%" height="1.2rem" />
                    </td>
                    <td className="border p-2">
                      <SkeletonBlock width="3rem" height="1rem" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      {/* Contributors text */}
      <div className="space-y-1 mt-4">
        <SkeletonBlock width="50%" height="1rem" />
        <SkeletonBlock width="80%" height="1rem" />
      </div>
    </div>
  );
};
