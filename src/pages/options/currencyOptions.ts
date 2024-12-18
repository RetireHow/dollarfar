export type TOption = {
  label: string;
  value: string;
};

export const currencyOptions: TOption[] = [
  { value: "¥", label: "¥ JPY" },
  { value: "£", label: "£ GBP" },
  { value: "$", label: "$ CAD/USD" },
  // { value: "$", label: "$ USD" },
  { value: "€", label: "€ EUR" },
];
