import { useEffect } from "react";

export default function RefundPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-gray-800 dark:text-white dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
        Refund Policy
      </h1>
      <p className="text-sm text-gray-500 text-center dark:text-white">
        Last Updated: July 15, 2025
      </p>

      <p>
        At <strong>RetireHow? Inc.</strong>, accessible via{" "}
        <a
          href="https://dollarfar.com"
          className="text-blue-600 underline dark:text-white"
        >
          https://dollarfar.com
        </a>
        , we are committed to delivering high-quality digital resources to
        support your financial and retirement planning journey. Due to the
        nature of digital products, we maintain the following refund policy:
      </p>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">
          1. Digital Goods – No Refund Policy
        </h2>
        <p>
          All products sold on our website are digital and non-tangible. Once a
          digital product is purchased and delivered (e.g., via download or
          account access), all sales are final. We do not offer refunds or
          exchanges for digital products except where required by Canadian
          consumer protection laws.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">
          2. Exceptions – Limited Circumstances
        </h2>
        <p>
          We may consider refund requests under the following limited
          circumstances:
        </p>
        <ul className="list-disc list-inside pl-4 space-y-1">
          <li>You were charged multiple times for the same product</li>
          <li>You made an accidental duplicate purchase</li>
          <li>
            You experienced technical issues that prevent access to the product,
            and our support team could not resolve the issue within a reasonable
            timeframe
          </li>
        </ul>
        <p>
          All such refund requests must be made within 7 days of purchase and
          will be reviewed on a case-by-case basis.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">
          3. How to Request a Refund
        </h2>
        <p>
          To request a refund under the exceptions above, please contact us at{" "}
          <a
            href="mailto:support@dollarfar.com"
            className="text-blue-600 underline dark:text-white"
          >
            support@dollarfar.com
          </a>{" "}
          with the following details:
        </p>
        <ul className="list-disc list-inside pl-4 space-y-1">
          <li>Full Name</li>
          <li>Email address used during purchase</li>
          <li>Order number or transaction ID</li>
          <li>A clear description of the issue</li>
        </ul>
        <p className="text-red-600 font-medium dark:text-red-400">
          Refund requests submitted after 7 days of the purchase date will not
          be considered.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">
          4. Processing Refunds
        </h2>
        <p>
          If your refund request is approved, the refund will be processed to
          your original method of payment within the time frame as permitted by
          law. Processing times may vary depending on your payment provider.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold dark:text-white">5. Need Help?</h2>
        <p>
          If you have any questions or concerns about your digital purchase or
          our refund policy, feel free to contact us:
        </p>
        <address className="not-italic space-y-1">
          <div>
            <strong>RetireHow? Inc.</strong>
          </div>
          <div>
            Website:{" "}
            <a
              href="https://dollarfar.com"
              className="text-blue-600 underline dark:text-white"
            >
              https://dollarfar.com
            </a>
          </div>
          <div>
            Email:{" "}
            <a
              href="mailto:support@dollarfar.com"
              className="text-blue-600 underline dark:text-white"
            >
              support@dollarfar.com
            </a>
          </div>
          <div>Address: Toronto, Ontario, Canada</div>
        </address>
      </section>
    </div>
  );
}
