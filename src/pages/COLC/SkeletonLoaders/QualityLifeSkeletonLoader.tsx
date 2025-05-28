const QualityLifeSkeletonLoader = () => {
  return (
    <div className="border border-gray-300 p-3 mt-4 rounded-lg bg-gray-100 dark:bg-darkModeBgColor dark:text-darkModeNormalTextColor animate-pulse">
      {/* Header */}
      <div className="font-bold mb-5 text-lg flex justify-between items-center">
        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
        <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
      </div>

      {/* Metrics */}
      <div className="space-y-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-12"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
        ))}

        {/* Divider */}
        <div className="w-full h-px bg-gray-300"></div>

        {/* Quality of Life Index */}
        <div className="flex items-center gap-3 font-semibold">
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-12"></div>
          <div className="h-4 bg-gray-300 rounded w-16"></div>
        </div>
      </div>

      {/* Contributors Info */}
      <div className="space-y-1 mt-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    </div>
  );
};

export default QualityLifeSkeletonLoader;
