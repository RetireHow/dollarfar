export const getFrequencyTitle = (value: string) => {
  switch (value) {
    case "52":
      return "Weekly";
    case "26":
      return "Bi-weekly";
    case "12":
      return "Monthly";
    case "4":
      return "Quarterly";
    case "1":
      return "Annually";
    case "2":
      return "Semi-Annually";
    case "Select One":
      return "N/A";
    default:
      return "N/A";
  }
};
