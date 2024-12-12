import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { nextStep } from "../../../redux/features/stepperSlice/stepperSclie";
import { updateField } from "../../../redux/features/CRIC/CRICSlice";
import { useEffect, useState } from "react";
import RedStar from "../../../components/UI/RedStar";
import Error from "../../../components/UI/Error";

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

  useEffect(() => {
    window.scrollTo({ top: 330, behavior: "smooth" });
  }, []);

  return (
    <section className="space-y-[2rem]">
      <h3 className="font-extrabold text-[2rem]">Old Age Security</h3>

      <div>
        <div className="flex items-center gap-2 font-semibold mb-2">
          <div>
            Do you expect to be living in Canada when you reach the age of 65?
          </div>
        </div>
        <select
          id="options"
          className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
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
          className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
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
                How many years will you have lived in Canada between age 18 and
                65?
              </p>
            </div>
            <select
              id="options"
              className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
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
              className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
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

      <div className="flex justify-end gap-10">
        <button
          onClick={() => navigate(-1)}
          className="border-[1px] w-[200px] border-gray-600 hover:bg-black hover:text-white duration-200 text-black rounded-[10px] px-[1.5rem] py-[10px] text-[1.25rem]"
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
