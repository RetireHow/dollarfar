/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TCityPriceData {
  message: string;
  success: boolean;
  statusCode: number;
  data: Data;
}

export interface Data {
  name: string;
  currency: string;
  contributors12months: number;
  monthLastUpdate: number;
  contributors: number;
  yearLastUpdate: number;
  prices: Price[];
  city_id: number;
}

export interface Price {
  data_points: number;
  item_id: number;
  lowest_price?: number;
  average_price: number;
  highest_price?: number;
  item_name: string;
}

export function transformCityPriceData(
  city1DefaultCurrencyData: TCityPriceData,
  city1OtherCurrencyData: TCityPriceData,
  city2DefaultCurrencyData: TCityPriceData,
  city2OtherCurrencyData: TCityPriceData
) {
  // Validate input data
  if (
    !city1DefaultCurrencyData ||
    !city1OtherCurrencyData ||
    !city2DefaultCurrencyData ||
    !city2OtherCurrencyData
  ) {
    throw new Error("One or more input datasets are missing.");
  }

  // Helper function to safely extract prices and group by category
  const groupByCategory = (data:any) => {
    if (!data || !data.data || !Array.isArray(data.data.prices)) {
      return {};
    }
    return data.data.prices.reduce((acc:any, item:any) => {
      if (!item || !item.item_name || !item.item_id) {
        return acc; // Skip invalid items
      }
      const category = item.item_name.split(",").pop().trim();
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
  };


   // Helper function to clean up item name by removing the category part
   const cleanItemName = (itemName:string) => {
    if (!itemName) return itemName;
    return itemName.split(",").slice(0, -1).join(",").trim();
  };

  // Extract prices and group by category for each dataset
  const city1Default = groupByCategory(city1DefaultCurrencyData);
  const city1Other = groupByCategory(city1OtherCurrencyData);
  const city2Default = groupByCategory(city2DefaultCurrencyData);
  const city2Other = groupByCategory(city2OtherCurrencyData);

  // Get unique categories
  const categories = [
    ...new Set([
      ...Object.keys(city1Default),
      ...Object.keys(city1Other),
      ...Object.keys(city2Default),
      ...Object.keys(city2Other),
    ]),
  ];

  // Map to the desired output format
  const output = categories.map((category) => {
    const items = [];

    // Get items for each category
    const city1DefaultItems = city1Default[category] || [];
    const city1OtherItems = city1Other[category] || [];
    const city2DefaultItems = city2Default[category] || [];
    const city2OtherItems = city2Other[category] || [];

    // Merge items by item_id
    const allItems = [
      ...city1DefaultItems,
      ...city1OtherItems,
      ...city2DefaultItems,
      ...city2OtherItems,
    ];

    const uniqueItems = allItems.reduce((acc, item) => {
      if (!item || !item.item_id || !item.item_name) {
        return acc; // Skip invalid items
      }
      if (!acc[item.item_id]) {
        acc[item.item_id] = {
          itemName: cleanItemName(item.item_name), // Clean up item name,
          city1ItemPrice: null,
          city2ItemPrice: null,
          city1OtherCurrencyItemPrice: null,
          city2OtherCurrencyItemPrice: null,
        };
      }
      return acc;
    }, {});

    // Populate prices for each item
    city1DefaultItems.forEach((item:Price) => {
      if (item && item.item_id && item.average_price !== undefined) {
        uniqueItems[item.item_id].city1ItemPrice = item.average_price;
      }
    });

    city1OtherItems.forEach((item:Price) => {
      if (item && item.item_id && item.average_price !== undefined) {
        uniqueItems[item.item_id].city1OtherCurrencyItemPrice =
          item.average_price;
      }
    });

    city2DefaultItems.forEach((item:Price) => {
      if (item && item.item_id && item.average_price !== undefined) {
        uniqueItems[item.item_id].city2ItemPrice = item.average_price;
      }
    });

    city2OtherItems.forEach((item:Price) => {
      if (item && item.item_id && item.average_price !== undefined) {
        uniqueItems[item.item_id].city2OtherCurrencyItemPrice =
          item.average_price;
      }
    });

    // Convert to array
    items.push(...Object.values(uniqueItems));

    return {
      category,
      items,
    };
  });

  const metaData = {
    city1: {
      name: city1DefaultCurrencyData?.data?.name,
      currency: city1DefaultCurrencyData?.data?.currency,
      contributors12months:
        city1DefaultCurrencyData?.data?.contributors12months,
      monthLastUpdate: city1DefaultCurrencyData?.data?.monthLastUpdate,
      contributors: city1DefaultCurrencyData?.data?.contributors,
      yearLastUpdate: city1DefaultCurrencyData?.data?.yearLastUpdate,
    },
    city2: {
      name: city2DefaultCurrencyData?.data?.name,
      currency: city2DefaultCurrencyData?.data?.currency,
      contributors12months:
      city2DefaultCurrencyData?.data?.contributors12months,
      monthLastUpdate: city2DefaultCurrencyData?.data?.monthLastUpdate,
      contributors: city2DefaultCurrencyData?.data?.contributors,
      yearLastUpdate: city2DefaultCurrencyData?.data?.yearLastUpdate,
    },
  };

  return { output, metaData };
}
