import { useState } from "react";
import ReactSlider from "react-slider";
import "./Slider.css";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function InterestRateSlider() {
  const [interestRate, setInterestRate] = useState<number>(5);
  console.log(interestRate);
  return (
    <div>
      <div className="flex justify-between items-center mb-[1.25rem]">
        <p className="font-semibold text-[1.3rem]">Rate of Interest</p>
        <div className="font-bold text-[1.2rem] text-right bg-[#F8F8F8] rounded-[10px] px-[1.25rem] py-[10px] w-[130px] flex justify-center items-center">
        <Icon className="mr-1" icon="material-symbols:percent" />
          {interestRate}
        </div>
      </div>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        thumbActiveClassName="active-thumb"
        min={1}
        max={50}
        defaultValue={5}
        value={interestRate}
        minDistance={10}
        onChange={(newValue) => setInterestRate(newValue)}
      />
      <div className="flex justify-between items-center text-[1rem] font-medium text-[#696969] pt-5">
        <p>1%</p>
        <p>50%</p>
      </div>
    </div>
  );
}

