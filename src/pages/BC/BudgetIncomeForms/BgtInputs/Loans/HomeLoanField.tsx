import CustomTooltip from "../../../../../components/UI/CustomTooltip";
import { updateField } from "../../../../../redux/features/BgtSlice/BgtSlice";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import AntSelect from "../../../../../components/UI/AntSelect";
export default function HomeLoanField() {
  const dispatch = useAppDispatch()
  const { currency } = useAppSelector((state) => state.globalCurrency);
  const {loans:{homeLoan}} = useAppSelector((state) => state.budgetCalculator);
  return (
    <div>
      <div className="flex justify-between items-center md:text-[1rem] text-[14px] mb-1">
        <label
          className="flex items-center gap-1 font-semibold"
          htmlFor="property"
        >
          <span>Home Loan</span>{" "}
          <CustomTooltip title="Provide your monthly mortgage or home loan repayment amount." />
        </label>
      </div>

      <div className="flex gap-1">
        <input
          className="border-[1px] border-[#838383] rounded-[8px] p-[0.6rem] outline-none w-full"
          type="number"
          value={homeLoan}
          placeholder={`${currency}0`}
          onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
            e.currentTarget.blur()
          }
          onChange={(e) =>
            dispatch(
              updateField({
                category: "loans",
                field: "homeLoan",
                value: e.target.value,
              })
            )
          }
        />
        <AntSelect/>
      </div>
    </div>
  );
}
