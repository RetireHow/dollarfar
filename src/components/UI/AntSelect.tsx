import { Icon } from "@iconify/react/dist/iconify.js";
import { Select } from "antd";
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

export default function AntSelect() {
  return (
    <Select
      defaultValue="Weekly"
      size="large"
      style={{height:45}}
      className="rounded-[9px] md:w-[130px] w-[90px] hover:border-gray-400 border-[1px] border-gray-400 md:text-[1rem] text-[12px]"
      options={selectOptions}
      suffixIcon={
        <Icon
          className="md:text-[1.5rem] text-[1rem] text-gray-600"
          icon="iconamoon:arrow-down-2"
        />
      }
    ></Select>
  );
}
