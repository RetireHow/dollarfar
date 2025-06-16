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

  return (
    <div className="mt-8 bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-neutral-700">
  <h3 className="text-xl font-semibold mb-6 text-center text-[#2b6777] dark:text-[#52ab98]">
    Budget Visualization
  </h3>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {/* Bar Chart */}
    <div className="h-[400px]">
      <h4 className="text-lg font-medium mb-4 text-center text-[#2b6777] dark:text-[#52ab98]">
        Monthly Costs by Category
      </h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={barChartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={70}
            tick={{ fontSize: 12 }}
            stroke="#2b6777"
          />
          <YAxis
            tickFormatter={(value) =>
              `${getCurrencySymbol(currency)}${Number(value)?.toFixed(2)}`
            }
            stroke="#2b6777"
          />
          <Tooltip
            formatter={(value) => [
              `${getCurrencySymbol(currency)}${Number(value)?.toFixed(2)}`,
              "Total",
            ]}
            contentStyle={{
              backgroundColor: '#ffffff',
              borderColor: '#2b6777',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
          <Legend />
          <Bar
            dataKey="total"
            name="Monthly Cost"
            fill="#52ab98"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* Pie Chart */}
    <div className="h-[400px]">
      <h4 className="text-lg font-medium mb-4 text-center text-[#2b6777] dark:text-[#52ab98]">
        Budget Distribution
      </h4>
      <ResponsiveContainer width="90%" height="90%">
        <PieChart>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            innerRadius={20}
            outerRadius={50}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            style={{ fontSize: 12 }}
          >
            {pieChartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={[
                  '#2b6777', 
                  '#52ab98', 
                  '#c8d8e4', 
                  '#86b3b1', 
                  '#3a7c7b', 
                  '#5f9ea0'
                ][index % 6]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [
              `${getCurrencySymbol(currency)}${Number(value)?.toFixed(2)}`,
              name,
            ]}
            contentStyle={{
              backgroundColor: '#ffffff',
              borderColor: '#2b6777',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* Category Breakdown Tables - Commented out but styled if you want to use */}
  <div className="mt-8 space-y-6">
    {activeCategories.map((category) => (
      <div key={category} className="bg-[#e8f4f8] dark:bg-neutral-800 p-4 rounded-lg border border-[#2b6777]">
        <h4 className="font-medium mb-3 text-[#2b6777] dark:text-[#52ab98]">{category} Breakdown</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-neutral-900 rounded-lg overflow-hidden">
            <thead className="bg-[#2b6777]">
              <tr>
                <th className="px-4 py-2 text-left text-white">Item</th>
                <th className="px-4 py-2 text-left text-white">Frequency</th>
                <th className="px-4 py-2 text-left text-white">Price</th>
                <th className="px-4 py-2 text-left text-white">Monthly Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
              {categoryItems[category]?.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 dark:text-gray-300">{item.item_name}</td>
                  <td className="px-4 py-2 dark:text-gray-300 capitalize">{item.frequency}</td>
                  <td className="px-4 py-2 dark:text-gray-300">
                    {getCurrencySymbol(currency)}{item.average_price.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 font-medium dark:text-gray-300">
                    {getCurrencySymbol(currency)}{item.total.toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="bg-[#52ab98] font-semibold">
                <td className="px-4 py-2 text-white" colSpan={3}>Category Total</td>
                <td className="px-4 py-2 text-white">
                  {getCurrencySymbol(currency)}
                  {calculateCategoryTotal(categoryItems, category).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};
