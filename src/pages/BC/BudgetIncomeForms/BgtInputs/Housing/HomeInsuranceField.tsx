import { Select } from "antd";
import CustomTooltip from "../../../../../components/UI/CustomTooltip";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { updateField } from "../../../../../redux/features/BgtSlice/BgtSlice";
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

export default function HomeInsuranceField() {
  const dispatch = useAppDispatch()
  const { currency } = useAppSelector((state) => state.globalCurrency);
  return (
    <div>
      <div className="flex justify-between items-center text-[1rem] mb-1">
        <label
          className="flex items-center gap-1 font-semibold"
          htmlFor="property"
        >
          <span>Home Insurance</span>{" "}
          <CustomTooltip title="Insurance premium covering property damage and liabilities." />
        </label>
      </div>

      <div className="flex gap-1">
        <input
          className="border-[1px] border-[#838383] rounded-[8px] p-[0.6rem] outline-none w-full"
          type="number"
          placeholder={`${currency}0`}
          onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
            e.currentTarget.blur()
          }
          onChange={(e) =>
            dispatch(
              updateField({
                category: "housing",
                field: "homeInsurance",
                value: Number(e.target.value),
              })
            )
          }
        />
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

