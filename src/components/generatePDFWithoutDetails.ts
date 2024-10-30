import html2pdf from "html2pdf.js";

export const generatePDFWithoutDetails = (id: string): void => {
  const element = document.getElementById(id) as HTMLDivElement | null;
  html2pdf(element, {
    filename: "Calculator Report.pdf",
    jsPDF: { unit: "px", format: [1700, 2500], orientation: "portrait" },
  });
};
