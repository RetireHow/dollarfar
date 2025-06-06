const PdfDownloadUserTableSkeletonLoader = () => {
  const skeletonRows = Array.from({ length: 5 });
  const nestedFileRows = Array.from({ length: 2 }); // You can adjust number of dummy nested rows

  return (
    <tbody className="bg-white dark:bg-neutral-900 divide-y divide-gray-300 dark:divide-gray-700">
      {skeletonRows.map((_, index) => (
        <tr key={index} className="hover:bg-gray-50 animate-pulse">
          {/* Index */}
          <td className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700">
            <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-6"></div>
          </td>
          {/* Name */}
          <td className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700">
            <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-24"></div>
          </td>
          {/* Phone */}
          <td className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700">
            <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-24"></div>
          </td>
          {/* Email */}
          <td className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700">
            <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-32"></div>
          </td>
          {/* Nested Files */}
          <td className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700">
            {/* Nested Table Header */}
            <tr>
              <th className="pl-2 text-left border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-neutral-800 py-2">
                <div className="h-4 bg-gray-300 dark:bg-neutral-700 rounded w-20"></div>
              </th>
              <th className="pl-2 text-left border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-neutral-800">
                <div className="h-4 bg-gray-300 dark:bg-neutral-700 rounded w-32"></div>
              </th>
            </tr>
            {/* Nested Rows */}
            {nestedFileRows.map((_, fileIndex) => (
              <tr key={fileIndex}>
                <td className="pl-2 text-left border border-gray-300 dark:border-gray-700 w-[250px] py-1">
                  <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-[200px]"></div>
                </td>
                <td className="pl-2 text-left border border-gray-300 dark:border-gray-700 py-1">
                  <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-40"></div>
                </td>
              </tr>
            ))}
          </td>
          {/* Created At */}
          <td className="px-4 py-2 text-sm">
            <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-40"></div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default PdfDownloadUserTableSkeletonLoader;
