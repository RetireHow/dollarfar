import ReactSlider from "react-slider";
import "./Slider.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setRate } from "../../../redux/features/compoundInterestSlice/compoundInterestSlice";
import CustomTooltip from "../../../components/UI/CustomTooltip";
import { isNegative } from "../../../utils/isNegative";

export default function InterestRateSlider({showError}:{showError:boolean}) {
  const dispatch = useAppDispatch();
  const { rate } = useAppSelector((state) => state.compoundInterest);
  return (
    <div>
      <div className="flex justify-between items-center mb-[1.25rem]">
        <div className="flex items-center gap-2">
          <p className="font-semibold md:text-[1.3rem] text-[14px]">
            Rate of Interest
          </p>
          <CustomTooltip title="The annual interest rate or rate of return. This is the percentage at which your principal amount grows each year." />
        </div>
        <div className="relative">
          <input
            className="font-bold md:text-[1.2rem] text-[14px] text-left bg-[#F8F8F8] rounded-[10px] md:px-[1.25rem] px-[0.5rem] py-[10px] md:max-w-[130px] max-w-[80px] outline-none"
            type="number"
            placeholder="0"
            value={rate}
            onChange={(e) =>
              dispatch(setRate(Number(e.target.value)))
            }
            onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
              e.currentTarget.blur()
            }
          />
          <p className="absolute md:right-10 right-2 top-3 font-semibold md:text-[1.2rem] text-[14px]">
            %
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
        value={rate}
        minDistance={10}
        onChange={(newValue) => dispatch(setRate(newValue))}
      />
      <div className="flex justify-between md:text-[1rem] text-[14px] items-center font-medium text-[#696969] pt-5">
        <p>1%</p>
        <p>50%</p>
      </div>
      {isNegative(rate) && showError && (
        <p className="text-red-500 text-[14px] font-bold text-right">
          Rate of Interest can not be negative
        </p>
      )}
    </div>
  );
}
