export const StickyCurrencySkeletonLoader = () => {
  const skeletonRows = Array.from({ length: 5 });

  return (
    <tbody>
      {skeletonRows.map((_, index) => (
        <tr key={index} className="hover:bg-gray-200">
          <td className="border border-gray-300 p-2">
            <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
          </td>
          <td className="border border-gray-300 p-2">
            <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
          </td>
          <td className="border border-gray-300 p-2">
            <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
