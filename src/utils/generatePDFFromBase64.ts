// import {
//     Document,
//     Image as ReactPdfImage,
//     Page,
//     PDFDownloadLink,
//   } from "@react-pdf/renderer";

const A4_WIDTH = 595 * 2;
const A4_HEIGHT = 842 * 2;
export const splitBase64Image = async (base64: string) => {
  const image: HTMLImageElement = document.createElement("img");
  image.src = base64;

  await new Promise<void>((resolve) => {
    image.onload = () => resolve();
  });

  const scale = A4_WIDTH / image.naturalWidth;
  const scaledHeight = image.naturalHeight * scale;

  const canvas = document.createElement("canvas");
  canvas.width = A4_WIDTH;
  canvas.height = A4_HEIGHT;

  const ctx = canvas.getContext("2d")!;
  const chunks: string[] = [];

  let y = 0;
  while (y < scaledHeight) {
    const chunkHeight = Math.min(A4_HEIGHT, scaledHeight - y);
    ctx.clearRect(0, 0, A4_WIDTH, A4_HEIGHT);
    ctx.drawImage(
      image,
      0,
      y / scale, // source Y
      image.naturalWidth,
      chunkHeight / scale, // source height
      0,
      0,
      A4_WIDTH,
      chunkHeight
    );
    chunks.push(canvas.toDataURL());
    y += chunkHeight;
  }

  return chunks;
};

// export const TestPDF = ({ base64Chunks }: { base64Chunks: string[] }) => (
//     <Document>
//       {base64Chunks.map((chunk, idx) => (
//         <Page key={idx} size="A4" style={{ padding: 20}}>
//           <ReactPdfImage style={{ width: 555, height: 802 }} src={chunk} />
//         </Page>
//       ))}
//     </Document>
//   );
