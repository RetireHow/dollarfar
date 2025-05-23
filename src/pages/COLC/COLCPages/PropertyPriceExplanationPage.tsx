import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PropertyPriceExplanationPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <main className="m-5">
      <div className="mb-[1rem] dark:text-darkModeHeadingTextColor">
        <button
          onClick={handleBack}
          className=" hover:text-white border-[1px] hover:bg-black duration-300 border-gray-300 px-8 py-3 rounded-md"
        >
          Go Back
        </button>
      </div>
      <h3 className="text-[1.5rem] font-semibold mb-3 dark:text-darkModeHeadingTextColor">
        About Property Value and Investment Indexes
      </h3>
      <div className="space-y-[0.5rem] dark:text-darkModeNormalTextColor">
        <p>
          Note that there is no standard formula to calculate property price
          indexes. Our formulas differ from Case-Shiller Index, UK Housing Price
          Index, etc.
        </p>

        <p>
          <span className="font-semibold">Price to Income Ratio</span> is a
          fundamental measure for apartment purchase affordability, where a
          lower ratio indicates better affordability. It is typically calculated
          as the ratio of median apartment prices to median familial disposable
          income, expressed as years of income (although variations are used
          also elsewhere). Our formula assumes and uses:
        </p>

        <ul className="list-disc ml-8">
          <li>
            net disposable family income, as defined as 1.5 * the average net
            salary (50% is the assumed percentage of women in the workforce)
          </li>
          <li>median apartment size is 90 square meters</li>
          <li>
            price per square meter (the formula uses) is the average price of
            square meter in the city center and outside of the city center
          </li>
        </ul>

        <p>
          <span className="font-semibold">
            Mortgage as Percentage of Income
          </span>{" "}
          is a ratio of the actual monthly cost of the mortgage to take-home
          family income (lower is better). The average monthly salary is used to
          estimate family income. It assumes a 100% mortgage is taken on 20
          years for the house(or apt) of 90 square meters which price per square
          meter is the average of prices in the city center and outside of the
          city center.
        </p>

        <p>
          <span className="font-semibold">Loan Affordability Index</span> is an
          inverse of mortgage as percentage of income. The used formula is :
          (100 / mortgage as percentage of income) (higher is better).
        </p>

        <p>
          <span className="font-semibold">Price to Rent Ratio </span> is the
          average cost of ownership divided by the received rent income (if
          buying to let) or the estimated rent that would be paid if renting (if
          buying to reside). Lower values suggest that it is better to buy
          rather than rent, and higher values suggest that it is better to rent
          rather than buy. Our formula to estimate rent per square meter assumes
          1 bedroom apt has 50 square meters and 3 bedroom apartment has 110
          square meters. It doesn't take into account taxes or maintenance fees.
        </p>

        <p>
          <span className="font-semibold">Gross Rental Yield</span> is the total
          yearly gross rent divided by the house price (expressed in
          percentages). Higher is better.
        </p>
        <div className="overflow-x-auto">
          <pre>
            <code>
              {` public double calculateMedianHousePriceOutsideOfCentre() {
    return getBuyPricePerSquareMeterOutsideOfCentre() * 90;
  }

  public double calculateMedianHousePriceCityCentre() {
    return getBuyPricePerSquareMeterCityCentre() * 90;
  }

  public double calculateMedianHousePrice() {
    return (calculateMedianHousePriceCityCentre() + calculateMedianHousePriceOutsideOfCentre()) / 2;
  }

  public double calculateHousePriceToIncomeRatio() {
    return calculateMedianHousePrice() / calculateMedianFamilyDisposableIncomeYearly();
  }

  double calculateMonthlyPaymentFor20YearsMontgage() {
    double monthlyInterestRate = (getCreditInterestRateAnnual()  / 12) / 100;
    double leaseAmount = calculateMedianHousePrice();
    double monthlyPayment = leaseAmount / ( (1 - (1 / Math.pow(1 + monthlyInterestRate, 240))) / monthlyInterestRate);
    return monthlyPayment;
  }

  public double calculateMortgagePercentageOfIncome() {
    return calculateMonthlyPaymentFor20YearsMontgage() / calculateMedianFamilyDisposableIncomeMonthly() * 100;
  }

  public double calculateAffordabilityIndex() {
    return 100 / calculateMortgagePercentageOfIncome();
  }
  
  public double calculateAverageYearlyRentPerSquareMeterCityCentre() {
    return (getRent50SqmCityCentre() / 50 + getRent110SqmCityCentre() / 110) / 2.0 * 12.0;
  }

  public double calculateAverageYearlyRentPerSquareMeterOutsideOfCentre() {
    return (getRent50SqmOutsideCentre() / 50 + getRent110SqmOutsideCentre() / 110) / 2.0 * 12.0;
  }

  public double calculatePriceToRentRatioCityCentre() {
    return getBuyPricePerSquareMeterCityCentre() / calculateAverageYearlyRentPerSquareMeterCityCentre();
  }

  public double calculatePriceToRentRatioOusideOfCentre() {
    return getBuyPricePerSquareMeterOutsideOfCentre() / calculateAverageYearlyRentPerSquareMeterOutsideOfCentre();
  }

  public double calculateGrossRentalYieldCityCentre() {
    return calculateAverageYearlyRentPerSquareMeterCityCentre() / getBuyPricePerSquareMeterCityCentre() * 100;
  }

  public double calculateGrossRentalYieldOutsideOfCentre() {
    return calculateAverageYearlyRentPerSquareMeterOutsideOfCentre() / getBuyPricePerSquareMeterOutsideOfCentre() * 100;
  }`}
            </code>
          </pre>
        </div>
      </div>
    </main>
  );
}
