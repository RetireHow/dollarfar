const PdfDownloadUserCardSkeletonLoader = () => {
  const skeletonCards = Array.from({ length: 5 });
  const downloadedFileLines = Array.from({ length: 2 }); // Adjust for more/fewer fake downloads

  return (
    <div className="md:hidden space-y-4">
      {skeletonCards.map((_, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 shadow-sm bg-white space-y-2 animate-pulse"
        >
          {/* Name */}
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          {/* Phone */}
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          {/* Email */}
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          {/* Created At */}
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          {/* Downloaded Reports Label */}
          <div className="h-4 bg-gray-300 rounded w-1/3 mt-2"></div>
          {/* Downloaded File Entries */}
          <ul className="list-disc list-inside space-y-1 mt-1">
            {downloadedFileLines.map((_, idx) => (
              <li key={idx}>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PdfDownloadUserCardSkeletonLoader;
