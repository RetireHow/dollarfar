// import { PDFViewer } from "@react-pdf/renderer";
// import { CRICPdf } from "./CRIC/CRICPdf";
// import { useAppSelector } from "../redux/hooks";
export default function Research() {
  // const {
  //   generalInfo,
  //   pensionPlan,
  //   employerPension,
  //   retirementSavings,
  //   otherIncome,
  //   oldAgeSecurity,
  //   calculatedResult,
  //   finalResult
  // } = useAppSelector((state) => state.CRICalculator);
  // const { currency, currencyFullName } = useAppSelector(
  //   (state) => state.globalCurrency
  // );
  // const calculatorData = {
  //   generalInfo,
  //   pensionPlan,
  //   employerPension,
  //   retirementSavings,
  //   otherIncome,
  //   oldAgeSecurity,
  //   calculatedResult,
  //   finalResult,
  //   currency,
  //   currencyFullName,
  // };
  return (
    <main className="flex justify-center items-center m-10">
      {/* <PDFViewer width="100%" height="1200px">
        <CRICPdf
          data={{
            name: "Siam Ahmed",
            email: "siam.ahmed@gmail.com",
            ...calculatorData,
          }}
        />
      </PDFViewer> */}
    </main>
  );
}
