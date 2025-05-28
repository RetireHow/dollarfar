const EbookDownloadUserCardSkeletonLoader = () => {
  const skeletonCards = Array.from({ length: 5 });

  return (
    <div className="md:hidden space-y-4">
      {skeletonCards.map((_, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 shadow-sm bg-white space-y-2 animate-pulse"
        >
          {[...Array(5)].map((_, lineIndex) => (
            <div
              key={lineIndex}
              className="h-4 bg-gray-200 rounded w-3/4"
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default EbookDownloadUserCardSkeletonLoader;
