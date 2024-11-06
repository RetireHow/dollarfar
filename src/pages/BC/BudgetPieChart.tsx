/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useAppSelector } from "../../redux/hooks";

// Custom Legend Component
const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} style={{ marginBottom: "20px", color:'#475569' }}>
          <span
            style={{
              display: "inline-block",
              width: "30px",
              height: "10px",
              backgroundColor: entry.color,
              marginRight: "10px",
              borderRadius: "10px",
            }}
          />
          {entry.value}
        </li>
      ))}
      <li>
        <span style={{marginRight: "30px", fontSize:'1.1rem', fontWeight:'normal'}}>$</span>
        <span style={{color:'#475569'}}>CAD - Canadian Dollar</span>
      </li>
    </ul>
  );
};

// Sample data for the chart


const BudgetPieChart = () => {
  const isMobile = window.innerWidth <= 768;
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
const totalExpenses = houseExpenses + transportExpenses + educationalExpenses + otherExpenses + totalLoans + totalSavings;
const cashflowDeficit = totalIncome - totalExpenses;


  const data = [
    { name: "Housing Expenses", value: houseExpenses, color: "#2196F3" },
    { name: "Transport Expenses", value: transportExpenses, color: "#FF9800" },
    { name: "Educational Expenses", value: educationalExpenses, color: "#03A9F4" },
    { name: "Other Expenses", value: otherExpenses, color: "#FF5722" },
    { name: "Loans", value: totalLoans, color: "#F44336" },
    { name: "Savings", value: totalSavings, color: "#9C27B0" },
    { name: "Cashflow Deficit", value: cashflowDeficit, color: "#009688" },
  ];
  
  return (
    <div className="overflow-x-auto">
      <div className="flex justify-center items-center gap-10 min-w-[450px]">
        <ResponsiveContainer width={isMobile ? "100%" : "60%"} height={400}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={isMobile ? 50 : 60}
              outerRadius={isMobile ? 100 : 120}
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
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              content={<CustomLegend />}
            />
            <Tooltip
              formatter={(value: number, name: string) => [`$${value}`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BudgetPieChart;
