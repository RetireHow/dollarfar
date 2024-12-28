import CustomTooltip from "../../../../../components/UI/CustomTooltip";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { updateField } from "../../../../../redux/features/BgtSlice/BgtSlice";
import AntSelect from "../../../../../components/UI/AntSelect";
import { handleKeyDownUtil } from "../../../../../utils/handleKeyDownUtil";
export default function CarPaymentField() {
  const dispatch = useAppDispatch()
  const { currency } = useAppSelector((state) => state.globalCurrency);
  const {transport:{carPayment}} = useAppSelector((state) => state.budgetCalculator);
  return (
    <div>
      <div className="flex justify-between items-center md:text-[1rem] text-[14px] mb-1">
        <label
          className="flex items-center gap-1 font-semibold"
          htmlFor="property"
        >
          <span>Car Payment</span>{" "}
          <CustomTooltip title="Enter your monthly car loan or lease payment amount." />
        </label>
      </div>

      <div className="flex gap-1">
        <input
          className="border-[1px] border-[#838383] rounded-[8px] p-[0.6rem] outline-none w-full"
          type="number"
          value={carPayment}
          placeholder={`${currency}0`}
          onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
            e.currentTarget.blur()
          }
          onChange={(e) =>
            dispatch(
              updateField({
                category: "transport",
                field: "carPayment",
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
