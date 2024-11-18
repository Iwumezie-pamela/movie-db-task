export default function SkeletonCard() {
    return (
      <div className="rounded-lg shadow-md overflow-hidden bg-gray-200 animate-pulse">
        <div className="h-64 bg-gray-300" />
        <div className="p-2">
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    );
  }
  