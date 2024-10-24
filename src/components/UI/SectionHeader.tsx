import { Icon } from "@iconify/react/dist/iconify.js";
import DownloadModal from "../DownloadModal";

export default function SectionHeader({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  return (
    <div className="border-b-[1px] border-[#0000001A] pb-5 mb-[5rem]">
      <div className="flex justify-between items-center flex-wrap">
        <h3 className="text-[1.5rem] font-bold md:mb-0 mb-3">{title}</h3>
        <div className="flex items-center flex-wrap gap-5">
          <div className="flex items-center md:gap-2 gap-1 border-[1px] border-[#0000001A] md:px-[1.25rem] px-[0.5rem] md:py-[10px] py-[8px] rounded-[10px] font-medium md:w-[140px] w-[110px] cursor-pointer">
            {/* <Icon className="w-[1.5rem] h-[1.5rem]" icon="mdi:dollar" /> */}
            <p>$</p>
            <p>CAD</p>
            <Icon
              className="w-[1.5rem] h-[1.5rem]"
              icon="iconamoon:arrow-down-2"
            />
          </div>
          <DownloadModal id={id} />
        </div>
      </div>
    </div>
  );
}
