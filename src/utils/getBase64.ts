import html2canvas from "html2canvas";

export default async function getBase64(id: string) {
  const chartId = document.getElementById(id);
  if (chartId) {
    try {
      const canvas = await html2canvas(chartId as HTMLElement);
      const base64 = canvas.toDataURL("image/png");
      return base64
    } catch (error) {
      console.error("Error capturing chart: ", error);
    }
  }
}
