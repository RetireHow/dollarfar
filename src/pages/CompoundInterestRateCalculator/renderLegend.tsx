import { Icon } from "@iconify/react/dist/iconify.js";

export const renderLegend = (props) => {
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
