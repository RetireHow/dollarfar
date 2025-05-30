const AdminDashboardGreetingSkeleton = () => {
  return (
    <div className="bg-white dark:bg-neutral-900 border-[1px] shadow-lg rounded-xl p-8 max-w-4xl mx-auto mt-10">
      <div className="flex items-center space-x-4">
        <div>
          <div className="text-3xl font-semibold flex md:flex-row flex-col items-center gap-2">
            <p>Welcome back,</p>
            <p className="w-48 h-7 bg-gray-200 rounded animate-pulse"></p>
          </div>

          <p className="mt-1 text-lg">
            Your dashboard is ready to assist you in managing users, monitoring
            system activities, and accessing analytics.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
          <div className="p-4 bg-gray-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold text-gray-700">Total Users</h3>
            <div className="flex items-center gap-2">
              <p className="text-neutral-700">Report Downloaded:</p>
              <div className="w-6 h-3 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-neutral-700">Ebook Downloaded:</p>
              <div className="w-6 h-3 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
          <div className="p-4 bg-gray-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold text-gray-700">
              Users Added Today
            </h3>
            <div className="w-6 h-3 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardGreetingSkeleton;
