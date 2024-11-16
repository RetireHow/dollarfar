import { PDFViewer } from "@react-pdf/renderer";
import { BCPdf } from "./BC/BCPdf";

export default function Research() {
  return (
    <main className="flex justify-center items-center m-10">
      <PDFViewer width="100%" height="1200px">
        {/* <NWCPdf /> */}
        <BCPdf />
      </PDFViewer>
    </main>
  );
}
