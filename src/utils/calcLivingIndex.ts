export const calcLivingIndex = (
  locationATotalPrice: number,
  locationBTotalPrice: number
) => {
  if (!locationATotalPrice || !locationBTotalPrice) {
    return 0;
  }
  const totalLivingIndex =
    ((locationBTotalPrice - locationATotalPrice) / locationATotalPrice) * 100;
  return totalLivingIndex?.toFixed(2);
};
