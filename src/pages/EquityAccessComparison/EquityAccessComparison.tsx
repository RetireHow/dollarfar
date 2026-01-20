import { useEffect, useRef, useState } from "react";
import RedStar from "../../components/UI/RedStar";
import { toast } from "react-toastify";
import PageHero from "../../components/UI/PageHero";
import { assets } from "../../assets/assets";

const data = {
  title: "Equity Access Comparison Tool",
  description:
    "Compare the long-term costs, interest, and equity usage between HELOC and Reverse Mortgage options. This tool helps you plan financial decisions while understanding future home value and debt impact.",
  image: assets.costOfLeavingFrame,
};

type Inputs = {
  homeVal: string;
  growth: string;
  draw: string;
  rate: string;
  fee: string;
  yrs: string;
  exist: string;
};

type Results = {
  h_a: number;
  h_t: number;
  h_end: number;
  h_fv: number;
  h_eq: number;
  h_pct: number;
  h_total: number;
  r_a: number;
  r_t: number;
  r_end: number;
  r_fv: number;
  r_eq: number;
  r_pct: number;
  r_total: number;
  helocEqArr: number[];
  rmEqArr: number[];
};

const format = (n: number): string =>
  Number.isNaN(n) ? "—" : new Intl.NumberFormat().format(Math.round(n));

const drawSpark = (
  canvas: HTMLCanvasElement | null,
  values: number[],
): void => {
  if (!canvas || values.length === 0) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const w = (canvas.width = canvas.offsetWidth);
  const h = (canvas.height = canvas.offsetHeight);

  ctx.clearRect(0, 0, w, h);

  const max = Math.max(...values);
  const min = Math.min(...values);
  const scaleX = w / (values.length - 1 || 1);
  const scaleY = max !== min ? h / (max - min) : 1;

  ctx.beginPath();
  ctx.moveTo(0, h - (values[0] - min) * scaleY);

  values.forEach((v, i) => {
    if (i === 0) return;
    ctx.lineTo(i * scaleX, h - (v - min) * scaleY);
  });

  ctx.strokeStyle = "#12304a";
  ctx.lineWidth = 2;
  ctx.stroke();
};

export default function EquityAccessComparison(): JSX.Element {
  const [showResults, setShowResults] = useState<boolean>(false);

  const [inputs, setInputs] = useState<Inputs>({
    homeVal: "",
    growth: "3",
    draw: "",
    rate: "",
    fee: "",
    yrs: "",
    exist: "",
  });

  const [results, setResults] = useState<Results | null>(null);

  const helocCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rmCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const calculate = (): void => {
    const HV = Number(inputs.homeVal) || 0;
    const g = (Number(inputs.growth) || 0) / 100;
    const D = Number(inputs.draw) || 0;
    const r = (Number(inputs.rate) || 0) / 100;
    const F = Number(inputs.fee) || 0;
    const Y = Number(inputs.yrs) || 0;
    const E0 = Number(inputs.exist) || 0;

    if (HV <= 0 || D <= 0 || r <= 0 || Y <= 0) {
      toast.error("Enter all the required inputs.");
      return;
    }

    const N = Y * 12;
    const rm = r / 12;

    const fv = HV * (1 + g) ** Y;

    // HELOC
    const helocEnd = E0 + F + D * N;
    const helocInterest = rm * (N * (E0 + F) + (D * (N * (N + 1))) / 2);
    const helocTotal = helocInterest + helocEnd;
    const helocEq = fv - helocEnd;
    const helocPct = (helocEnd / fv) * 100;

    // Reverse Mortgage
    let bal = E0 + F;
    let ri = 0;

    for (let m = 1; m <= N; m++) {
      const base = bal + D;
      const im = base * rm;
      ri += im;
      bal = base + im;
    }

    const rmEnd = bal;
    const rmEq = fv - rmEnd;
    const rmPct = (rmEnd / fv) * 100;

    // Equity arrays (yearly)
    const helocEqArr: number[] = [];
    const rmEqArr: number[] = [];

    for (let y = 0; y <= Y; y++) {
      const fvY = HV * (1 + g) ** y;
      const helocDebtY = E0 + F + D * y * 12;

      let b = E0 + F;
      for (let m = 1; m <= y * 12; m++) {
        const base = b + D;
        b = base + base * rm;
      }

      helocEqArr.push(fvY - helocDebtY);
      rmEqArr.push(fvY - b);
    }

    const nextResults: Results = {
      h_a: helocInterest / Y,
      h_t: helocInterest,
      h_end: helocEnd,
      h_fv: fv,
      h_eq: helocEq,
      h_pct: helocPct,
      h_total: helocTotal,
      r_a: ri / Y,
      r_t: ri,
      r_end: rmEnd,
      r_fv: fv,
      r_eq: rmEq,
      r_pct: rmPct,
      r_total: rmEnd,
      helocEqArr,
      rmEqArr,
    };

    setResults(nextResults);
    setShowResults(true);

    requestAnimationFrame(() => {
      drawSpark(helocCanvasRef.current, helocEqArr);
      drawSpark(rmCanvasRef.current, rmEqArr);
    });
  };

  const handleReset = () => {
    setInputs({
      homeVal: "",
      growth: "3",
      draw: "",
      rate: "",
      fee: "",
      yrs: "",
      exist: "",
    });
  };

  return (
    <main className="min-h-screen bg-[#f6f8fb] dark:bg-[#0f172a] text-[#14202b] dark:text-gray-100">
      <div>
        <PageHero data={data} />
      </div>
      <div className="max-w-[1150px] mx-auto px-5 py-6">
        <h1 className="text-[28px] font-extrabold text-[#12304a] dark:text-blue-50">
          Equity Access Comparison Tool
        </h1>
        <p className="text-[#5b6b7a] dark:text-gray-400 mb-4">
          Compare HELOC vs Reverse Mortgage + see future equity growth.
        </p>

        {/* INPUT CARD */}
        <section className="rounded-[18px] bg-white dark:bg-gray-900 shadow-lg p-6">
          <div className="flex justify-center gap-3 flex-wrap mb-4">
            <button
              disabled
              className="px-4 py-2 rounded-xl bg-[#12304a] text-white font-semibold opacity-70"
            >
              HELOC — Interest-Only
            </button>
            <button
              disabled
              className="px-4 py-2 rounded-xl bg-[#12304a] text-white font-semibold opacity-70"
            >
              Reverse Mortgage — No Payments
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-[860px] mx-auto">
            {[
              ["homeVal", "Home value today", "e.g., 800000"],
              ["growth", "Annual home appreciation (%)", "e.g., 3"],
              ["draw", "Monthly withdrawal", "e.g., 1000"],
              ["rate", "Interest rate (% annual)", "e.g., 6"],
              ["fee", "Up-front fee", "e.g., 1500"],
              ["yrs", "Years (1–20)", "e.g., 10"],
              ["exist", "Existing mortgage (optional)", "e.g., 0 if none"],
            ].map(([id, label, placeholder]) => (
              <div key={id}>
                <label className="font-semibold text-sm">{label}</label>
                {id !== "exist" && <RedStar />}
                <input
                  id={id}
                  value={inputs[id as keyof Inputs]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full mt-1 rounded-xl border border-gray-300 px-3 py-2"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-5">
            <button
              onClick={calculate}
              className="px-5 py-2 rounded-xl bg-[#12304a] text-white font-bold hover:brightness-110"
            >
              Calculate
            </button>
            <button
              onClick={handleReset}
              className="px-5 py-2 rounded-xl bg-gray-500 text-white font-bold"
            >
              Reset
            </button>
          </div>
        </section>

        {/* RESULTS */}
        {showResults && results && (
          <section className="mt-8 grid md:grid-cols-2 gap-6">
            {(
              [
                ["HELOC — Interest-Only", "h", helocCanvasRef, "(HELOC)"],
                ["Reverse Mortgage — No Payments", "r", rmCanvasRef, "(RM)"],
              ] as const
            ).map(([title, prefix, canvasRef, suffix]) => (
              <div
                key={prefix}
                className="bg-white dark:bg-gray-900 rounded-[18px] p-6 shadow"
              >
                <h2 className="font-bold text-lg mb-3">{title}</h2>

                {[
                  ["a", "Avg annual interest cost"],
                  ["t", "Total interest (lifetime)"],
                  ["end", "Ending debt balance"],
                  ["fv", "Future home value"],
                  ["eq", "Ending equity"],
                  ["pct", "% equity used"],
                  ["total", "Lifetime total cost"],
                ].map(([key, label]) => (
                  <div key={key} className="border rounded-lg p-3 mb-2">
                    <div className="text-sm text-gray-500">{label}</div>
                    <div className="text-xl font-bold">
                      {format(
                        results[`${prefix}_${key}` as keyof Results] as number,
                      )}
                      {key === "pct" && "%"}
                    </div>
                  </div>
                ))}

                <div className="mt-3 border rounded-lg p-3">
                  <div className="text-sm font-semibold text-gray-500 mb-1">
                    Equity over time {suffix}
                  </div>
                  <canvas ref={canvasRef} className="w-full h-[60px]" />
                </div>
              </div>
            ))}
          </section>
        )}

        <p className="text-center text-xs text-gray-500 mt-6">
          Educational model; excludes inflation and tax effects.
        </p>
      </div>
    </main>
  );
}
