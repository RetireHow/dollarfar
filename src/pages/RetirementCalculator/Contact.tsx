import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";

type ContactFormState = {
  name: string;
  email: string;
  message: string;
};

export default function Contact(): JSX.Element {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // submit handling placeholder
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(1200px_800px_at_18%_10%,rgba(28,168,168,.20),transparent_55%),radial-gradient(1100px_700px_at_80%_20%,rgba(242,139,60,.16),transparent_55%),radial-gradient(1000px_700px_at_50%_95%,rgba(28,111,184,.14),transparent_55%),#f6f8fb] text-[#14202b] antialiased print:bg-white">
      <div className="mx-auto max-w-[980px] px-[18px] pt-[28px] pb-[44px] print:px-0 print:pt-0">
        {/* Brand Bar */}
        <div className="mb-[16px] flex flex-wrap items-center justify-between gap-[14px] text-[13px] text-[#5b6b7a]">
          <div className="font-extrabold text-[#12304a] whitespace-nowrap">
            RetireHow.com / DollarFar.com
          </div>
          <div className="whitespace-nowrap text-right">
            Plan · Retire · Travel · Live Better for Less
          </div>
        </div>

        {/* Card */}
        <section
          aria-label="Contact"
          className="overflow-hidden rounded-[18px] border border-[rgba(18,48,74,.10)] bg-white shadow-[0_18px_45px_rgba(18,48,74,.18)] print:shadow-none"
        >
          <div className="h-[8px] bg-gradient-to-r from-[#1ca8a8] to-[rgba(28,168,168,.55)]" />

          <div className="px-[28px] pt-[28px] pb-[22px]">
            <h1 className="mb-[8px] text-[28px] font-[750] tracking-[-.3px] leading-[1.15] text-[#12304a]">
              Contact
            </h1>

            <p className="mb-[12px] max-w-[85ch] text-[#5b6b7a]">
              If you would like to explore Proof-of-Concept participation—or
              have a question about RetireHow.com or DollarFar.com—send a
              message below.
            </p>

            <div className="mt-[12px] rounded-[12px] border border-[rgba(18,48,74,.12)] border-l-[5px] border-l-[#12304a] bg-[rgba(18,48,74,.06)] px-[14px] py-[12px] text-[14px] font-bold text-[#12304a]">
              For Proof-of-Concept inquiries, please include your country of
              residence and a short note on what you’re trying to learn.
            </div>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a] leading-[1.25]">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="my-[12px] rounded-[14px] border border-[rgba(18,48,74,.12)] bg-[rgba(255,255,255,.90)] p-[12px]">
                <label
                  htmlFor="name"
                  className="mb-[6px] block text-[14px] font-extrabold text-[#12304a]"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full rounded-[12px] border border-[rgba(18,48,74,.18)] bg-white px-[12px] py-[10px] text-[14px] outline-none focus:border-[rgba(28,168,168,.55)] focus:ring-4 focus:ring-[rgba(28,168,168,.35)]"
                />
              </div>

              {/* Email */}
              <div className="my-[12px] rounded-[14px] border border-[rgba(18,48,74,.12)] bg-[rgba(255,255,255,.90)] p-[12px]">
                <label
                  htmlFor="email"
                  className="mb-[6px] block text-[14px] font-extrabold text-[#12304a]"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email. e.g., rao.movva@retirehow.com"
                  className="w-full rounded-[12px] border border-[rgba(18,48,74,.18)] bg-white px-[12px] py-[10px] text-[14px] outline-none focus:border-[rgba(28,168,168,.55)] focus:ring-4 focus:ring-[rgba(28,168,168,.35)]"
                />
              </div>

              {/* Message */}
              <div className="my-[12px] rounded-[14px] border border-[rgba(18,48,74,.12)] bg-[rgba(255,255,255,.90)] p-[12px]">
                <label
                  htmlFor="message"
                  className="mb-[6px] block text-[14px] font-extrabold text-[#12304a]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Enter message"
                  className="min-h-[130px] w-full resize-y rounded-[12px] border border-[rgba(18,48,74,.18)] bg-white px-[12px] py-[10px] text-[14px] outline-none focus:border-[rgba(28,168,168,.55)] focus:ring-4 focus:ring-[rgba(28,168,168,.35)]"
                />
              </div>

              {/* Actions */}
              <div className="mt-[14px] flex flex-wrap items-center justify-between gap-[10px] rounded-[14px] border border-[rgba(28,168,168,.20)] bg-[rgba(28,168,168,.08)] px-[14px] py-[14px] print:hidden">
                <div className="font-extrabold text-[#12304a]">
                  Send when ready →
                </div>
                <div className="flex flex-wrap gap-[10px]">
                  <button
                    type="submit"
                    className="rounded-[12px] bg-[#12304a] px-[14px] py-[11px] text-[14px] font-extrabold tracking-[.2px] text-white"
                  >
                    Send Message
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="rounded-[12px] border border-[rgba(18,48,74,.22)] bg-transparent px-[14px] py-[11px] text-[14px] font-extrabold text-[#12304a]"
                  >
                    Print
                  </button>
                </div>
              </div>
            </form>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a]">
              Direct Email
            </h2>
            <p>
              If you prefer email, you can write to:{" "}
              <strong>rao.movva@retirehow.com</strong>
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
