/* eslint-disable @typescript-eslint/no-explicit-any */
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useAppSelector } from "../../redux/hooks";

// Sample data for the chart

const BudgetPieChart = () => {
  const {
    income: { subTotal: totalIncome },
    housing: { subTotal: houseExpenses },
    transport: { subTotal: transportExpenses },
    educational: { subTotal: educationalExpenses },
    other: { subTotal: otherExpenses },
    loans: { subTotal: totalLoans },
    savings: { subTotal: totalSavings },
  } = useAppSelector((state) => state.budgetCalculator);

  // Calculate cashflow deficit
  const totalExpenses =
    houseExpenses +
    transportExpenses +
    educationalExpenses +
    otherExpenses +
    totalLoans +
    totalSavings;
  const cashflowDeficit = totalIncome - totalExpenses;

  const data = [
    { name: "Housing Expenses", value: houseExpenses, color: "#2196F3" },
    { name: "Transport Expenses", value: transportExpenses, color: "#FF9800" },
    {
      name: "Educational Expenses",
      value: educationalExpenses,
      color: "#03A9F4",
    },
    { name: "Other Expenses", value: otherExpenses, color: "#FF5722" },
    { name: "Loans", value: totalLoans, color: "#F44336" },
    { name: "Savings", value: totalSavings, color: "#9C27B0" },
    { name: "Cashflow Deficit", value: cashflowDeficit, color: "#009688" },
  ];

  return (
    <div className="overflow-x-auto">
      <div
        className="flex justify-center items-center md:gap-[2rem] min-w-[500px]"
      >
        <div id="BC-Chart" className="w-[300px]">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                fill="#8884d8"
                labelLine={false}
                label={({ cx, cy }) => (
                  <>
                    {/* Total Income Value */}
                    <text
                      x={cx}
                      y={cy - 10} // Position above the "Total Income" text
                      textAnchor="middle"
                      dominantBaseline="central"
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        fontFamily: "geist",
                      }}
                    >
                      ${totalIncome}
                    </text>
                    {/* Total Income Label */}
                    <text
                      x={cx}
                      y={cy + 15} // Position below the income value
                      textAnchor="middle"
                      dominantBaseline="central"
                      style={{ fontSize: "14px", fill: "#888" }}
                    >
                      Total Income
                    </text>
                  </>
                )}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`$${value}`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="space-y-[1.5rem] text-[14px] text-[#475569]">
          <li className="flex items-center gap-[0.5rem] font-semibold">
            <div className="bg-[#2196F3] min-w-[30px] h-[10px] rounded-[10px]"></div>
            <p className="text-nowrap">Housing Expenses (${houseExpenses})</p>
          </li>
          <li className="flex items-center gap-[0.5rem] font-semibold">
            <div className="bg-[#FF9800] min-w-[30px] h-[10px] rounded-[10px]"></div>
            <p>Transport Expenses (${transportExpenses})</p>
          </li>
          <li className="flex items-center gap-[0.5rem] font-semibold">
            <div className="bg-[#03A9F4] min-w-[30px] h-[10px] rounded-[10px]"></div>
            <p className="text-nowrap">Educational Expenses (${educationalExpenses})</p>
          </li>
          <li className="flex items-center gap-[0.5rem] font-semibold">
            <div className="bg-[#FF5722] min-w-[30px] h-[10px] rounded-[10px]"></div>
            <p>Other Expenses (${otherExpenses})</p>
          </li>
          <li className="flex items-center gap-[0.5rem] font-semibold">
            <div className="bg-[#F44336] min-w-[30px] h-[10px] rounded-[10px]"></div>
            <p>Loans (${totalLoans})</p>
          </li>
          <li className="flex items-center gap-[0.5rem] font-semibold">
            <div className="bg-[#9C27B0] min-w-[30px] h-[10px] rounded-[10px]"></div>
            <p>Savings (${totalSavings})</p>
          </li>
          <li className="flex items-center gap-[0.5rem] font-semibold">
            <div className="bg-[#009688] min-w-[30px] h-[10px] rounded-[10px]"></div>
            <p>Cashflow Deficit (${cashflowDeficit})</p>
          </li>
          <li className="flex items-center gap-[0.5rem] font-semibold">
            <p className="min-w-[30px]">$</p>
            <p>CAD - Canadian Dollar</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BudgetPieChart;
