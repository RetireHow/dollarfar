import CustomTooltip from "./CustomTooltip";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppSelector } from "../../redux/hooks";
import AntSelect from "./AntSelect";

type TData = {
  fieldTitle?: string;
  buttonText?: string;
  infoText?: string;
  total: number;
  setShowSubInputs: (show: boolean) => void;
  showSubInputs: boolean;
};

export default function BCTotalDisplay({ data }: { data: TData }) {
  const {
    total,
    showSubInputs,
    setShowSubInputs,
    fieldTitle,
    buttonText,
    infoText,
  } = data;
  const handleShowInputs = () => {
    setShowSubInputs(!showSubInputs);
  };
  const { currency } = useAppSelector((state) => state.globalCurrency);
  return (
    <div>
      <div className="flex justify-between items-center md:text-[1rem] text-[14px] mb-1 overflow-x-auto">
        <label
          className="flex items-center gap-1 font-semibold text-nowrap"
          htmlFor="property"
        >
          <span>{fieldTitle}</span> <CustomTooltip title={infoText as string} />
        </label>
        {/* No functionality on "Add Properties" button */}
        <button
          onClick={() => setShowSubInputs(!showSubInputs)}
          className="font-semibold flex items-center gap-1 text-nowrap"
        >
          {showSubInputs ? (
            // <Icon className="text-[1.25rem]" icon="ic:round-minus" />
            <Icon className="text-[1.5rem]" icon="iconamoon:arrow-up-2-light" />
          ) : (
            <Icon className="text-[1.25rem]" icon="ic:round-plus" />
          )}
          <span>{buttonText}</span>
        </button>
      </div>

      <div className="flex gap-1">
        <div
          onClick={handleShowInputs}
          className="border-[1px] md:text-[1rem] text-[14px] border-[#838383] rounded-[8px] p-[0.6rem] cursor-pointer w-full"
        >
          Total: {currency}
          {total || "0.00"}
        </div>
        <div>
          <AntSelect />
          {/* <select
            className="border-[1px] border-gray-400 md:px-[0.8rem] px-[0.3rem] py-[0.8rem] rounded-[8px] md:text-[1rem] text-[14px]"
            name=""
            id=""
          >
            <option value="Weekly">Weekly</option>
            <option value="Biweekly">Biweekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Annually">Annually</option>
            <option value="Other">Weekly</option>
          </select> */}
        </div>
      </div>
    </div>
  );
}
