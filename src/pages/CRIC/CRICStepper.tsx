import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toast } from "react-toastify";
import {
  calculateEmployerPension,
  calculateOASBenefit,
  calculateOtherIncome,
  calculatePPBenefit,
  calculateRetirementSavings,
  resetNRAWithSelectedNo,
  resetTFSAWithSelectedNo,
  updateAgeByAgeField,
} from "../../redux/features/CRIC/CRICSlice";

export default function CRICStepper({
  steps,
}: {
  steps: { title: string; link: string; step: number }[];
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    annualRetirementIncomeGoal,
    currentAnnualIncome,
    dobMonth,
    dobYear,
    lifeExpectency,
  } = useAppSelector((state) => state.CRICalculator.generalInfo);

  const {
    otherIncome: {
      hasOtherIncome,
      otherIncomeAmount,
      otherIncomeFrequency,
      otherIncomeStartReceivingAge,
      otherIncomeStopReceivingAge,
      otherIncomeType,
    },
    calculatedResult: {
      otherIncomeResult: { addedOtherIncomesList },
      employerPensionResult: { addedEmployerPensionsList },
    },
  } = useAppSelector((state) => state.CRICalculator);

  const { selectedPP, ppStartYear, monthlyRetirementPensionEstimate } =
    useAppSelector((state) => state.CRICalculator.pensionPlan);

  const {
    employerPension: {
      annualPension,
      hasEmployerPension,
      pensionPlanType,
      pensionReceivingAge,
    },
  } = useAppSelector((state) => state.CRICalculator);
  const {
    retirementSavings: {
      TFSA: {
        TFSAOngoingContributionAmount,
        TFSAOngoingContributionFrequency,
        TFSAcurrentTotal,
        TFSAreturnRate,
        hasTFSA,
      },
      NRA: {
        NRAOngoingContributionAmount,
        NRAOngoingContributionFrequency,
        NRAcurrentTotal,
        NRAreturnRate,
        NRAtaxRate,
        hasNRA,
      },
      TFSAorNRASavingsReceivingAge,
    },
  } = useAppSelector((state) => state.CRICalculator);
  const {
    OASPensionReceivingAge,
    numberOYearsLivedInCanada,
    willLiveInCanadaAtleast40Years,
    willLiveInCanadaUntil65,
  } = useAppSelector((state) => state.CRICalculator.oldAgeSecurity);

  const handleJumpToStep = (step: {
    step: number;
    title: string;
    link: string;
  }) => {
    // ================|| Start General Info ||====================
    if (location?.pathname == "/CRIC") {
      if (
        dobMonth == "Select One" ||
        dobYear == "Select One" ||
        annualRetirementIncomeGoal == "Select One" ||
        currentAnnualIncome == "Select One" ||
        !lifeExpectency ||
        Number(lifeExpectency) < 65
      ) {
        return toast.error("Please fill in the required fields.");
      }
    }
    // ================|| End General Info ||====================

    // ================|| Start Other Income ||====================
    if (location?.pathname == "/CRIC/other-income") {
      if (hasOtherIncome == "Yes" && addedOtherIncomesList.length == 0) {
        if (
          otherIncomeAmount == "Select One" ||
          otherIncomeFrequency == "Select One" ||
          otherIncomeStartReceivingAge == "Select One" ||
          otherIncomeStopReceivingAge == "Select One" ||
          otherIncomeType == "Select One"
        ) {
          return toast.error("Please fill in the required fields.");
        }
      } else if (hasOtherIncome == "Yes" && addedOtherIncomesList.length > 0) {
        if (otherIncomeType !== "Select One") {
          if (
            otherIncomeAmount == "Select One" ||
            otherIncomeFrequency == "Select One" ||
            otherIncomeStartReceivingAge == "Select One" ||
            otherIncomeStopReceivingAge == "Select One"
          ) {
            return toast.error("Please fill in the required fields.");
          }
        }
      }
      dispatch(calculateOtherIncome(undefined));
    }
    // ================|| End Other Income ||======================

    // ================|| Start Canada Pension Plan ||====================
    if (location?.pathname == "/CRIC/PP") {
      if (selectedPP !== "Not Applicable") {
        if (
          ppStartYear == "Select One" ||
          monthlyRetirementPensionEstimate == "Select One"
        ) {
          return toast.error("Please fill in the required fields.");
        }
        dispatch(calculatePPBenefit(undefined));
      }
      if (selectedPP == "Not Applicable") {
        dispatch(
          updateAgeByAgeField({
            mainKey: "PPResult",
            subKey: "PPBenefitsAgeByAge",
          })
        );
      }
    }
    // ================|| End Canada Pension Plan ||====================

    // ================|| Start Employer Pension ||====================
    if (location?.pathname == "/CRIC/employer-pension") {
      if (
        hasEmployerPension == "Yes" &&
        addedEmployerPensionsList.length == 0
      ) {
        if (
          pensionPlanType == "Select One" ||
          pensionReceivingAge == "Select One" ||
          !annualPension.trim()
        ) {
          return toast.error("Please fill in the required fields.");
        }
      } else if (
        hasEmployerPension == "Yes" &&
        addedEmployerPensionsList.length > 0
      ) {
        if (pensionPlanType !== "Select One") {
          if (!annualPension.trim() || pensionReceivingAge == "Select One") {
            return toast.error("Please fill in the required fields.");
          }
        }
      }
    }
    // ================|| End Employer Pension ||====================

    // ================|| Start Accumulated Savings ||====================
    if (location?.pathname == "/CRIC/retirement-savings") {
      if (hasTFSA == "No") {
        dispatch(resetTFSAWithSelectedNo(undefined));
      }
      if (hasNRA == "No") {
        dispatch(resetNRAWithSelectedNo(undefined));
      }

      if (hasTFSA == "Yes" && hasNRA == "Yes") {
        if (
          !TFSAOngoingContributionAmount ||
          TFSAOngoingContributionFrequency == "Select One" ||
          !TFSAcurrentTotal ||
          !TFSAreturnRate ||
          TFSAorNRASavingsReceivingAge == "Select One" ||
          !NRAOngoingContributionAmount ||
          NRAOngoingContributionFrequency == "Select One" ||
          !NRAcurrentTotal ||
          !NRAreturnRate ||
          !NRAtaxRate ||
          TFSAorNRASavingsReceivingAge == "Select One"
        ) {
          return toast.error("Please fill in the required fields.");
        }
        dispatch(calculateRetirementSavings(undefined));
      } else if (hasTFSA == "Yes") {
        if (
          !TFSAOngoingContributionAmount ||
          TFSAOngoingContributionFrequency == "Select One" ||
          !TFSAcurrentTotal ||
          !TFSAreturnRate ||
          TFSAorNRASavingsReceivingAge == "Select One"
        ) {
          return toast.error("Please fill in the required fields.");
        }
        dispatch(calculateRetirementSavings(undefined));
      } else if (hasNRA == "Yes") {
        if (
          !NRAOngoingContributionAmount ||
          NRAOngoingContributionFrequency == "Select One" ||
          !NRAcurrentTotal ||
          !NRAreturnRate ||
          !NRAtaxRate ||
          TFSAorNRASavingsReceivingAge == "Select One"
        ) {
          return toast.error("Please fill in the required fields.");
        }
        dispatch(calculateRetirementSavings(undefined));
      } else {
        dispatch(
          updateAgeByAgeField({
            mainKey: "retirementSavingsResult",
            subKey: "retirementSavingsAgeByAge",
          })
        );
        dispatch(resetTFSAWithSelectedNo(undefined));
        dispatch(resetNRAWithSelectedNo(undefined));
      }

      if (
        TFSAOngoingContributionFrequency == "0" &&
        Number(TFSAOngoingContributionAmount) > 0
      ) {
        return toast.error(
          "Please select ongoing contribution frequency for TFSA"
        );
      }

      if (
        NRAOngoingContributionFrequency == "0" &&
        Number(NRAOngoingContributionAmount) > 0
      ) {
        return toast.error(
          "Please select ongoing contribution frequency for non registered account(s)."
        );
      }
      dispatch(calculateEmployerPension(undefined));
    }
    // ================|| End Accumulated Savings ||====================

    // ================|| Start OAS ||====================
    if (location?.pathname == "/CRIC/OAS") {
      if (willLiveInCanadaAtleast40Years == "No") {
        if (numberOYearsLivedInCanada == "Select One") {
          return toast.error("Please fill in the required fields.");
        }
      }

      if (
        OASPensionReceivingAge == "Select One" ||
        willLiveInCanadaAtleast40Years == "Select One" ||
        willLiveInCanadaUntil65 == "Select One"
      ) {
        return toast.error("Please fill in the required fields.");
      }

      if (
        OASPensionReceivingAge !== "Select One" &&
        willLiveInCanadaAtleast40Years !== "Select One" &&
        willLiveInCanadaUntil65 !== "Select One"
      ) {
        if (Number(numberOYearsLivedInCanada) < 10) {
          dispatch(
            updateAgeByAgeField({
              mainKey: "OASResult",
              subKey: "OASAmountsAgeByAge",
            })
          );
        } else {
          dispatch(calculateOASBenefit(undefined));
        }
      }
    }
    // ================|| End OAS ||====================
    navigate(step.link);
  };

  return (
    <main className="mb-[2rem]">
      <section>
        <div className="grid lg:grid-cols-7 md:grid-cols-3 grid-cols-2 ">
          {steps.map((step, index) => (
            <p
              key={index}
              onClick={() => handleJumpToStep(step)}
              className={`border-[1px] border-gray-500 p-1 cursor-pointer flex justify-center items-center text-center hover:bg-black hover:text-white duration-300 font-bold ${
                location?.pathname == step.link ? "bg-gray-800 text-white" : ""
              }`}
            >
              {step.title}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
