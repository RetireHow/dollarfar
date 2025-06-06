/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef, ChangeEvent } from "react";
import { getCurrencySymbol } from "../utils/getCurrencySymbol";
import { toast } from "react-toastify";
import { baseUrl } from "../api/apiConstant";
import { useAppSelector } from "../redux/hooks";

function categorizeCityPrices(data: CityPriceApiResponse): CategorizedData {
  const categories: string[] = [
    "Rent Per Month",
    "Utilities (Monthly)",
    "Transportation",
    "Markets",
    "Restaurants",
    "Clothing And Shoes",
    "Sports And Leisure",
    "Childcare",
    // "Buy Apartment Price",
    // "Salaries And Financing",
  ];

  const categorizedData: CategorizedData = {};

  // Initialize each category with an empty array
  categories.forEach((category) => {
    categorizedData[category] = [];
  });

  // Iterate through each price item
  data?.data?.prices?.forEach((item) => {
    // Extract the category from the item_name
    const categoryParts = item.item_name.split(", ");
    const category = categoryParts[categoryParts.length - 1];

    // Check if the extracted category is one of the predefined categories
    if (categories.includes(category)) {
      const cleanedItemName = item.item_name?.replace(/, [^,]*$/, "").trim();
      categorizedData[category].push({ ...item, item_name: cleanedItemName });
    } else {
      // Handle items with categories not in the predefined list
      // if (!categorizedData["Others"]) {
      //   categorizedData["Others"] = [];
      // }
      // categorizedData["Others"].push(item);
    }
  });

  return categorizedData;
}

// Types
export interface CityPricesData {
  name: string;
  currency: string;
  contributors12months: number;
  monthLastUpdate: number;
  contributors: number;
  yearLastUpdate: number;
  prices: PriceItem[];
  city_id: number;
}

export interface CityPriceApiResponse {
  success: boolean;
  message: string;
  data: CityPricesData;
}

export interface CategorizedData {
  [category: string]: PriceItem[];
}

interface PriceItem {
  data_points: number;
  item_id: number;
  lowest_price: number;
  average_price: number;
  highest_price: number;
  item_name: string;
}

interface PriceData {
  [category: string]: PriceItem[];
}

interface ExtendedPriceItem extends PriceItem {
  frequency: "daily" | "weekly" | "monthly" | "yearly" | "one time";
  total: number;
}

interface CategoryItems {
  [category: string]: ExtendedPriceItem[];
}

interface SavedBudget {
  name: string;
  date: string;
  total: number;
  categories: CategoryItems;
}

interface Suggestion {
  label: string;
  value: string;
}

const CATEGORY_COLORS = [
  "#4361ee",
  "#3a0ca3",
  "#7209b7",
  "#f72585",
  "#4cc9f0",
  "#4895ef",
  "#3f37c9",
  "#560bad",
  "#480ca8",
  "#3a0ca3",
  "#3f37c9",
  "#4361ee",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConfigProvider, theme as antdTheme, Modal } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import Error from "../components/UI/Error";

type ExportPDFModalProps = {
  selectedCity: string;
  activeCategories: string[];
  categoryItems: CategoryItems;
  calculateMonthlyTotal: () => number;
  calculateCategoryTotal: (category: string) => number;
};

const ExportPDFModal = ({
  selectedCity,
  activeCategories,
  categoryItems,
  calculateMonthlyTotal,
  calculateCategoryTotal,
}: ExportPDFModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [checked, setChecked] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isDarkMode = document.documentElement.classList.contains("dark");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setShowError(false);
    setChecked(false);
    setIsLoading(false);
    setEmail("");
    setPhone("");
    setName("");
  };

  const handleExportPDF = () => {
    const content = `
      <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 20px;">
      <p style="margin: 0;">Website from where this report is downloaded:</p>
      <a href="https://dollarfar.com/personalized-calculator" style="color: #4361ee; text-decoration: none;" target="_blank">
        https://dollarfar.com/personalized-calculator
      </a>
      </div>

      <h1 style="color: #4361ee; text-align: center;">Budget Report for ${selectedCity}</h1>
      <p style="text-align: center;">Generated on ${new Date().toLocaleString()}</p>
      <h2 style="text-align: center; color: #3a0ca3;">Total Monthly Cost: $${calculateMonthlyTotal().toFixed(
        2
      )}</h2>
      <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px;">Categories:</h3>
      <ul style="list-style: none; padding-left: 0;">
        ${activeCategories
          .map(
            (category) => `
          <li style="margin-bottom: 15px; background: #f8f9fa; padding: 10px; border-radius: 5px;">
            <strong style="color: #3a0ca3;">${category}:</strong> $${calculateCategoryTotal(
              category
            ).toFixed(2)}
            <ul style="list-style: none; padding-left: 15px; margin-top: 5px;">
              ${
                categoryItems[category]
                  ?.map(
                    (item) => `
                <li style="margin-bottom: 5px;">
                  ${item.item_name} (${item.frequency}): $${item.total.toFixed(
                      2
                    )}
                </li>
              `
                  )
                  .join("") || ""
              }
            </ul>
          </li>
        `
          )
          .join("")}
      </ul>
    `;

    const printWindow = window.open("", "_blank");
    printWindow?.document.write(`
      <html>
        <head>
          <title>Budget Report for ${selectedCity}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
            h1 { margin-bottom: 10px; }
            h2 { margin: 20px 0; }
            ul { margin-top: 10px; }
          </style>
        </head>
        <body>
          ${content}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 200);
            };
          </script>
        </body>
      </html>
    `);
    printWindow?.document.close();
  };

  const handleSendEmail = async () => {
    // Validate fields
    if (!email?.trim() || !name?.trim() || !phone?.trim()) {
      return setShowError(true);
    }
    if (email?.trim() && !emailRegex.test(email)) {
      return setShowError(true);
    }
    if (!checked) {
      return setShowError(true);
    }
    setIsLoading(true);
    // API Call
    try {
      const res = await fetch(
        `${baseUrl}/report-downloaded-users/create-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            downloadedFileName: "Personalized cost of living calculator",
          }),
        }
      );

      if (!res.ok) {
        return toast.error("There is something went wrong!");
      }

      await res.json();
      toast.success("An email was sent to your mail.", {
        position: "top-center",
      });
      handleExportPDF();
    } catch (error: any) {
      console.error("Email sending failed:", error);
      toast.error(
        `Failed to send email: ${error.message || "Unexpected error occurred"}`,
        {
          position: "top-center",
        }
      );
    }

    setIsLoading(false);
    setIsModalOpen(false);
    setShowError(false);
    setChecked(false);
  };

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
        }}
      >
        <button
          type="button"
          className="px-4 py-2 border border-white text-white rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-all disabled:opacity-50"
          onClick={showModal}
          disabled={isLoading}
        >
          Export as PDF
        </button>
        <Modal
          open={isModalOpen}
          closeIcon={false}
          footer={false}
          className="geist"
        >
          <div className="space-y-[1rem]">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="md:text-[1.5rem] text-[18px] font-bold">
                  Please enter your details
                </h3>
                <Icon
                  onClick={handleCancel}
                  className="text-red-500 text-[1.8rem] cursor-pointer"
                  icon="material-symbols:close"
                />
              </div>
            </div>

            <div className="md:text-[1rem] text-[14px]">
              <label className="block font-semibold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className={`p-[0.8rem] border-[1px] border-[#838383] dark:bg-darkModeBgColor dark:text-darkModeHeadingTextColor rounded-[8px] outline-none w-full`}
                autoFocus
                type="text"
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              {showError && !name?.trim() && (
                <Error message="This field is required" />
              )}
            </div>
            <div className="md:text-[1rem] text-[14px]">
              <label className="block font-semibold mb-2" htmlFor="name">
                Email
              </label>
              <input
                className={`p-[0.8rem] border-[1px] border-[#838383] dark:bg-darkModeBgColor dark:text-darkModeHeadingTextColor rounded-[8px] outline-none w-full`}
                type="email"
                placeholder="Enter Email Address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              {showError && !email?.trim() && (
                <Error message="This field is required" />
              )}
              {showError && email?.trim() && !emailRegex.test(email) && (
                <Error message="Email is not valid!" />
              )}
            </div>
            <div className="md:text-[1rem] text-[14px]">
              <label className="block font-semibold mb-2" htmlFor="name">
                Phone
              </label>
              <input
                className={`p-[0.8rem] border-[1px] border-[#838383] dark:bg-darkModeBgColor dark:text-darkModeHeadingTextColor rounded-[8px] outline-none w-full`}
                type="text"
                placeholder="Enter Phone Number"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
              {showError && !phone?.trim() && (
                <Error message="This field is required" />
              )}
            </div>
            <div>
              <div className="text-[12px] flex flex-wrap items-center gap-1 select-none">
                {checked ? (
                  <Icon
                    onClick={() => setChecked(false)}
                    className="text-[1.2rem] cursor-pointer"
                    icon="mingcute:checkbox-fill"
                  />
                ) : (
                  <Icon
                    onClick={() => setChecked(true)}
                    className="text-[1.2rem] cursor-pointer"
                    icon="mdi:checkbox-blank-outline"
                  />
                )}

                <span className="text-[#838383]">
                  By proceeding, you are agreeing to our
                </span>
                <Link className="hover:underline" to="/terms-and-condition">
                  Terms and Conditions
                </Link>
              </div>
              {showError && !checked && (
                <p className="text-red-500 text-[12px] mt-1">
                  Please check Terms and Conditions
                </p>
              )}
            </div>
            <div className="flex justify-center">
              {isLoading ? (
                <p className="text-green-600 font-bold text-center">
                  Loading...
                </p>
              ) : (
                <button
                  onClick={handleSendEmail}
                  className="border-[1px] border-gray-500 hover:bg-neutral-800 duration-300 hover:text-white px-4 py-2 rounded-md"
                >
                  Download PDF
                </button>
              )}
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default function CostOfLivingPersonalizedCalculator() {
  const { selectedCountryName2, selectedCityName2, homeCurrencyCode } =
    useAppSelector((state) => state.COLCalculator);

  const [selectedCity, setSelectedCity] = useState(
    `${selectedCityName2},${selectedCountryName2}`
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [priceData, setPriceData] = useState<PriceData>({});
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [categoryItems, setCategoryItems] = useState<CategoryItems>({});
  const [savedBudgets, setSavedBudgets] = useState<SavedBudget[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [budgetName, setBudgetName] = useState("");
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [currency, setCurrency] = useState<string>(homeCurrencyCode);
  const [currencies, setCurrencies] = useState<string[]>([]);

  const fetchCurrencyData = async () => {
    try {
      const res = await fetch(`${baseUrl}/numbeo/exchange-rates`);
      const data = await res.json();
      if (!data?.success) {
        return toast.error("There is internal server error.");
      }
      setCurrencies(
        data?.data?.exchange_rates?.map((item: any) => item.currency)?.sort()
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("There is something wrong!");
    }
  };
  useEffect(() => {
    fetchCurrencyData();
  }, []);

  // Fetch city prices data
  const fetchCityPricesData = async (city: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Mock API call - replace with actual fetch
      const response = await fetch(
        `${baseUrl}/numbeo/city-prices-by-city?city=${city}&currency=${currency}`
      );
      if (!response.ok) {
        return toast.error("There is something went wrong!");
      }
      const data = await response.json();
      setCurrency(data?.data?.currency);

      // Using mock data for demonstration
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      const mockData = categorizeCityPrices(data);

      setPriceData(mockData);
      const newCategories = Object.keys(mockData);
      //Initially Selected Categories
      if (data?.data?.prices?.length > 0) {
        setActiveCategories([
          "Rent Per Month",
          "Utilities (Monthly)",
          "Transportation",
          "Markets",
        ]);
        setCategories(newCategories);
      }

      setActiveCategories((prev) =>
        prev?.length > 0 ? prev?.filter((c) => newCategories?.includes(c)) : []
      );
    } catch (err) {
      console.log("Price data error =======> ", err);
      setError("An unknown error occurred");
      console.error("Error fetching city data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch cities data
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const debounceTimeout = useRef<number | null>(null);
  const resetCalculator = () => {
    setActiveCategories([]);
    setCategoryItems({});
    // You might also want to reset other state variables if needed
  };

  const fetchCitySuggestions = async (term: string) => {
    try {
      const response = await fetch(
        `${baseUrl}/numbeo/all-cities?term=${encodeURIComponent(term)}`
      );
      const data = await response.json();
      setSuggestions(data?.data || []);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedCity(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (value.trim() === "") {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    debounceTimeout.current = window.setTimeout(() => {
      fetchCitySuggestions(value);
    }, 300); // Debounce delay of 300ms
  };

  const handleCitySelect = (suggestion: Suggestion) => {
    setSelectedCity(suggestion.label);
    setSuggestions([]);
    setShowDropdown(false);
    resetCalculator();
  };

  // Load saved budgets from localStorage on initial render
  useEffect(() => {
    const saved = localStorage.getItem("savedBudgets");
    if (saved) {
      setSavedBudgets(JSON.parse(saved));
    }
    const handler = setTimeout(() => {
      fetchCityPricesData(selectedCity);
    }, 300); // Delay of 300ms

    return () => {
      clearTimeout(handler); // Cleanup the timeout if selectedCity changes before delay
    };
  }, [selectedCity, currency]);

  // Initialize items when active categories change
  useEffect(() => {
    const newItems = { ...categoryItems };
    let needsUpdate = false;

    activeCategories.forEach((category) => {
      if (
        !newItems[category] &&
        priceData[category] &&
        priceData[category].length > 0
      ) {
        newItems[category] = [
          {
            ...priceData[category][0],
            frequency: "monthly",
            total: calculateTotal(
              priceData[category][0].average_price,
              "monthly"
            ),
          },
        ];
        needsUpdate = true;
      }
    });

    if (needsUpdate) {
      setCategoryItems(newItems);
    }
  }, [activeCategories, priceData, categoryItems, selectedCity]);

  // Helper functions
  const calculateTotal = (
    price: number,
    frequency: ExtendedPriceItem["frequency"]
  ): number => {
    switch (frequency) {
      case "daily":
        return price * 30;
      case "weekly":
        return price * 4;
      case "monthly":
        return price;
      case "yearly":
        return price / 12;
      case "one time":
        return price;
      default:
        return price;
    }
  };

  const handleCategoryToggle = (category: string) => {
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleItemChange = (
    category: string,
    index: number,
    itemName: string
  ) => {
    const selectedItem = priceData[category].find(
      (item) => item.item_name === itemName
    );
    if (selectedItem) {
      setCategoryItems((prev) => {
        const updatedItems = { ...prev };
        updatedItems[category][index] = {
          ...updatedItems[category][index],
          ...selectedItem,
          total: calculateTotal(
            selectedItem.average_price,
            updatedItems[category][index].frequency
          ),
        };
        return updatedItems;
      });
    }
  };

  const handleFrequencyChange = (
    category: string,
    index: number,
    frequency: ExtendedPriceItem["frequency"]
  ) => {
    setCategoryItems((prev) => {
      const updatedItems = { ...prev };
      updatedItems[category][index] = {
        ...updatedItems[category][index],
        frequency,
        total: calculateTotal(
          updatedItems[category][index].average_price,
          frequency
        ),
      };
      return updatedItems;
    });
  };

  const addItem = (category: string) => {
    if (priceData[category] && priceData[category].length > 0) {
      setCategoryItems((prev) => ({
        ...prev,
        [category]: [
          ...(prev[category] || []),
          {
            ...priceData[category][0],
            frequency: "monthly",
            total: calculateTotal(
              priceData[category][0].average_price,
              "monthly"
            ),
          },
        ],
      }));
    }
  };

  const removeItem = (category: string, index: number) => {
    const isConfirm = window.confirm("Are you sure?");
    if (!isConfirm) return;
    setCategoryItems((prev) => {
      const updatedItems = { ...prev };
      updatedItems[category] = updatedItems[category].filter(
        (_, i) => i !== index
      );
      return updatedItems;
    });
  };

  // Calculate totals
  const calculateCategoryTotal = (category: string): number => {
    const items = categoryItems[category] || [];
    return items.reduce((sum, item) => sum + (item?.total || 0), 0);
  };

  const calculateMonthlyTotal = (): number => {
    return activeCategories.reduce((sum, category) => {
      return sum + calculateCategoryTotal(category);
    }, 0);
  };

  // Budget saving and export functions
  const handleSaveBudget = () => {
    if (!budgetName.trim()) return;

    const newBudget = {
      name: budgetName,
      date: new Date().toLocaleDateString(),
      total: calculateMonthlyTotal(),
      categories: { ...categoryItems },
    };

    const updatedBudgets = [...savedBudgets, newBudget];
    setSavedBudgets(updatedBudgets);
    setShowSaveModal(false);
    setBudgetName("");

    // Save to localStorage for persistence
    localStorage.setItem("savedBudgets", JSON.stringify(updatedBudgets));
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
        {/* Header with City Selection */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Personalized Cost of Living Calculator
              </h1>
              <p className="text-gray-600">
                Plan your budget by customizing expenses in different categories
              </p>
            </div>

            <div className="flex items-center gap-5">
              <div className="w-full md:w-auto">
                <label
                  htmlFor="city-select"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Type and Pick City
                </label>
                <div className="relative w-full max-w-md mx-auto">
                  <input
                    type="text"
                    value={selectedCity}
                    onChange={handleCityChange}
                    placeholder="Type and Pick City Here"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {showDropdown && suggestions.length > 0 && (
                    <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {suggestions.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => handleCitySelect(item)}
                          className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                        >
                          {item.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="currency"
                >
                  Select Currency
                </label>
                <select
                  onChange={(e) => {
                    setCurrency(e.target.value);
                    resetCalculator();
                  }}
                  className="border-[1px] border-gray-300 p-2 rounded-md w-[110px] outline-none"
                >
                  <option selected value={currency}>
                    {currency}
                  </option>
                  {currencies?.map((c) => {
                    return <option value={c}>{c}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              <span className="font-medium">Error:</span> {error}. Please try
              again later.
            </div>
          )}
        </header>

        {isLoading && !Object.keys(priceData).length ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-600">
              Loading cost of living data for {selectedCity}...
            </p>
          </div>
        ) : (
          <>
            {/* Category Selection */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Select Categories
              </h2>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                      activeCategories.includes(category)
                        ? "bg-indigo-600 text-white shadow-md hover:bg-indigo-700"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-indigo-300"
                    }`}
                    onClick={() => handleCategoryToggle(category)}
                    aria-pressed={activeCategories.includes(category)}
                    disabled={isLoading}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </section>

            {/* Expense Sections */}
            <form className="space-y-8">
              {activeCategories.map((category, catIndex) => (
                <section key={category} className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                      <span
                        className="w-4 h-4 rounded-full mr-2"
                        style={{
                          backgroundColor:
                            CATEGORY_COLORS[catIndex % CATEGORY_COLORS.length],
                        }}
                      ></span>
                      {category}
                    </h2>
                    <button
                      type="button"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center disabled:opacity-50"
                      onClick={() => addItem(category)}
                      disabled={isLoading}
                    >
                      <svg
                        className="w-5 h-5 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Add Item
                    </button>
                  </div>

                  {categoryItems[category]?.map((item, index) => (
                    <div
                      key={`${category}-${index}`}
                      className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 transition-all hover:shadow-sm"
                    >
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Item Name
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                          value={item.item_name}
                          onChange={(e) =>
                            handleItemChange(category, index, e.target.value)
                          }
                          disabled={isLoading}
                        >
                          {priceData[category]?.map((categoryItem) => (
                            <option
                              key={categoryItem.item_id}
                              value={categoryItem.item_name}
                            >
                              {categoryItem.item_name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price
                        </label>
                        <div className="flex items-center h-10 px-3 py-2 bg-white border border-gray-300 rounded-md">
                          {getCurrencySymbol(currency)}
                          {item.average_price?.toFixed(2)}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Frequency
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                          value={item.frequency}
                          onChange={(e) =>
                            handleFrequencyChange(
                              category,
                              index,
                              e.target.value as ExtendedPriceItem["frequency"]
                            )
                          }
                          disabled={isLoading}
                        >
                          <option value="monthly">Monthly</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="one time">One Time</option>
                          <option value="yearly">Yearly</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Monthly Cost
                        </label>
                        <div className="flex items-center h-10 px-3 py-2 bg-white border border-gray-300 rounded-md font-medium">
                          {getCurrencySymbol(currency)}
                          {item.total?.toFixed(2)}
                        </div>
                      </div>

                      <div className="flex items-end">
                        <button
                          type="button"
                          className="px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors flex items-center w-full justify-center disabled:opacity-50"
                          onClick={() => removeItem(category, index)}
                          disabled={isLoading}
                        >
                          <svg
                            className="w-5 h-5 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Category Total */}
                  <div className="flex justify-end p-4 bg-indigo-50 rounded-lg">
                    <div className="text-right">
                      <p className="text-sm font-medium text-indigo-700">
                        {category} Monthly Total
                      </p>
                      <p className="text-2xl font-bold text-indigo-900">
                        {getCurrencySymbol(currency)}
                        {calculateCategoryTotal(category).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </section>
              ))}
            </form>

            {/* Grand Total */}
            {activeCategories.length > 0 && (
              <section className="mt-12 p-6 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-xl text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">
                      Your Estimated Monthly Cost in {selectedCity}
                    </h3>
                    <p className="text-sm opacity-90">
                      Based on current selections
                    </p>
                  </div>
                  <p className="text-3xl font-bold">
                    {getCurrencySymbol(currency)}
                    {calculateMonthlyTotal().toFixed(2)}
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-white text-indigo-700 rounded-lg font-medium hover:bg-opacity-90 transition-all disabled:opacity-50"
                    onClick={() => setShowSaveModal(true)}
                    disabled={isLoading}
                  >
                    Save This Budget
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all disabled:opacity-50"
                    onClick={() => setShowCompareModal(true)}
                    disabled={isLoading || savedBudgets.length === 0}
                  >
                    Compare Locations
                  </button>
                  {/* <button
                    type="button"
                    className="px-4 py-2 border border-white text-white rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-all disabled:opacity-50"
                    onClick={handleExportPDF}
                    disabled={isLoading}
                  >
                    Export as PDF
                  </button> */}
                  <ExportPDFModal
                    selectedCity={selectedCity}
                    activeCategories={activeCategories}
                    categoryItems={categoryItems}
                    calculateMonthlyTotal={calculateMonthlyTotal}
                    calculateCategoryTotal={calculateCategoryTotal}
                  />
                </div>
              </section>
            )}
          </>
        )}

        {/* Reset Button  */}
        {activeCategories?.length > 3 && (
          <div className="flex justify-end mt-8">
            <button
              onClick={() => {
                const isConfirm = window.confirm("Are you sure?");
                if (!isConfirm) return;
                resetCalculator();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-150 ease-in-out"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Save Budget Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Save This Budget</h3>
            <input
              type="text"
              value={budgetName}
              onChange={(e) => setBudgetName(e.target.value)}
              placeholder="Enter budget name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
              onKeyDown={(e) => e.key === "Enter" && handleSaveBudget()}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowSaveModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBudget}
                disabled={!budgetName.trim()}
                className={`px-4 py-2 rounded-lg ${
                  !budgetName.trim()
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } text-white`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compare Locations Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Compare Locations</h3>
            <p className="text-gray-600 mb-4">
              Compare your current budget with saved budgets from other
              locations.
            </p>

            {savedBudgets.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium mb-2">Saved Budgets:</h4>
                <ul className="space-y-2">
                  {savedBudgets.map((budget, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded"
                    >
                      <span>
                        {budget.name} ({getCurrencySymbol(currency)}
                        {budget.total.toFixed(2)})
                      </span>
                      <button
                        className="text-indigo-600 hover:text-indigo-800"
                        onClick={() => {
                          // This would implement the comparison logic
                          alert(
                            `Comparison would show details between current budget ($${calculateMonthlyTotal().toFixed(
                              2
                            )}) and ${budget.name} ($${budget.total.toFixed(
                              2
                            )})`
                          );
                        }}
                      >
                        Compare
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setShowCompareModal(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
