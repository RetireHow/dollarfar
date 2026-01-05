import { useState, ChangeEvent, FormEvent } from "react";

type POCFormState = {
  first_name: string;
  email: string;
  country: string;
  participating_as: string;
  duration: string;
  persona: string[];
  what_to_validate: string;
  ack: boolean;
};

export default function POCInterestForm(): JSX.Element {
  const [form, setForm] = useState<POCFormState>({
    first_name: "",
    email: "",
    country: "",
    participating_as: "",
    duration: "",
    persona: [],
    what_to_validate: "",
    ack: false,
  });
  const [showError, setShowError] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!form.first_name || !form.email || !form.ack) {
      return setShowError(true);
    }

    console.log("Form Data=========>", form);
  };

  return (
    <main
      className="min-h-screen text-[#0f1a23]"
      style={{
        background:
          "radial-gradient(1100px 520px at 18% 10%, rgba(28,168,168,.12), transparent 60%), radial-gradient(900px 520px at 82% 22%, rgba(242,139,60,.10), transparent 55%), linear-gradient(180deg,#f7fbfb,#f7f9fc)",
        fontFamily:
          '-apple-system,BlinkMacSystemFont,"SF Pro Text","SF Pro Display",system-ui,"Segoe UI",Roboto,Helvetica,Arial',
      }}
    >
      <div className="mx-auto max-w-[980px] px-[14px] pb-[40px] pt-[22px]">
        {/* Topbar */}
        <div className="flex md:flex-row flex-col items-center justify-between gap-[12px] rounded-[14px] border border-[rgba(18,48,74,.06)] bg-[rgba(255,255,255,.84)] px-[14px] py-[10px] backdrop-blur max-[760px]:justify-center">
          <div className="text-[13.2px] font-extrabold text-[#12304a] whitespace-nowrap">
            RetireHow.com / DollarFar.com
          </div>
          <div className="text-[12.6px] font-bold text-[#556574] whitespace-nowrap max-[760px]:whitespace-normal max-[760px]:text-center">
            Plan · Retire · Travel · Live Better for Less
          </div>
        </div>

        {/* Card */}
        <section className="mt-[14px] overflow-hidden rounded-[18px] border border-[rgba(18,48,74,.06)] bg-white shadow-[0_14px_34px_rgba(18,48,74,.10)]">
          <div className="h-[6px] bg-[#1ca8a8]" />

          <div className="px-[26px] pt-[26px] pb-[22px] max-sm:px-[14px] max-sm:pt-[20px]">
            <h1 className="mb-[8px] text-center text-[26px] font-[750] tracking-[-0.35px] text-[#12304a]">
              Explore the Proof-of-Concept Pathway
            </h1>

            <p className="mx-auto mb-[16px] max-w-[74ch] text-center text-[15px] leading-[1.45] text-[#556574]">
              You’ve explored how long money can last and where it can go
              further. The Proof-of-Concept (POC) is where insight can become
              lived experience — safely, temporarily, and with support.
            </p>

            {/* Pills */}
            <div className="mb-[18px] flex flex-wrap justify-center gap-[10px]">
              <span className="rounded-full border border-[rgba(28,168,168,.25)] bg-[rgba(28,168,168,.08)] px-[10px] py-[7px] text-[12.6px] font-[750] text-[#12304a]">
                Comfort-first seasonal living
              </span>
              <span className="rounded-full border border-[rgba(18,48,74,.10)] bg-[rgba(18,48,74,.03)] px-[10px] py-[7px] text-[12.6px] font-[750] text-[#12304a]">
                Short-term • low commitment
              </span>
              <span className="rounded-full border border-[rgba(242,139,60,.25)] bg-[rgba(242,139,60,.08)] px-[10px] py-[7px] text-[12.6px] font-[750] text-[#12304a]">
                Test the Cost Escape™ Dividend
              </span>
            </div>

            {/* Grid */}
            <div className="mt-[8px] grid grid-cols-2 gap-[12px] max-[760px]:grid-cols-1">
              <div className="rounded-[16px] border border-[rgba(18,48,74,.06)] bg-white px-[14px] pt-[14px] pb-[12px]">
                <h2 className="mb-[8px] border-l-[5px] border-[#f28b3c] pl-[10px] text-[15px] font-extrabold text-[#12304a]">
                  What this POC is
                </h2>
                <ul className="list-disc pl-[18px] text-[13.8px] leading-[1.5] text-[#556574]">
                  <li className="my-[6px]">
                    A real-life test of Cost Escape™ living — designed for
                    comfort and clarity
                  </li>
                  <li className="my-[6px]">
                    A structured pathway to evaluate lifestyle, costs, and
                    day-to-day fit
                  </li>
                  <li className="my-[6px]">
                    Supported by RetireHow’s on-the-ground concierge layer
                  </li>
                </ul>
              </div>

              <div className="rounded-[16px] border border-[rgba(18,48,74,.06)] bg-white px-[14px] pt-[14px] pb-[12px]">
                <h2 className="mb-[8px] border-l-[5px] border-[#f28b3c] pl-[10px] text-[15px] font-extrabold text-[#12304a]">
                  What this POC is not
                </h2>
                <ul className="list-disc pl-[18px] text-[13.8px] leading-[1.5] text-[#556574]">
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
            <div className="mt-[14px] rounded-[16px] border border-[rgba(28,168,168,.18)] bg-[rgba(28,168,168,.06)] px-[14px] pt-[14px] pb-[12px]">
              <div className="mb-[6px] text-[14.6px] font-[850] text-[#12304a]">
                Next step
              </div>
              <p className="text-[13.8px] leading-[1.45] text-[#556574]">
                If this resonates, complete the short interest & fit form below.
                It helps confirm whether the POC pathway is a good match — and
                what kind of support you would want.
              </p>
            </div>

            {/* What happens next */}
            <h2 className="mt-[18px] mb-[8px] border-l-[5px] border-[#f28b3c] pl-[10px] text-[15px] font-extrabold text-[#12304a]">
              What happens next
            </h2>

            <p className="mb-[10px] text-[13.8px] text-[#556574]">
              This Proof-of-Concept (POC) is a real-life test of Cost Escape™
              living — not a vacation or tour.
            </p>

            <ul className="mb-[10px] list-disc pl-[18px] text-[13.8px] leading-[1.5] text-[#556574]">
              <li>Vetted housing</li>
              <li>Comfort-first concierge support</li>
              <li>Reduced cost of living (cost-recovery only)</li>
              <li>Curated cultural experiences and optional domestic travel</li>
            </ul>

            <div className="mb-[10px] text-[13.6px]">
              <strong>POC operating window:</strong> December 2026 – February
              2027 <span className="mx-[6px]">|</span>
              <strong>Location:</strong> South India (Vijayawada)
            </div>

            <p className="mb-[12px] text-[13.6px] text-[#556574]">
              The short form below helps confirm fit and intent. If aligned, you
              may be invited to schedule a brief conversation.
            </p>

            {/* Card */}
            <section>
              <div className="pb-[22px] pt-[26px] max-[760px]:px-[14px]">
                <h1 className="mb-[12px] text-center text-[26px] font-[750] tracking-[-0.35px] text-[#12304a]">
                  POC Interest & Fit Form
                </h1>

                <p className="mx-auto mb-[18px] max-w-[76ch] text-center text-[15px] leading-[1.45] text-[#556574]">
                  Complete this form if you’re genuinely interested in
                  participating in the Vijayawada Proof-of-Concept. The
                  questions help assess fit.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Your basics */}
                  <h2 className="mt-[18px] border-l-[5px] border-[#f28b3c] pl-[10px] text-[15px] font-extrabold text-[#12304a]">
                    Your basics
                  </h2>
                  <p className="mb-[12px] text-[13.8px] text-[#556574]">
                    We’ll use this to follow up and suggest a next step.
                  </p>

                  <div className="grid grid-cols-2 gap-[12px] max-[760px]:grid-cols-1">
                    <div className="rounded-[16px] border border-[rgba(18,48,74,.06)] bg-white p-[14px]">
                      <label className="mb-[8px] block text-[13.6px] font-bold text-[#12304a]">
                        First name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={form.first_name}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        required
                        className="w-full rounded-[12px] border border-[rgba(18,48,74,.14)] px-[12px] py-[12px] text-[14px] outline-none focus:border-[rgba(28,168,168,.45)] focus:ring-4 focus:ring-[rgba(28,168,168,.10)]"
                      />
                      {showError && !form.first_name && (
                        <p className="text-red-500 font-semibold mt-1 text-sm">
                          This field is required*
                        </p>
                      )}
                    </div>

                    <div className="rounded-[16px] border border-[rgba(18,48,74,.06)] bg-white p-[14px]">
                      <label className="mb-[8px] block text-[13.6px] font-bold text-[#12304a]">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        className="w-full rounded-[12px] border border-[rgba(18,48,74,.14)] px-[12px] py-[12px] text-[14px] outline-none focus:border-[rgba(28,168,168,.45)] focus:ring-4 focus:ring-[rgba(28,168,168,.10)]"
                      />
                      {showError && !form.email && (
                        <p className="text-red-500 font-semibold mt-1 text-sm">
                          This field is required*
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Country */}
                  <h2 className="mt-[18px] border-l-[5px] border-[#f28b3c] pl-[10px] text-[15px] font-extrabold text-[#12304a]">
                    Where are you based?
                  </h2>
                  <p className="mb-[12px] text-[13.8px] text-[#556574]">
                    For the Proof-of-Concept phase, participation is currently
                    available for Canada, the USA, and the UK.
                  </p>

                  <div className="flex flex-wrap gap-[10px]">
                    {["Canada", "United States", "United Kingdom", "Other"].map(
                      (c) => (
                        <label
                          key={c}
                          className="flex flex-1 items-start gap-[10px] rounded-[14px] border border-[rgba(18,48,74,.08)] bg-[rgba(18,48,74,.02)] p-[10px]"
                        >
                          <input
                            type="radio"
                            name="country"
                            value={c}
                            checked={form.country === c}
                            onChange={handleChange}
                            required
                            className="mt-[3px]"
                          />
                          <span className="text-[13.6px] text-[#556574]">
                            <strong className="text-[#12304a]">{c}</strong>
                            {c === "Other" && (
                              <span>
                                {" "}
                                (we’ll notify you as locations expand)
                              </span>
                            )}
                          </span>
                        </label>
                      )
                    )}
                  </div>

                  {/* Participation */}
                  <h2 className="mt-[18px] border-l-[5px] border-[#f28b3c] pl-[10px] text-[15px] font-extrabold text-[#12304a]">
                    How would you participate?
                  </h2>

                  <div className="flex flex-wrap gap-[10px]">
                    {["Individual", "Couple", "Small group (friends)"].map(
                      (p) => (
                        <label
                          key={p}
                          className="flex flex-1 items-start gap-[10px] rounded-[14px] border border-[rgba(18,48,74,.08)] bg-[rgba(18,48,74,.02)] p-[10px]"
                        >
                          <input
                            type="radio"
                            name="participating_as"
                            value={p}
                            checked={form.participating_as === p}
                            onChange={handleChange}
                            required
                            className="mt-[3px]"
                          />
                          <span className="text-[13.6px] text-[#556574]">
                            <strong className="text-[#12304a]">{p}</strong>
                          </span>
                        </label>
                      )
                    )}
                  </div>

                  {/* Duration */}
                  <h2 className="mt-[18px] border-l-[5px] border-[#f28b3c] pl-[10px] text-[15px] font-extrabold text-[#12304a]">
                    What duration feels realistic?
                  </h2>

                  <div className="flex flex-wrap gap-[10px]">
                    {["1 month", "2 months", "3 months"].map((d) => (
                      <label
                        key={d}
                        className="flex flex-1 items-start gap-[10px] rounded-[14px] border border-[rgba(18,48,74,.08)] bg-[rgba(18,48,74,.02)] p-[10px]"
                      >
                        <input
                          type="radio"
                          name="duration"
                          value={d}
                          checked={form.duration === d}
                          onChange={handleChange}
                          required
                          className="mt-[3px]"
                        />
                        <span className="text-[13.6px] text-[#556574]">
                          <strong className="text-[#12304a]">{d}</strong>
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* Personas */}
                  <h2 className="mt-[18px] border-l-[5px] border-[#f28b3c] pl-[10px] text-[15px] font-extrabold text-[#12304a]">
                    Which situation sounds closest to you?
                  </h2>
                  <p className="mb-[12px] text-[13.8px] text-[#556574]">
                    Optional — helps us understand what you’re trying to solve.
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
                        className="flex flex-1 items-start gap-[10px] rounded-[14px] border border-[rgba(18,48,74,.08)] bg-[rgba(18,48,74,.02)] p-[10px]"
                      >
                        <input
                          type="checkbox"
                          name="persona"
                          value={p}
                          checked={form.persona.includes(p)}
                          onChange={handleChange}
                          className="mt-[3px]"
                        />
                        <span className="text-[13.6px] text-[#556574]">
                          {p}
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* Textarea */}
                  <h2 className="mt-[18px] border-l-[5px] border-[#f28b3c] pl-[10px] text-[15px] font-extrabold text-[#12304a]">
                    What would you want to validate?
                  </h2>
                  <p className="mb-[12px] text-[13.8px] text-[#556574]">
                    Optional — one or two sentences is enough.
                  </p>

                  <div className="rounded-[16px] border border-[rgba(18,48,74,.06)] bg-white p-[14px]">
                    <label className="mb-[8px] block text-[13.6px] font-bold text-[#12304a]">
                      Your note
                    </label>
                    <textarea
                      name="what_to_validate"
                      value={form.what_to_validate}
                      onChange={handleChange}
                      className="min-h-[110px] w-full resize-y rounded-[12px] border border-[rgba(18,48,74,.14)] px-[12px] py-[12px] text-[14px] outline-none focus:border-[rgba(28,168,168,.45)] focus:ring-4 focus:ring-[rgba(28,168,168,.10)]"
                    />
                  </div>

                  {/* Acknowledgement */}
                  <div className="mt-[14px] rounded-[16px] border border-[rgba(28,168,168,.18)] bg-[rgba(28,168,168,.06)] p-[14px]">
                    <div className="mb-[6px] text-[14.6px] font-extrabold text-[#12304a]">
                      Before you submit
                    </div>
                    <p className="text-[13.8px] text-[#556574]">
                      This Proof-of-Concept is a real-life test of comfort-first
                      seasonal living — not a tour and not relocation.
                    </p>

                    <label className="mt-[10px] flex items-start gap-[10px] rounded-[14px] bg-white p-[10px]">
                      <input
                        type="checkbox"
                        name="ack"
                        checked={form.ack}
                        onChange={handleChange}
                        required
                        className="mt-[3px]"
                      />
                      <span className="text-[13.6px] text-[#556574]">
                        I understand — I’m exploring fit, not making a long-term
                        commitment today.
                      </span>
                    </label>
                    {showError && !form.ack && (
                      <p className="text-red-500 font-semibold mt-1 text-sm">
                        This field is required*
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="mt-[16px] flex justify-center">
                    <button
                      type="submit"
                      className="rounded-[12px] border border-[rgba(28,168,168,.30)] bg-[#1ca8a8] px-[16px] py-[12px] text-[14px] font-extrabold text-white shadow-[0_6px_12px_rgba(28,168,168,.10)]"
                    >
                      Submit Interest
                    </button>
                  </div>

                  <p className="mx-auto mt-[10px] max-w-[78ch] text-center text-[12.6px] text-[#556574]">
                    Privacy note: We use this information for intake and
                    scheduling only. You can also reach us directly via the
                    Contact page.
                  </p>
                </form>
              </div>

              {/* Footer */}
              <div className="h-[8px] bg-[#1ca8a8]" />
              <div className="flex flex-wrap justify-between gap-[10px] border-t border-[rgba(18,48,74,.06)] px-[22px] py-[20px] text-[12.6px] text-[#556574]">
                <div>POC Pathway — RetireHow.com / DollarFar.com</div>
                <div className="space-x-2">
                  <a href="/privacy.html" className="underline">
                    Privacy Policy
                  </a>{" "}
                  ·
                  <a href="/terms.html" className="underline">
                    Terms of Use
                  </a>{" "}
                  ·
                  <a href="/contact.html" className="underline">
                    Contact
                  </a>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
