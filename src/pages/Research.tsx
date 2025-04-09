import { PDFViewer } from "@react-pdf/renderer";
// import { NWCPdf } from "./NWC/NWCPdf";
// import { useAppSelector } from "../redux/hooks";

export default function Research() {
  // const { totalAssets, totalLiabilities, netWorth, assets, liabilities } =
  //   useAppSelector((state) => state.NWCalculator);

  // const calculatorData = {
  //   assets: { ...assets.totals, totalAssets, assetsBreakdown: assets },
  //   liabilities: {
  //     ...liabilities.totals,
  //     totalLiabilities,
  //     liabilitiesBreakdown: liabilities,
  //   },
  //   name: "siam",
  //   email: "siam@gmail.com",
  // };
  return (
    <main className="flex justify-center items-center m-10">
      <PDFViewer width="100%" height="1200px">
        {/* <NWCPdf data={calculatorData} /> */}
      </PDFViewer>
    </main>
  );
}
