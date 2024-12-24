import ReactSlider from "react-slider";
import "./Slider.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setTime } from "../../../redux/features/compoundInterestSlice/compoundInterestSlice";
import CustomTooltip from "../../../components/UI/CustomTooltip";
import { isNegative } from "../../../utils/isNegative";

export default function TimePeriodSlider({
  showError,
}: {
  showError: boolean;
}) {
  const dispatch = useAppDispatch();
  const { time } = useAppSelector((state) => state.compoundInterest);
  return (
    <div>
      <div className="flex justify-between items-center mb-[1.25rem]">
        <div className="flex items-center gap-2">
          <p className="font-semibold md:text-[1.3rem] text-[14px]">
            Time Period
          </p>
          <CustomTooltip title="The total time the money is invested or borrowed for, usually in years. Enter the number of years you want to calculate compound interest for." />
        </div>
        <div className="relative">
          <input
            className={`font-bold md:text-[1.2rem] text-[14px] text-left bg-[#F8F8F8] rounded-[10px] md:px-[1.25rem] px-[0.5rem] py-[10px] md:max-w-[130px] max-w-[100px] outline-none`}
            type="number"
            value={time}
            onChange={(e) =>
              dispatch(setTime(e.target.value ? Number(e.target.value) : ""))
            }
            onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
              e.currentTarget.blur()
            }
          />
          <p className="absolute right-10 top-2 font-semibold md:text-[1.2rem] text-[14px]">
            y
          </p>
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
      <div className="flex justify-between items-center md:text-[1rem] text-[14px] font-medium text-[#696969] pt-5">
        <p>1 Year</p>
        <p>50 Years</p>
      </div>
      {isNegative(time) && showError && (
        <p className="text-red-500 text-[14px] font-bold text-right">
          Time Period can not be negative
        </p>
      )}
      {!time && showError && (
        <p className="text-red-500 text-[14px] font-bold text-right">
          Time Period is required.
        </p>
      )}
    </div>
  );
}
