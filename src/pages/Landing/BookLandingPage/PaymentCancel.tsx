import { Link } from "react-router-dom";


export default function PaymentCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white px-6">
      <div className="max-w-md w-full text-center bg-white shadow-xl rounded-2xl p-8 border border-red-100">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          ❌ Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-6">
          It looks like you didn’t complete your purchase. If you have
          questions, feel free to reach out or try again below.
        </p>
        <Link
          to="/"
          className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          🔁 Try Again
        </Link>
      </div>
    </div>
  );
}
