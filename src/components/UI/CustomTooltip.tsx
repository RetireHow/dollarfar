import { Icon } from "@iconify/react/dist/iconify.js";
import { Tooltip } from "antd";

export default function CustomTooltip({ title }: { title: string }) {
  return (
    <Tooltip
      color="#F8F8F8"
      placement="topRight"
      title={title}
      overlayInnerStyle={{
        color: "#000000"
      }}
    >
      <Icon
        className="text-[#838383] text-[1rem]"
        icon="material-symbols:info-outline"
      />
    </Tooltip>
  );
}