import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { nextStep } from "../../../redux/features/stepperSlice/stepperSclie";
import { updateField } from "../../../redux/features/CRIC/CRICSlice";

const monthlyRetirementPensionOptions = [
  0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170,
  180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320,
  330, 340, 350, 360, 370, 380, 390, 400, 410, 420, 430, 440, 450, 460, 470,
  480, 490, 500, 510, 520, 530, 540, 550, 560, 570, 580, 590, 600, 610, 620,
  630, 640, 650, 660, 670, 680, 690, 700, 710, 720, 730, 740, 750, 760, 770,
  780, 790, 800, 810, 820, 830, 840, 850, 860, 870, 880, 890, 900, 910, 920,
  930, 940, 950, 960, 970, 980, 990, 1000, 1010, 1020, 1030, 1040, 1050, 1060,
  1070, 1080, 1090, 1100, 1110, 1120, 1130, 1140, 1150, 1160, 1170, 1175,
];

const annualEmploymentEarningsOptions = [
  0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000,
  13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000, 21000, 22000, 23000,
  24000, 25000, 26000, 27000, 28000, 29000, 30000, 31000, 32000, 33000, 34000,
  35000, 36000, 37000, 38000, 39000, 40000, 41000, 42000, 43000, 44000, 45000,
  46000, 47000, 48000, 49000, 50000, 51000, 52000, 53000, 54000, 55000, 56000,
  57000, 58000, 59000, 60000, 61000, 62000, 63000, 64000, 65000, 66000, 67000,
  68000, 69000, 69500,
];

export default function CanadaPensionPlan() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNext = () => {
    dispatch(nextStep());
    navigate("/comprehensive-retirement-calculator/employer-pension");
  };

  const {
    pensionPlan,
    hasCPPStatement,
    useAverageCPPEstimate,
    plansToWorkAfterCPP,
    hasStatementOfParticipation,

    QPPBenefitRecivingAge,
    yearOfStatement,
    cppBenefitReceivingAge,
    employmentEarnings65to65,
    employmentIncomeReceiveEndAge,
    expectedEarnings18to64,
    expectedEarnings65to69,
    hasPlanToContributeToCPP,
    monthlyCPPAmountAtAge65,
    monthlyQPPAmountRecivingAtAge65,
    monthlyRetirementPension,
  } = useAppSelector((state) => state.CRICalculator.CPP);

  return (
    <section className="space-y-[2rem]">
      <h3 className="font-extrabold text-[2rem]">Canada Pension Plan</h3>

      <div>
        <div className="flex items-center gap-2 font-semibold mb-2">
          <p>
            Individuals who contribute to the Quebec Pension Plan (QPP) or the
            Canada Pension Plan (CPP) may be eligible to receive pension
            benefits at retirement. Which pension applies to you?
          </p>
        </div>
        <select
          id="options"
          className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
          value={pensionPlan}
          onChange={(e) =>
            dispatch(
              updateField({
                section: "CPP",
                field: "pensionPlan",
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
      </div>

      {/* ================|| Canada Pension Plan and Yes ||================= */}
      {pensionPlan === "Canada Pension Plan" && (
        <div>
          <div className="flex items-center gap-2 font-semibold mb-2">
            <p>
              Do you have a Canada Pension Plan (CPP) Statement of Contributions
              that states your retirement pension estimate based on your past
              contributions?*
            </p>
          </div>
          <select
            id="options"
            className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
            value={hasCPPStatement}
            onChange={(e) =>
              dispatch(
                updateField({
                  section: "CPP",
                  field: "hasCPPStatement",
                  value: e.target.value,
                })
              )
            }
          >
            <option value="Select One">Select One</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      )}

      {pensionPlan === "Canada Pension Plan" && hasCPPStatement === "Yes" && (
        <>
          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>Enter the year of your statement*</p>
            </div>
            <select
              id="options"
              className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
              value={yearOfStatement}
              onChange={(e) =>
                dispatch(
                  updateField({
                    section: "CPP",
                    field: "yearOfStatement",
                    value: e.target.value,
                  })
                )
              }
            >
              <option value="Select One">Select One</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>

          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>
                Enter your monthly retirement pension estimate (at age 65)
                indicated on your statement.
              </p>
            </div>
            <select
              id="options"
              className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
              value={monthlyRetirementPension}
              onChange={(e) =>
                dispatch(
                  updateField({
                    section: "CPP",
                    field: "monthlyRetirementPension",
                    value: e.target.value,
                  })
                )
              }
            >
              {monthlyRetirementPensionOptions.map((value) => (
                <option value={value}>{value}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>At what age do you plan to receive your CPP benefit?</p>
            </div>
            <select
              id="options"
              className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
              value={cppBenefitReceivingAge}
              onChange={(e) =>
                dispatch(
                  updateField({
                    section: "CPP",
                    field: "cppBenefitReceivingAge",
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
              <option value="63">63</option>
              <option value="65">65</option>
              <option value="66">66</option>
              <option value="67">67</option>
              <option value="68">68</option>
              <option value="69">69</option>
              <option value="70">70</option>
            </select>
          </div>

          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>Do you plan on working after you start receiving your CPP?</p>
            </div>
            <select
              id="options"
              className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
              value={plansToWorkAfterCPP}
              onChange={(e) =>
                dispatch(
                  updateField({
                    section: "CPP",
                    field: "plansToWorkAfterCPP",
                    value: e.target.value,
                  })
                )
              }
            >
              <option value="Select One">Select One</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {plansToWorkAfterCPP === "Yes" &&
            pensionPlan === "Canada Pension Plan" && (
              <>
                <div>
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <p>Until what age will you receive employment income?</p>
                  </div>
                  <select
                    id="options"
                    className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                    value={employmentIncomeReceiveEndAge}
                    onChange={(e) =>
                      dispatch(
                        updateField({
                          section: "CPP",
                          field: "employmentIncomeReceiveEndAge",
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
                </div>
                <div>
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <p>
                      On average, what will be your annual employment earnings
                      from age 65 to age 65?
                    </p>
                  </div>
                  <select
                    id="options"
                    className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                    value={employmentEarnings65to65}
                    onChange={(e) =>
                      dispatch(
                        updateField({
                          section: "CPP",
                          field: "employmentEarnings65to65",
                          value: e.target.value,
                        })
                      )
                    }
                  >
                    {annualEmploymentEarningsOptions.map((value) => (
                      <option value={value}>{value}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <p>
                      Would you like to contribute to the CPP Post Retirement
                      Benefit when you reach age 65?
                    </p>
                  </div>
                  <select
                    id="options"
                    className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                    value={hasPlanToContributeToCPP}
                    onChange={(e) =>
                      dispatch(
                        updateField({
                          section: "CPP",
                          field: "hasPlanToContributeToCPP",
                          value: e.target.value,
                        })
                      )
                    }
                  >
                    <option value="Select One">Select One</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </>
            )}
        </>
      )}

      {hasCPPStatement === "No" && pensionPlan === "Canada Pension Plan" && (
        <>
          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <p>
                The average monthly amount for a new CPP retirement pension
                (taken at age 65) is approximately $717 per month ($8,604 per
                year). Would you like to use this as your estimate?
              </p>
            </div>
            <select
              id="options"
              className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
              value={useAverageCPPEstimate}
              onChange={(e) =>
                dispatch(
                  updateField({
                    section: "CPP",
                    field: "useAverageCPPEstimate",
                    value: e.target.value,
                  })
                )
              }
            >
              <option value="Select One">Select One</option>
              <option value="Yes">Yes</option>
              <option value="No-Estimate based on my expected earnings">
                No-Estimate based on my expected earnings
              </option>
              <option value="No-Let me select a different value">
                No-Let me select a different value
              </option>
            </select>
          </div>

          {useAverageCPPEstimate === "Yes" &&
            pensionPlan === "Canada Pension Plan" && (
              <>
                <div>
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <p>At what age do you plan to receive your CPP benefit?</p>
                  </div>
                  <select
                    id="options"
                    className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                    value={cppBenefitReceivingAge}
                    onChange={(e) =>
                      dispatch(
                        updateField({
                          section: "CPP",
                          field: "cppBenefitReceivingAge",
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
                </div>

                <div>
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <p>
                      Do you plan on working after you start receiving your CPP?
                    </p>
                  </div>
                  <select
                    id="options"
                    className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                    value={plansToWorkAfterCPP}
                    onChange={(e) =>
                      dispatch(
                        updateField({
                          section: "CPP",
                          field: "plansToWorkAfterCPP",
                          value: e.target.value,
                        })
                      )
                    }
                  >
                    <option value="Select One">Select One</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </>
            )}

          {useAverageCPPEstimate ===
            "No-Estimate based on my expected earnings" &&
            pensionPlan === "Canada Pension Plan" && (
              <>
                <div>
                  <div className="font-semibold mb-2">
                    <p>
                      On average, what were and what will be your estimated
                      average annual earnings?
                    </p>
                  </div>

                  <div className="flex gap-5">
                    <div>
                      <p className="text-[14px] font-bold">Age: 18 to 64</p>
                      <input
                        className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[5px] border-[#838383]"
                        type="number"
                        placeholder="$0"
                        onWheel={(e) => e.currentTarget.blur()}
                        value={expectedEarnings18to64}
                        onChange={(e) =>
                          dispatch(
                            updateField({
                              section: "CPP",
                              field: "expectedEarnings18to64",
                              value: e.target.value,
                            })
                          )
                        }
                      />
                    </div>
                    <div>
                      <p className="text-[14px] font-bold">Age: 65 to 69</p>
                      <input
                        className="outline-none border-[1px] px-[12px] py-2 w-full duration-300 rounded-[5px] border-[#838383]"
                        type="number"
                        placeholder="$0"
                        onWheel={(e) => e.currentTarget.blur()}
                        value={expectedEarnings65to69}
                        onChange={(e) =>
                          dispatch(
                            updateField({
                              section: "CPP",
                              field: "expectedEarnings65to69",
                              value: e.target.value,
                            })
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

          {useAverageCPPEstimate === "No-Let me select a different value" &&
            pensionPlan === "Canada Pension Plan" && (
              <>
                <div>
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <p>
                      Please select the monthly amount of CPP you expect to
                      receive at age 65.
                    </p>
                  </div>
                  <select
                    id="options"
                    className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                    value={monthlyCPPAmountAtAge65}
                    onChange={(e) =>
                      dispatch(
                        updateField({
                          section: "CPP",
                          field: "monthlyCPPAmountAtAge65",
                          value: e.target.value,
                        })
                      )
                    }
                  >
                    {monthlyRetirementPensionOptions.map((value) => (
                      <option value={value}>{value}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
        </>
      )}

      {hasCPPStatement === "No" &&
        pensionPlan === "Canada Pension Plan" &&
        plansToWorkAfterCPP === "Yes" && (
          <>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>Until what age will you receive employment income?</p>
              </div>
              <select
                id="options"
                className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                value={employmentIncomeReceiveEndAge}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      section: "CPP",
                      field: "employmentIncomeReceiveEndAge",
                      value: e.target.value,
                    })
                  )
                }
              >
                <option value="65">65</option>
                <option value="66">66</option>
                <option value="67">67</option>
                <option value="68">68</option>
                <option value="69">69</option>
                <option value="70">70</option>
              </select>
            </div>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>
                  On average, what will be your annual employment earnings from
                  age 65 to age 65?
                </p>
              </div>
              <select
                id="options"
                className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                value={employmentEarnings65to65}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      section: "CPP",
                      field: "employmentEarnings65to65",
                      value: e.target.value,
                    })
                  )
                }
              >
                {annualEmploymentEarningsOptions.map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </select>
            </div>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>
                  Would you like to contribute to the CPP Post Retirement
                  Benefit when you reach age 65?
                </p>
              </div>
              <select
                id="options"
                className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                value={hasPlanToContributeToCPP}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      section: "CPP",
                      field: "hasPlanToContributeToCPP",
                      value: e.target.value,
                    })
                  )
                }
              >
                <option value="Select One">Select One</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </>
        )}

      {/* ================|| Quebec Pension Plan and Yes ||================= */}
      {pensionPlan === "Quebec Pension Plan" && (
        <div>
          <div className="flex items-center gap-2 font-semibold mb-2">
            <p>
              Do you have a Statement of Participation that states your
              retirement pension estimate based on your past contributions?
            </p>
          </div>
          <select
            id="options"
            className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
            value={hasStatementOfParticipation}
            onChange={(e) =>
              dispatch(
                updateField({
                  section: "CPP",
                  field: "hasStatementOfParticipation",
                  value: e.target.value,
                })
              )
            }
          >
            <option value="Select One">Select One</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      )}

      {pensionPlan === "Quebec Pension Plan" &&
        hasStatementOfParticipation === "Yes" && (
          <>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>Enter the year of your statement</p>
              </div>

              <select
                id="options"
                className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                value={yearOfStatement}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      section: "CPP",
                      field: "yearOfStatement",
                      value: e.target.value,
                    })
                  )
                }
              >
                <option value="Select One">Select One</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>
                  Enter your monthly retirement pension estimate (at age 65)
                  indicated on your statement.
                </p>
              </div>
              <select
                id="options"
                className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                value={monthlyRetirementPension}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      section: "CPP",
                      field: "monthlyRetirementPension",
                      value: e.target.value,
                    })
                  )
                }
              >
                {monthlyRetirementPensionOptions.map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </select>
            </div>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>At what age do you plan to receive your QPP benefit?</p>
              </div>
              <select
                id="options"
                className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                value={QPPBenefitRecivingAge}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      section: "CPP",
                      field: "QPPBenefitRecivingAge",
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
            </div>
          </>
        )}

      {pensionPlan === "Quebec Pension Plan" &&
        hasStatementOfParticipation === "No" && (
          <>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>
                  Please select the monthly amount of QPP you expect to receive
                  at age 65.
                </p>
              </div>
              <select
                id="options"
                className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                value={monthlyQPPAmountRecivingAtAge65}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      section: "CPP",
                      field: "monthlyQPPAmountRecivingAtAge65",
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
            </div>

            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>At what age do you plan to receive your QPP benefit?</p>
              </div>
              <select
                id="options"
                className="w-full border-[1px] border-gray-400 rounded-[5px] p-[0.6rem] outline-none"
                value={QPPBenefitRecivingAge}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      section: "CPP",
                      field: "QPPBenefitRecivingAge",
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
