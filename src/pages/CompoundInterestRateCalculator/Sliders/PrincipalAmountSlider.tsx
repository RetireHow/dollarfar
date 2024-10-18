import { useState } from "react";
import ReactSlider from "react-slider";
import "./Slider.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import { numberWithCommas } from "../../../utils/numberWithCommas";

export default function PrincipalAmountSlider() {
  const [principalAmount, setPrincipalAmount] = useState<number>(1000);
  console.log(principalAmount);
  return (
    <div>
      <div className="flex justify-between items-center mb-[1.25rem]">
        <p className="font-semibold text-[1.3rem]">Principle Amount</p>
        <div className="font-bold text-[1.2rem] text-right bg-[#F8F8F8] rounded-[10px] px-[1.25rem] py-[10px] w-[130px] flex justify-center items-center">
          <Icon className="text-[1.2rem]" icon="mdi:dollar" />
          {numberWithCommas(principalAmount)}
        </div>
      </div>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        thumbActiveClassName="active-thumb"
        min={500}
        max={10000}
        defaultValue={1000}
        value={principalAmount}
        minDistance={10}
        onChange={(newValue) => setPrincipalAmount(newValue)}
      />
      <div className="flex justify-between items-center text-[1rem] font-medium text-[#696969] pt-5">
        <p>500</p>
        <p>10,000</p>
      </div>
    </div>
  );
}
