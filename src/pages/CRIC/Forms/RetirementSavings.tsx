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

export default function RetirementSavings() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [hasOtherSavings, setHasOtherSavings] = useState("No");

  const handleNext = () => {
    dispatch(nextStep());
    navigate("/CRIC/other-income");
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
          Retirement Savings
        </h3>

        <div>
          <div className="flex items-end gap-1 font-semibold mb-2">
            <p>
              Do you have any other savings, such as a Tax-Free Savings Account
              (TFSA), non-registered account that you plan on using for your
              retirement?
            </p>
            <CustomTooltip title="Select 'Yes' if you have additional savings, such as a TFSA or non-registered (taxable) account, that you intend to use for retirement. These accounts can supplement your employer pension or government benefits." />
          </div>
          <select
            id="options"
            className="outline-none border-[1px] px-[9px] py-[9px] w-full duration-300 rounded-[5px] border-[#838383] bg-white"
            onChange={(e) => setHasOtherSavings(e.target.value)}
            defaultValue={hasOtherSavings}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {hasOtherSavings === "Yes" && (
          <>
            <div>
              <div className="font-semibold flex items-end gap-1 mb-2">
                <p>
                  What is the current total value of your TFSA ( Tax Free
                  Savings Account )?
                  <RedStar />
                </p>
                <CustomTooltip title="Enter the total amount currently saved in your TFSA. A TFSA allows your investments to grow tax-free, making it an effective tool for retirement savings." />
              </div>
              <input
                className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[5px] border-[#838383]"
                type="number"
                placeholder="Enter current total value of your TFSA"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </div>
            <div>
              <div className="font-semibold flex items-end gap-1 mb-2">
                <p>
                  Amount of your ongoing contribution? <RedStar />
                </p>

                <CustomTooltip title="Specify the amount you regularly contribute to your TFSA. This can include monthly, bi-weekly, or annual contributions that help grow your retirement savings over time." />
              </div>
              <input
                className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[5px] border-[#838383]"
                type="number"
                placeholder="Enter ongoing contribution amount"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </div>
            <div>
              <div className="flex items-end gap-2 font-semibold mb-2">
                <p>Frequency of your contribution</p>
                <CustomTooltip title="Select how often you contribute to your savings account. Common options include weekly, bi-weekly, monthly, or annually, depending on your savings schedule." />
              </div>
              <select
                id="options"
                className="outline-none border-[1px] px-[9px] py-[9px] w-full duration-300 rounded-[5px] border-[#838383] bg-white"
              >
                <option value="Weekly">Weekly</option>
                <option value="By-Weekly">By-Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Annually">Annually</option>
                <option value="Semi-Annually">Semi-Annually</option>
              </select>
            </div>
            <div>
              <div className="font-semibold flex items-end gap-1 mb-2">
                <p>
                  What rate of return/interest rate would you like to use for
                  this account?
                  <RedStar />
                </p>
                <CustomTooltip title="Enter the estimated annual rate of return or interest rate you expect from your TFSA investments. This rate will help calculate how your savings grow over time." />
              </div>
              <input
                className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[5px] border-[#838383]"
                type="number"
                placeholder="Enter rate of return"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </div>
            <div>
              <div className="font-semibold flex items-end gap-1 mb-2">
                <p>
                  What is the current total value of your non-registered
                  (Taxable) Accounts?
                  <RedStar />
                </p>
                <CustomTooltip title="Enter the total amount currently saved in your non-registered accounts. These accounts are taxable but provide additional flexibility for your retirement savings." />
              </div>
              <input
                className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[5px] border-[#838383]"
                type="number"
                placeholder="Enter current total value"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </div>
            <div>
              <div className="font-semibold flex items-end gap-1 mb-2">
                <p>
                  Amount of your contribution? <RedStar />
                </p>

                <CustomTooltip title="Specify the amount you contribute regularly to your non-registered accounts. Regular contributions help ensure your savings grow steadily over time." />
              </div>
              <input
                className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[5px] border-[#838383]"
                type="number"
                placeholder="Enter ongoing contribution amount"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </div>
            <div>
              <div className="flex items-end gap-2 font-semibold mb-2">
                <p>Frequency of your contribution</p>
                <CustomTooltip title="Select how often you contribute to your non-registered account. Choose from options like weekly, bi-weekly, monthly, or annually." />
              </div>
              <select
                id="options"
                className="outline-none border-[1px] px-[9px] py-[9px] w-full duration-300 rounded-[5px] border-[#838383] bg-white"
              >
                <option value="Weekly">Weekly</option>
                <option value="By-Weekly">By-Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Annually">Annually</option>
                <option value="Semi-Annually">Semi-Annually</option>
              </select>
            </div>
            <div>
              <div className="font-semibold flex items-end gap-1 mb-2">
                <p>
                  What rate of return/interest rate would you like to use for
                  this account?
                  <RedStar />
                </p>
                <CustomTooltip title="Enter the annual rate of return or interest rate you expect from your non-registered account investments. This rate is used to project future growth." />
              </div>
              <input
                className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[5px] border-[#838383]"
                type="number"
                placeholder="Enter rate of return"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </div>
            <div>
              <div className="font-semibold flex items-end gap-1 mb-2">
                <p>
                  What tax rate that you would like to use for this account ?
                  <RedStar />
                </p>
                <CustomTooltip title="Enter the tax rate that applies to your non-registered accounts. This rate accounts for taxes on income or gains earned within these accounts." />
              </div>
              <input
                className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[5px] border-[#838383]"
                type="number"
                placeholder="Enter rate of return"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </div>
            <div>
              <div className="flex items-end gap-2 font-semibold mb-2">
                <p>At what age do you plan to start receiving your savings?</p>
                <CustomTooltip title="Select the age at which you plan to start withdrawing from your retirement savings. This impacts the duration over which your savings will need to support your retirement." />
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
                <option value="73">73</option>
                <option value="74">74</option>
                <option value="75">75</option>
              </select>
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
