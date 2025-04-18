/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { assets } from "../../assets/assets";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { getValue } from "../../utils/getValue";
import { getFrequencyTitle } from "../../utils/getFrequencyTitle";
import { calculateTotalFields } from "../../utils/calculateTotalFields";
import { isNegative } from "../../utils/isNegative";
import {
  TCalculatedResult,
  TEmployerPension,
  TFinalResult,
  TGeneralInfo,
  TOldAgeSecurity,
  TOtherIncome,
  TPensionPlan,
  TRetirementSavings,
} from "../../redux/features/CRIC/CRIC.types";

// Define styles for the PDF
const styles = StyleSheet.create({
  section: {
    fontSize: 14,
    fontWeight: "extrabold",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    border: "1px solid #EAECF0",
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: 12,
  },
  section2: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    fontSize: 14,
    marginBottom: 5,
  },
  watermark: {
    position: "absolute",
    top: "55%",
    left: "35%",
    transform: "translate(-50%, -50%) rotate(-20deg)",
    fontSize: 50,
    color: "rgba(220, 220, 220, 0.2)",
    fontWeight: "bold",
    opacity: 0.5,
  },

  // Table
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#D1D5DB",
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#1F2937", // Tailwind's gray-800
    color: "white",
    fontWeight: "bold",
  },
  cell: {
    padding: 6,
    textAlign: "center",
    borderRightWidth: 1,
    borderColor: "#D1D5DB",
    flexGrow: 1,
    flexBasis: 0,
    flexShrink: 1, // allow shrinking
    flexWrap: "wrap", // this is actually handled by <Text>, not <View>
  },
  lastCell: {
    borderRightWidth: 0,
  },
  redText: {
    color: "red",
    fontWeight: "bold",
  },
  greenText: {
    color: "green",
  },
});

type TData = {
  generalInfo: TGeneralInfo;
  pensionPlan: TPensionPlan;
  oldAgeSecurity: TOldAgeSecurity;
  employerPension: TEmployerPension;
  retirementSavings: TRetirementSavings;
  otherIncome: TOtherIncome;
  calculatedResult: TCalculatedResult;
  finalResult: TFinalResult[];

  name?: string;
  email?: string;
  base64: string;
};

// Define a new PDF document component
export const CRICPdf = ({ data }: { data: TData }) => {
  const {
    name,
    email,
    generalInfo,
    pensionPlan,
    retirementSavings: { TFSA, NRA, TFSAorNRASavingsReceivingAge },

    employerPension,
    otherIncome,

    oldAgeSecurity,
    calculatedResult,
    finalResult,
    base64,
  } = data || {};

  const {
    employerPensionResult: { addedEmployerPensionsList, description },
    otherIncomeResult: { addedOtherIncomesList, summaryText },
  } = calculatedResult || {};

  const retirementDifference =
    (finalResult[0] &&
      calculateTotalFields(finalResult[0]) -
        Number(generalInfo.annualRetirementIncomeGoal)) ||
    0;

  return (
    <Document>
      <Page style={{ position: "relative" }}>
        <View style={{ padding: 20 }}>
          {/* Header  */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 12,
              marginBottom: 10,
            }}
          >
            <Image
              style={{ width: 80, height: 80 }}
              src={assets.dollarfarPngLogo}
            />
            {(name || email) && (
              <View>
                <Text style={{ fontWeight: "bold" }}>Created By:</Text>
                <View
                  style={{ flexDirection: "row", gap: 40, margin: "10px 0" }}
                >
                  <Text style={{ color: "#696969" }}>Name</Text>
                  <Text>{name || "NA"}</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 40 }}>
                  <Text style={{ color: "#696969" }}>Email</Text>
                  <Text>{email || "NA"}</Text>
                </View>
              </View>
            )}
          </View>

          {/* Title  */}
          <View style={styles.section}>
            <Text>Comprehensive Retirement Income Calculator</Text>
            <Text style={styles.title}></Text>
          </View>

          {/* Card Container  */}
          <View style={styles.section2}>
            <View
              style={{
                border: "1px solid #EAECF0",
                width: "100%",
                padding: 16,
                borderRadius: 5,
                backgroundColor: "#F8F8F8",
                flexDirection: "row",
                gap: 5,
                fontSize: 10,
              }}
            >
              {/* =======================|| Right Side ||==========================  */}
              <View>
                {/* Step-1  */}
                <View
                  style={{ flexDirection: "column", gap: 5, marginBottom: 15 }}
                >
                  <View
                    style={{
                      color: "#000",
                      fontWeight: "bold",
                      fontSize: "12px",
                    }}
                  >
                    <Text>General information</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>Date of Birth</Text>
                    <Text>
                      {getValue(generalInfo.dobMonth)},{" "}
                      {getValue(generalInfo.dobYear)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>Current Age</Text>
                    <Text>
                      {generalInfo.dobYear !== "Select One"
                        ? new Date().getFullYear() -
                          Number(getValue(generalInfo.dobYear))
                        : 0}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>Life Expectancy</Text>
                    <Text>{getValue(generalInfo.lifeExpectency)}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>Gender</Text>
                    <Text>{getValue(generalInfo.gender)}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 20,
                    }}
                  >
                    <Text style={{ color: "#696969" }}>
                      Annual Retirement Income Goal
                    </Text>
                    <Text>
                      {getValue(generalInfo.annualRetirementIncomeGoal) !==
                      "N/A"
                        ? numberWithCommas(
                            Number(generalInfo.annualRetirementIncomeGoal)
                          )
                        : 0}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>
                      Current Annual Income
                    </Text>
                    <Text>
                      {getValue(generalInfo.currentAnnualIncome) !== "N/A"
                        ? numberWithCommas(
                            Number(generalInfo.currentAnnualIncome)
                          )
                        : 0}
                    </Text>
                  </View>
                </View>
                {/* Step-2  */}
                {pensionPlan.selectedPP !== "Not Applicable" && (
                  <View
                    style={{
                      flexDirection: "column",
                      gap: 10,
                      marginBottom: 15,
                    }}
                  >
                    <View
                      style={{
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      <Text>{pensionPlan.selectedPP}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ color: "#696969" }}>
                        Start Receiving Age
                      </Text>
                      <Text>{getValue(pensionPlan.ppStartYear)}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ color: "#696969" }}>
                        Monthly Pension Estimate
                      </Text>
                      <Text>
                        {Number(
                          getValue(pensionPlan.monthlyRetirementPensionEstimate)
                        )
                          ? numberWithCommas(
                              Number(
                                getValue(
                                  pensionPlan.monthlyRetirementPensionEstimate
                                )
                              )
                            )
                          : getValue(
                              pensionPlan.monthlyRetirementPensionEstimate
                            )}
                      </Text>
                    </View>
                  </View>
                )}
                {/* Step-3  */}
                {(TFSA.hasTFSA == "Yes" || NRA.hasNRA == "Yes") && (
                  <View
                    style={{
                      flexDirection: "column",
                      gap: 10,
                      marginBottom: 15,
                    }}
                  >
                    {/* Retirement Savings  */}
                    <View
                      style={{
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      <Text>Accumulated Savings</Text>
                    </View>

                    {/* Account : TFSA  */}
                    {TFSA.hasTFSA == "Yes" && (
                      <View
                        style={{
                          flexDirection: "column",
                          gap: 10,
                        }}
                      >
                        <View>
                          <Text
                            style={{
                              fontWeight: "extrabold",
                              fontSize: "10px",
                              paddingBottom: 4,
                              borderBottom: "1px solid gray",
                            }}
                          >
                            Tax Free Savings Account
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ color: "#696969" }}>
                            Current Total Value
                          </Text>
                          <Text>
                            {Number(getValue(TFSA.TFSAcurrentTotal))
                              ? numberWithCommas(
                                  Number(getValue(TFSA.TFSAcurrentTotal))
                                )
                              : getValue(TFSA.TFSAcurrentTotal)}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: 10,
                          }}
                        >
                          <Text style={{ color: "#696969" }}>
                            Ongoing Contribution Frequency
                          </Text>
                          <Text>
                            {getFrequencyTitle(
                              TFSA.TFSAOngoingContributionFrequency
                            )}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ color: "#696969" }}>
                            Ongoing Contribution Amount
                          </Text>
                          <Text>
                            {Number(
                              getValue(TFSA.TFSAOngoingContributionAmount)
                            )
                              ? numberWithCommas(
                                  Number(
                                    getValue(TFSA.TFSAOngoingContributionAmount)
                                  )
                                )
                              : getValue(TFSA.TFSAOngoingContributionAmount)}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ color: "#696969" }}>
                            Rate of Return
                          </Text>
                          <Text>{getValue(TFSA.TFSAreturnRate)}%</Text>
                        </View>
                      </View>
                    )}

                    {/* Account : Non Register  */}
                    {NRA.hasNRA == "Yes" && (
                      <View
                        style={{
                          flexDirection: "column",
                          gap: 10,
                          marginTop: 10,
                        }}
                      >
                        <View>
                          <Text
                            style={{
                              fontWeight: "extrabold",
                              fontSize: "10px",
                              paddingBottom: 4,
                              borderBottom: "1px solid gray",
                            }}
                          >
                            Non Register Account
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ color: "#696969" }}>
                            Current Total Value
                          </Text>
                          <Text>
                            {Number(getValue(NRA.NRAcurrentTotal))
                              ? numberWithCommas(
                                  Number(getValue(NRA.NRAcurrentTotal))
                                )
                              : getValue(NRA.NRAcurrentTotal)}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: 10,
                          }}
                        >
                          <Text style={{ color: "#696969" }}>
                            Ongoing Contribution Frequency
                          </Text>
                          <Text>
                            {getFrequencyTitle(
                              NRA.NRAOngoingContributionFrequency
                            )}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ color: "#696969" }}>
                            Ongoing Contribution Amount
                          </Text>
                          <Text>
                            {Number(getValue(NRA.NRAOngoingContributionAmount))
                              ? numberWithCommas(
                                  Number(
                                    getValue(NRA.NRAOngoingContributionAmount)
                                  )
                                )
                              : getValue(NRA.NRAOngoingContributionAmount)}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ color: "#696969" }}>
                            Rate of Return
                          </Text>
                          <Text>{getValue(NRA.NRAreturnRate)}%</Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ color: "#696969" }}>Tax Rate</Text>
                          <Text>{getValue(NRA.NRAtaxRate)}%</Text>
                        </View>
                      </View>
                    )}
                  </View>
                )}
                {/* Step- 4 */}
                <View
                  style={{
                    flexDirection: "column",
                    gap: 5,
                  }}
                >
                  <View
                    style={{
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    <Text style={{ fontSize: "12px" }}>
                      Old Age Security (OAS)
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>Receiving at Age</Text>
                    <Text>
                      {getValue(oldAgeSecurity.OASPensionReceivingAge)}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 20,
                    }}
                  >
                    <Text style={{ color: "#696969" }}>
                      OAS Pension (Ages from{" "}
                      {oldAgeSecurity.OASPensionReceivingAge} to 74)
                    </Text>
                    <Text>
                      {calculatedResult.OASResult.OASBenefitAmount
                        .oldAgeSecurityAfter75
                        ? numberWithCommas(
                            Math.round(
                              calculatedResult.OASResult.OASBenefitAmount
                                .oldAgeSecurityBefore75
                            )
                          )
                        : "N/A"}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 20,
                    }}
                  >
                    <Text style={{ color: "#696969" }}>
                      OAS Pension (Ages 75 and up)
                    </Text>
                    <Text>
                      {calculatedResult.OASResult.OASBenefitAmount
                        .oldAgeSecurityAfter75
                        ? numberWithCommas(
                            Math.round(
                              calculatedResult.OASResult.OASBenefitAmount
                                .oldAgeSecurityAfter75
                            )
                          )
                        : "N/A"}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#696969" }}>
                      Years lived in Canada
                    </Text>
                    <Text>
                      {oldAgeSecurity.willLiveInCanadaAtleast40Years == "Yes"
                        ? 40
                        : getValue(oldAgeSecurity.numberOYearsLivedInCanada)}
                    </Text>
                  </View>
                </View>
              </View>

              <Text
                style={{
                  backgroundColor: "#0000004D",
                  width: "1px",
                  height: "100%",
                  marginLeft: 10,
                  marginRight: 10,
                }}
              ></Text>

              {/* =======================|| Right Side ||==========================  */}
              {/* Step-1  */}
              <View>
                {/* =========================== || Stpe 4 =================== */}
                {/* Step-2  */}
                {employerPension.hasEmployerPension == "Yes" && (
                  <View
                    style={{
                      flexDirection: "column",
                      gap: 5,
                      marginBottom: 15,
                    }}
                  >
                    <View
                      style={{
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      <Text>Employer Pension</Text>
                    </View>

                    {addedEmployerPensionsList?.map((item) => {
                      return (
                        <View
                          style={{
                            flexDirection: "column",
                            gap: 5,
                            border: "1px solid #D1D5DB",
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              gap: 5,
                            }}
                          >
                            <Text style={{ color: "#696969" }}>
                              Pension Plan Type
                            </Text>
                            <Text>{getValue(item.pensionPlanType)}</Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ color: "#696969" }}>
                              Estimated Annual Pension
                            </Text>
                            <Text>
                              {Number(getValue(item.annualPension))
                                ? numberWithCommas(Number(item.annualPension))
                                : getValue(item.annualPension)}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ color: "#696969" }}>
                              Age to Receive Pension
                            </Text>
                            <Text>{getValue(item.pensionReceivingAge)}</Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ color: "#696969" }}>
                              Is Pension Indexed to Inflation?
                            </Text>
                            <Text>{getValue(item.isIndexedToInflation)}</Text>
                          </View>
                          {item.isIndexedToInflation == "No" && (
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text style={{ color: "#696969" }}>
                                Inflation Rate
                              </Text>
                              <Text>{getValue(item.inflationRate)}%</Text>
                            </View>
                          )}
                        </View>
                      );
                    })}

                    {/* Account with only Fields  */}
                    {employerPension.hasEmployerPension == "Yes" &&
                      employerPension.pensionPlanType !== "Select One" && (
                        <View
                          style={{
                            flexDirection: "column",
                            gap: 5,
                            border: "1px solid #D1D5DB",
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              gap: 5,
                            }}
                          >
                            <Text style={{ color: "#696969" }}>
                              Pension Plan Type
                            </Text>
                            <Text>
                              {getValue(employerPension.pensionPlanType)}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ color: "#696969" }}>
                              Estimated Annual Pension
                            </Text>
                            <Text>
                              {Number(getValue(employerPension.annualPension))
                                ? numberWithCommas(
                                    Number(employerPension.annualPension)
                                  )
                                : getValue(employerPension.annualPension)}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ color: "#696969" }}>
                              Age to Receive Pension
                            </Text>
                            <Text>
                              {getValue(employerPension.pensionReceivingAge)}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ color: "#696969" }}>
                              Is Pension Indexed to Inflation?
                            </Text>
                            <Text>
                              {getValue(employerPension.isIndexedToInflation)}
                            </Text>
                          </View>
                          {employerPension.isIndexedToInflation == "No" && (
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text style={{ color: "#696969" }}>
                                Inflation Rate
                              </Text>
                              <Text>
                                {getValue(employerPension.inflationRate)}%
                              </Text>
                            </View>
                          )}
                        </View>
                      )}
                  </View>
                )}

                {/* Step-3  */}
                {otherIncome.hasOtherIncome == "Yes" && (
                  <View
                    style={{
                      flexDirection: "column",
                      gap: 5,
                      marginBottom: 15,
                    }}
                  >
                    <View
                      style={{
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      <Text>Other Income</Text>
                    </View>
                    {addedOtherIncomesList.map((item) => {
                      return (
                        <View
                          style={{
                            flexDirection: "column",
                            gap: 5,
                            border: "1px solid #D1D5DB",
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ color: "#696969" }}>
                              Income Type
                            </Text>
                            <Text>{getValue(item.otherIncomeType)}</Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ color: "#696969" }}>
                              Estimated Income Frequency
                            </Text>
                            <Text>
                              {getFrequencyTitle(item.otherIncomeFrequency)}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ color: "#696969" }}>
                              Estimated Income
                            </Text>
                            <Text>
                              {Number(getValue(item.otherIncomeAmount))
                                ? numberWithCommas(
                                    Number(item.otherIncomeAmount)
                                  )
                                : getValue(item.otherIncomeAmount)}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ color: "#696969" }}>
                              Start Receiving Age
                            </Text>
                            <Text>
                              {getValue(item.otherIncomeStartReceivingAge)}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ color: "#696969" }}>
                              Stop Receiving Age
                            </Text>
                            <Text>
                              {getValue(item.otherIncomeStopReceivingAge)}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                    {/* Account with only Fields  */}
                    {otherIncome.otherIncomeType !== "Select One" &&
                      otherIncome.hasOtherIncome == "Yes" && (
                        <View
                          style={{
                            flexDirection: "column",
                            gap: 5,
                            border: "1px solid #D1D5DB",
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ color: "#696969" }}>
                              Income Type
                            </Text>
                            <Text>{getValue(otherIncome.otherIncomeType)}</Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ color: "#696969" }}>
                              Estimated Income Frequency
                            </Text>
                            <Text>
                              {getFrequencyTitle(
                                otherIncome.otherIncomeFrequency
                              )}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ color: "#696969" }}>
                              Estimated Income
                            </Text>
                            <Text>
                              {Number(getValue(otherIncome.otherIncomeAmount))
                                ? numberWithCommas(
                                    Number(otherIncome.otherIncomeAmount)
                                  )
                                : getValue(otherIncome.otherIncomeAmount)}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ color: "#696969" }}>
                              Start Receiving Age
                            </Text>
                            <Text>
                              {getValue(
                                otherIncome.otherIncomeStartReceivingAge
                              )}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ color: "#696969" }}>
                              Stop Receiving Age
                            </Text>
                            <Text>
                              {getValue(
                                otherIncome.otherIncomeStopReceivingAge
                              )}
                            </Text>
                          </View>
                        </View>
                      )}
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* Watermark */}
        <Text style={styles.watermark}>Dollarfar.com</Text>
      </Page>

      {/* page 2  */}
      <Page style={{ position: "relative" }}>
        {/* ================Totals Card================  */}
        <View
          style={{
            marginLeft: 30,
            marginRight: 30,
            marginTop: 30,
            marginBottom: 15,
          }}
        >
          <View
            style={{
              border: "1px solid #EAECF0",
              width: "100%",
              borderRadius: 5,
              backgroundColor: "#F8F8F8",
              flexDirection: "column",
              gap: 16,
              fontSize: 12,
              padding: 16,
            }}
          >
            <View style={{ fontWeight: "bold", color: "#000" }}>
              <Text style={{ fontSize: "12px" }}>Totals</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "#696969" }}>
                Annual Retirement Income Goal
              </Text>
              <Text>
                {generalInfo.annualRetirementIncomeGoal !== "Select One"
                  ? numberWithCommas(
                      Number(generalInfo.annualRetirementIncomeGoal)
                    )
                  : "N/A"}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "#696969" }}>
                Retirement income at the onset
              </Text>
              <Text>
                {finalResult.length > 0
                  ? numberWithCommas(calculateTotalFields(finalResult[0]))
                  : 0}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: isNegative(retirementDifference)
                  ? "red"
                  : "black",
                color: "#fff",
                borderRadius: 5,
                padding: 8,
              }}
            >
              <Text>
                {isNegative(retirementDifference) ? "Deficit" : "Surplus"}
              </Text>
              <Text>
                {finalResult.length > 0 &&
                generalInfo.annualRetirementIncomeGoal !== "Select One"
                  ? numberWithCommas(retirementDifference)
                  : 0}
              </Text>
            </View>
          </View>
        </View>

        {/* Chart Container  */}
        <View style={{ padding: 15 }}>
          {base64 && (
            <Image style={{ width: "100%", height: 350 }} src={base64} />
          )}

          {/* Legends Container  */}
          <View
            style={{
              fontSize: 10,
              flexDirection: "column",
              justifyContent: "center",
              gap: 20,
              fontWeight: "extrabold",
              marginLeft: 40,
              marginTop: 10,
            }}
          >
            {/* <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Text
                style={{
                  width: "20px",
                  backgroundColor: "#F44336",
                  borderRadius: "30px",
                  height: "6px",
                }}
              ></Text>
              <Text>
                Annual Retirement Income goal : 
                {generalInfo.annualRetirementIncomeGoal !== "Select One"
                  ? numberWithCommas(
                      Number(generalInfo.annualRetirementIncomeGoal)
                    )
                  : "N/A"}
              </Text>
            </View> */}

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Text
                style={{
                  width: "20px",
                  backgroundColor: "#4CAF50",
                  borderRadius: "30px",
                  height: "6px",
                }}
              ></Text>
              <Text>
                {pensionPlan.selectedPP} :
                {numberWithCommas(calculatedResult.PPResult.PPBenefitAmount)}{" "}
                Annually (starting from age {getValue(pensionPlan.ppStartYear)}{" "}
                to {getValue(generalInfo.lifeExpectency)})
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Text
                style={{
                  width: "20px",
                  backgroundColor: "#FFC107",
                  borderRadius: "30px",
                  height: "6px",
                }}
              ></Text>
              <Text
                style={{
                  marginRight: 20,
                }}
              >
                {description}
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Text
                style={{
                  width: "20px",
                  backgroundColor: "#2196F3",
                  borderRadius: "30px",
                  height: "6px",
                }}
              ></Text>
              <Text>
                Retirement Savings:
                {numberWithCommas(
                  calculatedResult.retirementSavingsResult
                    .retirementSavingsAgeByAge[0]?.retirementSavingsAmount
                )}{" "}
                Annually (from age {getValue(TFSAorNRASavingsReceivingAge)} to{" "}
                {getValue(generalInfo.lifeExpectency)})
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Text
                style={{
                  width: "20px",
                  backgroundColor: "#9C27B0",
                  borderRadius: "30px",
                  height: "6px",
                }}
              ></Text>
              <Text
                style={{
                  marginRight: 20,
                }}
              >
                {summaryText}
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Text
                style={{
                  width: "20px",
                  backgroundColor: "#FF5722",
                  borderRadius: "30px",
                  height: "6px",
                }}
              ></Text>
              <Text>
                Old Age Security:
                {numberWithCommas(
                  calculatedResult.OASResult.OASBenefitAmount
                    .oldAgeSecurityBefore75
                )}{" "}
                annually (from age{" "}
                {getValue(oldAgeSecurity.OASPensionReceivingAge)} to 74);{" "}
                {numberWithCommas(
                  calculatedResult.OASResult.OASBenefitAmount
                    .oldAgeSecurityAfter75
                )}{" "}
                annually (from age 75 to {getValue(generalInfo.lifeExpectency)})
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Text
                style={{
                  color: "#000",
                  width: 20,
                }}
              ></Text>
              <Text></Text>
            </View>
          </View>
        </View>

        {/* Watermark */}
        <Text style={styles.watermark}>Dollarfar.com</Text>
      </Page>

      {/* ===========================|| Page 3 : Table ||==========================  */}
      <Page size="A4" style={styles.page}>
        <Text style={{ fontSize: 16, marginBottom: 10, fontWeight: "bold" }}>
          Retirement Income Overview
        </Text>

        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            {[
              "Age",
              "Canada Pension Plan",
              "Old Age Security",
              `Employer Pension`,
              `Accumulated Savings`,
              "Other Income",
              "Total Estimated Retirement Income",
            ].map((heading, idx) => (
              <Text
                key={idx}
                style={[
                  styles.cell,
                  styles.lastCell,
                  // isNegative(diff) ? styles.redText : styles.greenText,
                ].filter(Boolean)}
              >
                {heading}
              </Text>
            ))}
          </View>

          {/* Table Body */}
          {finalResult?.map((item, index) => {
            const {
              age,
              OASAmount,
              PPBenefitAmount,
              employerPensionAmount,
              otherIncomeAmount,
              retirementSavingsAmount,
            } = item || {};

            const totalIncome = calculateTotalFields(item);
            const diff =
              totalIncome - Number(generalInfo.annualRetirementIncomeGoal);

            return (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.cell}>{age}</Text>
                <Text style={styles.cell}>
                  {PPBenefitAmount ? numberWithCommas(PPBenefitAmount) : 0}
                </Text>
                <Text style={styles.cell}>
                  {OASAmount
                    ? numberWithCommas(parseInt(OASAmount.toString()))
                    : 0}
                </Text>
                <Text style={styles.cell}>
                  {employerPensionAmount
                    ? numberWithCommas(employerPensionAmount)
                    : 0}
                </Text>
                <Text style={styles.cell}>
                  {retirementSavingsAmount
                    ? numberWithCommas(retirementSavingsAmount)
                    : 0}
                </Text>
                <Text style={styles.cell}>
                  {otherIncomeAmount ? numberWithCommas(otherIncomeAmount) : 0}
                </Text>
                <Text
                  style={[
                    styles.cell,
                    styles.lastCell,
                    isNegative(diff) ? styles.redText : styles.greenText,
                  ]}
                >
                  {totalIncome
                    ? numberWithCommas(parseInt(totalIncome.toString()))
                    : 0}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Footer  */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            color: "#4D4D4D",
            fontSize: 12,
            backgroundColor: "#F6F8FC",
            position: "absolute",
            width: "100%",
            bottom: 0,
            left: 0,
            padding: 10,
          }}
        >
          <Text>dollarfar.com</Text>
          <Text>Copyright © {new Date().getFullYear()} - Dollarfar</Text>
        </View>
      </Page>
    </Document>
  );
};
