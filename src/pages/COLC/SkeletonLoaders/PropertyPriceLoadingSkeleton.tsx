const PropertyPriceLoadingSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
      {/* Header Section */}
      <div className="border border-gray-300 p-4 rounded-lg bg-[#FBFBF8] dark:bg-darkModeBgColor dark:text-darkModeHeadingTextColor">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 w-32 bg-gray-300 rounded"></div>
          <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
        </div>

        {/* Metrics */}
        <div className="space-y-3">
          {[...Array(7)].map((_, idx) => (
            <div key={idx} className="flex items-center">
              <div className="flex-1 h-4 bg-gray-300 rounded"></div>
              <div className="h-4 w-16 bg-gray-300 rounded ml-4"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Currency Selector */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-10 gap-2">
        <div className="flex items-center gap-2">
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
          <div className="h-8 w-32 bg-gray-300 rounded"></div>
        </div>
        <div className="h-4 w-24 bg-gray-300 rounded"></div>
      </div>

      {/* Category Sections */}
      {[...Array(3)].map((_, idx) => (
        <section key={idx} className="min-w-[500px]">
          <div className="grid grid-cols-5 gap-2 font-semibold text-[1rem] p-1 dark:text-darkModeHeadingTextColor">
            <div className="flex items-center gap-2 col-span-3">
              <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
              <div className="h-4 w-40 bg-gray-300 rounded"></div>
            </div>
            <div className="h-4 w-16 bg-gray-300 rounded"></div>
            <div className="h-4 w-16 bg-gray-300 rounded"></div>
          </div>

          {/* Items */}
          <div className="rounded-lg p-2 border border-gray-200 dark:border-darkModeBorderColor bg-[#FBFBF8] dark:bg-darkModeBgColor dark:text-darkModeNormalTextColor text-[14px] space-y-2">
            {[...Array(4)].map((_, itemIdx) => (
              <div
                key={itemIdx}
                className="grid grid-cols-5 gap-2 p-1 border-b border-gray-300 dark:border-darkModeBorderColor"
              >
                <div className="col-span-3 h-4 bg-gray-300 rounded"></div>
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
                <div className="flex items-center gap-1">
                  <div className="h-4 w-10 bg-gray-300 rounded"></div>
                  <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                  <div className="h-4 w-10 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Footer */}
      <div className="space-y-2 dark:text-darkModeNormalTextColor">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="h-4 w-3/4 bg-gray-300 rounded"></div>
        ))}
      </div>
    </div>
  );
};

export default PropertyPriceLoadingSkeleton;
