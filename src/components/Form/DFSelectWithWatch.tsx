import { Controller, useFormContext, useWatch } from "react-hook-form";
import RedStar from "../UI/RedStar";
import { Select } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { BCFrequencyOptions } from "../../pages/BC/BCFrequencyOptions";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import {
  TBudgetSlice,
  TStaticPayloadField,
  updateBgtStaticField,
} from "../../redux/features/BgtSlice/BgtSlice";

type TProvestorSelectProps = {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  stepName: string;
  field: string;
};

export default function DFSelectWithWatch({
  name,
  label,
  required,
  placeholder,
  stepName,
  field,
}: TProvestorSelectProps) {
  const { control } = useFormContext();

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
        field: field as keyof TStaticPayloadField,
        subField: name,
        value: value,
      })
    );
  }, [dispatch, value, field, name, stepName]);

  return (
    <div>
      <label
        className="block mb-[0.3rem] font-semibold md:text-[1rem] text-[14px]"
        htmlFor={name}
      >
        {label}
        {required && <RedStar />}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            onChange={field.onChange}
            placeholder={placeholder}
            style={{
              height: 45,
              border: "1px solid #838383",
              borderRadius: "8px",
            }}
            className="md:w-[300px] w-full"
            variant="borderless"
            options={BCFrequencyOptions}
            suffixIcon={
              <Icon
                className="md:text-[1.5rem] text-[1rem] text-gray-600"
                icon="iconamoon:arrow-down-2"
              />
            }
          ></Select>
        )}
      />
    </div>
  );
}
