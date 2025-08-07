import { loadStripe } from "@stripe/stripe-js";
import { baseUrl } from "../api/apiConstant";

const stripePromise = loadStripe(
  "pk_live_51RplAhBYC7YMMAFC7uODsfkBdTVL0v5Qhq5EOZ0MryrKf9P74f2l2zXjTS9i6kQXMGpPFvGMJD4ttj20WMHZH9CX004Xd966hu"
); // Your Stripe public key

export default function BuyNowEbook() {
  const handleBuyNow = async () => {
    const response = await fetch(
      `${baseUrl}/ebook-downloaded-users/create-checkout-session`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    const session = await response.json();
    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <button
      onClick={handleBuyNow}
      className="bg-black rounded-lg text-white md:px-5 px-2 py-3 md:w-auto w-full text-center"
    >
      Buy Now
    </button>
  );
}
