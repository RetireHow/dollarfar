
import CustomTooltip from "../../../../../components/UI/CustomTooltip";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { updateField } from "../../../../../redux/features/BgtSlice/BgtSlice";
import AntSelect from "../../../../../components/UI/AntSelect";
export default function MedicalField() {
  const dispatch = useAppDispatch()
  const { currency } = useAppSelector((state) => state.globalCurrency);
  const {other:{medical}} = useAppSelector((state) => state.budgetCalculator);
  return (
    <div>
      <div className="flex justify-between items-center md:text-[1rem] text-[14px] mb-1">
        <label
          className="flex items-center gap-1 font-semibold"
          htmlFor="property"
        >
          <span>Medical</span>{" "}
          <CustomTooltip title="Monthly payment towards your home loan principal and interest." />
        </label>
      </div>

      <div className="flex gap-1">
        <input
          className="border-[1px] border-[#838383] rounded-[8px] p-[0.6rem] outline-none w-full"
          type="number"
          value={medical}
          placeholder={`${currency}0`}
          onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
            e.currentTarget.blur()
          }
          onChange={(e) =>
            dispatch(
              updateField({
                category: "other",
                field: "medical",
                value: Number(e.target.value),
              })
            )
          }
        />
        <AntSelect/>
      </div>
    </div>
  );
}

