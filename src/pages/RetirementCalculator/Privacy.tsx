import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Privacy(): JSX.Element {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <main className="min-h-screen bg-[radial-gradient(1200px_800px_at_18%_10%,rgba(28,168,168,.20),transparent_55%),radial-gradient(1100px_700px_at_80%_20%,rgba(242,139,60,.16),transparent_55%),radial-gradient(1000px_700px_at_50%_95%,rgba(28,111,184,.14),transparent_55%),#f6f8fb] text-[#14202b] antialiased print:bg-white">
      <div className="mx-auto max-w-[980px] px-[18px] pt-[28px] pb-[44px] print:px-0 print:pt-0">
        {/* Brand Bar */}
        <div className="mb-[16px] flex flex-wrap items-center justify-between gap-[14px] text-[13px] text-[#5b6b7a]">
          <div className="whitespace-nowrap font-extrabold text-[#12304a]">
            RetireHow.com / DollarFar.com
          </div>
          <div className="whitespace-nowrap text-right">
            Plan · Retire · Travel · Live Better for Less
          </div>
        </div>

        {/* Card */}
        <section
          aria-label="Privacy Policy"
          className="overflow-hidden rounded-[18px] border border-[rgba(18,48,74,.10)] bg-white shadow-[0_18px_45px_rgba(18,48,74,.18)] print:shadow-none print:border-[#ddd]"
        >
          <div className="h-[8px] bg-gradient-to-r from-[#1ca8a8] to-[rgba(28,168,168,.55)]" />

          <div className="px-[28px] pt-[28px] pb-[22px]">
            <h1 className="mb-[8px] text-[28px] font-[750] tracking-[-.3px] leading-[1.15] text-[#12304a]">
              Privacy Policy
            </h1>

            <p className="mb-[12px] max-w-[85ch] text-[#5b6b7a]">
              This page explains how RetireHow.com and DollarFar.com handle
              personal information on our websites, tools, and Proof-of-Concept
              (POC) participation forms.
            </p>

            <div className="mt-[12px] rounded-[12px] border border-[rgba(18,48,74,.12)] border-l-[5px] border-l-[#12304a] bg-[rgba(18,48,74,.06)] px-[14px] py-[12px] text-[14px] font-bold text-[#12304a]">
              Plain-English commitment: we collect only what we need, use it
              only for its stated purpose, and do not sell personal information.
            </div>

            {/* Sections */}
            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a] leading-[1.25]">
              Who We Are
            </h2>
            <p>
              RetireHow.com provides comfort-first support and implementation
              services for seasonal living. DollarFar.com provides decision
              tools and calculators designed to help users build clarity before
              making lifestyle or financial changes.
            </p>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a]">
              Information We Collect
            </h2>

            <h3 className="mt-[14px] mb-[6px] text-[15px] font-semibold text-[#1c6fb8]">
              Information you provide
            </h3>
            <ul className="ml-[20px] list-disc">
              <li className="my-[6px]">
                Contact details (such as name and email) when you submit a form
                or request a conversation
              </li>
              <li className="my-[6px]">
                Responses you submit in interest forms, questionnaires, and
                feedback prompts
              </li>
              <li className="my-[6px]">
                Messages you send to us by email or through contact forms
              </li>
            </ul>

            <h3 className="mt-[14px] mb-[6px] text-[15px] font-semibold text-[#1c6fb8]">
              Information collected automatically
            </h3>
            <ul className="ml-[20px] list-disc">
              <li className="my-[6px]">
                Basic device and browser data (for example: IP address, browser
                type, approximate location, and pages visited)
              </li>
              <li className="my-[6px]">
                Cookie or similar identifiers used for site functionality,
                security, and analytics
              </li>
            </ul>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a]">
              How We Use Information
            </h2>
            <p>We use information to:</p>
            <ul className="ml-[20px] list-disc">
              <li className="my-[6px]">
                Review interest, assess fit, and schedule conversations for the
                Proof-of-Concept
              </li>
              <li className="my-[6px]">
                Provide requested information about our tools and services
              </li>
              <li className="my-[6px]">
                Maintain site security, improve performance, and understand
                usage patterns
              </li>
              <li className="my-[6px]">
                Improve program design and user experience using anonymized or
                aggregated insights
              </li>
            </ul>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a]">
              What We Do Not Do
            </h2>
            <ul className="ml-[20px] list-disc">
              <li className="my-[6px]">We do not sell personal information.</li>
              <li className="my-[6px]">
                We do not use POC intake forms to build marketing lists without
                your consent.
              </li>
              <li className="my-[6px]">
                We do not share personal details with unrelated third parties.
              </li>
            </ul>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a]">
              Sharing and Service Providers
            </h2>
            <p>
              We may use trusted service providers (for example, website
              hosting, analytics, and email tools) to operate our websites and
              support communications. Service providers are used only to deliver
              the service and are expected to protect information appropriately.
            </p>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a]">
              Retention
            </h2>
            <p>
              We retain personal information only as long as needed for the
              stated purpose (for example, managing POC intake and follow-up).
              We may retain anonymized or aggregated information to improve
              future program design and reporting.
            </p>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a]">
              Your Choices
            </h2>
            <ul className="ml-[20px] list-disc">
              <li className="my-[6px]">
                You may request access, correction, or deletion of your personal
                information.
              </li>
              <li className="my-[6px]">
                You may opt out of non-essential cookies where applicable.
              </li>
              <li className="my-[6px]">
                You may request that we stop contacting you at any time.
              </li>
            </ul>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a]">
              Contact
            </h2>
            <p>
              For privacy requests or questions, contact us using the page
              below:
            </p>
            <p>
              <strong>Contact:</strong>{" "}
              <Link to="/contact" className="underline">
                /contact
              </Link>
            </p>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a]">
              Updates to This Policy
            </h2>
            <p>
              We may update this policy as our sites and Proof-of-Concept
              learnings evolve. When we update it, we will revise the “Last
              updated” date.
            </p>
            <p>
              <strong>Last updated:</strong> December 16, 2025
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-center border-t border-[rgba(18,48,74,.10)] px-[28px] py-[22px] text-[12.5px] text-[#5b6b7a]">
            <div>© RetireHow.com / DollarFar.com</div>
          </div>
        </section>
      </div>
    </main>
  );
}
