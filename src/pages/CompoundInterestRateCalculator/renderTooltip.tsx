import { numberWithCommas } from "../../utils/numberWithCommas";

export const renderTooltip = ({ active, label, payload }) => {
  console.log("Tooltip value==>", payload);
  if (active && payload?.length) {
    return (
      <div className="bg-white border-[1px] border-gray-300 rounded-lg p-3 font-bold text-[16px]">
        <p>
          <span>Year :</span>{" "}
          <span className="text-[1.2rem] font-bold">{label}</span>
        </p>
        <div className="">
          {payload?.map((item) => (
            <div>
              {item.name == "interest" ? (
                <div className="mt-2 text-[#EAB308]">
                  <span className="mr-1">Total Interest :</span>
                  <span className="text-[1.2rem] font-bold">
                    {numberWithCommas(item.payload.interest)}
                  </span>
                </div>
              ) : (
                <div className="mt-2 text-[#22C55E]">
                  <span className="mr-1">Total Principal :</span>
                  <span className="text-[1.2rem] font-bold">
                    {numberWithCommas(item.payload.principal)}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
