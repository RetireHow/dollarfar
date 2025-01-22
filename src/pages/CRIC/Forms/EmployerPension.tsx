import { useEffect, useState } from "react";
import {
  nextStep,
  previousStep,
} from "../../../redux/features/stepperSlice/stepperSclie";
import { useAppDispatch } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import CRICResultCard from "../CRICResultCard";
import RedStar from "../../../components/UI/RedStar";
import CustomTooltip from "../../../components/UI/CustomTooltip";

export default function EmployerPension() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isMemberOfEmployerPension, setIsMemberOfEmployerPension] =
    useState("No");

  const handleNext = () => {
    dispatch(nextStep());
    navigate("/CRIC/retirement-savings");
  };

  const handleBack = () => {
    dispatch(previousStep());
    navigate(-1);
  };

  useEffect(() => {
    window.scrollTo({ top: 330, behavior: "smooth" });
  }, []);

  return (
    <main className="grid md:grid-cols-2 grid-cols-1 gap-10 mb-[3rem]">
      <section className="space-y-[2rem] md:text-[1rem] text-[14px]">
        <h3 className="font-extrabold md:text-[2rem] text-[18px]">
          Employer Pension/RRIF
        </h3>

        <div>
          <div className="flex items-center gap-1 font-semibold mb-2">
            <p>Are you a member of an employer pension plan?</p>
            <CustomTooltip title="Select 'Yes' if you are currently enrolled in a pension plan offered by your employer. Employer pension plans often provide retirement income based on contributions from both you and your employer." />
          </div>
          <select
            id="options"
            className="outline-none border-[1px] px-[9px] py-[9px] w-full duration-300 rounded-[5px] border-[#838383] bg-white"
            onChange={(e) => setIsMemberOfEmployerPension(e.target.value)}
            defaultValue={isMemberOfEmployerPension}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {isMemberOfEmployerPension === "Yes" && (
          <>
            <div>
              <div className="flex items-center gap-1 font-semibold mb-2">
                <p>What type of pension plan is it?</p>
                <CustomTooltip title="Choose the type of pension plan you are a member of. Common types include Defined Benefit Plans (fixed payout based on a formula) and Defined Contribution Plans (payout depends on investment performance and contributions)." />
              </div>
              <select
                id="options"
                className="outline-none border-[1px] px-[9px] py-[9px] w-full duration-300 rounded-[5px] border-[#838383] bg-white"
              >
                <option value="Defined Benefit Plan">
                  Defined Benefit Plan
                </option>
                <option value="Defined Contribution Plan">
                  Defined Contribution Plan
                </option>
                <option value="RRIF/RRSP Plan">RRIF/RRSP Plan</option>
              </select>
            </div>

            <div>
              <div className="font-semibold flex items-center gap-1 mb-2">
                <p>
                  What is your estimated annual pension from above selected
                  plan?
                  <RedStar />
                </p>
                <CustomTooltip title="Enter the approximate amount you expect to receive annually from your pension plan during retirement. If you're unsure, check with your employer or pension provider for an estimate." />
              </div>
              <input
                className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[5px] border-[#838383]"
                type="number"
                placeholder="Enter estimated annual pension"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </div>

            <div>
              <div className="flex items-center gap-1 font-semibold mb-2">
                <p>At what age do you plan to receive your pension?</p>
                <CustomTooltip title="Select the age at which you plan to start receiving your pension payments. Keep in mind that starting earlier may result in smaller payouts, while delaying may increase the amount." />
              </div>
              <select
                id="options"
                className="outline-none border-[1px] px-[9px] py-[9px] w-full duration-300 rounded-[5px] border-[#838383] bg-white"
              >
                <option value="0">Select One</option>
                <option value="50">50</option>
                <option value="51">51</option>
                <option value="52">52</option>
                <option value="53">53</option>
                <option value="54">54</option>
                <option value="55">55</option>
                <option value="56">56</option>
                <option value="57">57</option>
                <option value="58">58</option>
                <option value="59">59</option>
                <option value="60">60</option>
                <option value="61">61</option>
                <option value="62">62</option>
                <option value="63">63</option>
                <option value="64">64</option>
                <option value="65">65</option>
                <option value="66">66</option>
                <option value="67">67</option>
                <option value="68">68</option>
                <option value="69">69</option>
                <option value="70">70</option>
                <option value="70">71</option>
                <option value="70">72</option>
              </select>
            </div>

            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>Is your pension indexed to inflation?</p>
                <CustomTooltip title="Indicate whether your pension is adjusted for inflation. Indexed pensions increase periodically to match the cost of living, helping to maintain your purchasing power in retirement." />
              </div>
              <select
                id="options"
                className="outline-none border-[1px] px-[9px] py-[9px] w-full duration-300 rounded-[5px] border-[#838383] bg-white"
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
            </div>

            <div>
              <div className="font-semibold flex items-center gap-1 mb-2">
                <p>
                  What would you like to use as inflation rate?
                  <RedStar />
                </p>

                <CustomTooltip title="Enter the rate you expect inflation to grow annually during retirement. This will help calculate how inflation might affect the value of your pension and future expenses. Typical rates range from 2% to 3%" />
              </div>
              <input
                className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[5px] border-[#838383]"
                type="number"
                placeholder="Enter inflation rate"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </div>
          </>
        )}

        <div className="grid grid-cols-2 w-full md:gap-5 gap-3">
          <button
            onClick={handleBack}
            className="border-[1px] md:text-[1.25rem] text-[18px] w-full border-gray-600 hover:bg-black hover:text-white duration-200 text-black rounded-[10px] px-[1.5rem] py-[10px]"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="text-white md:text-[1.25rem] text-[18px] p-[0.8rem] rounded-[10px] w-full bg-black"
          >
            Next
          </button>
        </div>
      </section>
      <CRICResultCard />
    </main>
  );
}
