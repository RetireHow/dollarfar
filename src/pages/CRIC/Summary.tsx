import { Icon } from "@iconify/react/dist/iconify.js";
import CRICTable from "./CRICTable";
import CRICResultCard from "./CRICResultCard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CRICBarChart from "./CRICBarChart";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { calculateCRI } from "../../redux/features/CRIC/CRICSlice";
import { previousStep } from "../../redux/features/stepperSlice/stepperSclie";

export default function Summary() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { currency } = useAppSelector(
    (state) => state.globalCurrency
  );
  const {
    annualRetirementIncomeGoal,
    currentAnnualIncome,
    dobMonth,
    dobYear,
    gender,
    lifeExpectency,
    oas,
    oasStartYear,
    ppAnnualAmount,
    ppStartYear,
    selectedPP,
    yearsInCanada,
    isFortyYears
  } = useAppSelector((state) => state.CRICalculator);

  useEffect(() => {
    dispatch(calculateCRI());
  }, []);

    const handleBack = () => {
      dispatch(previousStep());
      navigate(-1);
    };

  return (
    <>
      <main className="border-[1px] border-[#EAECF0] rounded-[10px] md:p-[2.5rem] p-[1rem] mb-[5rem]">
        <section className="grid md:grid-cols-2 grid-cols-1 gap-10">
          <div className="space-y-[2rem] w-full">
            <h3 className="font-extrabold md:text-[2rem] text-[18px]">
              Summary
            </h3>

            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold md:text-[1.2rem] text-[1rem]">
                  General information
                </h3>
                <Icon
                  className="text-[2rem] font-bold"
                  icon="material-symbols:keyboard-arrow-up-rounded"
                />
              </div>
              <ul className="space-y-[1rem] md:text-[1rem] text-[14px]">
                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Date of Birth</p>
                  <p>
                    {dobMonth}, {dobYear}
                  </p>
                </li>
                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Current Age</p>
                  <p>{new Date().getFullYear() - dobYear}</p>
                </li>
                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Life Expectancy</p>
                  <p>{lifeExpectency}</p>
                </li>
                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Gender</p>
                  <p>{gender}</p>
                </li>
                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Annual Retirement Income Goal</p>
                  <p>
                    {currency}
                    {numberWithCommas(annualRetirementIncomeGoal)}
                  </p>
                </li>
                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Current Annual Income</p>
                  <p>
                    {currency}
                    {numberWithCommas(currentAnnualIncome)}
                  </p>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold md:text-[1.2rem] text-[1rem]">
                  {selectedPP}
                </h3>
                <Icon
                  className="text-[2rem] font-bold"
                  icon="material-symbols:keyboard-arrow-up-rounded"
                />
              </div>
              <ul className="space-y-[1rem] md:text-[1rem] text-[14px]">
                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Receiving at Age</p>
                  <p>{ppStartYear}</p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>{selectedPP} Annual</p>
                  <p>
                    {currency}
                    {numberWithCommas(ppAnnualAmount)}
                  </p>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold md:text-[1.2rem] text-[1rem]">
                  Old Age Security (OAS)
                </h3>
                <Icon
                  className="text-[2rem] font-bold"
                  icon="material-symbols:keyboard-arrow-up-rounded"
                />
              </div>

              <ul className="space-y-[1rem] md:text-[1rem] text-[14px]">
                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Receiving at Age</p>
                  <p>{oasStartYear}</p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>OAS Pension (Ages 75 and up)</p>
                  <p>
                    {currency}
                    {numberWithCommas(oas?.oldAgeSecurityAfter75)}
                  </p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>OAS Pension (Ages from {oasStartYear} to 74)</p>
                  <p>
                    {currency}
                    {numberWithCommas(oas?.oldAgeSecurityBefore75)}
                  </p>
                </li>

                <li className="flex md:gap-0 gap-5 justify-between items-center">
                  <p>Years lived in Canada</p>
                  <p>{Number(isFortyYears) ? 40 : yearsInCanada}</p>
                </li>
              </ul>
            </div>
          </div>
          <CRICResultCard />
        </section>

        <div className="flex justify-center gap-5 mt-[3rem]">
          <button
            onClick={handleBack}
            className="border-[1px] md:w-[200px] w-full  md:text-[1.25rem] text-[18px] border-gray-600 hover:bg-black hover:text-white duration-200 text-black rounded-[10px] px-[1.5rem] py-[10px]"
          >
            Back
          </button>
        </div>

        <CRICBarChart />

        <CRICTable />
      </main>
    </>
  );
}
