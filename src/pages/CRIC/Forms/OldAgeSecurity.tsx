import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { nextStep } from "../../../redux/features/stepperSlice/stepperSclie";
import { updateField } from "../../../redux/features/CRIC/CRICSlice";
import { useState } from "react";
import Error from "../../../components/UI/Error";

const OASAgeOptions = [
  50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68,
  69, 70, 71,
];

const canadaLivingAgeOptions = [
  50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68,
  69, 70, 71,
];

export default function OldAgeSecurity() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    livedInCanadaFor40Years,
    expectToLiveInCanadaAt65,
    receivingOASPensionAge,
    yearsLivedInCanadaBetween18To65,
  } = useAppSelector((state) => state.CRICalculator.oldAgeSecurity);

  const [showError, setShowError] = useState(false);

  const handleNext = () => {
    if (
      livedInCanadaFor40Years === "Select One" ||
      expectToLiveInCanadaAt65 === "Select One"
    ) {
      return setShowError(true);
    }
    dispatch(nextStep());
    navigate("/CRIC/summary");
  };

  return (
    <section className="space-y-[2rem]">
      <h3 className="font-extrabold text-[2rem]">Old Age Security</h3>

      <div>
        <div className="flex items-center gap-2 font-semibold mb-2">
          <p>
            Do you expect to be living in Canada when you reach the age of 65?
          </p>
        </div>
        <select
          id="options"
          className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
          value={expectToLiveInCanadaAt65}
          onChange={(e) =>
            dispatch(
              updateField({
                section: "oldAgeSecurity",
                field: "expectToLiveInCanadaAt65",
                value: e.target.value,
              })
            )
          }
        >
          <option value="Select One">Select One</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {showError && expectToLiveInCanadaAt65 === "Select One" && (
          <Error message="Please select yes or no." />
        )}
      </div>

      <div>
        <div className="flex items-center gap-2 font-semibold mb-2">
          <p>
            Will you have lived in Canada for at least 40 years between age 18
            and 65? *
          </p>
        </div>
        <select
          id="options"
          className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
          value={livedInCanadaFor40Years}
          onChange={(e) => {
            dispatch(
              updateField({
                section: "oldAgeSecurity",
                field: "livedInCanadaFor40Years",
                value: e.target.value,
              })
            );
          }}
        >
          <option value="Select One">Select One</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {showError && livedInCanadaFor40Years === "Select One" && (
          <Error message="Please select yes or no." />
        )}
      </div>

      {livedInCanadaFor40Years === "Yes" && (
        <>
          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>At what age do you plan to receive your OAS pension?</p>
            </div>
            <select
              id="options"
              className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
              value={receivingOASPensionAge}
              onChange={(e) =>
                dispatch(
                  updateField({
                    section: "oldAgeSecurity",
                    field: "receivingOASPensionAge",
                    value: e.target.value,
                  })
                )
              }
            >
              {OASAgeOptions.map((value) => (
                <option value={value}>{value}</option>
              ))}
            </select>
          </div>
        </>
      )}

      {livedInCanadaFor40Years === "No" && (
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
              value={yearsLivedInCanadaBetween18To65}
              onChange={(e) =>
                dispatch(
                  updateField({
                    section: "oldAgeSecurity",
                    field: "yearsLivedInCanadaBetween18To65",
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

      <div className="flex justify-end">
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
