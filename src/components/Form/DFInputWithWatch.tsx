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
   setValue: any;
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
   if(setValue){
     dispatch(setValue(value))
   }
  }, [value, setValue, dispatch]);
  
  return (
    <div>
      <div className="flex justify-between items-center">
      <label className="block mb-[0.5rem]" htmlFor={name}>
        {label}
      </label>
      <button className="font-semibold">+ Add More</button>
      </div>
      <input
        className={`outline-none border-[1px] px-[12px] py-2 w-full duration-300 ${
          readonly && "cursor-not-allowed"
        } ${errors[name]?.message ? "border-red-500" : "border-[#D9D9D9]"}`}
        type={type}
        {...register(name)}
        id={name}
        placeholder={placeholder}
        readOnly={readonly}
      />
      {errors[name]?.message && (
        <Error message={errors[name].message as string} />
      )}
    </div>
  );
}