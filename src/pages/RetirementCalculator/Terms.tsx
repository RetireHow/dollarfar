import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

export default function Terms(): JSX.Element {
  useTitle("Dollarfar | Terms of Use");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[radial-gradient(1200px_800px_at_18%_10%,rgba(28,168,168,.20),transparent_55%),radial-gradient(1100px_700px_at_80%_20%,rgba(242,139,60,.16),transparent_55%),radial-gradient(1000px_700px_at_50%_95%,rgba(28,111,184,.14),transparent_55%),#f6f8fb] text-[#14202b] antialiased print:bg-white dark:bg-[radial-gradient(1200px_800px_at_18%_10%,rgba(28,168,168,.15),transparent_55%),radial-gradient(1100px_700px_at_80%_20%,rgba(242,139,60,.12),transparent_55%),radial-gradient(1000px_700px_at_50%_95%,rgba(28,111,184,.10),transparent_55%),#0f172a] dark:text-gray-100">
      <div className="mx-auto max-w-[980px] px-[18px] pt-[28px] pb-[44px] print:px-0 print:pt-0">
        {/* Brand Bar */}
        <div className="mb-[16px] flex flex-wrap items-center justify-between gap-[14px] text-[13px] text-[#5b6b7a] dark:text-gray-400">
          <div className="font-extrabold text-[#12304a] whitespace-nowrap dark:text-blue-100">
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
          aria-label="Terms of Use"
          className="overflow-hidden rounded-[18px] border border-[rgba(18,48,74,.10)] bg-white shadow-[0_18px_45px_rgba(18,48,74,.18)] print:border-[#ddd] print:shadow-none dark:border-gray-800 dark:bg-gray-900 dark:shadow-[0_18px_45px_rgba(0,0,0,.3)]"
        >
          <div className="h-[8px] bg-gradient-to-r from-[#1ca8a8] to-[rgba(28,168,168,.55)]" />

          <div className="px-[28px] pt-[28px] pb-[22px]">
            <h1 className="mb-[8px] text-[28px] font-[750] tracking-[-.3px] leading-[1.15] text-[#12304a] dark:text-blue-50">
              Terms of Use
            </h1>

            <p className="mb-[12px] max-w-[85ch] text-[#5b6b7a] dark:text-gray-400">
              These terms explain how you may use RetireHow.com and
              DollarFar.com. They are written in plain language for clarity.
            </p>

            <div className="mt-[12px] rounded-[12px] border border-[rgba(18,48,74,.12)] border-l-[5px] border-l-[#12304a] bg-[rgba(18,48,74,.06)] px-[14px] py-[12px] text-[14px] font-bold text-[#12304a] dark:border-gray-700 dark:border-l-blue-800 dark:bg-blue-900/20 dark:text-blue-100">
              Key point: DollarFar.com tools are for education and decision
              support. RetireHow.com services are operational support. Neither
              replaces professional advice.
            </div>

            {/* Sections */}
            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a] dark:text-blue-50">
              Use of the Websites
            </h2>
            <p className="dark:text-gray-300">
              You may browse and use our websites and tools for personal,
              non-commercial purposes, unless we explicitly agree otherwise in
              writing.
            </p>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a] dark:text-blue-50">
              Educational Tools and No Professional Advice
            </h2>
            <p className="dark:text-gray-300">
              DollarFar.com calculators and materials are provided for
              educational and informational purposes only. Results are estimates
              and depend on the information you enter. They are not financial,
              legal, tax, medical, or insurance advice, and should not be relied
              upon as such.
            </p>
            <p className="dark:text-gray-300">
              You should consult qualified professionals for advice specific to
              your situation.
            </p>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a] dark:text-blue-50">
              Proof-of-Concept (POC) Participation
            </h2>
            <p className="dark:text-gray-300">
              If you apply to participate in a Proof-of-Concept, you understand
              that:
            </p>
            <ul className="ml-[20px] list-disc dark:text-gray-300">
              <li className="my-[6px]">
                The POC is exploratory and limited in size.
              </li>
              <li className="my-[6px]">
                Submitting an interest form does not guarantee participation.
              </li>
              <li className="my-[6px]">
                Participation begins with a conversation and mutual fit
                assessment.
              </li>
              <li className="my-[6px]">
                Outcomes are not guaranteed; learning is part of the purpose.
              </li>
            </ul>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a] dark:text-blue-50">
              Acceptable Use
            </h2>
            <p className="dark:text-gray-300">You agree not to:</p>
            <ul className="ml-[20px] list-disc dark:text-gray-300">
              <li className="my-[6px]">
                Attempt to interfere with site security or availability
              </li>
              <li className="my-[6px]">
                Copy, scrape, or reverse engineer tools in a way that violates
                law or our rights
              </li>
              <li className="my-[6px]">
                Use the websites to transmit harmful, unlawful, or abusive
                content
              </li>
            </ul>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a] dark:text-blue-50">
              Intellectual Property
            </h2>
            <p className="dark:text-gray-300">
              All content on these sites—including text, design, logos, and tool
              structure—is owned by RetireHow.com / DollarFar.com or licensed to
              us, and is protected by applicable intellectual property laws. You
              may not reproduce or republish it without permission, except for
              reasonable personal use.
            </p>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a] dark:text-blue-50">
              Third-Party Links
            </h2>
            <p className="dark:text-gray-300">
              Our sites may reference third-party websites or services. We do
              not control them and are not responsible for their content or
              practices.
            </p>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a] dark:text-blue-50">
              Disclaimer and Limitation of Liability
            </h2>
            <p className="dark:text-gray-300">
              We provide the websites and tools "as is" and "as available." To
              the fullest extent permitted by law, we disclaim warranties and
              are not liable for damages arising from your use of the sites,
              tools, or reliance on estimates.
            </p>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a] dark:text-blue-50">
              Changes
            </h2>
            <p className="dark:text-gray-300">
              We may update these terms as our sites and services evolve. When
              we update them, we will revise the "Last updated" date.
            </p>
            <p className="dark:text-gray-300">
              <strong className="dark:text-blue-100">Last updated:</strong> December 16, 2025
            </p>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a] dark:text-blue-50">
              Contact
            </h2>
            <p className="dark:text-gray-300">
              Questions about these terms can be sent through our contact page:
            </p>
            <p className="dark:text-gray-300">
              <strong className="dark:text-blue-100">Contact:</strong>{" "}
              <Link to="/contact" className="underline dark:text-blue-300 hover:dark:text-blue-200">
                /contact
              </Link>
            </p>
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