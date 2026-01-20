import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

export default function RefundPolicy(): JSX.Element {
  useTitle("Dollarfar | Refund Policy");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[radial-gradient(1200px_800px_at_18%_10%,rgba(28,168,168,.20),transparent_55%),radial-gradient(1100px_700px_at_80%_20%,rgba(242,139,60,.16),transparent_55%),radial-gradient(1000px_700px_at_50%_95%,rgba(28,111,184,.14),transparent_55%),#f6f8fb] text-[#14202b] antialiased print:bg-white dark:bg-[radial-gradient(1200px_800px_at_18%_10%,rgba(28,168,168,.15),transparent_55%),radial-gradient(1100px_700px_at_80%_20%,rgba(242,139,60,.12),transparent_55%),radial-gradient(1000px_700px_at_50%_95%,rgba(28,111,184,.10),transparent_55%),#0f172a] dark:text-gray-100">
      <div className="mx-auto max-w-[980px] px-[18px] pt-[28px] pb-[44px] print:px-0 print:pt-0">
        {/* Brand Bar */}
        <div className="mb-[16px] flex flex-wrap items-center justify-between gap-[14px] text-[13px] text-[#5b6b7a] dark:text-gray-400">
          <div className="font-extrabold whitespace-nowrap">
            <button
              onClick={() => navigate(-1)}
              className="rounded-[12px] border border-[rgba(18,48,74,.18)] px-[14px] py-2 text-[14.5px] font-extrabold text-[var(--navy)] hover:brightness-95 flex items-center gap-3 hover:bg-teal-500 hover:text-white duration-300 dark:border-gray-700 dark:text-blue-100 dark:hover:bg-teal-600"
            >
              <Icon icon="ep:back" width="24" height="24" />
              <span>Go Back</span>
            </button>
          </div>
          <div className="whitespace-nowrap text-right">
            Plan · Retire · Travel · Live Better for Less
          </div>
        </div>

        {/* Card */}
        <section
          aria-label="Refund Policy"
          className="overflow-hidden rounded-[18px] border border-[rgba(18,48,74,.10)] bg-white shadow-[0_18px_45px_rgba(18,48,74,.18)] print:shadow-none print:border-[#ddd] dark:border-gray-800 dark:bg-gray-900 dark:shadow-[0_18px_45px_rgba(0,0,0,.3)]"
        >
          <div className="h-[8px] bg-gradient-to-r from-[#1ca8a8] to-[rgba(28,168,168,.55)]" />

          <div className="px-[28px] pt-[28px] pb-[22px]">
            <h1 className="mb-[6px] text-[28px] font-[750] tracking-[-.3px] leading-[1.15] text-[#12304a] dark:text-blue-50">
              Refund Policy
            </h1>

            <p className="mb-[14px] text-[13px] text-[#5b6b7a] dark:text-gray-400">
              Last Updated: July 15, 2025
            </p>

            <p className="dark:text-gray-300">
              At <strong>RetireHow? Inc.</strong>, accessible via{" "}
              <a
                href="https://dollarfar.com"
                className="underline text-[#1c6fb8] dark:text-blue-300"
              >
                https://dollarfar.com
              </a>
              , we are committed to delivering high-quality digital resources to
              support your financial and retirement planning journey. Due to the
              nature of digital products, we maintain the following refund
              policy:
            </p>

            {/* Section 1 */}
            <h2 className="mt-[20px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a] dark:text-blue-50">
              1. Digital Goods – No Refund Policy
            </h2>
            <p className="dark:text-gray-300">
              All products sold on our website are digital and non-tangible.
              Once a digital product is purchased and delivered (e.g., via
              download or account access), all sales are final. We do not offer
              refunds or exchanges for digital products except where required by
              Canadian consumer protection laws.
            </p>

            {/* Section 2 */}
            <h2 className="mt-[20px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a] dark:text-blue-50">
              2. Exceptions – Limited Circumstances
            </h2>
            <p className="dark:text-gray-300">
              We may consider refund requests under the following limited
              circumstances:
            </p>
            <ul className="ml-[20px] list-disc dark:text-gray-300">
              <li className="my-[6px]">
                You were charged multiple times for the same product
              </li>
              <li className="my-[6px]">
                You made an accidental duplicate purchase
              </li>
              <li className="my-[6px]">
                You experienced technical issues that prevent access to the
                product, and our support team could not resolve the issue within
                a reasonable timeframe
              </li>
            </ul>
            <p className="dark:text-gray-300">
              All such refund requests must be made within 7 days of purchase
              and will be reviewed on a case-by-case basis.
            </p>

            {/* Section 3 */}
            <h2 className="mt-[20px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a] dark:text-blue-50">
              3. How to Request a Refund
            </h2>
            <p className="dark:text-gray-300">
              To request a refund under the exceptions above, please contact us
              at{" "}
              <a
                href="mailto:support@dollarfar.com"
                className="underline text-[#1c6fb8] dark:text-blue-300"
              >
                support@dollarfar.com
              </a>{" "}
              with the following details:
            </p>
            <ul className="ml-[20px] list-disc dark:text-gray-300">
              <li className="my-[6px]">Full Name</li>
              <li className="my-[6px]">Email address used during purchase</li>
              <li className="my-[6px]">Order number or transaction ID</li>
              <li className="my-[6px]">A clear description of the issue</li>
            </ul>
            <p className="mt-[8px] font-semibold text-red-600 dark:text-red-400">
              Refund requests submitted after 7 days of the purchase date will
              not be considered.
            </p>

            {/* Section 4 */}
            <h2 className="mt-[20px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a] dark:text-blue-50">
              4. Processing Refunds
            </h2>
            <p className="dark:text-gray-300">
              If your refund request is approved, the refund will be processed
              to your original method of payment within the time frame as
              permitted by law. Processing times may vary depending on your
              payment provider.
            </p>

            {/* Section 5 */}
            <h2 className="mt-[20px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a] dark:text-blue-50">
              5. Need Help?
            </h2>
            <p className="dark:text-gray-300">
              If you have any questions or concerns about your digital purchase
              or our refund policy, feel free to contact us:
            </p>

            <div className="mt-[10px] space-y-[4px] dark:text-gray-300">
              <div>
                <strong className="dark:text-blue-100">RetireHow? Inc.</strong>
              </div>
              <div>
                Website:{" "}
                <a
                  href="https://dollarfar.com"
                  className="underline text-[#1c6fb8] dark:text-blue-300"
                >
                  https://dollarfar.com
                </a>
              </div>
              <div>
                Email:{" "}
                <a
                  href="mailto:support@dollarfar.com"
                  className="underline text-[#1c6fb8] dark:text-blue-300"
                >
                  support@dollarfar.com
                </a>
              </div>
              <div>Address: Toronto, Ontario, Canada</div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-center border-t border-[rgba(18,48,74,.10)] px-[28px] py-[22px] text-[12.5px] text-[#5b6b7a] dark:border-gray-800 dark:text-gray-500">
            <div>© RetireHow.com / DollarFar.com</div>
          </div>
        </section>
      </div>
    </main>
  );
}
