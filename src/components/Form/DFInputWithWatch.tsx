import { useFormContext, useWatch } from "react-hook-form";
import Error from "../UI/Error";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  readonly?: boolean;
  formName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue?: any;
};

export default function DFInputWithWatch({
  type,
  name,
  label,
  readonly,
  placeholder,
  setValue,
}: TInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const dispatch = useAppDispatch();

  const method = useFormContext();
  const value = useWatch({
    control: method.control,
    name,
  });
  useEffect(() => {
    if (setValue) {
      dispatch(setValue(value));
    }
  }, [value, setValue, dispatch]);

  return (
    <div>
      <label className="block mb-[0.5rem] font-semibold" htmlFor={name}>
        {label}
      </label>
      <input
        className={`outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[8px] ${
          readonly && "cursor-not-allowed"
        } ${errors[name]?.message ? "border-red-500" : "border-[#838383]"}`}
        type={type}
        {...register(name)}
        id={name}
        placeholder={placeholder}
        readOnly={readonly}
        onWheel={(e) => e.currentTarget.blur()}
      />
      {errors[name]?.message && (
        <Error message={errors[name].message as string} />
      )}
    </div>
  );
}
