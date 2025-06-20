/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef, ChangeEvent } from "react";
import { getCurrencySymbol } from "../../../utils/getCurrencySymbol";
import { toast } from "react-toastify";
import { baseUrl } from "../../../api/apiConstant";
import { useAppSelector } from "../../../redux/hooks";

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

export interface PriceItem {
  data_points: number;
  item_id: number;
  lowest_price: number;
  average_price: number;
  highest_price: number;
  item_name: string;
}

export interface PriceData {
  [category: string]: PriceItem[];
}

export interface ExtendedPriceItem extends PriceItem {
  frequency: "daily" | "weekly" | "monthly" | "yearly" | "one time";
  total: number;
}

export interface CategoryItems {
  [category: string]: ExtendedPriceItem[];
}

export interface SavedBudget {
  id: string;
  name: string;
  location: string;
  date: string;
  total: number;
  categories: CategoryItems;
}

export interface Suggestion {
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
import Error from "../../../components/UI/Error";
import moment from "moment";
import { generateUniqueId } from "../../../utils/generateUniqueId";
import { BudgetVisualization } from "./BudgetVisualization";

type ExportPDFModalProps = {
  selectedCity: string;
  activeCategories: string[];
  categoryItems: CategoryItems;
  calculateMonthlyTotal: () => number;
  calculateCategoryTotal: (category: string) => number;
  currency: string;
};

const ExportPDFModal = ({
  selectedCity,
  activeCategories,
  categoryItems,
  calculateMonthlyTotal,
  calculateCategoryTotal,
  currency,
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
    <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 20px; padding: 10px; background: #f8f9fa; border-radius: 8px;">
      <p style="margin: 0; color: #2b6777; font-size: 14px;">Website from where this report is downloaded:</p>
      <a href="https://dollarfar.com/personalized-calculator" style="color: #52ab98; text-decoration: none; font-weight: 500;" target="_blank">
        https://dollarfar.com/personalized-calculator
      </a>
    </div>

    <h1 style="color: #2b6777; text-align: center; font-size: 28px; margin-bottom: 5px; border-bottom: 2px solid #52ab98; padding-bottom: 10px;">
      Budget Report for ${selectedCity}
    </h1>
    <p style="text-align: center; color: #666; font-size: 14px; margin-bottom: 20px;">
      Generated on ${moment().format("LL")}
    </p>
    
    <div style="background: #e8f4f8; padding: 15px; border-radius: 8px; margin-bottom: 25px; text-align: center;">
      <h2 style="color: #2b6777; margin: 0; font-size: 22px;">
        Total Monthly Cost: ${getCurrencySymbol(
          currency
        )}${calculateMonthlyTotal().toFixed(2)}
      </h2>
    </div>
    
    <h3 style="border-bottom: 2px solid #52ab98; padding-bottom: 8px; color: #2b6777; font-size: 20px; margin-bottom: 15px;">
      Categories Breakdown
    </h3>
    
    <ul style="list-style: none; padding-left: 0; margin-top: 0;">
      ${activeCategories
        .map(
          (category, index) => `
        <li style="margin-bottom: 15px; background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid ${
          ["#2b6777", "#52ab98", "#86b3b1", "#c8d8e4"][index % 4]
        };">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong style="color: #2b6777; font-size: 16px;">${category}</strong>
            <span style="color: #2b6777; font-weight: 600;">
              ${getCurrencySymbol(currency)}${calculateCategoryTotal(
            category
          ).toFixed(2)}
            </span>
          </div>
          <ul style="list-style: none; padding-left: 15px; margin-top: 10px; border-top: 1px dashed #ddd; padding-top: 10px;">
            ${
              categoryItems[category]
                ?.map(
                  (item) => `
              <li style="margin-bottom: 8px; display: flex; justify-content: space-between;">
                <span style="color: #333;">
                  ${
                    item.item_name
                  } <span style="color: #666; font-size: 13px;">(${
                    item.frequency
                  })</span>
                </span>
                <span style="color: #52ab98; font-weight: 500;">
                  ${getCurrencySymbol(currency)}${item.total.toFixed(2)}
                </span>
              </li>
            `
                )
                .join("") ||
              "<li style='color: #666; font-style: italic;'>No items in this category</li>"
            }
          </ul>
        </li>
      `
        )
        .join("")}
    </ul>
    
    <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee; color: #666; font-size: 12px; text-align: center;">
      <p>Report generated by DollarFar Cost of Living Calculator</p>
      <p>For personal budgeting purposes only</p>
    </div>
  `;

    const printWindow = window.open("", "_blank");
    printWindow?.document.write(`
    <html>
      <head>
        <title>Budget Report for ${selectedCity}</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            padding: 30px; 
            max-width: 800px; 
            margin: 0 auto; 
            color: #333;
            line-height: 1.5;
          }
          h1 { margin-bottom: 10px; }
          h2 { margin: 20px 0; }
          ul { margin-top: 10px; }
          @media print {
            body { padding: 15px; }
            a { color: #52ab98 !important; text-decoration: none !important; }
          }
        </style>
      </head>
      <body>
        ${content}
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
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

      // Then show PDF
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
    <ConfigProvider
      theme={{
        algorithm: isDarkMode
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: "#2b6777",
          colorLink: "#52ab98",
          colorLinkHover: "#3d8a7a",
        },
      }}
    >
      <button
        type="button"
        className="px-4 py-2 bg-[#2b6777] hover:bg-[#1a4d5a] dark:bg-[#52ab98] dark:hover:bg-[#3d8a7a] text-white rounded-lg font-medium transition-all disabled:opacity-50 flex items-center gap-2"
        onClick={showModal}
        disabled={isLoading}
      >
        <Icon icon="mdi:file-pdf-box" className="text-xl" />
        Export as PDF
      </button>

      <Modal
        open={isModalOpen}
        closeIcon={false}
        footer={false}
        className="geist"
        styles={{
          content: {
            borderRadius: "12px",
            padding: "24px",
          },
        }}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl md:text-2xl font-bold text-[#2b6777] dark:text-[#52ab98]">
              Please enter your details
            </h3>
            <Icon
              onClick={handleCancel}
              className="text-[#e74c3c] hover:text-[#c0392b] text-2xl cursor-pointer transition-colors"
              icon="material-symbols:close"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label
                className="block font-medium mb-2 text-[#2b6777] dark:text-[#52ab98]"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="p-3 border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-800 dark:text-gray-200 rounded-lg outline-none w-full focus:ring-2 focus:ring-[#52ab98] focus:border-transparent transition-all"
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

            <div>
              <label
                className="block font-medium mb-2 text-[#2b6777] dark:text-[#52ab98]"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="p-3 border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-800 dark:text-gray-200 rounded-lg outline-none w-full focus:ring-2 focus:ring-[#52ab98] focus:border-transparent transition-all"
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

            <div>
              <label
                className="block font-medium mb-2 text-[#2b6777] dark:text-[#52ab98]"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                className="p-3 border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-800 dark:text-gray-200 rounded-lg outline-none w-full focus:ring-2 focus:ring-[#52ab98] focus:border-transparent transition-all"
                type="text"
                placeholder="Enter Phone Number"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
              {showError && !phone?.trim() && (
                <Error message="This field is required" />
              )}
            </div>

            <div className="flex items-start gap-3">
              <button
                onClick={() => setChecked(!checked)}
                className="mt-1 flex-shrink-0"
              >
                {checked ? (
                  <Icon
                    className="text-[#52ab98] text-2xl"
                    icon="mingcute:checkbox-fill"
                  />
                ) : (
                  <Icon
                    className="text-gray-400 text-2xl"
                    icon="mdi:checkbox-blank-outline"
                  />
                )}
              </button>
              <div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  By proceeding, you are agreeing to our{" "}
                  <Link
                    className="text-[#52ab98] hover:underline hover:text-[#3d8a7a] transition-colors"
                    to="/terms-and-condition"
                  >
                    Terms and Conditions
                  </Link>
                </span>
                {showError && !checked && (
                  <p className="text-red-500 text-xs mt-1">
                    Please accept the Terms and Conditions
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            {isLoading ? (
              <div className="flex items-center gap-2 text-[#52ab98]">
                <Icon icon="eos-icons:loading" className="text-2xl" />
                <span>Preparing your PDF...</span>
              </div>
            ) : (
              <button
                onClick={handleSendEmail}
                className="px-6 py-3 bg-[#2b6777] hover:bg-[#1a4d5a] dark:bg-[#52ab98] dark:hover:bg-[#3d8a7a] text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Icon icon="material-symbols:download" className="text-xl" />
                Download PDF
              </button>
            )}
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default function CostOfLivingPersonalizedCalculator() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  // Add this new state at the top of the component
  const [selectedBudgetForComparison, setSelectedBudgetForComparison] =
    useState<SavedBudget | null>(null);

  const { selectedCountryName2, selectedCityName2, homeCurrencyCode } =
    useAppSelector((state) => state.COLCalculator);

  const [selectedCity, setSelectedCity] = useState<string>(
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

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBudgetDetails, setSelectedBudgetDetails] =
    useState<SavedBudget | null>(null);

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
      localStorage.setItem("destinationPlace", selectedCity);
      //Initially Selected Categories
      if (data?.data?.prices?.length > 0) {
        setActiveCategories([
          "Rent Per Month",
          "Utilities (Monthly)",
          "Transportation",
          "Markets",
          "Restaurants",
        ]);
        setCategories(newCategories);
      }

      setActiveCategories((prev) =>
        prev?.length > 0 ? prev?.filter((c) => newCategories?.includes(c)) : []
      );
    } catch (err) {
      // console.log("Price data error =======> ", err);
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
      id: generateUniqueId(),
      name: budgetName,
      location: selectedCity,
      date: moment().format("LL"),
      total: calculateMonthlyTotal(),
      categories: { ...categoryItems },
    };

    const updatedBudgets = [...savedBudgets, newBudget];
    setSavedBudgets(updatedBudgets);
    setShowSaveModal(false);
    setBudgetName("");

    // Save to localStorage for persistence
    localStorage.setItem("savedBudgets", JSON.stringify(updatedBudgets));

    toast.success(
      "The budget was saved sucessfully. Now you can compare this saved budget with different location budget."
    );
  };

  const handleDeleteBudget = (id: string) => {
    const toBeDeletedBudget = savedBudgets?.find((budget) => budget?.id === id);
    const isConfirm = window.confirm(
      `Are you sure to delete this budget of ${toBeDeletedBudget?.location}?`
    );
    if (!isConfirm) return;
    // Delete from localStorage
    const storedBudgets = JSON.parse(
      localStorage.getItem("savedBudgets") as string
    );
    const restBudgets = storedBudgets?.filter(
      (budget: SavedBudget) => budget.id !== id
    );
    localStorage.setItem("savedBudgets", JSON.stringify(restBudgets));

    // delete from local state
    const restBudgetsOfLocalState = savedBudgets?.filter(
      (budget: SavedBudget) => budget.id !== id
    );
    setSavedBudgets(restBudgetsOfLocalState);
  };

  //Fetch from localStorage
  useEffect(() => {
    const destinationPlace = localStorage.getItem("destinationPlace");
    if (destinationPlace) {
      setSelectedCity(destinationPlace as string);
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white dark:bg-neutral-900 rounded-xl shadow-lg overflow-hidden p-6 md:p-8">
        {/* Header with City Selection */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-[#2b6777] dark:text-[#52ab98]">
                Personalized Cost of Living Calculator
              </h1>
              <p className="text-gray-600 dark:text-gray-200">
                Plan your budget by customizing expenses in different categories
              </p>
            </div>

            <div className="flex md:flex-row flex-col md:items-center gap-5">
              <div className="w-full md:w-auto">
                <label
                  htmlFor="city-select"
                  className="block text-sm font-medium text-[#2b6777] dark:text-[#52ab98] mb-1"
                >
                  Type and Pick City
                </label>
                <div className="relative w-full md:w-[300px] mx-auto">
                  <input
                    type="text"
                    value={selectedCity}
                    onChange={handleCityChange}
                    placeholder="Type and Pick City Here"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#52ab98]"
                  />
                  {showDropdown && suggestions.length > 0 && (
                    <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {suggestions.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => handleCitySelect(item)}
                          className="px-4 py-2 hover:bg-[#52ab98] hover:text-white cursor-pointer transition-colors"
                        >
                          {item.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="md:w-[150px] w-full">
                <label
                  className="block text-sm font-medium text-[#2b6777] dark:text-[#52ab98] mb-1"
                  htmlFor="currency"
                >
                  Select Currency
                </label>
                <select
                  onChange={(e) => {
                    setCurrency(e.target.value);
                    resetCalculator();
                  }}
                  className="border-[1px] border-gray-300 dark:bg-neutral-900 p-2 rounded-md md:w-[110px] w-full outline-none focus:ring-2 focus:ring-[#52ab98]"
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

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#52ab98] mb-4"></div>
            <p className="text-gray-600">
              Loading cost of living data for {selectedCity}...
            </p>
          </div>
        ) : (
          <>
            {/* Category Selection */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-[#2b6777] dark:text-[#52ab98] mb-4">
                Select Categories
              </h2>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                      activeCategories.includes(category)
                        ? "bg-[#2b6777] text-white shadow-md hover:bg-[#1a4d5a]"
                        : "bg-white dark:bg-neutral-800 text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-[#52ab98]"
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
                  <div className="flex md:flex-row flex-col gap-3 md:justify-between md:items-center">
                    <h2 className="text-xl font-semibold text-[#2b6777] dark:text-[#52ab98] flex items-center">
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
                      className="px-4 py-2 bg-[#2b6777] text-white rounded-lg hover:bg-[#1a4d5a] transition-colors flex items-center disabled:opacity-50"
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
                      className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg border border-gray-200 transition-all hover:shadow-sm"
                    >
                      <div className="md:col-span-2">
                        <label htmlFor="item-name" className="block text-sm font-medium text-[#2b6777] dark:text-[#52ab98] mb-1">
                          Item Name
                        </label>
                        <select
                          className="w-full px-3 py-2 border dark:bg-neutral-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#52ab98] focus:border-[#52ab98] disabled:bg-gray-100"
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
                        <label htmlFor="price" className="block text-sm font-medium text-[#2b6777] dark:text-[#52ab98] mb-1">
                          Price
                        </label>
                        <div className="flex items-center h-10 px-3 py-2 bg-white dark:bg-neutral-900 border border-gray-300 rounded-md">
                          {getCurrencySymbol(currency)}
                          {item.average_price?.toFixed(2)}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="frequency" className="block text-sm font-medium text-[#2b6777] dark:text-[#52ab98] mb-1">
                          Frequency
                        </label>
                        <select
                          className="w-full px-3 py-2 border dark:bg-neutral-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#52ab98] focus:border-[#52ab98] disabled:bg-gray-100"
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
                        <label htmlFor="monthly-cost" className="block text-sm font-medium text-[#2b6777] dark:text-[#52ab98] mb-1">
                          Monthly Cost
                        </label>
                        <div className="flex items-center h-10 px-3 py-2 bg-white dark:bg-neutral-900 border border-gray-300 rounded-md font-medium">
                          {getCurrencySymbol(currency)}
                          {item.total?.toFixed(2)}
                        </div>
                      </div>

                      <div className="flex items-end">
                        <button
                          type="button"
                          className="px-3 py-2 bg-red-100 dark:bg-red-300 hover:dark:bg-red-500 text-red-700 rounded-md hover:bg-red-200 transition-colors flex items-center w-full justify-center disabled:opacity-50"
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
                  <div className="flex justify-end p-4 bg-[#e8f4f8] dark:bg-neutral-900 rounded-lg border border-[#2b6777]">
                    <div className="text-right">
                      <p className="text-sm font-medium text-[#2b6777]">
                        {category} Monthly Total
                      </p>
                      <p className="text-2xl font-bold text-[#2b6777]">
                        {getCurrencySymbol(currency)}
                        {calculateCategoryTotal(category).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </section>
              ))}
            </form>

            <BudgetVisualization
              activeCategories={activeCategories}
              categoryItems={categoryItems}
              currency={currency}
            />

            {/* Grand Total */}
            {activeCategories.length > 0 && (
              <section className="mt-12 p-6 bg-gradient-to-r from-[#2b6777] to-[#52ab98] rounded-xl text-white">
                <div className="flex md:flex-row flex-col gap-3 md:justify-between items-center">
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
                    className="px-4 py-2 bg-white text-[#2b6777] rounded-lg font-medium hover:bg-opacity-90 transition-all disabled:opacity-50"
                    onClick={() => setShowSaveModal(true)}
                    disabled={isLoading}
                  >
                    Save This Budget
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-[#52ab98] text-white rounded-lg font-medium hover:bg-[#3d8a7a] transition-all disabled:opacity-50"
                    onClick={() => setShowCompareModal(true)}
                    disabled={isLoading || savedBudgets.length === 0}
                  >
                    Compare Locations
                  </button>
                  <ExportPDFModal
                    selectedCity={selectedCity}
                    activeCategories={activeCategories}
                    categoryItems={categoryItems}
                    calculateMonthlyTotal={calculateMonthlyTotal}
                    calculateCategoryTotal={calculateCategoryTotal}
                    currency={currency}
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
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 max-w-md w-full shadow-xl border border-gray-200 dark:border-neutral-700">
            <h3 className="text-xl font-bold mb-4 text-[#2b6777] dark:text-[#52ab98]">
              Save This Budget
            </h3>
            <input
              type="text"
              value={budgetName}
              onChange={(e) => setBudgetName(e.target.value)}
              placeholder="Enter budget name"
              className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#52ab98] dark:bg-neutral-800"
              onKeyDown={(e) => e.key === "Enter" && handleSaveBudget()}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowSaveModal(false)}
                className="px-4 py-2 text-[#2b6777] dark:text-[#52ab98] hover:bg-[#e8f4f8] hover:dark:bg-neutral-800 rounded-lg transition-colors duration-200 border border-[#2b6777] dark:border-[#52ab98]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBudget}
                disabled={!budgetName.trim()}
                className={`px-4 py-2 rounded-lg text-white transition-colors duration-200 ${
                  !budgetName.trim()
                    ? "bg-[#86b3b1] cursor-not-allowed"
                    : "bg-[#2b6777] hover:bg-[#1a4d5a] dark:bg-[#52ab98] dark:hover:bg-[#3d8a7a]"
                }`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compare Locations Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[4500]">
          <div className="bg-white dark:bg-neutral-900 dark:border-[1px] dark:border-neutral-700 rounded-xl p-6 max-w-5xl w-full max-h-[80vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-[#2b6777] dark:text-[#52ab98]">
                Compare Locations
              </h3>
              <button
                onClick={() => {
                  setShowCompareModal(false);
                  setSelectedBudgetForComparison(null);
                }}
                className="text-[#e74c3c] hover:text-[#c0392b] transition-colors"
              >
                <Icon icon="material-symbols:close" className="text-2xl" />
              </button>
            </div>

            {!selectedBudgetForComparison ? (
              <>
                <p className="text-gray-600 mb-4 dark:text-gray-300">
                  Compare your current budget{" "}
                  <span className="font-bold text-[#2b6777] dark:text-[#52ab98]">
                    ({selectedCity})
                  </span>{" "}
                  with saved budgets from other locations.
                </p>

                {savedBudgets.length > 0 ? (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2 text-[#2b6777] dark:text-[#52ab98]">
                      Saved Budgets:
                    </h4>
                    <ul className="space-y-2">
                      {savedBudgets.map((budget, index) => (
                        <li
                          key={index}
                          className="flex md:flex-row flex-col gap-3 justify-between md:items-center p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors border border-gray-200 dark:border-neutral-700"
                        >
                          <div>
                            <span className="font-medium text-[#2b6777] dark:text-[#52ab98]">
                              {budget.name} ({budget.location})
                            </span>
                            <span className="text-gray-600 dark:text-gray-400 text-sm block">
                              {budget.date} • {getCurrencySymbol(currency)}
                              {budget.total.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-3">
                            <button
                              className="px-4 py-2 bg-[#2b6777] text-white rounded-lg hover:bg-[#1a4d5a] text-sm transition-colors"
                              onClick={() =>
                                setSelectedBudgetForComparison(budget)
                              }
                            >
                              Compare
                            </button>
                            <button
                              className="px-4 py-2 bg-[#52ab98] text-white rounded-lg hover:bg-[#3d8a7a] text-sm transition-colors"
                              onClick={() => {
                                setSelectedBudgetDetails(budget);
                                setShowDetailsModal(true);
                              }}
                            >
                              Details
                            </button>
                            <button
                              className="px-4 py-2 bg-[#e74c3c] text-white rounded-lg hover:bg-[#c0392b] text-sm transition-colors"
                              onClick={() => handleDeleteBudget(budget?.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-end mt-8">
                      <button
                        onClick={() => {
                          const isConfirm = window.confirm(
                            "Are you sure to clear all saved budgets?"
                          );
                          if (!isConfirm) return;
                          localStorage.setItem(
                            "savedBudgets",
                            JSON.stringify([])
                          );
                          setSavedBudgets([]);
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#e74c3c] text-white font-semibold rounded-md shadow-md hover:bg-[#c0392b] focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-150 ease-in-out"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Clear All
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    No saved budgets to compare with.
                  </p>
                )}
              </>
            ) : (
              <div className="comparison-details">
                <div className="flex md:flex-row flex-col gap-3 md:justify-between md:items-center mb-6">
                  <h4 className="text-lg text-[#2b6777] dark:text-[#52ab98]">
                    Comparing budget between{" "}
                    <span className="font-bold">{selectedCity}</span> and{" "}
                    <span className="font-bold">
                      {selectedBudgetForComparison.location}
                    </span>
                  </h4>
                  <button
                    onClick={() => setSelectedBudgetForComparison(null)}
                    className="text-[#2b6777] hover:text-[#1a4d5a] dark:text-[#52ab98] dark:hover:text-[#3d8a7a] flex items-center gap-1 transition-colors"
                  >
                    <Icon icon="mdi:arrow-left" /> Back to list
                  </button>
                </div>

                {/* Summary Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-[#e8f4f8] dark:bg-neutral-800 p-4 rounded-lg border border-[#2b6777]">
                    <h5 className="font-medium text-[#2b6777] mb-2">
                      Current Budget
                    </h5>
                    <p className="text-2xl font-bold text-[#2b6777]">
                      {getCurrencySymbol(currency)}
                      {calculateMonthlyTotal().toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {selectedCity} • {moment().format("LL")}
                    </p>
                  </div>

                  <div className="bg-[#f0f7f4] dark:bg-neutral-800 p-4 rounded-lg border border-[#52ab98]">
                    <h5 className="font-medium text-[#52ab98] mb-2">
                      Saved Budget
                    </h5>
                    <p className="text-2xl font-bold text-[#52ab98]">
                      {getCurrencySymbol(currency)}
                      {selectedBudgetForComparison.total.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {selectedBudgetForComparison.location} •{" "}
                      {selectedBudgetForComparison.date}
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-lg border ${
                      calculateMonthlyTotal() >
                      selectedBudgetForComparison.total
                        ? "bg-[#fef2f2] border-[#fecaca] dark:bg-neutral-800"
                        : "bg-[#f0fdf4] border-[#bbf7d0] dark:bg-neutral-800"
                    }`}
                  >
                    <h5 className="font-medium mb-2 dark:text-gray-300">
                      Difference
                    </h5>
                    <p
                      className={`text-2xl font-bold ${
                        calculateMonthlyTotal() >
                        selectedBudgetForComparison.total
                          ? "text-[#dc2626]"
                          : "text-[#16a34a]"
                      }`}
                    >
                      {calculateMonthlyTotal() >
                      selectedBudgetForComparison.total
                        ? "+"
                        : ""}
                      {getCurrencySymbol(currency)}
                      {Math.abs(
                        calculateMonthlyTotal() -
                          selectedBudgetForComparison.total
                      ).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {calculateMonthlyTotal() >
                      selectedBudgetForComparison.total
                        ? "Current budget is more expensive"
                        : "Current budget is cheaper"}
                    </p>
                  </div>
                </div>

                {/* Category-wise Comparison */}
                <h5 className="font-medium mb-4 text-[#2b6777] dark:text-[#52ab98]">
                  Category Comparison
                </h5>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg overflow-hidden">
                    <thead className="bg-[#2b6777] dark:bg-[#52ab98]">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          {selectedCity}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          {selectedBudgetForComparison.location}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Difference
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                      {activeCategories.map((category) => {
                        const currentTotal = calculateCategoryTotal(category);
                        const savedTotal =
                          selectedBudgetForComparison.categories[
                            category
                          ]?.reduce(
                            (sum, item) => sum + (item?.total || 0),
                            0
                          ) || 0;
                        const difference = currentTotal - savedTotal;

                        return (
                          <tr
                            key={category}
                            className="hover:bg-gray-50 dark:hover:bg-neutral-800"
                          >
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-[#2b6777] dark:text-[#52ab98]">
                              {category}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                              {getCurrencySymbol(currency)}
                              {currentTotal.toFixed(2)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                              {savedTotal
                                ? `${getCurrencySymbol(
                                    currency
                                  )}${savedTotal.toFixed(2)}`
                                : "N/A"}
                            </td>
                            <td
                              className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${
                                difference > 0
                                  ? "text-[#dc2626]"
                                  : difference < 0
                                  ? "text-[#16a34a]"
                                  : "text-gray-500"
                              }`}
                            >
                              {savedTotal ? (
                                <>
                                  {difference > 0 ? "+" : ""}
                                  {getCurrencySymbol(currency)}
                                  {Math.abs(difference).toFixed(2)}
                                </>
                              ) : (
                                "N/A"
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Item-level Comparison for each category */}
                {activeCategories.map((category) => {
                  const currentItems = categoryItems[category] || [];
                  const savedItems =
                    selectedBudgetForComparison.categories[category] || [];

                  return (
                    <div key={category} className="mt-8">
                      <h5 className="font-medium mb-3 text-[#2b6777] dark:text-[#52ab98]">
                        {category} Items
                      </h5>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg overflow-hidden">
                          <thead className="bg-[#2b6777] dark:bg-[#52ab98]">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                Item
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                {selectedCity}
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                {selectedBudgetForComparison.location}
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                Difference
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                            {/* Current items */}
                            {currentItems.map((item, index) => {
                              const savedItem = savedItems[index];
                              const savedPrice = savedItem?.total || 0;
                              const difference = item.total - savedPrice;

                              return (
                                <tr
                                  key={`current-${index}`}
                                  className="hover:bg-gray-50 dark:hover:bg-neutral-800"
                                >
                                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-[#2b6777] dark:text-[#52ab98]">
                                    {item.item_name} (Current)
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                    {getCurrencySymbol(currency)}
                                    {item.total.toFixed(2)}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                    {savedItem
                                      ? `${getCurrencySymbol(
                                          currency
                                        )}${savedPrice.toFixed(2)}`
                                      : "N/A"}
                                  </td>
                                  <td
                                    className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${
                                      difference > 0
                                        ? "text-[#dc2626]"
                                        : difference < 0
                                        ? "text-[#16a34a]"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    {savedItem ? (
                                      <>
                                        {difference > 0 ? "+" : ""}
                                        {getCurrencySymbol(currency)}
                                        {Math.abs(difference).toFixed(2)}
                                      </>
                                    ) : (
                                      "N/A"
                                    )}
                                  </td>
                                </tr>
                              );
                            })}

                            {/* Saved items that aren't in current */}
                            {savedItems
                              .slice(currentItems.length)
                              .map((item, index) => (
                                <tr
                                  key={`saved-extra-${index}`}
                                  className="hover:bg-gray-50 dark:hover:bg-neutral-800"
                                >
                                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-[#52ab98]">
                                    {item.item_name} (Saved)
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                    N/A
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                    {getCurrencySymbol(currency)}
                                    {item.total.toFixed(2)}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                    N/A
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Budget Details Modal */}
      {showDetailsModal && selectedBudgetDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[5000]">
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-gray-200 dark:border-neutral-700">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-[#2b6777] dark:text-[#52ab98]">
                Budget Details
              </h3>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedBudgetDetails(null);
                }}
                className="text-[#e74c3c] hover:text-[#c0392b] transition-colors"
              >
                <Icon icon="material-symbols:close" className="text-2xl" />
              </button>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-[#2b6777] dark:text-[#52ab98]">
                {selectedBudgetDetails.name}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-[#e8f4f8] dark:bg-neutral-800 p-3 rounded-lg border border-[#2b6777]">
                  <p className="text-sm text-[#2b6777] dark:text-[#52ab98]">
                    Location
                  </p>
                  <p className="font-medium text-[#2b6777] dark:text-white">
                    {selectedBudgetDetails.location}
                  </p>
                </div>
                <div className="bg-[#e8f4f8] dark:bg-neutral-800 p-3 rounded-lg border border-[#2b6777]">
                  <p className="text-sm text-[#2b6777] dark:text-[#52ab98]">
                    Date Saved
                  </p>
                  <p className="font-medium text-[#2b6777] dark:text-white">
                    {selectedBudgetDetails.date}
                  </p>
                </div>
                <div className="bg-[#e8f4f8] dark:bg-neutral-800 p-3 rounded-lg border border-[#2b6777]">
                  <p className="text-sm text-[#2b6777] dark:text-[#52ab98]">
                    Total Monthly Cost
                  </p>
                  <p className="font-medium text-[#2b6777] dark:text-white">
                    {getCurrencySymbol(currency)}
                    {selectedBudgetDetails.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <h5 className="font-bold text-lg mb-3 text-[#2b6777] dark:text-[#52ab98]">
              Categories Breakdown
            </h5>
            <div className="space-y-6">
              {Object.entries(selectedBudgetDetails.categories).map(
                ([category, items]) => (
                  <div
                    key={category}
                    className="border border-[#2b6777] dark:border-[#52ab98] rounded-lg overflow-hidden"
                  >
                    <div className="bg-[#e8f4f8] dark:bg-neutral-800 px-4 py-3 flex justify-between items-center">
                      <h6 className="font-bold text-[#2b6777] dark:text-[#52ab98]">
                        {category}
                      </h6>
                      <p className="font-semibold text-[#2b6777] dark:text-white">
                        {getCurrencySymbol(currency)}
                        {items
                          .reduce((sum, item) => sum + item.total, 0)
                          .toFixed(2)}
                      </p>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-neutral-700">
                      {items.map((item, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
                        >
                          <div className="md:col-span-2">
                            <p className="font-medium text-[#2b6777] dark:text-white">
                              {item.item_name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                              {item.frequency}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-[#2b6777] dark:text-[#52ab98]">
                              Average Price
                            </p>
                            <p className="text-[#2b6777] dark:text-white">
                              {getCurrencySymbol(currency)}
                              {item.average_price.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-[#2b6777] dark:text-[#52ab98]">
                              Monthly Cost
                            </p>
                            <p className="text-[#2b6777] dark:text-white">
                              {getCurrencySymbol(currency)}
                              {item.total.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedBudgetDetails(null);
                }}
                className="px-4 py-2 bg-[#2b6777] hover:bg-[#1a4d5a] dark:bg-[#52ab98] dark:hover:bg-[#3d8a7a] text-white rounded-lg transition-colors"
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
