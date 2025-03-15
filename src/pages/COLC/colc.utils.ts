export function getRating(index: number) {
  if (index < 20) return "Very Low";
  if (index < 40) return "Low";
  if (index < 60) return "Moderate";
  if (index < 80) return "High";
  return "Very High";
}

export function getColorForIndex(index: number): string {
    if (index < 20) return "#C62828"; // Very Low (Deep Red)
    if (index < 40) return "#F57C00"; // Low (Deep Orange)
    if (index < 60) return "#FBC02D"; // Moderate (Deep Yellow)
    if (index < 80) return "#388E3C"; // High (Deep Green)
    return "#1976D2"; // Very High (Deep Blue)
}

export function getIndex(inputValue: number) {
  const result = (inputValue + 2) * 25;
  return Number(result.toFixed(2));
}

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
