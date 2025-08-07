import { PDFViewer } from "@react-pdf/renderer";
import { CRICPdf } from "./CRIC/CRICPdf";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import {
  calculateEmployerPension,
  calculateFinalResult,
  calculateOtherIncome,
} from "../redux/features/CRIC/CRICSlice";

export default function Research() {
  
  const {
    generalInfo,
    pensionPlan,
    employerPension,
    retirementSavings,
    otherIncome,
    oldAgeSecurity,
    calculatedResult,
    finalResult,
  } = useAppSelector((state) => state.CRICalculator);

  const calculatorData = {
    generalInfo,
    pensionPlan,
    employerPension,
    retirementSavings,
    otherIncome,
    oldAgeSecurity,
    calculatedResult,
    finalResult,
    name: "siam",
    email: "siam@gmail.com",
    base64: "",
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(calculateOtherIncome(undefined));
    dispatch(calculateEmployerPension(undefined));
    dispatch(calculateFinalResult(undefined));
  }, []);

  return (
    <main className="flex justify-center items-center m-10">
      <PDFViewer width="100%" height="1200px">
        <CRICPdf data={calculatorData} />
      </PDFViewer>
    </main>
  );
}
