import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { nextStep } from "../../../redux/features/stepperSlice/stepperSclie";
import { updateField } from "../../../redux/features/CRIC/CRICSlice";
import { useEffect, useState } from "react";
import Error from "../../../components/UI/Error";
import RedStar from "../../../components/UI/RedStar";

export default function CanadaPensionPlanRough() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);

  const { selectedPP, ppStartYear, ppBenefitAmount } = useAppSelector(
    (state) => state.CRICalculator
  );

  const handleNext = () => {
    if ((!selectedPP || !ppStartYear || !ppBenefitAmount) && selectedPP !== "Not Applicable") {
      return setShowError(true);
    }
    dispatch(nextStep());
    navigate("/CRIC/OAS");
  };

  useEffect(() => {
    window.scrollTo({ top: 330, behavior: "smooth" });
  }, []);

  return (
    <section className="space-y-[2rem]">
      <h3 className="font-extrabold text-[2rem]">Canada Pension Plan</h3>

      <div>
        <div className="flex items-center gap-2 font-semibold mb-2">
          <p>
            Individuals who contribute to the Quebec Pension Plan (QPP) or the
            Canada Pension Plan (CPP) may be eligible to receive pension
            benefits at retirement. Which pension applies to you?<RedStar/>
          </p>
        </div>
        <select
          id="options"
          className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
          value={selectedPP}
          onChange={(e) =>
            dispatch(
              updateField({
                field: "selectedPP",
                value: e.target.value,
              })
            )
          }
        >
          <option value="Select One">Select One</option>
          <option value="Not Applicable">Not Applicable</option>
          <option value="Canada Pension Plan">Canada Pension Plan</option>
          <option value="Quebec Pension Plan">Quebec Pension Plan</option>
        </select>
        {showError && !selectedPP && <Error message="This field is required*."/>}
      </div>

      {selectedPP !== "Not Applicable" && (
        <>
          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>
                Enter your monthly retirement pension estimate (at age 65)
                indicated on your Statement that states your retirement pension
                estimate based on your past contributions<RedStar/>
              </p>
            </div>
            <select
              id="options"
              className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
              value={ppBenefitAmount}
              onChange={(e) =>
                dispatch(
                  updateField({
                    field: "ppBenefitAmount",
                    value: e.target.value,
                  })
                )
              }
            >
              <option value="Select One">Select One</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
              <option value="600">600</option>
              <option value="700">700</option>
              <option value="800">800</option>
              <option value="900">900</option>
              <option value="1000">1000</option>
              <option value="1100">1100</option>
              <option value="200">200</option>
              <option value="1300">1300</option>
              <option value="1364">1364</option>
            </select>
            {showError && !ppBenefitAmount && <Error message="This field is required*"/>}
          </div>

          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>
                At what age do you plan to receive your{" "}
                {selectedPP == "Canada Pension Plan" ? "CPP" : "QPP"} benefit?<RedStar/>
              </p>
            </div>
            <select
              id="options"
              className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
              value={ppStartYear}
              onChange={(e) =>
                dispatch(
                  updateField({
                    field: "ppStartYear",
                    value: e.target.value,
                  })
                )
              }
            >
              <option value="Select One">Select One</option>
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
            </select>
            {showError && !ppStartYear && <Error message="This field is required*"/>}
          </div>
        </>
      )}

      <div className="flex justify-end gap-10">
        <button
          onClick={() => navigate(-1)}
          className="text-white p-[0.8rem] rounded-[10px] w-[200px] bg-black"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="text-white p-[0.8rem] rounded-[10px] w-[200px] bg-black"
        >
          Next
        </button>
      </div>
    </section>
  );
}
