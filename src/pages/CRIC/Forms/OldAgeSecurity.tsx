import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  nextStep,
  previousStep,
} from "../../../redux/features/stepperSlice/stepperSclie";
import { updateField } from "../../../redux/features/CRIC/CRICSlice";
import { useEffect, useState } from "react";
import RedStar from "../../../components/UI/RedStar";
import Error from "../../../components/UI/Error";
import CRICResultCard from "../CRICResultCard";

const OASAgeOptions = ["Select One", 65, 66, 67, 68, 69, 70];

const canadaLivingAgeOptions = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
];

export default function OldAgeSecurity() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { yearsInCanada, isFortyYears, oasStartYear } = useAppSelector(
    (state) => state.CRICalculator
  );

  const [showError, setShowError] = useState(false);

  const handleNext = () => {
    if (!oasStartYear) {
      return setShowError(true);
    }
    dispatch(nextStep());
    navigate("/CRIC/summary");
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
          Old Age Security
        </h3>

        <div>
          <div className="flex items-center gap-2 font-semibold mb-2">
            <div>
              Do you expect to be living in Canada when you reach the age of 65?
            </div>
          </div>
          <select
            id="options"
            className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[5px] border-[#838383] bg-white"
          >
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
        </div>

        <div>
          <div className="flex items-center gap-2 font-semibold mb-2">
            <p>
              Will you have lived in Canada for at least 40 years between age 18
              and 65?
            </p>
          </div>
          <select
            id="options"
            className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[5px] border-[#838383] bg-white"
            value={isFortyYears}
            onChange={(e) => {
              dispatch(
                updateField({
                  field: "isFortyYears",
                  value: e.target.value,
                })
              );
            }}
          >
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
        </div>

        {!Number(isFortyYears) && (
          <>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>
                  How many years will you have lived in Canada between age 18
                  and 65?
                </p>
              </div>
              <select
                id="options"
                className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[5px] border-[#838383] bg-white"
                value={yearsInCanada}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      field: "yearsInCanada",
                      value: e.target.value,
                    })
                  )
                }
              >
                {canadaLivingAgeOptions.map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {isFortyYears && (
          <>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>
                  At what age do you plan to receive your OAS pension?
                  <RedStar />
                </p>
              </div>
              <select
                id="options"
                className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[5px] border-[#838383] bg-white"
                value={oasStartYear}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      field: "oasStartYear",
                      value: e.target.value,
                    })
                  )
                }
              >
                {OASAgeOptions.map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </select>
              {showError && !oasStartYear && (
                <Error message="This field is required*" />
              )}
            </div>
          </>
        )}

        <div className="grid grid-cols-2 md:gap-5 gap-3">
          <button
            onClick={handleBack}
            className="border-[1px] md:text-[1.25rem] text-[18px] border-gray-600 hover:bg-black hover:text-white duration-200 text-black rounded-[10px] px-[1.5rem] py-[10px]"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="text-white md:text-[1.25rem] text-[18px] p-[0.8rem] rounded-[10px] bg-black"
          >
            Next
          </button>
        </div>
      </section>
      <CRICResultCard />
    </main>
  );
}
