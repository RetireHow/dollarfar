type TOption = {
  label: string;
  value: string;
};
export const BCFrequencyOptions: TOption[] = [
  { value: "1", label: "Annually (1/Yr)" },
  { value: "2", label: "Semi-Annually (2/Yr)" },
  { value: "12", label: "Monthly (12/Yr)" },
  { value: "52", label: "Weekly (52/Yr)" },
  { value: "26", label: "Bi-weekly (26/Yr)" },
  { value: "4", label: "Quarterly (4/Yr)" },
  { value: "365", label: "Daily (365/Yr)" },
];
