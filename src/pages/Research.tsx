import { PDFViewer } from "@react-pdf/renderer";
// import { useAppSelector } from "../redux/hooks";
// import { CIRCPdf } from "./CIRC/CIRCPdf";
export default function Research() {
  // const {
  //   totalFutureValue,
  //   totalContribution,
  //   totalInterestEarned,
  //   yearByYearBreakdown,
  //   annualInterestRate,
  //   compoundingFrequency,
  //   contribution,
  //   contributionFrequency,
  //   initialInvestment,
  //   years,
  // } = useAppSelector((state) => state.compoundInterest);
  // const { currency, currencyFullName } = useAppSelector(
  //   (state) => state.globalCurrency
  // );
  // const calculatorData = {
  //   currency,
  //   currencyFullName,
  //   totalFutureValue,
  //   totalContribution,
  //   totalInterestEarned,
  //   yearByYearBreakdown,
  //   annualInterestRate,
  //   compoundingFrequency,
  //   contribution,
  //   contributionFrequency,
  //   initialInvestment,
  //   years,
  // };
  return (
    <main className="flex justify-center items-center m-10">
      <PDFViewer width="100%" height="1200px">
        {/* <CIRCPdf
          data={{
            name: "Siam Ahmed",
            email: "siam.ahmed@gmail.com",
            base64: "",
            ...calculatorData,
          }}
        /> */}
      </PDFViewer>
    </main>
  );
}
