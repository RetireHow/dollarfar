import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useCreatePOCInterestMutation } from "../../redux/features/APIEndpoints/POCInterestApi/POCInterestApi";
import { toast } from "react-toastify";
import { showApiErrorToast } from "../../utils/showApiErrorToast";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import useTitle from "../../hooks/useTitle";
import RedStar from "../../components/UI/RedStar";

type POCFormState = {
  full_name: string;
  email: string;
  phone: string;
  country: string;
  participating_as: string;
  duration: string;
  persona: string[];
  what_to_validate: string;
  ack: boolean;
};

export default function POCInterestForm(): JSX.Element {
  useTitle("Dollarfar | POC Interest & Fit Form");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [form, setForm] = useState<POCFormState>({
    full_name: "",
    email: "",
    phone: "",
    country: "",
    participating_as: "",
    duration: "",
    persona: [],
    what_to_validate: "",
    ack: false,
  });
  const [showError, setShowError] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name === "persona") {
      setForm((prev) => ({
        ...prev,
        persona: checked
          ? [...prev.persona, value]
          : prev.persona.filter((p) => p !== value),
      }));
    } else if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const [createPOCInterest, { isLoading, isError, error }] =
    useCreatePOCInterestMutation(undefined);

  useEffect(() => {
    if (isError && !isLoading && error) {
      showApiErrorToast(error);
    }
  }, [isLoading, isError, error]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.phone || !form.ack) {
      return setShowError(true);
    }

    const res = await createPOCInterest(form);
    if (res?.error) return;
    toast.success("Your form is submitted successfully.", { autoClose: 5000 });
  };

  const navigate = useNavigate();

  return (
    <main
      className="min-h-screen text-[#0f1a23] dark:text-gray-100"
      style={{
        background:
          "radial-gradient(1100px 520px at 18% 10%, rgba(28,168,168,.12), transparent 60%), radial-gradient(900px 520px at 82% 22%, rgba(242,139,60,.10), transparent 55%), linear-gradient(180deg,#f7fbfb,#f7f9fc)",
        fontFamily:
          '-apple-system,BlinkMacSystemFont,"SF Pro Text","SF Pro Display",system-ui,"Segoe UI",Roboto,Helvetica,Arial',
      }}
    >
      <div className="mx-auto max-w-[980px] px-[14px] pb-[40px] pt-[22px]">
        {/* Topbar */}
        <div className="flex md:flex-row flex-col items-center justify-between gap-[12px] rounded-[14px] border border-[rgba(18,48,74,.06)] bg-[rgba(255,255,255,.84)] px-[14px] py-[10px] backdrop-blur max-[760px]:justify-center dark:border-gray-800 dark:bg-gray-800/80 dark:backdrop-blur-md">
          <div className="text-[13.2px] font-extrabold text-[#12304a] whitespace-nowrap dark:text-blue-100">
            RetireHow.com / DollarFar.com
          </div>
          <div className="text-[12.6px] font-bold text-[#556574] whitespace-nowrap max-[760px]:whitespace-normal max-[760px]:text-center dark:text-gray-400">
            Plan · Retire · Travel · Live Better for Less
          </div>
        </div>

        {/* Card */}
        <section className="mt-[14px] overflow-hidden rounded-[18px] border border-[rgba(18,48,74,.06)] bg-white shadow-[0_14px_34px_rgba(18,48,74,.10)] dark:border-gray-800 dark:bg-gray-800 dark:shadow-[0_14px_34px_rgba(0,0,0,.3)]">
          <div className="h-[6px] bg-[#1ca8a8]" />

          <div className="px-[26px] pt-[26px] pb-[22px] max-sm:px-[14px] max-sm:pt-[20px] dark:text-gray-300">
            <h1 className="mb-[8px] text-center text-[26px] font-[750] tracking-[-0.35px] text-[#12304a] dark:text-blue-50">
              Explore the Proof-of-Concept Pathway
            </h1>

            <p className="mx-auto mb-[16px] max-w-[74ch] text-center text-[15px] leading-[1.45] text-[#556574] dark:text-gray-400">
              You've explored how long money can last and where it can go
              further. The Proof-of-Concept (POC) is where insight can become
              lived experience — safely, temporarily, and with support.
            </p>

            {/* Pills */}
            <div className="mb-[18px] flex flex-wrap justify-center gap-[10px]">
              <span className="rounded-full border border-[rgba(28,168,168,.25)] bg-[rgba(28,168,168,.08)] px-[10px] py-[7px] text-[12.6px] font-[750] text-[#12304a] dark:border-teal-400/30 dark:bg-teal-500/10 dark:text-blue-100">
                Comfort-first seasonal living
              </span>
              <span className="rounded-full border border-[rgba(18,48,74,.10)] bg-[rgba(18,48,74,.03)] px-[10px] py-[7px] text-[12.6px] font-[750] text-[#12304a] dark:border-gray-700 dark:bg-gray-700/50 dark:text-blue-100">
                Short-term • low commitment
              </span>
              <span className="rounded-full border border-[rgba(242,139,60,.25)] bg-[rgba(242,139,60,.08)] px-[10px] py-[7px] text-[12.6px] font-[750] text-[#12304a] dark:border-orange-400/30 dark:bg-orange-500/10 dark:text-blue-100">
                Test the Cost Escape™ Dividend
              </span>
            </div>

            {/* Grid */}
            <div className="mt-[8px] grid grid-cols-2 gap-[12px] max-[760px]:grid-cols-1">
              <div className="rounded-[16px] border border-[rgba(18,48,74,.06)] bg-white px-[14px] pt-[14px] pb-[12px] dark:border-gray-700 dark:bg-gray-700/50">
                <h2 className="mb-[8px] border-l-[5px] border-[#f28b3c] pl-[10px] text-[15px] font-extrabold text-[#12304a] dark:text-blue-100">
                  What this POC is
                </h2>
                <ul className="list-disc pl-[18px] text-[13.8px] leading-[1.5] text-[#556574] dark:text-gray-400">
                  <li className="my-[6px]">
                    A real-life test of Cost Escape™ living — designed for
                    comfort and clarity
                  </li>
                  <li className="my-[6px]">
                    A structured pathway to evaluate lifestyle, costs, and
                    day-to-day fit
                  </li>
                  <li className="my-[6px]">
                    Supported by RetireHow's on-the-ground concierge team
                  </li>
                </ul>
              </div>

              <div className="rounded-[16px] border border-[rgba(18,48,74,.06)] bg-white px-[14px] pt-[14px] pb-[12px] dark:border-gray-700 dark:bg-gray-700/50">
                <h2 className="mb-[8px] border-l-[5px] border-[#f28b3c] pl-[10px] text-[15px] font-extrabold text-[#12304a] dark:text-blue-100">
                  What this POC is not
                </h2>
                <ul className="list-disc pl-[18px] text-[13.8px] leading-[1.5] text-[#556574] dark:text-gray-400">
                  <li className="my-[6px]">
                    Not a tour package or itinerary-based vacation
                  </li>
                  <li className="my-[6px]">
                    Not relocation and not a permanent commitment
                  </li>
                  <li className="my-[6px]">
                    Not a money-management product or investment service
                  </li>
                </ul>
              </div>
            </div>

            {/* Callout */}
            <div className="mt-[14px] rounded-[16px] border border-[rgba(28,168,168,.18)] bg-[rgba(28,168,168,.06)] px-[14px] pt-[14px] pb-[12px] dark:border-teal-500/30 dark:bg-teal-500/10">
              <div className="mb-[6px] text-[14.6px] font-[850] text-[#12304a] dark:text-blue-100">
                Next step
              </div>
              <p className="text-[13.8px] leading-[1.45] text-[#556574] dark:text-gray-400">
                If this resonates, complete the short interest & fit form below.
                It helps confirm whether the POC pathway is a good match — and
                what kind of support you would want.
              </p>
            </div>

            {/* What happens next */}
            <h2 className="mt-[18px] mb-[8px] border-l-[5px] border-[#f28b3c] pl-[10px] text-[15px] font-extrabold text-[#12304a] dark:text-blue-100">
              What happens next
            </h2>

            <p className="mb-[10px] text-[13.8px] text-[#556574] dark:text-gray-400">
              This Proof-of-Concept (POC) is a real-life test of Cost Escape™
              living — not a vacation or tour.
            </p>

            <ul className="mb-[10px] list-disc pl-[18px] text-[13.8px] leading-[1.5] text-[#556574] dark:text-gray-400">
              <li>Vetted housing</li>
              <li>Comfort-first concierge support</li>
              <li>Reduced cost of living (cost-recovery only)</li>
              <li>Curated cultural experiences and optional domestic travel</li>
            </ul>

            <div className="mb-[10px] text-[13.6px] dark:text-gray-300">
              <strong>POC operating window:</strong> December 2026 – February
              2027 <span className="mx-[6px]">|</span>
              <strong>Location:</strong> South India (Vijayawada)
            </div>

            <p className="mb-[12px] text-[13.6px] text-[#556574] dark:text-gray-400">
              The short form below helps confirm fit and intent. If aligned, you
              may be invited to schedule a brief conversation.
            </p>

            {/* Card */}
            <section>
              <div className="pb-[22px] pt-[26px] max-[760px]:px-[14px]">
                <h1 className="mb-[12px] text-center text-[26px] font-[750] tracking-[-0.35px] text-[#12304a] dark:text-blue-50">
                  POC Interest & Fit Form
                </h1>

                <p className="mx-auto mb-[18px] max-w-[76ch] text-center text-[15px] leading-[1.45] text-[#556574] dark:text-gray-400">
                  Complete this form if you're genuinely interested in
                  participating in the Vijayawada Proof-of-Concept. The
                  questions help assess fit.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Your basics */}
                  <h2 className="mt-[18px] border-l-[5px] border-[#f28b3c] pl-[10px] text-[15px] font-extrabold text-[#12304a] dark:text-blue-100">
                    Your basics
                  </h2>
                  <p className="mb-[12px] text-[13.8px] text-[#556574] dark:text-gray-400">
                    We'll use this to follow up and suggest a next step.
                  </p>

                  <div className="grid md:grid-cols-3 grid-cols-1 gap-[12px]">
                    <div className="rounded-[16px] border border-[rgba(18,48,74,.06)] bg-white p-[14px] dark:border-gray-700 dark:bg-gray-700/50">
                      <label className="mb-[8px] block text-[13.6px] font-bold text-[#12304a] dark:text-blue-100">
                        Full name <RedStar />
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        value={form.full_name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        className="w-full rounded-[12px] border border-[rgba(18,48,74,.14)] px-[12px] py-[12px] text-[14px] outline-none focus:border-[rgba(28,168,168,.45)] focus:ring-4 focus:ring-[rgba(28,168,168,.10)] dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-teal-500 dark:focus:ring-teal-500/20"
                      />
                      {showError && !form.full_name && (
                        <p className="text-red-500 dark:text-red-400 font-semibold mt-1 text-sm">
                          This field is required*
                        </p>
                      )}
                    </div>

                    <div className="rounded-[16px] border border-[rgba(18,48,74,.06)] bg-white p-[14px] dark:border-gray-700 dark:bg-gray-700/50">
                      <label className="mb-[8px] block text-[13.6px] font-bold text-[#12304a] dark:text-blue-100">
                        Email <RedStar />
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        className="w-full rounded-[12px] border border-[rgba(18,48,74,.14)] px-[12px] py-[12px] text-[14px] outline-none focus:border-[rgba(28,168,168,.45)] focus:ring-4 focus:ring-[rgba(28,168,168,.10)] dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-teal-500 dark:focus:ring-teal-500/20"
                      />
                      {showError && !form.email && (
                        <p className="text-red-500 dark:text-red-400 font-semibold mt-1 text-sm">
                          This field is required*
                        </p>
                      )}
                    </div>
                    <div className="rounded-[16px] border border-[rgba(18,48,74,.06)] bg-white p-[14px] dark:border-gray-700 dark:bg-gray-700/50">
                      <label className="mb-[8px] block text-[13.6px] font-bold text-[#12304a] dark:text-blue-100">
                        Phone <RedStar />
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone"
                        required
                        className="w-full rounded-[12px] border border-[rgba(18,48,74,.14)] px-[12px] py-[12px] text-[14px] outline-none focus:border-[rgba(28,168,168,.45)] focus:ring-4 focus:ring-[rgba(28,168,168,.10)] dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-teal-500 dark:focus:ring-teal-500/20"
                      />
                      {showError && !form.phone && (
                        <p className="text-red-500 dark:text-red-400 font-semibold mt-1 text-sm">
                          This field is required*
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Country */}
                  <h2 className="mt-[18px] border-l-[5px] border-[#f28b3c] pl-[10px] text-[15px] font-extrabold text-[#12304a] dark:text-blue-100">
                    Where are you based?
                  </h2>
                  <p className="mb-[12px] text-[13.8px] text-[#556574] dark:text-gray-400">
                    For the Proof-of-Concept phase, participation is currently
                    available for Canada, the USA, and the UK.
                  </p>

                  <div className="flex flex-wrap gap-[10px]">
                    {["Canada", "United States", "United Kingdom", "Other"].map(
                      (c) => (
                        <label
                          key={c}
                          className="flex flex-1 items-start gap-[10px] rounded-[14px] border border-[rgba(18,48,74,.08)] bg-[rgba(18,48,74,.02)] p-[10px] dark:border-gray-700 dark:bg-gray-700/30"
                        >
                          <input
                            type="radio"
                            name="country"
                            value={c}
                            checked={form.country === c}
                            onChange={handleChange}
                            required
                            className="mt-[3px] dark:accent-teal-500"
                          />
                          <span className="text-[13.6px] text-[#556574] dark:text-gray-400">
                            <strong className="text-[#12304a] dark:text-blue-100">
                              {c}
                            </strong>
                            {c === "Other" && (
                              <span>
                                {" "}
                                (we'll notify you as locations expand)
                              </span>
                            )}
                          </span>
                        </label>
                      ),
                    )}
                  </div>

                  {/* Participation */}
                  <h2 className="mt-[18px] border-l-[5px] border-[#f28b3c] pl-[10px] text-[15px] font-extrabold text-[#12304a] dark:text-blue-100">
                    How would you participate?
                  </h2>

                  <div className="flex flex-wrap gap-[10px]">
                    {["Individual", "Couple", "Small group (friends)"].map(
                      (p) => (
                        <label
                          key={p}
                          className="flex flex-1 items-start gap-[10px] rounded-[14px] border border-[rgba(18,48,74,.08)] bg-[rgba(18,48,74,.02)] p-[10px] dark:border-gray-700 dark:bg-gray-700/30"
                        >
                          <input
                            type="radio"
                            name="participating_as"
                            value={p}
                            checked={form.participating_as === p}
                            onChange={handleChange}
                            required
                            className="mt-[3px] dark:accent-teal-500"
                          />
                          <span className="text-[13.6px] text-[#556574] dark:text-gray-400">
                            <strong className="text-[#12304a] dark:text-blue-100">
                              {p}
                            </strong>
                          </span>
                        </label>
                      ),
                    )}
                  </div>

                  {/* Duration */}
                  <h2 className="mt-[18px] border-l-[5px] border-[#f28b3c] pl-[10px] text-[15px] font-extrabold text-[#12304a] dark:text-blue-100">
                    What duration feels realistic?
                  </h2>

                  <div className="flex flex-wrap gap-[10px]">
                    {["1 month", "2 months", "3 months"].map((d) => (
                      <label
                        key={d}
                        className="flex flex-1 items-start gap-[10px] rounded-[14px] border border-[rgba(18,48,74,.08)] bg-[rgba(18,48,74,.02)] p-[10px] dark:border-gray-700 dark:bg-gray-700/30"
                      >
                        <input
                          type="radio"
                          name="duration"
                          value={d}
                          checked={form.duration === d}
                          onChange={handleChange}
                          required
                          className="mt-[3px] dark:accent-teal-500"
                        />
                        <span className="text-[13.6px] text-[#556574] dark:text-gray-400">
                          <strong className="text-[#12304a] dark:text-blue-100">
                            {d}
                          </strong>
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* Personas */}
                  <h2 className="mt-[18px] border-l-[5px] border-[#f28b3c] pl-[10px] text-[15px] font-extrabold text-[#12304a] dark:text-blue-100">
                    Which situation sounds closest to you?
                  </h2>
                  <p className="mb-[12px] text-[13.8px] text-[#556574] dark:text-gray-400">
                    Optional — helps us understand what you're trying to solve.
                  </p>

                  <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[10px]">
                    {[
                      "Money longevity",
                      "Indian diaspora",
                      "Comfort-first immersion",
                      "Friends season",
                      "Health & wellness",
                      "Working professionals",
                      "Cautious trial",
                      "Premium comfort",
                    ].map((p) => (
                      <label
                        key={p}
                        className="flex flex-1 items-start gap-[10px] rounded-[14px] border border-[rgba(18,48,74,.08)] bg-[rgba(18,48,74,.02)] p-[10px] dark:border-gray-700 dark:bg-gray-700/30"
                      >
                        <input
                          type="checkbox"
                          name="persona"
                          value={p}
                          checked={form.persona.includes(p)}
                          onChange={handleChange}
                          className="mt-[3px] dark:accent-teal-500"
                        />
                        <span className="text-[13.6px] text-[#556574] dark:text-gray-400">
                          {p}
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* Textarea */}
                  <h2 className="mt-[18px] border-l-[5px] border-[#f28b3c] pl-[10px] text-[15px] font-extrabold text-[#12304a] dark:text-blue-100">
                    What would you want to validate?
                  </h2>
                  <p className="mb-[12px] text-[13.8px] text-[#556574] dark:text-gray-400">
                    Optional — one or two sentences is enough.
                  </p>

                  <div className="rounded-[16px] border border-[rgba(18,48,74,.06)] bg-white p-[14px] dark:border-gray-700 dark:bg-gray-700/50">
                    <label className="mb-[8px] block text-[13.6px] font-bold text-[#12304a] dark:text-blue-100">
                      Your note
                    </label>
                    <textarea
                      name="what_to_validate"
                      value={form.what_to_validate}
                      onChange={handleChange}
                      className="min-h-[110px] w-full resize-y rounded-[12px] border border-[rgba(18,48,74,.14)] px-[12px] py-[12px] text-[14px] outline-none focus:border-[rgba(28,168,168,.45)] focus:ring-4 focus:ring-[rgba(28,168,168,.10)] dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-teal-500 dark:focus:ring-teal-500/20"
                    />
                  </div>

                  {/* Acknowledgement */}
                  <div className="mt-[14px] rounded-[16px] border border-[rgba(28,168,168,.18)] bg-[rgba(28,168,168,.06)] p-[14px] dark:border-teal-500/30 dark:bg-teal-500/10">
                    <div className="mb-[6px] text-[14.6px] font-extrabold text-[#12304a] dark:text-blue-100">
                      Before you submit
                    </div>
                    <p className="text-[13.8px] text-[#556574] dark:text-gray-400">
                      This Proof-of-Concept is a real-life test of comfort-first
                      seasonal living — not a tour and not relocation.
                    </p>

                    <label className="mt-[10px] flex items-center gap-[10px] rounded-[14px] bg-white p-[10px] dark:bg-gray-700/50">
                      <input
                        type="checkbox"
                        name="ack"
                        checked={form.ack}
                        onChange={handleChange}
                        required
                        className="mt-[3px] dark:accent-teal-500"
                      />
                      <span className="text-[13.6px] text-[#556574] dark:text-gray-400">
                        I understand — I'm exploring fit, not making a long-term
                        commitment today. <RedStar />
                      </span>
                    </label>
                    {showError && !form.ack && (
                      <p className="text-red-500 dark:text-red-400 font-semibold mt-1 text-sm">
                        This field is required*
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="flex justify-between my-8">
                    <button
                      onClick={() => navigate(-1)}
                      className="rounded-[12px] border border-[rgba(18,48,74,.18)] px-[14px] py-[12px] text-[14.5px] font-extrabold text-[var(--navy)] hover:brightness-95 flex items-center gap-3 hover:bg-teal-500 hover:text-white duration-300 dark:border-gray-700 dark:text-blue-100 dark:hover:bg-teal-600"
                    >
                      <Icon icon="ep:back" width="24" height="24" />
                      <span>Go Back</span>
                    </button>
                    <button
                      type="submit"
                      className={`rounded-[12px] border px-[16px] py-[12px] text-[14px] font-extrabold text-white shadow-[0_6px_12px_rgba(28,168,168,.10)] ${
                        isLoading
                          ? "border-gray-300 bg-gray-300 dark:border-gray-600 dark:bg-gray-600"
                          : "border-[rgba(28,168,168,.30)] bg-[#1ca8a8] dark:border-teal-600 dark:bg-teal-600 dark:hover:bg-teal-500"
                      }`}
                      disabled={isLoading}
                    >
                      {isLoading ? "Submiting" : "Submit Interest"}
                    </button>
                  </div>

                  <p className="mx-auto mt-[10px] max-w-[78ch] text-center text-[12.6px] text-[#556574] dark:text-gray-400">
                    Privacy note: We use this information for intake and
                    scheduling only. You can also reach us directly via the
                    Contact page.
                  </p>
                </form>
              </div>

              {/* Footer */}
              <div className="h-[8px] bg-[#1ca8a8]" />
              <div className="flex flex-wrap justify-between gap-[10px] border-t border-[rgba(18,48,74,.06)] px-[22px] py-[20px] text-[12.6px] text-[#556574] dark:border-gray-700 dark:text-gray-400">
                <div>POC Pathway — RetireHow.com / DollarFar.com</div>
                <div className="space-x-2">
                  <Link
                    to="/retirement-simulator/privacy"
                    className="underline dark:text-blue-300 hover:dark:text-blue-200"
                  >
                    Privacy Policy
                  </Link>{" "}
                  ·
                  <Link
                    to="/retirement-simulator/terms"
                    className="underline dark:text-blue-300 hover:dark:text-blue-200"
                  >
                    Terms of Use
                  </Link>{" "}
                  ·
                  <Link
                    to="/retirement-simulator/contact"
                    className="underline dark:text-blue-300 hover:dark:text-blue-200"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
