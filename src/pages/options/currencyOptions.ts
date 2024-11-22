export type TOption = {
  label: string;
  value: string;
};

export const currencyOptions: TOption[] = [
  { value: "¥", label: "¥ JPY" },
  { value: "£", label: "£ GBP" },
  { value: "$", label: "$ USD" },
  { value: "C$", label: "$ CAD" },
  { value: "€", label: "€ EUR" },
];
