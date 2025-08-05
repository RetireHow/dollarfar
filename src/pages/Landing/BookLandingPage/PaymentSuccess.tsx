import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get("session_id");

  console.log("Session ID =============> ", sessionId);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/ebook-downloaded-users/checkout-session?session_id=${sessionId}`
        );
        const data = await res.json();
        console.log("Session Data =============> ", data)
        if (data.downloadUrl) {
          setDownloadUrl(data.downloadUrl);
        }
      } catch (err) {
        console.error("Failed to verify session", err);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) fetchSession();
  }, [sessionId]);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-white px-6">
        <div className="max-w-md w-full text-center bg-white shadow-xl rounded-2xl p-8 border border-green-100">
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            🎉 Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your eBook is ready for download.
          </p>

          {loading ? (
            <p className="text-gray-400">Verifying your purchase...</p>
          ) : downloadUrl ? (
            <a
              href={downloadUrl}
              download
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              📥 Download eBook
            </a>
          ) : (
            <p className="text-red-500">
              Unable to fetch your download link. Please contact support.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
