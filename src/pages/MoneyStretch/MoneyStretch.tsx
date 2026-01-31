import { useState, ChangeEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import PageHero from "../../components/UI/PageHero";
import useTitle from "../../hooks/useTitle";

interface Results {
  savings: number;
  breakeven: number | string;
  equiv: string;
  longevity: string;
}

const data = {
  title: "Money Stretch Calculator (Cost Escape™ Dividend)",
  description:
    "Measure how much longer your money could last — without market risk or saving more.",
  image: assets.moneyStretch,
};

export default function MoneyStretch(): JSX.Element {
  useTitle("Dollarfar | Money Stretch Calculator");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [region, setRegion] = useState<"CA" | "US" | "EU">("CA");
  const [portfolio, setPortfolio] = useState<string>("");
  const [withdrawal, setWithdrawal] = useState<string>("");
  const [homeEssentials, setHomeEssentials] = useState<string>("");
  const [destEssentials, setDestEssentials] = useState<string>("");
  const [travelAnnual, setTravelAnnual] = useState<string>("");
  const [monthsAway, setMonthsAway] = useState<string>("");
  const [results, setResults] = useState<Results | null>(null);

  const fmt = (n: number): string =>
    isNaN(n) ? "—" : new Intl.NumberFormat().format(n);

  const run = (): void => {
    const p = Number(portfolio) || 0;
    const w = (Number(withdrawal) || 0) / 100;
    const h = Number(homeEssentials) || 0;
    const d = Number(destEssentials) || 0;
    const t = Number(travelAnnual) || 0;
    const m = Number(monthsAway) || 0;

    const baseAnnual = 12 * h;
    const seasonalAnnual = (12 - m) * h + m * d + t;
    const savings = baseAnnual - seasonalAnnual;

    const monthlyDiff = h - d;
    const breakeven: number | string =
      monthlyDiff > 0 ? Math.ceil(t / monthlyDiff) : "—";

    let equiv = "—";
    if (p > 0 && savings > 0) equiv = ((savings / p) * 100).toFixed(2) + "%";
    else if (p > 0 && savings <= 0) equiv = "0% (no savings)";

    let longevity = "—";
    if (p > 0 && w > 0) {
      const annualDrawBase = p * w;
      const annualDrawSeasonal = Math.max(
        annualDrawBase - Math.max(savings, 0),
        0.0001,
      );
      const yearsBase = p / annualDrawBase;
      const yearsSeasonal = p / annualDrawSeasonal;
      longevity = `${(yearsSeasonal - yearsBase).toFixed(1)} yrs`;
    }

    setResults({ savings, breakeven, equiv, longevity });
  };

  let line;

  if (results?.savings! > 0) {
    line = (
      <div className="mt-1">
        <span>
          Seasonal living abroad where your currency stretches further reduces
          your cost of living by approximately {fmt(results?.savings!)} per year
          under these inputs.
        </span>
        <br />
        <p className="mt-3 italic dark:text-slate-300">
          This savings boost is called your "Purchasing Power Dividend" — money
          you gain by earning in a stronger currency, spending part of the year
          in a lower‑cost country, and actually traveling to capture that
          advantage.
        </p>
      </div>
    );
  } else if (results?.savings! < 0) {
    line = (
      <p className="mt-1 dark:text-slate-300">
        Under these inputs, seasonal living increases annual spending by about{" "}
        {fmt(-results?.savings!)}. Adjust months away, destination costs, or
        travel assumptions.
      </p>
    );
  } else {
    line = (
      <p className="mt-1 dark:text-slate-300">
        This configuration is cost‑neutral. Small changes in inputs will tilt
        the result.
      </p>
    );
  }

  return (
    <main>
      <div>
        <PageHero data={data} />
      </div>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <header className="mb-8">
            <div className="font-bold text-teal-700 dark:text-teal-400">
              DollarFar · Cost Escape Toolkit
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Money Stretch Calculator (Cost Escape™ Dividend)
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">
              See how a few months in a lower-cost country helps your savings
              last longer.
            </p>
          </header>

          <section className="bg-gradient-to-r from-teal-50 to-orange-50 dark:from-teal-900/30 dark:to-orange-900/30 rounded-xl shadow-sm dark:shadow-slate-800/30 p-6 mb-6 border dark:border-slate-700">
            <h2 className="font-semibold mb-4 dark:text-slate-200">Start</h2>
            <label className="block text-sm font-bold mb-1 dark:text-slate-300">
              Home country
            </label>
            <select
              value={region}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setRegion(e.target.value as "CA" | "US" | "EU")
              }
              className="w-full max-w-xs border rounded-lg px-3 py-2 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
            >
              <option value="CA">Canada</option>
              <option value="US">United States</option>
              <option value="EU">Europe</option>
            </select>
          </section>

          <section className="bg-gradient-to-r from-teal-50 to-orange-50 dark:from-teal-900/30 dark:to-orange-900/30 rounded-xl shadow-sm dark:shadow-slate-800/30 p-6 border dark:border-slate-700">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="font-semibold text-lg mb-4 dark:text-slate-200">
                  Inputs
                </h2>

                <label className="text-sm font-bold dark:text-slate-300">
                  Investment portfolio (liquid) — optional
                </label>
                <input
                  className="w-full border rounded-lg px-3 py-2 mt-1 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                  placeholder="e.g., 400000"
                  value={portfolio}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPortfolio(e.target.value)
                  }
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Used to estimate the "equivalent return" of savings.
                </p>

                <label className="text-sm font-bold mt-4 block dark:text-slate-300">
                  Planned withdrawal rate on portfolio (%) — optional
                </label>
                <input
                  className="w-full border rounded-lg px-3 py-2 mt-1 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                  placeholder="e.g., 4"
                  value={withdrawal}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setWithdrawal(e.target.value)
                  }
                />

                <label className="text-sm font-bold mt-6 block dark:text-slate-300">
                  Estimated cost of living in your home country (monthly)
                </label>
                <input
                  className="w-full border rounded-lg px-3 py-2 mt-1 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                  placeholder="e.g., 3800"
                  value={homeEssentials}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setHomeEssentials(e.target.value)
                  }
                />
                <div className="flex gap-2 mt-2">
                  <Link to="/budget-calculator">
                    <button className="text-xs border hover:border-teal-300 dark:hover:border-teal-500 px-4 py-2 rounded-lg bg-teal-50 dark:bg-teal-900/30 dark:border-slate-600 dark:text-slate-200 font-bold">
                      Open Budget Calculator
                    </button>
                  </Link>
                  <Link to="/cost-of-living-calculator">
                    <button className="text-xs border hover:border-teal-300 dark:hover:border-teal-500 px-4 py-2 rounded-lg bg-teal-50 dark:bg-teal-900/30 dark:border-slate-600 dark:text-slate-200 font-bold">
                      Open Cost-of-Living Comparison
                    </button>
                  </Link>
                </div>

                <label className="text-sm font-bold mt-6 block dark:text-slate-300">
                  Estimated cost of living / budget in your destination country
                  (monthly)
                </label>
                <input
                  className="w-full border rounded-lg px-3 py-2 mt-1 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                  placeholder="e.g., 2200"
                  value={destEssentials}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setDestEssentials(e.target.value)
                  }
                />
                <div className="flex gap-2 mt-2">
                  <Link to="/budget-calculator">
                    <button className="text-xs border hover:border-teal-300 dark:hover:border-teal-500 px-4 py-2 rounded-lg bg-teal-50 dark:bg-teal-900/30 dark:border-slate-600 dark:text-slate-200 font-bold">
                      Open Budget Calculator
                    </button>
                  </Link>
                  <Link to="/cost-of-living-calculator">
                    <button className="text-xs border hover:border-teal-300 dark:hover:border-teal-500 px-4 py-2 rounded-lg bg-teal-50 dark:bg-teal-900/30 dark:border-slate-600 dark:text-slate-200 font-bold">
                      Open Cost-of-Living Comparison
                    </button>
                  </Link>
                </div>

                <label className="text-sm font-bold mt-6 block dark:text-slate-300">
                  Travel + travel insurance + permits/visas (annual total)
                </label>
                <input
                  className="w-full border rounded-lg px-3 py-2 mt-1 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                  placeholder="e.g., 2400"
                  value={travelAnnual}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTravelAnnual(e.target.value)
                  }
                />

                <label className="text-sm font-bold mt-4 block dark:text-slate-300">
                  Months away per year
                </label>
                <input
                  className="w-full border rounded-lg px-3 py-2 mt-1 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                  placeholder="e.g., 3"
                  value={monthsAway}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setMonthsAway(e.target.value)
                  }
                />

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={run}
                    className="bg-teal-700 dark:bg-teal-600 text-white px-5 py-3 rounded-lg hover:bg-teal-800 dark:hover:bg-teal-700 w-full"
                  >
                    Calculate Scenario
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="border dark:border-slate-600 px-5 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 w-full"
                  >
                    Print / Save PDF
                  </button>
                </div>
              </div>

              <div>
                <h2 className="font-semibold text-lg mb-4 dark:text-slate-200">
                  Results
                </h2>

                {results && (
                  <div className="border-l-4 border-teal-600 dark:border-teal-500 bg-teal-50 dark:bg-teal-900/20 p-4 rounded mb-4 text-sm leading-6">
                    <strong className="dark:text-slate-200">
                      Scenario summary
                    </strong>
                    {line}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 dark:border-slate-700 dark:bg-slate-800/50">
                    <p className="text-sm font-bold dark:text-slate-300">
                      Money you keep each year
                    </p>
                    <p className="font-bold text-lg dark:text-white">
                      {results ? fmt(results.savings) : "—"}
                    </p>
                  </div>
                  <div className="border rounded-lg p-4 dark:border-slate-700 dark:bg-slate-800/50">
                    <p className="text-sm font-bold dark:text-slate-300">
                      Months until you come out ahead
                    </p>
                    <p className="font-bold text-lg dark:text-white">
                      {results ? results.breakeven : "—"}
                    </p>
                  </div>
                  <div className="border rounded-lg p-4 dark:border-slate-700 dark:bg-slate-800/50">
                    <p className="text-sm font-bold dark:text-slate-300">
                      What investment return this equals
                    </p>
                    <p className="font-bold text-lg dark:text-white">
                      {results ? results.equiv : "—"}
                    </p>
                  </div>
                  <div className="border rounded-lg p-4 dark:border-slate-700 dark:bg-slate-800/50">
                    <p className="text-sm font-bold dark:text-slate-300">
                      How long your savings could last with this plan
                    </p>
                    <p className="font-bold text-lg dark:text-white">
                      {results ? results.longevity : "—"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                    Notes: "Equivalent return" shows the annual portfolio return
                    needed to match these savings. Longevity uses a simple
                    zero‑real‑return model for intuition, not forecast.
                  </p>
                  <div className="flex gap-3 mt-4 w-full">
                    <Link
                      className="bg-teal-700 dark:bg-teal-600 text-white px-4 py-3 text-center rounded-lg hover:bg-teal-800 dark:hover:bg-teal-700 w-full"
                      to="/cost-of-living-calculator"
                    >
                      Compare Cities
                    </Link>
                    <Link
                      className="bg-slate-900 dark:bg-slate-800 text-white px-4 py-3 text-center rounded-lg font-bold hover:bg-slate-800 dark:hover:bg-slate-700 w-full"
                      to="/retirement-simulator/poc-interest"
                    >
                      Open City Fit Tool
                    </Link>
                  </div>
                  <ul className="mt-4 text-sm space-y-2 dark:text-slate-300">
                    <li>
                      🌤️ Sunlight & mood — <strong>improved</strong>
                    </li>
                    <li>
                      🚶 Walking & mobility — <strong>improved</strong>
                    </li>
                    <li>
                      💬 Community & belonging —
                      <strong>potentially stronger</strong>
                    </li>
                    <li>
                      🧭 Loneliness risk —{" "}
                      <strong>lower when integrated</strong>
                    </li>
                  </ul>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    These are qualitative benefits that complement the financial
                    gains.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
