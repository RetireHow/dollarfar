import ReactSlider from "react-slider";
import "./Slider.css";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setPrincipal } from "../../../redux/features/compoundInterestSlice/compoundInterestSlice";

export default function PrincipalAmountSlider() {
  const dispatch = useAppDispatch();
  const { principal } = useAppSelector((state) => state.compoundInterest);
  return (
    <div>
      <div className="flex justify-between items-center mb-[1.25rem]">
        <p className="font-semibold text-[1.3rem]">Principle Amount</p>
        <div className="font-bold text-[1.2rem] text-right bg-[#F8F8F8] rounded-[10px] px-[1.25rem] py-[10px] w-[130px] flex justify-center items-center">
          {/* <Icon className="text-[1.2rem]" icon="mdi:dollar" /> */}
          <p>$</p>
          {numberWithCommas(principal)}
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
      <div className="flex justify-between items-center text-[1rem] font-medium text-[#696969] pt-5">
        <p>500</p>
        <p>10,000</p>
      </div>
    </div>
  );
}
