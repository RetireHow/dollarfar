import ReactSlider from "react-slider";
import "./Slider.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setRate } from "../../../redux/features/compoundInterestSlice/compoundInterestSlice";

export default function InterestRateSlider() {
  const dispatch = useAppDispatch();
  const { rate } = useAppSelector((state) => state.compoundInterest);
  return (
    <div>
      <div className="flex justify-between items-center mb-[1.25rem]">
        <p className="font-semibold text-[1.3rem]">Rate of Interest</p>
        <div className="font-bold text-[1.2rem] text-right bg-[#F8F8F8] rounded-[10px] px-[1.25rem] py-[10px] w-[130px] flex justify-center items-center">
        {/* <Icon className="mr-1" icon="material-symbols:percent" /> */}
        <p>%</p>
          {rate}
        </div>
      </div>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        thumbActiveClassName="active-thumb"
        min={1}
        max={50}
        value={rate}
        minDistance={10}
        onChange={(newValue) => dispatch(setRate(newValue))}
      />
      <div className="flex justify-between items-center text-[1rem] font-medium text-[#696969] pt-5">
        <p>1%</p>
        <p>50%</p>
      </div>
    </div>
  );
}

