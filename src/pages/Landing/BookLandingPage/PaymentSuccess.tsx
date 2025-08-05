import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Define the expected shape of the Stripe session object
interface StripeSession {
  id: string;
  payment_status: string;
  amount_total: number;
  currency: string;
  payment_intent: string;
  customer_details: {
    name: string;
    email: string;
    address: {
      city: string | null;
      country: string | null;
      line1: string | null;
      line2: string | null;
      postal_code: string | null;
      state: string | null;
    };
  };
}

// Define the response shape from your backend
interface ApiResponse {
  success: boolean;
  session: StripeSession;
}

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [sessionData, setSessionData] = useState<StripeSession | null>(null);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/ebook-downloaded-users/checkout-session?session_id=${sessionId}`
        );
        const data: ApiResponse = await res.json();
        if (data.success) {
          setSessionData(data.session);
        }
      } catch (err) {
        console.error('Failed to fetch session data', err);
      }
    };

    if (sessionId) fetchSession();
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="max-w-xl w-full bg-green-50 border border-green-200 shadow rounded-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Payment Complete</h1>

        {sessionData ? (
          <>
            <p className="mb-2">
              Thanks <strong>{sessionData.customer_details?.name}</strong>!
            </p>
            <p className="mb-2">
              We’ve sent a confirmation to{' '}
              <strong>{sessionData.customer_details?.email}</strong>
            </p>
            <p className="mb-2">
              Amount Paid:{' '}
              <strong>
                {(sessionData.amount_total / 100).toFixed(2)} {sessionData.currency.toUpperCase()}
              </strong>
            </p>
            <p className="mb-4">
              Transaction ID: <code>{sessionData.payment_intent}</code>
            </p>

            <a
              href="https://yourdomain.com/public/book.pdf"
              download
              className="mt-4 inline-block px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
            >
              📥 Download Your eBook
            </a>
          </>
        ) : (
          <p className="text-gray-500">Loading your transaction details...</p>
        )}
      </div>
    </div>
  );
}
