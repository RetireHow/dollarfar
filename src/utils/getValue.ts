export function getValue(value: string) {
  return value == "Select One" || value == "" || value == "Not Applicable"
    ? "N/A"
    : value;
}
