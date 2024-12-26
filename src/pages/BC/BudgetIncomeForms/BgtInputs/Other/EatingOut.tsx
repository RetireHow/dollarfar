import CustomTooltip from "../../../../../components/UI/CustomTooltip";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { updateField } from "../../../../../redux/features/BgtSlice/BgtSlice";
import AntSelect from "../../../../../components/UI/AntSelect";
import { handleKeyDownUtil } from "../../../../../utils/handleKeyDownUtil";
export default function EatingOutField() {
  const dispatch = useAppDispatch()
  const { currency } = useAppSelector((state) => state.globalCurrency);
  const {other:{eatingOut}} = useAppSelector((state) => state.budgetCalculator);
  return (
    <div>
      <div className="flex justify-between items-center md:text-[1rem] text-[14px] mb-1">
        <label
          className="flex items-center gap-1 font-semibold"
          htmlFor="property"
        >
          <span>Eating Out</span>{" "}
          <CustomTooltip title="Enter your monthly expenses for dining at restaurants or ordering food." />
        </label>
      </div>

      <div className="flex gap-1">
        <input
          className="border-[1px] border-[#838383] rounded-[8px] p-[0.6rem] outline-none w-full"
          type="number"
          value={eatingOut}
          placeholder={`${currency}0`}
          onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
            e.currentTarget.blur()
          }
          onChange={(e) =>
            dispatch(
              updateField({
                category: "other",
                field: "eatingOut",
                value: e.target.value,
              })
            )
          }
          onKeyDown={handleKeyDownUtil}
        />
        <AntSelect/>
      </div>
    </div>
  );
}
