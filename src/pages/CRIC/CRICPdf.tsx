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
});

type TGeneralInfo = {
  dobMonth: string;
  dobYear: string;
  gender: string;
  currentAnnualIncome: string;
  annualRetirementIncomeGoal: string;
  lifeExpectency: string;
};

type TPensionPlan = {
  selectedPP: string;
  ppStartYear: string;
  monthlyRetirementPensionEstimate: string;
};

type TOldAgeSecurity = {
  willLiveInCanadaUntil65: string;
  willLiveInCanadaAtleast40Years: string;
  numberOYearsLivedInCanada: string;
  OASPensionReceivingAge: string;
};

type TEmployerPension = {
  hasEmployerPension: string;
  pensionPlanType: string;
  annualPension: string;
  pensionReceivingAge: string;
  isIndexedToInflation: string;
  inflationRate: string;
};

type TTFSA = {
  hasTFSA: string;
  TFSAcurrentTotal: string;
  TFSAOngoingContributionAmount: string;
  TFSAOngoingContributionFrequency: string;
  TFSAreturnRate: string;
};

type TNRA = {
  hasNRA: string;
  NRAcurrentTotal: string;
  NRAOngoingContributionAmount: string;
  NRAOngoingContributionFrequency: string;
  NRAreturnRate: string;
  NRAtaxRate: string;
};

type TRetirementSavings = {
  TFSA: TTFSA;
  NRA: TNRA;
  TFSAorNRASavingsReceivingAge: string;
};

type TOtherIncome = {
  hasOtherIncome: string;
  otherIncomeType: string;
  otherIncomeFrequency: string;
  otherIncomeAmount: string;
  otherIncomeStartReceivingAge: string;
  otherIncomeStopReceivingAge: string;
};

type TOASAmountAgeByAge = {
  age: number;
  OASAmount: number;
  annualRIG: number;
};

type TOASResult = {
  OASBenefitAmount: {
    oldAgeSecurityBefore75: number;
    oldAgeSecurityAfter75: number;
  };
  OASAmountsAgeByAge: TOASAmountAgeByAge[];
};

type TPPBenefitAgeByAge = {
  age: number;
  PPBenefitAmount: number;
  annualRIG: number;
};

type TPPResult = {
  PPBenefitAmount: number;
  PPBenefitsAgeByAge: TPPBenefitAgeByAge[];
};

type TEmployerPensionAgeByAge = {
  age: number;
  employerPensionAmount: number;
  annualRIG: number;
};

type TEmployerPensionResult = {
  employerPensionsAgeByAge: TEmployerPensionAgeByAge[];
};

type TTFSASavingsYearByYear = {
  year: number;
  savingsAmount: number;
  taxPaid: number;
};

type TTFSASavings = {
  savingsYearByYear: TTFSASavingsYearByYear[];
};

type TNonRegAccountSavingsYearByYear = {
  year: number;
  savingsAmount: number;
  taxPaid: number;
};

type TNonRegAccountSavings = {
  savingsYearByYear: TNonRegAccountSavingsYearByYear[];
};

type TRetirementSavingsAgeByAge = {
  age: number;
  retirementSavingsAmount: number;
  annualRIG: number;
};

type TRetirementSavingsResult = {
  TFSASavings: TTFSASavings;
  nonRegAccountSavings: TNonRegAccountSavings;
  annualRetirementSavingsAmount: number;
  retirementSavingsAgeByAge: TRetirementSavingsAgeByAge[];
};

type TOtherIncomeAgeByAge = {
  age: number;
  otherIncomeAmount: number;
  annualRIG: number;
};

type TOtherIncomeResult = {
  otherIncomeAmountAnnually: number;
  otherIncomesAgeByAge: TOtherIncomeAgeByAge[];
};

type TCalculatedResult = {
  PPResult: TPPResult;
  OASResult: TOASResult;
  employerPensionResult: TEmployerPensionResult;
  retirementSavingsResult: TRetirementSavingsResult;
  otherIncomeResult: TOtherIncomeResult;
};

type TFinalResult = {
  age: number;
  [key: string]: number;
};

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
  currency: string;
  currencyFullName: string;
};

// Define a new PDF document component
export const CRICPdf = ({ data }: { data: TData }) => {
  const {
    name,
    email,
    currency,
    currencyFullName,
    generalInfo,
    pensionPlan,
    employerPension,
    retirementSavings: { TFSA, NRA, TFSAorNRASavingsReceivingAge },
    otherIncome,
    oldAgeSecurity,
    calculatedResult,
    finalResult,
    base64,
  } = data || {};

  const retirementDifference =
    calculateTotalFields(finalResult[0]) -
      Number(generalInfo.annualRetirementIncomeGoal) || 0;

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
            <Text style={styles.title}>
              {currency}-{currencyFullName}
            </Text>
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
                fontSize: 12,
              }}
            >
              <View>
                {/* Step-1  */}
                <View
                  style={{ flexDirection: "column", gap: 10, marginBottom: 30 }}
                >
                  <View
                    style={{
                      color: "#000",
                      fontWeight: "bold",
                      fontSize: "16px",
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
                      {currency}
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
                      {currency}
                      {getValue(generalInfo.currentAnnualIncome) !== "N/A"
                        ? numberWithCommas(
                            Number(generalInfo.currentAnnualIncome)
                          )
                        : 0}
                    </Text>
                  </View>
                </View>
                {/* Step-2  */}

                {employerPension.hasEmployerPension == "Yes" && (
                  <View
                    style={{
                      flexDirection: "column",
                      gap: 10,
                      marginBottom: 30,
                    }}
                  >
                    <View
                      style={{
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      <Text>Employer Pension</Text>
                    </View>
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
                      <Text>{getValue(employerPension.pensionPlanType)}</Text>
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
                        {currency}
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
                        <Text style={{ color: "#696969" }}>Inflation Rate</Text>
                        <Text>{getValue(employerPension.inflationRate)}%</Text>
                      </View>
                    )}
                  </View>
                )}

                {/* Step-3  */}
                {otherIncome.hasOtherIncome == "Yes" && (
                  <View
                    style={{
                      flexDirection: "column",
                      gap: 10,
                      marginBottom: 30,
                    }}
                  >
                    <View
                      style={{
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      <Text>Other Income</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ color: "#696969" }}>Income Type</Text>
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
                        {getFrequencyTitle(otherIncome.otherIncomeFrequency)}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ color: "#696969" }}>Estimated Income</Text>
                      <Text>
                        {currency}
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
                        {getValue(otherIncome.otherIncomeStartReceivingAge)}
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
                        {getValue(otherIncome.otherIncomeStopReceivingAge)}
                      </Text>
                    </View>
                  </View>
                )}
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

              {/* Step-1  */}
              <View>
                {pensionPlan.selectedPP !== "Not Applicable" && (
                  <View
                    style={{
                      flexDirection: "column",
                      gap: 10,
                      marginBottom: 30,
                    }}
                  >
                    <View
                      style={{
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: "16px",
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
                        {currency}
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
                {/* Step-2  */}
                {(TFSA.hasTFSA == "Yes" || NRA.hasNRA == "Yes") && (
                  <View
                    style={{
                      flexDirection: "column",
                      gap: 10,
                      marginBottom: 30,
                    }}
                  >
                    {/* Retirement Savings  */}
                    <View
                      style={{
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: "16px",
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
                              fontSize: "12px",
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
                            {currency}
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
                            {currency}
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
                              fontSize: "12px",
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
                            {currency}
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
                            {currency}
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
                {/* Step- 3 */}
                <View
                  style={{
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    <Text style={{ fontSize: "16px" }}>
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
                      {currency}
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
                      {currency}
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
            </View>
          </View>
        </View>

        {/* Watermark */}
        <Text style={styles.watermark}>Dollarfar.com</Text>
      </Page>

      {/* page 2  */}
      <Page style={{ position: "relative" }}>
        {/* ================Totals Card================  */}
        <View style={{ margin: 30 }}>
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
              <Text style={{ fontSize: "16px" }}>Totals</Text>
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
                {currency}
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
                {currency}
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
                {currency}
                {finalResult.length > 0 &&
                generalInfo.annualRetirementIncomeGoal !== "Select One"
                  ? numberWithCommas(retirementDifference)
                  : 0}
              </Text>
            </View>
          </View>
        </View>

        {/* Chart Container  */}
        <View style={{ padding: 15, marginTop: 5 }}>
          <Image style={{ width: "100%", height: 350 }} src={base64} />

          {/* Legends Container  */}
          <View
            style={{
              fontSize: 10,
              flexDirection: "column",
              justifyContent: "center",
              gap: 20,
              fontWeight: "extrabold",
              marginLeft: 40,
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
                Annual Retirement Income goal : {currency}
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
                {pensionPlan.selectedPP} : {currency}
                {numberWithCommas(
                  calculatedResult.PPResult.PPBenefitAmount
                )}{" "}
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
              <Text>
                Employer Pension: {currency}
                {numberWithCommas(
                  calculatedResult.employerPensionResult
                    .employerPensionsAgeByAge[0]?.employerPensionAmount
                )}{" "}
                annually (starting at age{" "}
                {getValue(employerPension.pensionReceivingAge)})
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
                Retirement Savings: {currency}
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
              <Text>
                Other Income: {currency}
                {numberWithCommas(
                  calculatedResult.otherIncomeResult.otherIncomesAgeByAge[0]
                    ?.otherIncomeAmount
                )}{" "}
                annually (from age{" "}
                {getValue(otherIncome.otherIncomeStartReceivingAge)} to{" "}
                {getValue(otherIncome.otherIncomeStopReceivingAge)})
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
                Old Age Security: {currency}
                {numberWithCommas(
                  calculatedResult.OASResult.OASBenefitAmount
                    .oldAgeSecurityBefore75
                )}{" "}
                annually (from age{" "}
                {getValue(oldAgeSecurity.OASPensionReceivingAge)} to 74);{" "}
                {currency}
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
              >
                {currency}
              </Text>
              <Text>{currencyFullName}</Text>
            </View>
          </View>
        </View>

        {/* Watermark */}
        <Text style={styles.watermark}>Dollarfar.com</Text>

        {/* Footer  */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            color: "#4D4D4D",
            fontSize: 12,
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 16,
            paddingBottom: 16,
            backgroundColor: "#F6F8FC",
            position: "absolute",
            width: "100%",
            bottom: 0,
          }}
        >
          <Text>dollarfar.com</Text>
          <Text>Copyright © {new Date().getFullYear()} - Dollarfar</Text>
        </View>
      </Page>
    </Document>
  );
};
