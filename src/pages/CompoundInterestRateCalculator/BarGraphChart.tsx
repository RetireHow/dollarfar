import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const renderTooltip = ({ active, label, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#000019] rounded-lg px-2 py-1 font-bold text-[10px] w-[68px] h-[35px] text-white">
        <p>{label}</p>
        <div className="flex items-center gap-1">
          <Icon
            icon="material-symbols-light:circle"
            className="text-[#25BF17] w-2 h-2"
          />
          <p className="text-[10px]">{payload[0]?.value}</p>
        </div>
      </div>
    );
  }

  return null;
};

const renderLegend = (props) => {
  const { payload } = props;

  return (
    <ul className="space-y-[1.5rem] md:ml-[3rem] ml-[1rem]">
      {payload.map((entry, index) => {
        const { color, payload } = entry;
        const { dataKey } = payload || {};
        return (
          <li
            className="flex items-center gap-3 font-semibold"
            key={`item-${index}`}
          >
            <p
              style={{ backgroundColor: `${color}` }}
              className="w-10 h-3 rounded-[10px]"
            ></p>
            <p className="font-semibold">
              {dataKey == "interest" ? "Total Interest" : "Total Principal"}
            </p>
          </li>
        );
      })}
      <li className="flex items-center gap-3 font-semibold">
        <Icon className="w-[1.5rem] h-[1.5rem]" icon="mdi:dollar" />
        <span>CAD - Canadian Dollar</span>
      </li>
    </ul>
  );
};

export const BarGraphChart = () => {
  const data = [
    { year: 2014, principal: 1800, interest: 180 },
    { year: 2015, principal: 1900, interest: 190 },
    { year: 2016, principal: 2000, interest: 200 },
    { year: 2017, principal: 2100, interest: 210 },
    { year: 2018, principal: 2200, interest: 220 },
    { year: 2019, principal: 2300, interest: 230 },
    { year: 2020, principal: 2400, interest: 240 },
    { year: 2021, principal: 2500, interest: 250 },
    { year: 2022, principal: 2600, interest: 260 },
    { year: 2023, principal: 2700, interest: 270 },
    { year: 2024, principal: 2800, interest: 280 },
    { year: 2025, principal: 2900, interest: 290 },
  ];

  const [legendLayout, setLegendLayout] = useState("vertical");
  // Function to handle window resize and update layout
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      // Mobile screen (768px and below)
      setLegendLayout("horizontal");
    } else {
      setLegendLayout("vertical");
    }
  };
  // Update layout on component mount and window resize
  useEffect(() => {
    handleResize(); // Set the layout initially
    window.addEventListener("resize", handleResize); // Listen for window resize
    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="lg:w-full lg:h-[500px] overflow-x-auto">
      <div className="lg:w-full min-w-[600px] h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={400}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              vertical={false}
              strokeLinejoin="1 1"
              strokeWidth={1}
              strokeOpacity={0.5}
            />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip cursor={{ fill: "transparent" }} content={renderTooltip} />
            <Legend
              layout={legendLayout}
              align={legendLayout === "vertical" ? "right" : "center"}
              verticalAlign={legendLayout === "vertical" ? "middle" : "bottom"}
              content={renderLegend}
            />
            <Bar dataKey="interest" fill="#EAB308" stackId="a" barSize={15} />
            <Bar dataKey="principal" fill="#22C55E" stackId="a" barSize={15} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
