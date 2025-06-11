import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { getCurrencySymbol } from "../../../utils/getCurrencySymbol";
import { CategoryItems } from "./CostOfLivingPersonalizedCalculator";

export const BudgetVisualization = ({
  activeCategories,
  categoryItems,
  currency,
}: {
  activeCategories: string[];
  categoryItems: CategoryItems;
  currency: string;
}) => {
  // Prepare data for bar chart
  const barChartData = activeCategories.map((category) => ({
    name: category,
    total: calculateCategoryTotal(categoryItems, category),
  }));

  // Prepare data for pie chart
  const pieChartData = activeCategories.map((category) => ({
    name: category,
    value: calculateCategoryTotal(categoryItems, category),
  }));

  // Helper function to calculate category totals
  function calculateCategoryTotal(
    items: CategoryItems,
    category: string
  ): number {
    return (items[category] || []).reduce(
      (sum, item) => sum + (item?.total || 0),
      0
    );
  }

  // Colors for charts
  const COLORS = [
    "#4361ee",
    "#3a0ca3",
    "#7209b7",
    "#f72585",
    "#4cc9f0",
    "#4895ef",
  ];

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-xl font-semibold mb-6 text-center">
        Budget Visualization
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="h-[400px]">
          <h4 className="text-lg font-medium mb-4 text-center">
            Monthly Costs by Category
          </h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={70}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickFormatter={(value) =>
                  `${getCurrencySymbol(currency)}${Number(value)?.toFixed(2)}`
                }
              />
              <Tooltip
                formatter={(value) => [
                  `${getCurrencySymbol(currency)}${Number(value)?.toFixed(2)}`,
                  "Total",
                ]}
              />
              <Legend />
              <Bar
                dataKey="total"
                name="Monthly Cost"
                fill="#4361ee"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="h-[400px]">
          <h4 className="text-lg font-medium mb-4 text-center">
            Budget Distribution
          </h4>
          <ResponsiveContainer width="90%" height="90%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                innerRadius={20} // optional
                outerRadius={50} // smaller pie
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                style={{fontSize:12}}
              >
                {pieChartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [
                  `${getCurrencySymbol(currency)}${Number(value)?.toFixed(2)}`,
                  name,
                ]}
              />
              {<Legend />}
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown Tables */}
      {/* <div className="mt-8 space-y-6">
        {activeCategories.map((category) => (
          <div key={category} className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">{category} Breakdown</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Item</th>
                    <th className="px-4 py-2 text-left">Frequency</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Monthly Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {categoryItems[category]?.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{item.item_name}</td>
                      <td className="px-4 py-2 capitalize">{item.frequency}</td>
                      <td className="px-4 py-2">
                        {getCurrencySymbol(currency)}{item.average_price.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 font-medium">
                        {getCurrencySymbol(currency)}{item.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-semibold">
                    <td className="px-4 py-2" colSpan={3}>Category Total</td>
                    <td className="px-4 py-2">
                      {getCurrencySymbol(currency)}
                      {calculateCategoryTotal(categoryItems, category).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};
