/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface CalculatorInputs {
  startingAmount: number | "";
  grossReturn: number | "";
  advisorFee: number | "";
  diyCost: number | "";
  taxRate: number | "";
  inflation: number | "";
  useAdvisor: boolean;
}

interface CalculatorResults {
  grossIncome: string;
  feeCost: string;
  feeType: string;
  taxableIncome: string;
  taxes: string;
  netIncome: string;
  nominalNetYield: string;
  realNetYield: string;
}

interface InputDisplayValues {
  startingAmount: string;
  grossReturn: string;
  advisorFee: string;
  diyCost: string;
  taxRate: string;
  inflation: string;
  useAdvisor: string;
}

export const FixedWidthNetIncomeYieldCalculatorPDFTemplate = ({
  inputs,
  results,
}: {
  inputs: CalculatorInputs;
  inputDisplayValues: InputDisplayValues;
  results: CalculatorResults | null;
}) => {
  // Fixed width for PDF (A4 paper size in pixels at 96dpi)
  const pdfWidth = 794;
  const pdfMargin = 30;

  // Format currency
  const formatCurrency = (value: number | string): string => {
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(numValue)) return "$0.00";

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numValue);
  };

  // Format percentage
  const formatPercentage = (value: number | string): string => {
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(numValue)) return "0%";

    return `${numValue.toFixed(2)}%`;
  };

  // Custom tooltip formatter for charts
  const chartTooltipFormatter = (value: number) => {
    return formatCurrency(value);
  };

  // Data for visualization
  const incomeDistributionData = results
    ? [
        { name: "Net Income", value: parseFloat(results.netIncome) },
        { name: "Taxes", value: parseFloat(results.taxes) },
        { name: results.feeType, value: parseFloat(results.feeCost) },
      ]
    : [];

  const comparisonData = results
    ? [
        { name: "Gross Return", value: parseFloat(results.grossIncome) },
        { name: "Net Return", value: parseFloat(results.netIncome) },
      ]
    : [];

  // Color palette
  const COLORS = ["#4FD1C5", "#FC8181", "#F6AD55"];
  const CHART_COLORS = {
    primary: "#4C51BF",
    secondary: "#38B2AC",
  };

  return (
    <div
      className="pdf-template"
      style={{
        width: `${pdfWidth}px`,
        margin: "0 auto",
        padding: `${pdfMargin}px`,
        fontFamily: "'Inter', 'Helvetica', 'Arial', sans-serif",
        fontSize: "14px",
        color: "#2d3748",
        backgroundColor: "#fff",
        lineHeight: 1.4,
      }}
    >
      {/* Header with Logo */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "30px",
          paddingBottom: "20px",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#2b6777",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "15px",
              color: "white",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            DF
          </div>
          <div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "700",
                margin: "0 0 5px 0",
                color: "#2b6777",
              }}
            >
              Net Income Yield Analysis
            </h1>
            <p
              style={{
                margin: "0",
                color: "#718096",
                fontSize: "14px",
              }}
            >
              Understanding your true investment returns after all costs
            </p>
          </div>
        </div>
        <div
          style={{
            textAlign: "right",
            fontSize: "12px",
            color: "#718096",
          }}
        >
          <p style={{ margin: "0 0 5px 0", fontWeight: "600" }}>
            Generated on {moment().format("MMM D, YYYY")}
          </p>
          <p style={{ margin: "0" }}>https://dollarfar.com</p>
        </div>
      </header>

      {/* Investment Parameters */}
      <div style={{ marginBottom: "30px" }}>
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "700",
            margin: "0 0 15px 0",
            color: "#2d3748",
            paddingBottom: "10px",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          Your Investment Scenario
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "15px",
          }}
        >
          <div
            style={{
              padding: "15px",
              backgroundColor: "#f8fafc",
              borderRadius: "6px",
            }}
          >
            <h3
              style={{
                fontSize: "14px",
                fontWeight: "600",
                margin: "0 0 12px 0",
                color: "#2b6777",
              }}
            >
              Investment Details
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span style={{ color: "#4a5568" }}>Starting Investment:</span>
              <span style={{ fontWeight: "600" }}>
                {formatCurrency(inputs.startingAmount || 0)}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span style={{ color: "#4a5568" }}>Expected Annual Return:</span>
              <span style={{ fontWeight: "600" }}>
                {formatPercentage(inputs.grossReturn || 0)}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span style={{ color: "#4a5568" }}>Investment Approach:</span>
              <span style={{ fontWeight: "600" }}>
                {inputs.useAdvisor ? "Professional Advisor" : "Self-Managed"}
              </span>
            </div>
          </div>

          <div
            style={{
              padding: "15px",
              backgroundColor: "#f8fafc",
              borderRadius: "6px",
            }}
          >
            <h3
              style={{
                fontSize: "14px",
                fontWeight: "600",
                margin: "0 0 12px 0",
                color: "#2b6777",
              }}
            >
              Costs & Economic Factors
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span style={{ color: "#4a5568" }}>
                {inputs.useAdvisor ? "Advisory Fee" : "Estimated DIY Costs"}:
              </span>
              <span style={{ fontWeight: "600" }}>
                {formatPercentage(
                  inputs.useAdvisor
                    ? inputs.advisorFee || 0
                    : inputs.diyCost || 0
                )}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span style={{ color: "#4a5568" }}>Effective Tax Rate:</span>
              <span style={{ fontWeight: "600" }}>
                {formatPercentage(inputs.taxRate || 0)}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span style={{ color: "#4a5568" }}>Expected Inflation:</span>
              <span style={{ fontWeight: "600" }}>
                {formatPercentage(inputs.inflation || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {results && (
        <>
          {/* Executive Summary */}
          <div
            style={{
              backgroundColor: "#f0f9ff",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "30px",
              borderLeft: "4px solid #0ea5e9",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "700",
                margin: "0 0 15px 0",
                color: "#2d3748",
              }}
            >
              Key Findings
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "15px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ color: "#4a5568" }}>Gross Investment Income:</span>
                  <span style={{ fontWeight: "600" }}>
                    {formatCurrency(results.grossIncome)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ color: "#4a5568" }}>Investment Costs ({results.feeType}):</span>
                  <span style={{ fontWeight: "600" }}>
                    {formatCurrency(results.feeCost)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ color: "#4a5568" }}>Taxable Income After Costs:</span>
                  <span style={{ fontWeight: "600" }}>
                    {formatCurrency(results.taxableIncome)}
                  </span>
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ color: "#4a5568" }}>Tax Liability:</span>
                  <span style={{ fontWeight: "600" }}>
                    {formatCurrency(results.taxes)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ color: "#4a5568" }}>Nominal Net Yield (Before Inflation):</span>
                  <span style={{ fontWeight: "600" }}>
                    {formatPercentage(results.nominalNetYield)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ color: "#4a5568" }}>Real Net Yield (After Inflation):</span>
                  <span style={{ fontWeight: "600" }}>
                    {formatPercentage(results.realNetYield)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div style={{ marginBottom: "30px" }}>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "700",
                margin: "0 0 15px 0",
                color: "#2d3748",
              }}
            >
              Performance Summary: What You Actually Keep
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "15px",
              }}
            >
              <div
                style={{
                  padding: "15px",
                  backgroundColor: "#f0fdf4",
                  borderRadius: "6px",
                  border: "1px solid #bbf7d0",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "14px",
                    color: "#15803d",
                    fontWeight: "600",
                  }}
                >
                  Nominal Return
                </p>
                <p
                  style={{
                    margin: "0",
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#15803d",
                  }}
                >
                  {formatPercentage(results.nominalNetYield)}
                </p>
                <p style={{ margin: "8px 0 0 0", fontSize: "12px", color: "#4a5568" }}>
                  Return before inflation adjustment
                </p>
              </div>

              <div
                style={{
                  padding: "15px",
                  backgroundColor: "#eff6ff",
                  borderRadius: "6px",
                  border: "1px solid #bfdbfe",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "14px",
                    color: "#1d4ed8",
                    fontWeight: "600",
                  }}
                >
                  Real Return
                </p>
                <p
                  style={{
                    margin: "0",
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#1d4ed8",
                  }}
                >
                  {formatPercentage(results.realNetYield)}
                </p>
                <p style={{ margin: "8px 0 0 0", fontSize: "12px", color: "#4a5568" }}>
                  Purchasing power after inflation
                </p>
              </div>
            </div>
          </div>

          {/* Income Distribution Chart */}
          <div style={{ marginBottom: "30px", pageBreakInside: "avoid" }}>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "700",
                margin: "0 0 15px 0",
                color: "#2d3748",
              }}
            >
              Where Your Investment Income Goes
            </h2>
            <div style={{ height: "250px", width: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incomeDistributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {incomeDistributionData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={chartTooltipFormatter} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gross vs Net Return Comparison */}
          <div style={{ marginBottom: "30px", marginTop: "150px", pageBreakInside: "avoid" }}>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "700",
                margin: "0 0 15px 0",
                color: "#2d3748",
              }}
            >
              Gross vs. Net Returns: The Impact of Costs
            </h2>
            <div style={{ height: "250px", width: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis
                    tickFormatter={(value) =>
                      `$${value > 1000 ? `${(value / 1000).toFixed(0)}k` : value}`
                    }
                  />
                  <Tooltip formatter={chartTooltipFormatter} />
                  <Bar
                    dataKey="value"
                    fill={CHART_COLORS.primary}
                    name="Return Amount"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div style={{ marginBottom: "30px" }}>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "700",
                margin: "0 0 15px 0",
                color: "#2d3748",
              }}
            >
              Detailed Income Breakdown
            </h2>
            <div
              style={{
                backgroundColor: "#f8fafc",
                padding: "15px",
                borderRadius: "6px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    backgroundColor: "white",
                    borderRadius: "4px",
                  }}
                >
                  <span style={{ color: "#4a5568" }}>Total Investment Return:</span>
                  <span style={{ fontWeight: "600" }}>
                    {formatCurrency(results.grossIncome)}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    backgroundColor: "white",
                    borderRadius: "4px",
                  }}
                >
                  <span style={{ color: "#4a5568" }}>Investment Costs ({results.feeType}):</span>
                  <span style={{ fontWeight: "600" }}>
                    {formatCurrency(results.feeCost)}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    backgroundColor: "white",
                    borderRadius: "4px",
                  }}
                >
                  <span style={{ color: "#4a5568" }}>Income Subject to Taxation:</span>
                  <span style={{ fontWeight: "600" }}>
                    {formatCurrency(results.taxableIncome)}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    backgroundColor: "white",
                    borderRadius: "4px",
                  }}
                >
                  <span style={{ color: "#4a5568" }}>Taxes Paid:</span>
                  <span style={{ fontWeight: "600" }}>
                    {formatCurrency(results.taxes)}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    backgroundColor: "#4FD1C5",
                    borderRadius: "4px",
                  }}
                >
                  <span style={{ color: "white", fontWeight: "600" }}>
                    Your Final Take-Home Income:
                  </span>
                  <span
                    style={{
                      fontWeight: "700",
                      fontSize: "16px",
                      color: "white",
                    }}
                  >
                    {formatCurrency(results.netIncome)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div
            style={{
              backgroundColor: "#f0fff4",
              padding: "20px",
              borderRadius: "6px",
              marginBottom: "30px",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "700",
                margin: "0 0 15px 0",
                color: "#2d3748",
              }}
            >
              Key Insights: Understanding Your Returns
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
              <div
                style={{
                  padding: "12px",
                  backgroundColor: "white",
                  borderRadius: "4px",
                }}
              >
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    margin: "0 0 8px 0",
                    color: "#2b6777",
                  }}
                >
                  The Cost of Investing
                </h3>
                <p style={{ margin: "0", fontSize: "13px", lineHeight: 1.4 }}>
                  Your {results.feeType.toLowerCase()} of {formatCurrency(results.feeCost)} reduce
                  your gross income by {(parseFloat(results.feeCost) / parseFloat(results.grossIncome) * 100).toFixed(1)}%.
                  This highlights the importance of considering investment costs when evaluating returns.
                </p>
              </div>
              <div
                style={{
                  padding: "12px",
                  backgroundColor: "white",
                  borderRadius: "4px",
                }}
              >
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    margin: "0 0 8px 0",
                    color: "#2b6777",
                  }}
                >
                  Tax Efficiency Matters
                </h3>
                <p style={{ margin: "0", fontSize: "13px", lineHeight: 1.4 }}>
                  Taxes account for {formatCurrency(results.taxes)}, which is {(parseFloat(results.taxes) / parseFloat(results.taxableIncome) * 100).toFixed(1)}% of your
                  taxable income. Tax-efficient investment strategies can significantly improve your net returns.
                </p>
              </div>
              <div
                style={{
                  padding: "12px",
                  backgroundColor: "white",
                  borderRadius: "4px",
                }}
              >
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    margin: "0 0 8px 0",
                    color: "#2b6777",
                  }}
                >
                  Inflation's Impact on Purchasing Power
                </h3>
                <p style={{ margin: "0", fontSize: "13px", lineHeight: 1.4 }}>
                  After accounting for {inputs.inflation}% inflation, your real
                  yield is {formatPercentage(results.realNetYield)}. This represents your actual increase in purchasing power, which is what truly matters for long-term wealth building.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <footer
        style={{
          marginTop: "40px",
          paddingTop: "20px",
          borderTop: "1px solid #e2e8f0",
          fontSize: "12px",
          color: "#718096",
          textAlign: "center",
        }}
      >
        <div>
          <p style={{ margin: "0 0 5px 0", fontWeight: "600" }}>
            For more financial planning tools, visit <strong>https://dollarfar.com</strong>
          </p>
        </div>
      </footer>
    </div>
  );
};