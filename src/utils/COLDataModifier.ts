export type TItem = {
  data_points: number;
  item_id: number;
  lowest_price: number;
  average_price: number;
  highest_price: number;
  item_name: string;
};

export type TCityData = {
  name: string;
  currency: string;
  contributors12months: number;
  monthLastUpdate: number;
  contributors: number;
  yearLastUpdate: number;
  prices: TItem[];
  city_id: number;
};

export function COLDataModifier(city1Data: TCityData, city2Data: TCityData) {
  // Helper function to calculate the living index for an item
  const calculateLivingIndex = (city1Price: number, city2Price: number) => {
    return city2Price > 0
      ? (((city2Price - city1Price) / city1Price) * 100)?.toFixed(2)
      : 0;
  };

  // Group items into categories
  const categories = [
    { name: "Restaurants", keywords: ["Restaurants"] },
    { name: "Markets", keywords: ["Markets"] },
    { name: "Transportation", keywords: ["Transportation"] },
    { name: "Utilities", keywords: ["Utilities"] },
    {
      name: "Sports And Leisure",
      keywords: ["Sports", "Leisure", "Sports And Leisure"],
    },
    { name: "Childcare", keywords: ["Childcare"] },
    {
      name: "Clothing And Shoes",
      keywords: ["Clothing", "Shoes", "Clothing And Shoes"],
    },
    {
      name: "Salaries And Financing",
      keywords: ["Salaries", "Financing", "Salaries And Financing"],
    },
    { name: "Rent Per Month", keywords: ["Rent Per Month", "Apartment Rent"] },
    {
      name: "Buy Apartment Price",
      keywords: ["Buy Apartment Price", "Apartment Price"],
    },
  ];

  type TModifiedItem = {
    itemName: string;
    city1ItemPrice: number;
    city2ItemPrice: number;
    livingIndex: number;
  };

  type TModifiedCostData = {
    category: string;
    city1TotalCost: number;
    city2TotalCost: number;
    totalLivingIndex: number;
    city1Currency: string;
    city2Currency: string;
    items: TModifiedItem[];
  };

  // Initialize result
  const modifiedCostData: TModifiedCostData[] = categories?.map((cat) => ({
    category: cat.name,
    city1TotalCost: 0,
    city2TotalCost: 0,
    totalLivingIndex: 0,
    city1Currency: "$",
    city2Currency: "$",
    items: [],
  }));

  // Process items
  city1Data?.prices?.forEach((item: TItem) => {
    // Find category for the item
    const matchedCategory = categories?.find((cat) =>
      cat?.keywords?.some((keyword) =>
        item?.item_name?.toLowerCase()?.includes(keyword?.toLowerCase())
      )
    );

    if (matchedCategory) {
      // Get the corresponding category in modifiedCostData
      const category = modifiedCostData?.find(
        (cat) => cat?.category === matchedCategory?.name
      );

      if (category) {
        // Add the item to the category
        const city2Item = city2Data?.prices?.find(
          (i) => i?.item_id === item?.item_id
        );

        const city1Price = item?.average_price;
        const city2Price = city2Item ? city2Item?.average_price : 0;

        // Remove the category keyword from the item name
        let cleanedItemName = matchedCategory?.keywords?.reduce(
          (name, keyword) =>
            name?.replace(new RegExp(keyword, "gi"), "").trim(),
          item?.item_name
        );

        // Remove , or And from the last position of the item name
        if (
          cleanedItemName.endsWith(",") ||
          cleanedItemName.endsWith(", And")
        ) {
          cleanedItemName = cleanedItemName.replace(/,(\s?And)?$/, "");
        }

        category?.items?.push({
          itemName: cleanedItemName, // Shorten the name
          city1ItemPrice: Number(city1Price)
            ? Number(city1Price?.toFixed(2))
            : 0,
          city2ItemPrice: Number(city2Price)
            ? Number(city2Price?.toFixed(2))
            : 0,
          livingIndex: calculateLivingIndex(city1Price, city2Price) ? Number(calculateLivingIndex(city1Price, city2Price)) : 0,
        });

        // Update totals
        category.city1TotalCost += city1Price ? city1Price : 0;
        category.city2TotalCost += city2Price ? city2Price : 0;
      }
    }
  });

  // Calculate total living index for each category
  modifiedCostData?.forEach((category) => {
    category.city1TotalCost = Number(category.city1TotalCost.toFixed(2));
    category.city2TotalCost = Number(category.city2TotalCost.toFixed(2));

    const city1TotalItemsPrice = category.city1TotalCost;
    const city2TotalItemsPrice = category.city2TotalCost;

    category.totalLivingIndex =
      city1TotalItemsPrice > 0
        ? Number(
            (
              ((city2TotalItemsPrice - city1TotalItemsPrice) /
                city1TotalItemsPrice) *
              100
            )?.toFixed(2)
          )
        : 0;
  });

  return modifiedCostData;
}
