import { Icon } from "@iconify/react/dist/iconify.js";
import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSendCustomEmailMutation } from "../../redux/features/APIEndpoints/retirementEmailApi/retirementEmailApi";
import { showApiErrorToast } from "../../utils/showApiErrorToast";
import useTitle from "../../hooks/useTitle";

type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact(): JSX.Element {
  useTitle("Dollarfar | Contact");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const navigate = useNavigate();

  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [showError, setShowError] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const [sendCustomEmail, { isError, isLoading, error }] =
    useSendCustomEmailMutation(undefined);

  useEffect(() => {
    if (isError && !isLoading && error) {
      showApiErrorToast(error);
    }
  }, [isLoading, isError, error]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.email || !form.message || !form.subject) {
      return setShowError(true);
    }

    const formattedMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <div style="background: #f6f8fb; padding: 20px; border-radius: 8px;">
          <p><strong>Name:</strong> ${form.name}</p>
          <p><strong>Email:</strong> ${form.email}</p>
          <div style="margin-top: 20px;">
            <strong>Message:</strong>
            <p style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">${
              form.message
            }</p>
          </div>
        </div>
        <div style="margin-top: 20px; font-size: 12px; color: #5b6b7a; border-top: 1px solid #eee; padding-top: 10px;">
          Sent via Dollarfar.com Contact Form • ${new Date().toLocaleString()}
        </div>
      </div>
`;
    const emailBody = formattedMessage;
    const emailSubject = form.subject;
    console.log(emailBody, emailSubject);
    const res = await sendCustomEmail({ emailBody, emailSubject });
    if (res?.error) return;
    toast.success("Message sent successfully! We'll respond to you soon.");
  };

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
          aria-label="Contact"
          className="overflow-hidden rounded-[18px] border border-[rgba(18,48,74,.10)] bg-white shadow-[0_18px_45px_rgba(18,48,74,.18)] print:shadow-none dark:border-gray-800 dark:bg-gray-900 dark:shadow-[0_18px_45px_rgba(0,0,0,.3)]"
        >
          <div className="h-[8px] bg-gradient-to-r from-[#1ca8a8] to-[rgba(28,168,168,.55)]" />

          <div className="px-[28px] pt-[28px] pb-[22px]">
            <h1 className="mb-[8px] text-[28px] font-[750] tracking-[-.3px] leading-[1.15] text-[#12304a] dark:text-blue-50">
              Contact
            </h1>

            <p className="mb-[12px] max-w-[85ch] text-[#5b6b7a] dark:text-gray-400">
              If you would like to explore Proof-of-Concept participation—or
              have a question about RetireHow.com or DollarFar.com—send a
              message below.
            </p>

            <div className="mt-[12px] rounded-[12px] border border-[rgba(18,48,74,.12)] border-l-[5px] border-l-[#12304a] bg-[rgba(18,48,74,.06)] px-[14px] py-[12px] text-[14px] font-bold text-[#12304a] dark:border-gray-700 dark:border-l-blue-800 dark:bg-blue-900/20 dark:text-blue-100">
              For Proof-of-Concept inquiries, please include your country of
              residence and a short note on what you're trying to learn.
            </div>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a] leading-[1.25] dark:text-blue-50">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="my-[12px] rounded-[14px] border border-[rgba(18,48,74,.12)] bg-[rgba(255,255,255,.90)] p-[12px] dark:border-gray-700 dark:bg-gray-800/50">
                <label
                  htmlFor="name"
                  className="mb-[6px] block text-[14px] font-extrabold text-[#12304a] dark:text-blue-100"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full rounded-[12px] border border-[rgba(18,48,74,.18)] bg-white px-[12px] py-[10px] text-[14px] outline-none focus:border-[rgba(28,168,168,.55)] focus:ring-4 focus:ring-[rgba(28,168,168,.35)] dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-teal-500 dark:focus:ring-teal-500/30"
                />
              </div>

              {/* Email */}
              <div className="my-[12px] rounded-[14px] border border-[rgba(18,48,74,.12)] bg-[rgba(255,255,255,.90)] p-[12px] dark:border-gray-700 dark:bg-gray-800/50">
                <label
                  htmlFor="email"
                  className="mb-[6px] block text-[14px] font-extrabold text-[#12304a] dark:text-blue-100"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-[12px] border border-[rgba(18,48,74,.18)] bg-white px-[12px] py-[10px] text-[14px] outline-none focus:border-[rgba(28,168,168,.55)] focus:ring-4 focus:ring-[rgba(28,168,168,.35)] dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-teal-500 dark:focus:ring-teal-500/30"
                />
                {showError && !form.email && (
                  <p className="text-red-500 text-sm mt-1 dark:text-red-400">
                    This field is required*
                  </p>
                )}
              </div>

              {/* Subject  */}
              <div className="my-[12px] rounded-[14px] border border-[rgba(18,48,74,.12)] bg-[rgba(255,255,255,.90)] p-[12px] dark:border-gray-700 dark:bg-gray-800/50">
                <label
                  htmlFor="subject"
                  className="mb-[6px] block text-[14px] font-extrabold text-[#12304a] dark:text-blue-100"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  autoComplete="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Enter subject"
                  className="w-full rounded-[12px] border border-[rgba(18,48,74,.18)] bg-white px-[12px] py-[10px] text-[14px] outline-none focus:border-[rgba(28,168,168,.55)] focus:ring-4 focus:ring-[rgba(28,168,168,.35)] dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-teal-500 dark:focus:ring-teal-500/30"
                />
                {showError && !form.subject && (
                  <p className="text-red-500 text-sm mt-1 dark:text-red-400">
                    This field is required*
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="my-[12px] rounded-[14px] border border-[rgba(18,48,74,.12)] bg-[rgba(255,255,255,.90)] p-[12px] dark:border-gray-700 dark:bg-gray-800/50">
                <label
                  htmlFor="message"
                  className="mb-[6px] block text-[14px] font-extrabold text-[#12304a] dark:text-blue-100"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Enter message"
                  className="min-h-[130px] w-full resize-y rounded-[12px] border border-[rgba(18,48,74,.18)] bg-white px-[12px] py-[10px] text-[14px] outline-none focus:border-[rgba(28,168,168,.55)] focus:ring-4 focus:ring-[rgba(28,168,168,.35)] dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-teal-500 dark:focus:ring-teal-500/30"
                />
                {showError && !form.message && (
                  <p className="text-red-500 text-sm mt-1 dark:text-red-400">
                    This field is required*
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="mt-[14px] flex flex-wrap items-center justify-between gap-[10px] rounded-[14px] border border-[rgba(28,168,168,.20)] bg-[rgba(28,168,168,.08)] px-[14px] py-[14px] print:hidden dark:border-teal-500/30 dark:bg-teal-500/10">
                <div className="font-extrabold text-[#12304a] dark:text-blue-100">
                  Send when ready →
                </div>
                <div className="flex flex-wrap gap-[10px]">
                  <button
                    type="submit"
                    className={`rounded-[12px] px-[14px] py-[11px] text-[14px] font-extrabold tracking-[.2px] text-white ${
                      isLoading ? "bg-gray-300 dark:bg-gray-700" : "bg-[#12304a] dark:bg-blue-800 dark:hover:bg-blue-700"
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="rounded-[12px] border border-[rgba(18,48,74,.22)] bg-transparent px-[14px] py-[11px] text-[14px] font-extrabold text-[#12304a] dark:border-gray-600 dark:text-blue-100 dark:hover:bg-gray-800"
                  >
                    Print
                  </button>
                </div>
              </div>
            </form>

            <h2 className="mt-[18px] mb-[10px] border-l-[6px] border-[#f28b3c] pl-[12px] text-[18px] font-semibold text-[#12304a] dark:text-blue-50">
              Direct Email
            </h2>
            <p className="dark:text-gray-400">
              If you prefer email, you can write to:{" "}
              <strong className="dark:text-blue-100">rao.movva@retirehow.com</strong>
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