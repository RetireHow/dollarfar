import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import siteLogo from "../assets/Dollar-logo.svg";

export const generatePDF = (name: string, email: string, id: string): void => {
  const headerHTML = `<div
      style="display:flex; justify-content:space-between; padding:10px; margin:30px 80px;box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.10)"
    >
        <div><img width="150px" height="150px" src=${siteLogo} alt="Logo Image" /></div>
        <div>
        <h5 style="font-weight:600; margin-bottom:10px;">Created By</h5>

        <div style="display:flex; gap:50px; margin-bottom:10px"><p style="color:#696969;">Name:</p> <p style="font-weight: 600;">${
          name ? name : "NA"
        }</p>
        </div>

        <div style="display:flex; gap:50px;"><p style="color:#696969;">Email:</p> <p style="font-weight: 600;">${
          email ? email : "NA"
        }</p>
        </div>

        </div>
    </div>`;

  const footerHTML = `<footer id="footer" style="display:flex; justify-content:space-between; padding:10px; margin:0 80px">
      <div>Dollarfar.com</div>
      <div>Copyright © ${new Date().getFullYear()} - Dollarfar</div>
    </footer>`;

  // Create elements for header and footer
  const header = document.createElement("div");
  header.innerHTML = headerHTML;

  const footer = document.createElement("div");
  footer.innerHTML = footerHTML;

  const input = document.getElementById(id) as HTMLDivElement | null;

  if (input) {
    input.insertBefore(header, input.firstChild); // Insert header at the top
    input.appendChild(footer); // Append footer at the bottom
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        // Add the canvas image to the PDF
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("downloaded-file-with-header-footer.pdf");

        // Remove header and footer
        input.removeChild(input.firstChild as HTMLElement);
        input.removeChild(input.lastChild as HTMLElement);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  } else {
    console.error("Element with ID 'report' not found.");
  }
};
