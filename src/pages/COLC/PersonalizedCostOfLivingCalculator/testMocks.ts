export const mockCityPricesData = {
  name: "New York",
  currency: "USD",
  contributors12months: 100,
  monthLastUpdate: 5,
  contributors: 50,
  yearLastUpdate: 2023,
  city_id: 1,
  prices: [
    {
      item_id: 1,
      item_name: "Apartment (1 bedroom) in City Centre, Rent Per Month",
      lowest_price: 2000,
      average_price: 2500,
      highest_price: 3000,
      data_points: 10
    },
    {
      item_id: 2,
      item_name: "Basic (Electricity, Heating, Cooling, Water, Garbage) for 85m2 Apartment, Utilities (Monthly)",
      lowest_price: 100,
      average_price: 150,
      highest_price: 200,
      data_points: 8
    },
    // Add more mock items as needed
  ]
};

export const mockExchangeRates = {
  exchange_rates: [
    { currency: "USD" },
    { currency: "EUR" },
    { currency: "GBP" }
  ]
};