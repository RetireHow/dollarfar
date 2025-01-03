import { PDFViewer } from "@react-pdf/renderer";
import { COLCPdf } from "./COLC/COLCPdf";

export default function Research() {
  return (
    <main className="flex justify-center items-center m-10">
      <PDFViewer width="100%" height="1200px">
        <COLCPdf data={{ name: "Siam Ahmed", email: "siam.ahmed@gmail.com" }} />
      </PDFViewer>
    </main>
  );
}
