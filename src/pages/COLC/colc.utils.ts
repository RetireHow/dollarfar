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
  if (index < 60) return "#B08620"; // Moderate (Deep Yellow)
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

export interface PropertyPriceData {
  name: string;
  items: PropertyPriceItem[];
}

export interface PropertyPriceItem {
  item_name: string;
  lowest_price?: number;
  average_price: number;
  highest_price?: number;
}

type PropertyPriceOutput = {
  priceToIncomeRatio: string;
  mortgageAsPercentageOfIncome: string;
  loanAffordabilityIndex: string;
  priceToRentRatioCityCentre: string;
  priceToRentRatioOutsideCentre: string;
  grossRentalYieldCityCentre: string;
  grossRentalYieldOutsideCentre: string;
};

export function calculatePropertyPrice(data: PropertyPriceData[]):PropertyPriceOutput {
  // Helper function to get average price by item name
  function getAveragePrice(itemName: string) {
    for (const category of data) {
      for (const item of category.items) {
        if (item.item_name === itemName) {
          return item.average_price;
        }
      }
    }
    return null;
  }

  // Constants
  const MEDIAN_APARTMENT_SIZE = 90; // 90 sqm
  const MONTHS_IN_YEAR = 12;
  const MORTGAGE_DURATION_YEARS = 20;
  const MORTGAGE_DURATION_MONTHS = MORTGAGE_DURATION_YEARS * MONTHS_IN_YEAR;

  // Data Extraction
  const pricePerSqmCityCentre = getAveragePrice(
    "Price per Square Meter to Buy Apartment in City Centre"
  );
  const pricePerSqmOutsideCentre = getAveragePrice(
    "Price per Square Meter to Buy Apartment Outside of Centre"
  );
  const rent1BedCityCentre = getAveragePrice(
    "Apartment (1 bedroom) in City Centre"
  );
  const rent1BedOutsideCentre = getAveragePrice(
    "Apartment (1 bedroom) Outside of Centre"
  );
  const rent3BedCityCentre = getAveragePrice(
    "Apartment (3 bedrooms) in City Centre"
  );
  const rent3BedOutsideCentre = getAveragePrice(
    "Apartment (3 bedrooms) Outside of Centre"
  );
  const averageNetSalary = getAveragePrice(
    "Average Monthly Net Salary (After Tax)"
  );
  const annualInterestRate = getAveragePrice(
    "Mortgage Interest Rate in Percentages (%), Yearly, for 20 Years Fixed-Rate"
  );

  // Calculations
  const medianHousePriceCityCentre =
    (pricePerSqmCityCentre as number) * MEDIAN_APARTMENT_SIZE;
  const medianHousePriceOutsideCentre =
    (pricePerSqmOutsideCentre as number) * MEDIAN_APARTMENT_SIZE;
  const medianHousePrice =
    (medianHousePriceCityCentre + medianHousePriceOutsideCentre) / 2;

  const medianFamilyDisposableIncomeYearly =
    1.5 * (averageNetSalary as number) * MONTHS_IN_YEAR;
  const medianFamilyDisposableIncomeMonthly =
    1.5 * (averageNetSalary as number);

  const priceToIncomeRatio =
    medianHousePrice / medianFamilyDisposableIncomeYearly;

  const monthlyInterestRate =
    (annualInterestRate as number) / MONTHS_IN_YEAR / 100;
  const monthlyMortgagePayment =
    medianHousePrice *
    (monthlyInterestRate /
      (1 - Math.pow(1 + monthlyInterestRate, -MORTGAGE_DURATION_MONTHS)));

  const mortgageAsPercentageOfIncome =
    (monthlyMortgagePayment / medianFamilyDisposableIncomeMonthly) * 100;
  const loanAffordabilityIndex = 100 / mortgageAsPercentageOfIncome;

  const averageYearlyRentPerSqmCityCentre =
    (((rent1BedCityCentre as number) / 50 +
      (rent3BedCityCentre as number) / 110) /
      2) *
    MONTHS_IN_YEAR;
  const averageYearlyRentPerSqmOutsideCentre =
    (((rent1BedOutsideCentre as number) / 50 +
      (rent3BedOutsideCentre as number) / 110) /
      2) *
    MONTHS_IN_YEAR;

  const priceToRentRatioCityCentre =
    (pricePerSqmCityCentre as number) / averageYearlyRentPerSqmCityCentre;
  const priceToRentRatioOutsideCentre =
    (pricePerSqmOutsideCentre as number) / averageYearlyRentPerSqmOutsideCentre;

  const grossRentalYieldCityCentre =
    (averageYearlyRentPerSqmCityCentre / (pricePerSqmCityCentre as number)) *
    100;
  const grossRentalYieldOutsideCentre =
    (averageYearlyRentPerSqmOutsideCentre /
      (pricePerSqmOutsideCentre as number)) *
    100;

  // Output Results
  console.log("Price to income ratio:", priceToIncomeRatio.toFixed(2));
  console.log(
    "Mortgage as Percentage of Income:",
    mortgageAsPercentageOfIncome.toFixed(2) + "%"
  );
  console.log("Loan Affordability Index:", loanAffordabilityIndex.toFixed(2));
  console.log(
    "Price to Rent Ratio - City Centre:",
    priceToRentRatioCityCentre.toFixed(2)
  );
  console.log(
    "Price to Rent Ratio - Outside of Centre:",
    priceToRentRatioOutsideCentre.toFixed(2)
  );
  console.log(
    "Gross Rental Yield (City Centre):",
    grossRentalYieldCityCentre.toFixed(2) + "%"
  );
  console.log(
    "Gross Rental Yield (Outside of Centre):",
    grossRentalYieldOutsideCentre.toFixed(2) + "%"
  );

  return {
    priceToIncomeRatio: priceToIncomeRatio.toFixed(2),
    mortgageAsPercentageOfIncome: mortgageAsPercentageOfIncome.toFixed(2),
    loanAffordabilityIndex: loanAffordabilityIndex.toFixed(2),
    priceToRentRatioCityCentre: priceToRentRatioCityCentre.toFixed(2),
    priceToRentRatioOutsideCentre: priceToRentRatioOutsideCentre.toFixed(2),
    grossRentalYieldCityCentre: grossRentalYieldCityCentre.toFixed(2),
    grossRentalYieldOutsideCentre: grossRentalYieldOutsideCentre.toFixed(2),
  };
}
