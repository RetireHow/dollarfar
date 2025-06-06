import React, { useState, useEffect } from "react";

// Constants
const PUBLIC_TRANSPORT_MONTHLY_ALL = "Monthly, All Family Members";
const PUBLIC_TRANSPORT_MONTHLY_2 = "Monthly, 2 Family Members";
const PUBLIC_TRANSPORT_MONTHLY_1 = "Monthly, 1 Family Members";
const PUBLIC_TRANSPORT_ON_DEMAND_5_ROUND_TRIPS_PER_WEEK =
  "On-Demand, around 5 round trips weekly per family member";
const PUBLIC_TRANSPORT_ON_DEMAND_4_ROUND_TRIPS_PER_WEEK =
  "On-Demand, around 4 round trips weekly per family member";
const PUBLIC_TRANSPORT_ON_DEMAND_3_ROUND_TRIPS_PER_WEEK =
  "On-Demand, around 3 round trips weekly per family member";
const PUBLIC_TRANSPORT_ON_DEMAND_2_ROUND_TRIPS_PER_WEEK =
  "On-Demand, around 2 round trips weekly per family member";
const PUBLIC_TRANSPORT_ON_DEMAND_1_ROUND_TRIPS_PER_WEEK =
  "On-Demand, around 1 round trip weekly per family member";
const PUBLIC_TRANSPORT_NONE = "None";

const DEFAULT_RESTAURANTS_PERCENTAGE = 10.0;
const DEFAULT_INEXPENSIVE_RESTAURANTS_PERCENTAGE = 50.0;
const DEFAULT_DRINKING_COFFEE_OUTSIDE = 100.0;
const DEFAULT_SMOKING_PACKS_PER_DAY = 0.0;
const DEFAULT_GOING_OUT_MONTHLY = 4.2;
const DEFAULT_ALCOHOLIC_DRINKS = 25.0;
const DEFAULT_DRIVING_CAR = 0.0;
const DEFAULT_TAXI_CONSUMPTION = 0.0;
const DEFAULT_TYPE_OF_FOOD = "western"; // FOOD_TYPE_WESTERN
const DEFAULT_PAYING_FOR_PUBLIC_TRANSPORT = PUBLIC_TRANSPORT_MONTHLY_ALL;
const DEFAULT_SPORT_MEMBERSHIPS = 100.0;
const DEFAULT_CLOTHING_AND_SHOES = 50.0;
const DEFAULT_VACATION = 0.0;
const DEFAULT_RENT = "none";
const DEFAULT_KINDERGARTEN_COUNT = 0;
const DEFAULT_PRIVATE_SCHOOLS_COUNT = 0;

// Type definitions
type PriceItem = {
  data_points: number;
  item_id: number;
  lowest_price: number;
  average_price: number;
  highest_price: number;
  item_name: string;
};

type CityData = {
  name: string;
  currency: string;
  contributors12months: number;
  monthLastUpdate: number;
  contributors: number;
  yearLastUpdate: number;
  prices: PriceItem[];
  city_id: number;
};

type FormData = {
  members: number;
  restaurants_percentage: number;
  inexpensive_restaurants_percentage: number;
  drinking_coffee_outside: number;
  smoking_packs_per_day: number;
  going_out_monthly: number;
  alcoholic_drinks: number;
  driving_car: number;
  type_of_food: string;
  paying_for_public_transport: string;
  taxi_consumption: number;
  sport_memberships: number;
  clothing_and_shoes: number;
  vacation: number;
  rent: string;
  kindergarten_count: number;
  private_schools_count: number;
  displayCurrency: string;
};

type EstimateSubitem = {
  name: string;
  value: number;
};

type EstimateCategory = {
  overall: number;
  subitems: EstimateSubitem[];
};

type Estimate = {
  [category: string]: EstimateCategory;
};

type SelectOption = {
  value: string | number;
  label: string;
};

const CostOfLivingEstimator: React.FC = () => {
  const cityInfo = {
    cityName: "Toronto",
    country: "Canada",
  };

  const initialData: CityData = {
    name: "Toronto, Canada",
    currency: "CAD",
    contributors12months: 603,
    monthLastUpdate: 6,
    contributors: 423,
    yearLastUpdate: 2025,
    prices: [
      {
        data_points: 57,
        item_id: 1,
        lowest_price: 15,
        average_price: 28,
        highest_price: 43,
        item_name: "Meal, Inexpensive Restaurant, Restaurants",
      },
      {
        data_points: 67,
        item_id: 2,
        lowest_price: 80,
        average_price: 115,
        highest_price: 200,
        item_name:
          "Meal for 2 People, Mid-range Restaurant, Three-course, Restaurants",
      },
      // ... (rest of the price items remain the same)
    ],
    city_id: 2370,
  };

  const [formData, setFormData] = useState<FormData>({
    members: 4,
    restaurants_percentage: DEFAULT_RESTAURANTS_PERCENTAGE,
    inexpensive_restaurants_percentage:
      DEFAULT_INEXPENSIVE_RESTAURANTS_PERCENTAGE,
    drinking_coffee_outside: DEFAULT_DRINKING_COFFEE_OUTSIDE,
    smoking_packs_per_day: DEFAULT_SMOKING_PACKS_PER_DAY,
    going_out_monthly: DEFAULT_GOING_OUT_MONTHLY,
    alcoholic_drinks: DEFAULT_ALCOHOLIC_DRINKS,
    driving_car: DEFAULT_DRIVING_CAR,
    type_of_food: DEFAULT_TYPE_OF_FOOD,
    paying_for_public_transport: DEFAULT_PAYING_FOR_PUBLIC_TRANSPORT,
    taxi_consumption: DEFAULT_TAXI_CONSUMPTION,
    sport_memberships: DEFAULT_SPORT_MEMBERSHIPS,
    clothing_and_shoes: DEFAULT_CLOTHING_AND_SHOES,
    vacation: DEFAULT_VACATION,
    rent: DEFAULT_RENT,
    kindergarten_count: DEFAULT_KINDERGARTEN_COUNT,
    private_schools_count: DEFAULT_PRIVATE_SCHOOLS_COUNT,
    displayCurrency: initialData?.currency || "USD",
  });

  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  useEffect(() => {
    if (initialData) {
      calculateEstimate();
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name.includes("_percentage") ||
        name.includes("_count") ||
        name === "members" ||
        name === "going_out_monthly" ||
        name === "smoking_packs_per_day"
          ? parseFloat(value) || 0
          : value,
    }));
    setShowResults(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateEstimate();
    setShowResults(true);
  };

  const calculateEstimate = () => {
    setIsLoading(true);
    // Simulate API call or complex calculation
    setTimeout(() => {
      const mockEstimate: Estimate = {
        Restaurants: {
          overall: 1200,
          subitems: [
            { name: "Meal, Inexpensive Restaurant", value: 400 },
            { name: "Meal for 2 People, Mid-range", value: 600 },
            { name: "Domestic Beer", value: 200 },
          ],
        },
        "Going out": {
          overall: 300,
          subitems: [
            { name: "Cinema", value: 100 },
            { name: "Beer when going out", value: 200 },
          ],
        },
      };
      setEstimate(mockEstimate);
      setIsLoading(false);
    }, 500);
  };

  const getPublicTransportOptions = (): string[] => [
    PUBLIC_TRANSPORT_MONTHLY_ALL,
    PUBLIC_TRANSPORT_MONTHLY_2,
    PUBLIC_TRANSPORT_MONTHLY_1,
    PUBLIC_TRANSPORT_ON_DEMAND_5_ROUND_TRIPS_PER_WEEK,
    PUBLIC_TRANSPORT_ON_DEMAND_4_ROUND_TRIPS_PER_WEEK,
    PUBLIC_TRANSPORT_ON_DEMAND_3_ROUND_TRIPS_PER_WEEK,
    PUBLIC_TRANSPORT_ON_DEMAND_2_ROUND_TRIPS_PER_WEEK,
    PUBLIC_TRANSPORT_ON_DEMAND_1_ROUND_TRIPS_PER_WEEK,
    PUBLIC_TRANSPORT_NONE,
  ];

  const getGoingOutMonthlyOptions = (): SelectOption[] => [
    { value: 0.0, label: "none" },
    { value: 2.0, label: "very low (twice per month per household member)" },
    { value: 3.0, label: "low (three times per month per household member)" },
    { value: 4.2, label: "average (once per week per household member)" },
    { value: 8.4, label: "high (twice per week per household member)" },
    {
      value: 14.7,
      label: "very high (3-4 times per week per household member)",
    },
  ];

  const getDrinkingCoffeeOutsideOptions = (): SelectOption[] => [
    { value: 400.0, label: "Very High" },
    { value: 200.0, label: "High" },
    { value: 100.0, label: "Moderate" },
    { value: 30.0, label: "Low" },
    { value: 0.0, label: "No" },
  ];

  const getAlcoholicDrinksOptions = (): SelectOption[] => [
    { value: 100.0, label: "Very High" },
    { value: 60.0, label: "High" },
    { value: 25.0, label: "Moderate" },
    { value: 10.0, label: "Low" },
    { value: 0.0, label: "No" },
  ];

  const getTaxiOptions = (): SelectOption[] => [
    { value: 62.0, label: "Daily one round trip" },
    { value: 16.8, label: "Two round trips per Week" },
    { value: 8.4, label: "One round trip per Week" },
    { value: 2.0, label: "One round trip per Month" },
    { value: 0.0, label: "No" },
  ];

  const getTypeOfFoodOptions = (): SelectOption[] => [
    { value: "western", label: "Western" },
    { value: "asian", label: "Asian" },
  ];

  const getDrivingCarOptions = (): SelectOption[] => [
    { value: 100.0, label: "Very High" },
    { value: 75.0, label: "High" },
    { value: 50.0, label: "Moderate" },
    { value: 25.0, label: "Low" },
    { value: 0.0, label: "No" },
  ];

  const getVacationOptions = (): SelectOption[] => [
    {
      value: 150.0,
      label: "Three times per year (one week each), relatively expensive",
    },
    {
      value: 100.0,
      label: "Two times per year (one week each), relatively expensive",
    },
    {
      value: 51.0,
      label: "Once per year (one week each), relatively expensive",
    },
    {
      value: 49.0,
      label: "Two times per year (one week each), relatively inexpensive",
    },
    {
      value: 25.0,
      label: "Once per year (one week each), relatively inexpensive",
    },
    { value: 0.0, label: "None" },
  ];

  const getSportMembershipsOptions = (): SelectOption[] => [
    { value: 100.0, label: "All Household Members" },
    { value: 1.0, label: "1 Household Member" },
    { value: 2.0, label: "2 Household Members" },
    { value: 0.0, label: "No" },
  ];

  const getClothingAndShoesOptions = (): SelectOption[] => [
    { value: 100.0, label: "Very High" },
    { value: 50.0, label: "High" },
    { value: 50.0, label: "Moderate" },
    { value: 25.0, label: "Low" },
  ];

  const getRentOptions = (): SelectOption[] => [
    { value: "none", label: "none" },
    { value: "26", label: "Apartment (1 bedroom) in City Centre" },
    { value: "27", label: "Apartment (1 bedroom) Outside of Centre" },
    { value: "28", label: "Apartment (3 bedrooms) in City Centre" },
    { value: "29", label: "Apartment (3 bedrooms) Outside of Centre" },
    {
      value: "Sharing a Room in 3 Bedroom apartment City Centre",
      label: "Sharing a Room in 3 Bedroom apartment City Centre",
    },
    {
      value: "Sharing a Room in 3 Bedroom apartment Outside of Centre",
      label: "Sharing a Room in 3 Bedroom apartment Outside of Centre",
    },
    {
      value: "mortgage1",
      label: "Mortgage for 1 bedroom apartment (approximate)",
    },
    {
      value: "mortgage3",
      label: "Mortgage for 3 bedroom apartment (approximate)",
    },
  ];

  const renderSelect = (
    name: keyof FormData,
    options: SelectOption[],
    label: string
  ) => (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">{label}</label>
      <select
        name={name}
        value={formData[name].toString()}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded"
      >
        {options.map((option) => (
          <option key={option.value.toString()} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const renderInput = (
    name: keyof FormData,
    label: string,
    type: string = "text"
  ) => (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name].toString()}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );

  const renderEstimateResults = () => {
    if (!estimate || isLoading) return null;

    let total = 0;
    Object.values(estimate).forEach((category) => {
      total += category.overall;
    });

    return (
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Estimated Monthly Costs</h3>
        <table className="w-full border-collapse">
          <tbody>
            {Object.entries(estimate).map(([category, data]) => (
              <React.Fragment key={category}>
                <tr className="bg-gray-100 font-bold">
                  <td className="p-2 border">{category}</td>
                  <td className="p-2 border text-right">
                    {data.overall.toFixed(2)} {formData.displayCurrency}
                  </td>
                </tr>
                {data.subitems.map((item) => (
                  <tr key={item.name} className="border-b">
                    <td className="p-2 pl-4 border">{item.name}</td>
                    <td className="p-2 border text-right">
                      {item.value.toFixed(2)} {formData.displayCurrency}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
            <tr className="border-t-2 border-black">
              <td className="p-2"></td>
              <td className="p-2"></td>
            </tr>
            <tr className="bg-gray-200 font-bold">
              <td className="p-2 border">Estimated Total Monthly Spending*</td>
              <td className="p-2 border text-right">
                {total.toFixed(2)} {formData.displayCurrency}
              </td>
            </tr>
          </tbody>
        </table>
        <p className="mt-4 text-sm text-gray-600">
          * Note: This estimate does not include insurance, healthcare expenses,
          parking fees, or domestic help. Income tax is also not factored into
          the calculation.
        </p>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">
          Cost of Living Estimator for {cityInfo.cityName}, {cityInfo.country}
        </h1>

        {initialData?.contributors < 10 && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  We don't have a complete dataset for {cityInfo.cityName}. The
                  estimate might not be fully accurate.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <p className="text-gray-700">
            Utilize this tool to calculate necessary budget adjustments when
            moving to {cityInfo.cityName}.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              {renderInput("members", "Number of household members", "number")}

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Currency</label>
                <select
                  name="displayCurrency"
                  value={formData.displayCurrency}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="JPY">JPY</option>
                </select>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Dining Preferences</h2>
              {renderSelect(
                "restaurants_percentage",
                Array.from({ length: 21 }, (_, i) => ({
                  value: i * 5,
                  label: `${i * 5}%`,
                })),
                "Percentage of meals consumed at restaurants"
              )}

              {renderSelect(
                "inexpensive_restaurants_percentage",
                Array.from({ length: 11 }, (_, i) => ({
                  value: i * 10,
                  label: `${i * 10}%`,
                })),
                "What percentage of your restaurant meals are at inexpensive places?"
              )}

              {renderSelect(
                "type_of_food",
                getTypeOfFoodOptions(),
                "Preferred cuisine for home-cooked meals"
              )}

              {renderSelect(
                "drinking_coffee_outside",
                getDrinkingCoffeeOutsideOptions(),
                "Frequency of purchasing coffee outside the home"
              )}

              {renderSelect(
                "alcoholic_drinks",
                getAlcoholicDrinksOptions(),
                "Level of alcoholic beverage consumption"
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Transportation</h2>
              {renderSelect(
                "driving_car",
                getDrivingCarOptions(),
                "Frequency of car usage"
              )}

              {renderSelect(
                "paying_for_public_transport",
                getPublicTransportOptions().map((opt) => ({
                  value: opt,
                  label: opt,
                })),
                "Public transportation ticket purchases"
              )}

              {renderSelect(
                "taxi_consumption",
                getTaxiOptions(),
                "Frequency of taxi usage"
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Lifestyle</h2>
              {renderSelect(
                "going_out_monthly",
                getGoingOutMonthlyOptions(),
                "Frequency of entertainment activities outside the home"
              )}

              {renderInput(
                "smoking_packs_per_day",
                "Total number of cigarette packs smoked daily by household",
                "number"
              )}

              {renderSelect(
                "sport_memberships",
                getSportMembershipsOptions(),
                "Sports club memberships"
              )}

              {renderSelect(
                "vacation",
                getVacationOptions(),
                "Annual vacation frequency and type"
              )}

              {renderSelect(
                "clothing_and_shoes",
                getClothingAndShoesOptions(),
                "Frequency of purchasing clothing and shoes"
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Housing</h2>
              {renderSelect("rent", getRentOptions(), "Rent expenses")}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Education</h2>
              {renderInput(
                "kindergarten_count",
                "Number of your children attending kindergarten",
                "number"
              )}
              {renderInput(
                "private_schools_count",
                "Number of your children attending private school",
                "number"
              )}
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Calculate Estimate
            </button>
          </div>
        </form>

        {showResults && renderEstimateResults()}

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Select another city</h3>
          <div className="flex">
            <select className="flex-grow p-2 border border-gray-300 rounded-l">
              <option>Select a city</option>
            </select>
            <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-r">
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostOfLivingEstimator;