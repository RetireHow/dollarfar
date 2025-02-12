import { useFormContext, useWatch } from "react-hook-form";
import Error from "../UI/Error";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import BCTooltip from "../../pages/BC/BCTooltip";
import {
  TBudgetSlice,
  TStaticPayloadField,
  updateBgtStaticField,
} from "../../redux/features/BgtSlice/BgtSlice";
import { isNegative } from "../../utils/isNegative";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  readonly?: boolean;
  stepName?: string;
  tooltipTitle: string;
  subField: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue?: any;
};

export default function DFInputWithWatch({
  type,
  name,
  label,
  readonly,
  placeholder,
  stepName,
  tooltipTitle,
  subField,
}: TInputProps) {
  const {
    register,
  } = useFormContext();

  const dispatch = useAppDispatch();

  const method = useFormContext();
  const value = useWatch({
    control: method.control,
    name,
  });
  useEffect(() => {
    dispatch(
      updateBgtStaticField({
        stepName: stepName as keyof TBudgetSlice,
        field: name as keyof TStaticPayloadField,
        subField,
        value: value,
      })
    );
  }, [value, dispatch, name, stepName, subField]);

  return (
    <div className="flex-1">
      <div className="flex items-center mb-[0.3rem]">
        <label
          className="block font-semibold md:text-[1rem] text-[14px]"
          htmlFor={name}
        >
          {label}
        </label>
        <BCTooltip title={tooltipTitle} />
      </div>
      <input
        className={`outline-none border-[1px] px-[12px] py-[9px] w-full duration-300 rounded-[8px] ${
          readonly && "cursor-not-allowed"
        } ${
          isNegative(value) ? "border-red-500 border-[2px]" : "border-[#838383]"
        }`}
        type={type}
        {...register(name)}
        id={name}
        placeholder={placeholder}
        readOnly={readonly}
        onWheel={(e) => e.currentTarget.blur()}
      />
      {isNegative(value) && (
        <Error message="Negative value is not allowed." />
      )}
    </div>
  );
}
