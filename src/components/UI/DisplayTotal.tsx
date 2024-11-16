import { Icon } from "@iconify/react/dist/iconify.js";
import CustomTooltip from "./CustomTooltip";

type TData = {
  fieldTitle?: string;
  buttonText?: string;
  infoText?: string;
  total: number;
  setShowSubInputs: (show: boolean) => void;
  showSubInputs: boolean;
};
export default function DisplayTotal({ data }: { data: TData }) {
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
  return (
    <div>
      <div className="flex justify-between items-center text-[1rem] mb-1 overflow-x-auto">
        <label
          className="flex items-center gap-1 font-semibold text-nowrap"
          htmlFor="property"
        >
          <span>{fieldTitle}</span>
          <CustomTooltip title={infoText as string} />
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
      <div
        onClick={handleShowInputs}
        className="border-[1px] border-[#838383] rounded-[8px] p-[0.6rem] w-full cursor-pointer"
      >
        Total Value: ${total || "0.00"}
      </div>
    </div>
  );
}
