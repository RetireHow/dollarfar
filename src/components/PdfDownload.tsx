import { Icon } from "@iconify/react/dist/iconify.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function PdfDownload() {
  const generatePDF = (): void => {
    const input = document.getElementById("report") as HTMLDivElement | null;
  
    // Check if the element exists to avoid null-related errors
    if (input) {
     html2canvas(input).then((canvas) => {
       const imgData = canvas.toDataURL("image/png");
       const pdf = new jsPDF();
 
       const pdfWidth = pdf.internal.pageSize.getWidth();
       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
 
       // Add the canvas image to the PDF
       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
       pdf.save("downloaded-file-with-header-footer.pdf");

      }).catch(error => {
        console.error("Error generating PDF:", error);
      });
    } else {
      console.error("Element with ID 'report' not found.");
    }
  };
  return (
    <div
      onClick={generatePDF}
      className="flex items-center gap-2 border-[1px] border-[#0000001A] md:px-[1.25rem] px-[0.5rem] md:py-[10px] py-[8px] rounded-[10px] font-medium md:w-[140px] w-[110px] cursor-pointer"
    >
      <p>Download</p>
      <Icon
        className="w-[1.5rem] h-[1.5rem]"
        icon="material-symbols:download"
      />
    </div>
  );
}
