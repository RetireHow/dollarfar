
import { Select } from "antd";
import CustomTooltip from "../../../../../components/UI/CustomTooltip";
import { Icon } from "@iconify/react/dist/iconify.js";
import { selectOptions } from "../../../BgtSelectOptions";
import { useAppDispatch } from "../../../../../redux/hooks";
import { updateField } from "../../../../../redux/features/BgtSlice/BgtSlice";
export default function RetirementField() {
  const dispatch = useAppDispatch()
  return (
    <div>
      <div className="flex justify-between items-center text-[1rem] mb-1">
        <label
          className="flex items-center gap-1 font-semibold"
          htmlFor="property"
        >
          <span>Retirement</span>{" "}
          <CustomTooltip title="Monthly payment towards your home loan principal and interest." />
        </label>
      </div>

      <div className="flex gap-1">
        <input
          className="border-[1px] border-[#838383] rounded-[8px] p-[0.6rem] outline-none w-full"
          type="number"
          placeholder="$0"
          onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
            e.currentTarget.blur()
          }
          onChange={(e) =>
            dispatch(
              updateField({
                category: "savings",
                field: "retirement",
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
