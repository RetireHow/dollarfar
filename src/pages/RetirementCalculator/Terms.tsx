import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Terms(): JSX.Element {
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
          aria-label="Terms of Use"
          className="overflow-hidden rounded-[18px] border border-[rgba(18,48,74,.10)] bg-white shadow-[0_18px_45px_rgba(18,48,74,.18)] print:border-[#ddd] print:shadow-none"
        >
          <div className="h-[8px] bg-gradient-to-r from-[#1ca8a8] to-[rgba(28,168,168,.55)]" />

          <div className="px-[28px] pt-[28px] pb-[22px]">
            <h1 className="mb-[8px] text-[28px] font-[750] tracking-[-.3px] leading-[1.15] text-[#12304a]">
              Terms of Use
            </h1>

            <p className="mb-[12px] max-w-[85ch] text-[#5b6b7a]">
              These terms explain how you may use RetireHow.com and
              DollarFar.com. They are written in plain language for clarity.
            </p>

            <div className="mt-[12px] rounded-[12px] border border-[rgba(18,48,74,.12)] border-l-[5px] border-l-[#12304a] bg-[rgba(18,48,74,.06)] px-[14px] py-[12px] text-[14px] font-bold text-[#12304a]">
              Key point: DollarFar.com tools are for education and decision
              support. RetireHow.com services are operational support. Neither
              replaces professional advice.
            </div>

            {/* Sections */}
            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a]">
              Use of the Websites
            </h2>
            <p>
              You may browse and use our websites and tools for personal,
              non-commercial purposes, unless we explicitly agree otherwise in
              writing.
            </p>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a]">
              Educational Tools and No Professional Advice
            </h2>
            <p>
              DollarFar.com calculators and materials are provided for
              educational and informational purposes only. Results are estimates
              and depend on the information you enter. They are not financial,
              legal, tax, medical, or insurance advice, and should not be relied
              upon as such.
            </p>
            <p>
              You should consult qualified professionals for advice specific to
              your situation.
            </p>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a]">
              Proof-of-Concept (POC) Participation
            </h2>
            <p>
              If you apply to participate in a Proof-of-Concept, you understand
              that:
            </p>
            <ul className="ml-[20px] list-disc">
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

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a]">
              Acceptable Use
            </h2>
            <p>You agree not to:</p>
            <ul className="ml-[20px] list-disc">
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

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a]">
              Intellectual Property
            </h2>
            <p>
              All content on these sites—including text, design, logos, and tool
              structure—is owned by RetireHow.com / DollarFar.com or licensed to
              us, and is protected by applicable intellectual property laws. You
              may not reproduce or republish it without permission, except for
              reasonable personal use.
            </p>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a]">
              Third-Party Links
            </h2>
            <p>
              Our sites may reference third-party websites or services. We do
              not control them and are not responsible for their content or
              practices.
            </p>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a]">
              Disclaimer and Limitation of Liability
            </h2>
            <p>
              We provide the websites and tools “as is” and “as available.” To
              the fullest extent permitted by law, we disclaim warranties and
              are not liable for damages arising from your use of the sites,
              tools, or reliance on estimates.
            </p>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a]">
              Changes
            </h2>
            <p>
              We may update these terms as our sites and services evolve. When
              we update them, we will revise the “Last updated” date.
            </p>
            <p>
              <strong>Last updated:</strong> December 16, 2025
            </p>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a]">
              Contact
            </h2>
            <p>
              Questions about these terms can be sent through our contact page:
            </p>
            <p>
              <strong>Contact:</strong>{" "}
              <Link to="/contact" className="underline">
                /contact
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="flex flex-wrap justify-between gap-[10px] border-t border-[rgba(18,48,74,.10)] px-[28px] py-[22px] text-[12.5px] text-[#5b6b7a]">
            <div>© RetireHow.com / DollarFar.com</div>
            <div className="space-x-2">
              <Link to="/privacy" className="underline hover:text-[#12304a]">
                Privacy Policy
              </Link>
              ·
              <Link to="/terms" className="underline hover:text-[#12304a]">
                Terms of Use
              </Link>
              ·
              <Link to="/contact" className="underline hover:text-[#12304a]">
                Contact
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
