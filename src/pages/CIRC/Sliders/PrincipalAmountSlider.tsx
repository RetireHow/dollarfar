import ReactSlider from "react-slider";
import "./Slider.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setPrincipal } from "../../../redux/features/compoundInterestSlice/compoundInterestSlice";
import CustomTooltip from "../../../components/UI/CustomTooltip";

export default function PrincipalAmountSlider() {
  const dispatch = useAppDispatch();
  const { principal } = useAppSelector((state) => state.compoundInterest);
  const { currency } = useAppSelector((state) => state.globalCurrency);
  return (
    <div>
      <div className="flex justify-between items-center mb-[1.25rem]">
        <div className="flex items-center gap-2">
          <p className="font-semibold md:text-[1.3rem] text-[14px]">Principle Amount</p>
          <CustomTooltip title="This is the initial sum of money invested or loaned, before interest. Enter the base amount for the compound interest calculation." />
        </div>
        <div className="relative">
          <input
            className="font-bold md:text-[1.2rem] text-[14px] text-right bg-[#F8F8F8] rounded-[10px] px-[1.25rem] py-[10px] md:max-w-[200px] max-w-[150px] outline-none"
            type="number"
            value={principal}
            onChange={(e) => {
              dispatch(setPrincipal(e.target.value ? Number(e.target.value) : ''))
            }}
            onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
              e.currentTarget.blur()
            }
          />
          <p className="absolute left-3 top-[10px] font-semibold md:text-[1.2rem] text-[14px]">
            {currency}
          </p>
        </div>
      </div>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        thumbActiveClassName="active-thumb"
        min={500}
        max={10000}
        value={principal}
        minDistance={10}
        onChange={(newValue) => dispatch(setPrincipal(newValue))}
      />
      <div className="flex justify-between items-center md:text-[1rem] text-[14px] font-medium text-[#696969] pt-5">
        <p>500</p>
        <p>10,000</p>
      </div>
    </div>
  );
}
