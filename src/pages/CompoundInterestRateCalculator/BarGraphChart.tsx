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
import { renderTooltip } from "./renderTooltip";
import { renderLegend } from "./renderLegend";
import { useAppSelector } from "../../redux/hooks";


export const BarGraphChart = () => {
  const { interestBreakdown } = useAppSelector((state) => state.compoundInterest);
  console.log(interestBreakdown)

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
            data={interestBreakdown}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              vertical={false}
              strokeLinejoin="1 1"
              strokeWidth={1}
              strokeOpacity={0.5}
            />
            
            <XAxis dataKey="period" />
            <YAxis />
            {/* <Tooltip cursor={{ fill: "transparent" }} content={renderTooltip} /> */}
            <Tooltip />
            <Legend
              layout={legendLayout}
              align={legendLayout === "vertical" ? "right" : "center"}
              verticalAlign={legendLayout === "vertical" ? "middle" : "bottom"}
              content={renderLegend}
            />
            <Bar dataKey="principal" fill="#22C55E" stackId="a" barSize={15}/>
            <Bar dataKey="interest" fill="#EAB308" stackId="a" barSize={15} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
