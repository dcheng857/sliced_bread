import Link from "next/link";

export function OrderNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The order you're looking for doesn't exist.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
