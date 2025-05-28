const SkeletonBlock = ({ width = "100%", height = "1rem", className = "" }) => (
  <div
    className={`animate-pulse bg-gray-300 dark:bg-gray-700 rounded ${className}`}
    style={{ width, height }}
  />
);

export default function CloseCityLivingCostSkeleton() {
  return (
    <section>
      {/* Error or Summary placeholder */}
      <SkeletonBlock
        width="100%"
        height="6rem"
        className="mb-5 rounded-lg border border-gray-300 dark:border-darkModeBorderColor bg-[#FBFBF8] dark:bg-darkModeBgColor"
      />

      {/* Currency selector and sticky currency link placeholders */}
      <div className="mb-3 flex md:flex-row flex-col md:items-center md:gap-10 gap-2">
        <SkeletonBlock width="30%" height="2.5rem" />
        <SkeletonBlock width="20%" height="1.25rem" />
      </div>

      {/* Categories list placeholders */}
      <div className="overflow-x-auto space-y-8">
        {[...Array(4)].map((_, i) => (
          <section key={i} className="mb-3 min-w-[500px]">
            {/* Category header placeholder */}
            <div className="grid gap-2 grid-cols-5 font-semibold text-[1rem] p-1 dark:text-darkModeHeadingTextColor">
              <SkeletonBlock
                width="60%"
                height="1.5rem"
                className="col-span-3"
              />
              <SkeletonBlock width="30%" height="1.5rem" />
              <SkeletonBlock width="30%" height="1.5rem" />
            </div>

            {/* Items list placeholders */}
            <div className="rounded-lg p-2 border border-gray-200 dark:border-darkModeBorderColor bg-[#FBFBF8] dark:bg-darkModeBgColor dark:text-darkModeNormalTextColor text-[14px] space-y-3">
              {[...Array(5)].map((__, j) => (
                <div
                  key={j}
                  className="grid gap-2 grid-cols-5 border-b border-gray-300 dark:border-darkModeBorderColor rounded-lg p-1"
                >
                  <SkeletonBlock
                    width="90%"
                    height="1.25rem"
                    className="col-span-3"
                  />
                  <SkeletonBlock width="50%" height="1.25rem" />
                  <SkeletonBlock width="70%" height="1.25rem" />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Contributors & update info placeholders */}
      <div className="space-y-2 dark:text-darkModeNormalTextColor mt-4">
        {[...Array(3)].map((_, i) => (
          <SkeletonBlock key={i} width="70%" height="1rem" />
        ))}
      </div>
    </section>
  );
}
