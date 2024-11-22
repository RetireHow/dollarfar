import { Select } from "antd";
import CustomTooltip from "./CustomTooltip";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppSelector } from "../../redux/hooks";

type TOption = {
  label: string;
  value: string;
};
const selectOptions: TOption[] = [
  { value: "Weekly", label: "Weekly" },
  { value: "Biweekly", label: "Biweekly" },
  { value: "Twice a month", label: "Twice a month" },
  { value: "Monthly", label: "Monthly" },
  { value: "Annually", label: "Annually" },
  { value: "Other", label: "Other" },
];

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
      <div className="flex justify-between items-center text-[1rem] mb-1 overflow-x-auto">
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
          className="border-[1px] border-[#838383] rounded-[8px] p-[0.6rem] cursor-pointer w-full"
        >
          Total Value: {currency}
          {total || "0.00"}
        </div>
        <div>
          <Select
            defaultValue="Weekly"
            size="large"
            style={{ width: 130, height: 45, border: "1px solid gray" }}
            className="rounded-[9px]"
            options={selectOptions}
            suffixIcon={
              <Icon
                className="text-[1.5rem] text-gray-600"
                icon="iconamoon:arrow-down-2"
              />
            }
          ></Select>
        </div>
      </div>
    </div>
  );
}
