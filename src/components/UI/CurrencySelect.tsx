import { Select } from "antd";
import { currencyOptions } from "../../pages/options/currencyOptions";
import { useAppSelector } from "../../redux/hooks";
import { setCurrency } from "../../redux/features/other/globalCurrency";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function CurrencySelect() {
  const dispatch = useDispatch();
  const { currency } = useAppSelector((state) => state.globalCurrency);
  return (
    <div className="md:w-auto w-full">
      <Select
        value={currency}
        size="large"
        className="!border-none md:w-[130px] w-full md:!h-[45px] border-[1px] border-gray-300"
        onChange={(value) => {
          dispatch(setCurrency(value));
        }}
        options={currencyOptions}
        suffixIcon={
          <Icon
            className="text-[1.5rem] text-gray-600"
            icon="iconamoon:arrow-down-2"
          />
        }
      ></Select>
    </div>
  );
}
