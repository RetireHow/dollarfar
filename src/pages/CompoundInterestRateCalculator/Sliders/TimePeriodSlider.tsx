import ReactSlider from "react-slider";
import "./Slider.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setTime } from "../../../redux/features/compoundInterestSlice/compoundInterestSlice";

export default function TimePeriodSlider() {
  const dispatch = useAppDispatch();
  const { time } = useAppSelector((state) => state.compoundInterest);
  return (
    <div>
      <div className="flex justify-between items-center mb-[1.25rem]">
        <p className="font-semibold text-[1.3rem]">Time Period</p>
        <div className="font-bold text-[1.2rem] text-right bg-[#F8F8F8] rounded-[10px] px-[1.25rem] py-[10px] w-[130px] flex justify-center items-center gap-1">
          {time}
          <span>Years</span>
        </div>
      </div>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        thumbActiveClassName="active-thumb"
        min={1}
        max={50}
        value={time}
        minDistance={10}
        onChange={(newValue) => dispatch(setTime(newValue))}
      />
      <div className="flex justify-between items-center text-[1rem] font-medium text-[#696969] pt-5">
        <p>1 Year</p>
        <p>50 Years</p>
      </div>
    </div>
  );
}
