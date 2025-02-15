/* eslint-disable @typescript-eslint/no-explicit-any */
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useAppSelector } from "../../../redux/hooks";

// Sample data for the chart

const BudgetPieChart = () => {
  const { currency } = useAppSelector((state) => state.globalCurrency);

  const {
    housing: { totalAnnualHousingExpenses },
    transport: { totalAnnualTransportExpenses },
    education: { totalAnnualEducationalExpenses },
    other: { totalAnnualOtherExpenses },
    loans: { totalAnnualLoansExpenses },
    savings: { totalAnnualSavingsExpenses },
  } = useAppSelector((state) => state.budgetCalculator);

  const data = [
    {
      name: "Housing Expenses",
      value: totalAnnualHousingExpenses,
      color: "#2196F3",
    },
    {
      name: "Transport Expenses",
      value: totalAnnualTransportExpenses,
      color: "#FF9800",
    },
    {
      name: "Educational Expenses",
      value: totalAnnualEducationalExpenses,
      color: "#03A9F4",
    },
    {
      name: "Other Expenses",
      value: totalAnnualOtherExpenses,
      color: "#FF5722",
    },
    { name: "Loans", value: totalAnnualLoansExpenses, color: "#F44336" },
    { name: "Savings", value: totalAnnualSavingsExpenses, color: "#9C27B0" },
  ];

  return (
    <div
      id="BC-Chart"
      className="flex md:flex-row flex-col justify-center items-center md:gap-[2rem] bg-[#F8F8F8] rounded-lg border-[1px] border-gray-300 shadow-md p-5"
    >
      <div className="md:w-[300px] w-[250px] md:mt-0 mt-[-5rem]">
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
              // label={({ cx, cy }) => (
              //   <>
              //     <text
              //       x={cx}
              //       y={cy - 10}
              //       textAnchor="middle"
              //       dominantBaseline="central"
              //       style={{
              //         fontSize: "20px",
              //         fontWeight: "bold",
              //         fontFamily: "geist",
              //       }}
              //     >
              //       {currency}
              //       {numberWithCommas(0)}
              //     </text>
              //     <text
              //       x={cx}
              //       y={cy + 15}
              //       textAnchor="middle"
              //       dominantBaseline="central"
              //       style={{ fontSize: "14px", fill: "#888" }}
              //     >
              //       Total Income
              //     </text>
              //   </>
              // )}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${currency}${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [
                `${currency}${value}`,
                name,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ul className="md:space-y-[1.5rem] space-y-[1rem] text-[14px] text-[#475569] md:mt-0 mt-[-3rem]">
        <li className="flex items-center gap-[0.5rem] font-semibold">
          <div className="bg-[#2196F3] min-w-[30px] h-[10px] rounded-[10px]"></div>
          <p className="text-nowrap">Housing</p>
        </li>
        <li className="flex items-center gap-[0.5rem] font-semibold">
          <div className="bg-[#FF9800] min-w-[30px] h-[10px] rounded-[10px]"></div>
          <p>Transport</p>
        </li>
        <li className="flex items-center gap-[0.5rem] font-semibold">
          <div className="bg-[#2287b6] min-w-[30px] h-[10px] rounded-[10px]"></div>
          <p className="text-nowrap">Educational</p>
        </li>
        <li className="flex items-center gap-[0.5rem] font-semibold">
          <div className="bg-[#FF5722] min-w-[30px] h-[10px] rounded-[10px]"></div>
          <p>Other</p>
        </li>
        <li className="flex items-center gap-[0.5rem] font-semibold">
          <div className="bg-[#b62b21] min-w-[30px] h-[10px] rounded-[10px]"></div>
          <p>Loans</p>
        </li>
        <li className="flex items-center gap-[0.5rem] font-semibold">
          <div className="bg-[#9C27B0] min-w-[30px] h-[10px] rounded-[10px]"></div>
          <p>Savings</p>
        </li>
      </ul>
    </div>
  );
};

export default BudgetPieChart;
