import ReactSlider from "react-slider";
import "./Slider.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setTime } from "../../../redux/features/compoundInterestSlice/compoundInterestSlice";
import CustomTooltip from "../../../components/UI/CustomTooltip";

export default function TimePeriodSlider() {
  const dispatch = useAppDispatch();
  const { time } = useAppSelector((state) => state.compoundInterest);
  return (
    <div>
      <div className="flex justify-between items-center mb-[1.25rem]">
        <div className="flex items-center gap-2">
        <p className="font-semibold text-[1.3rem]">Time Period</p>
        <CustomTooltip title="The total time the money is invested or borrowed for, usually in years. Enter the number of years you want to calculate compound interest for."/>
        </div>
        <div className="relative">
          <input
            className="font-bold text-[1.2rem] text-left bg-[#F8F8F8] rounded-[10px] px-[1.25rem] py-[10px] max-w-[130px] outline-none"
            type="number"
            value={time}
            onChange={(e) => dispatch(setTime(Number(e.target.value)))}
            onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
              e.currentTarget.blur()
            }
          />
          <p className="absolute right-3 top-2 font-semibold text-[1.2rem]">years</p>
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