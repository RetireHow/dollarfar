import { Icon } from "@iconify/react";

import CustomTooltip from "../../../components/UI/CustomTooltip";
import { updateAsset } from "../../../redux/features/NWSlice/NWSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import useDynamicInput from "../../../hooks/useDynamicInput";
import { useRef } from "react";
import DisplayTotal from "../../../components/UI/DisplayTotal";
import { handleKeyDownUtil } from "../../../utils/handleKeyDownUtil";
import { isNegative } from "../../../utils/isNegative";

const SAndIInputFields = () => {
  const dispatch = useAppDispatch();
  const {
    assets: {
      totals: { savingsInvestment: savingsInvestmentTotal },
    },
  } = useAppSelector((state) => state.NWCalculator);
  const dynamicFieldTitleRef = useRef<HTMLInputElement>(null);

  const {
    assets: {
      savingsInvestment: { resp, rrIf, rrsp },
    },
  } = useAppSelector((state) => state.NWCalculator);

  const {
    newInput,
    dynamicInputs,
    handleSaveInput,
    handleInputChange,
    handleDynamicInputChange,
    handleRemoveNewInput,
    showNewInputField,
    showSubInputs,
    setShowSubInputs,
    handleAddNewInput,
  } = useDynamicInput({ category: "savingsInvestment", dynamicFieldTitleRef });

  return (
    <div>
      {/* Main Input Field */}
      <DisplayTotal
        data={{
          showSubInputs,
          setShowSubInputs,
          total: savingsInvestmentTotal,
          fieldTitle: "Savings & Investments",
          buttonText: "Add Savings & Investments",
          infoText:
            "Savings account balance, checking account balance, retirement accounts (401(k), IRA, etc.), stocks, bonds, mutual funds and other investment accounts (e.g., real estate investment trust).",
        }}
      />

      {/* Sub Input Fields */}
      {showSubInputs && (
        <div className="mt-3 text-[14px] flex flex-col gap-[0.5rem] pb-2">
          <div>
            <label
              className="flex items-center gap-1 font-semibold"
              htmlFor="principalResidence"
            >
              <span className="text-nowrap">RRSP</span>{" "}
              <CustomTooltip title="Total value of your RRSP accounts, a Canadian retirement savings plan with tax benefits." />
            </label>
            <input
              className={`min-w-[140px] rounded-[8px] p-[0.6rem] w-full outline-none duration-300 ${
                isNegative(rrsp)
                  ? "border-red-500 border-[2px]"
                  : "border-[#838383] border-[1px]"
              }`}
              type="number"
              placeholder={`0`}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
              onChange={(e) =>
                dispatch(
                  updateAsset({
                    category: "savingsInvestment",
                    key: "rrsp",
                    value: Number(e.target.value),
                  })
                )
              }
            />
          </div>
          <div>
            <label
              className="flex items-center gap-1 font-semibold"
              htmlFor="cottage"
            >
              <span className="text-nowrap">RRIF</span>{" "}
              <CustomTooltip title="Current balance of your RRIF, typically a converted RRSP that pays out income in retirement" />
            </label>
            <input
              className={`min-w-[140px] rounded-[8px] p-[0.6rem] w-full outline-none duration-300 ${
                isNegative(rrIf)
                  ? "border-red-500 border-[2px]"
                  : "border-[#838383] border-[1px]"
              }`}
              type="number"
              placeholder={`0`}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
              onChange={(e) =>
                dispatch(
                  updateAsset({
                    category: "savingsInvestment",
                    key: "rrIf",
                    value: Number(e.target.value),
                  })
                )
              }
            />
          </div>
          <div>
            <label
              className="flex items-center gap-1 font-semibold"
              htmlFor="realEstate"
            >
              <span className="text-nowrap">RESP</span>{" "}
              <CustomTooltip title="Total balance in your RESP accounts, designed for post-secondary education savings with tax benefits." />
            </label>
            <input
              className={`min-w-[140px] rounded-[8px] p-[0.6rem] w-full outline-none duration-300 ${
                isNegative(resp)
                  ? "border-red-500 border-[2px]"
                  : "border-[#838383] border-[1px]"
              }`}
              type="number"
              placeholder={`0`}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
              onChange={(e) =>
                dispatch(
                  updateAsset({
                    category: "savingsInvestment",
                    key: "resp",
                    value: Number(e.target.value),
                  })
                )
              }
            />
          </div>

          {/* Suggested Fields  */}
          <div>
            <label
              className="flex items-center gap-1 font-semibold"
              htmlFor="principalResidence"
            >
              <span className="text-nowrap">TFSA</span>{" "}
              <CustomTooltip title="A TFSA is a Canadian savings account where contributions are made with after-tax dollars. The money grows tax-free, and withdrawals are also tax-free. You can contribute a set amount each year, and unused contribution room carries forward." />
            </label>
            <input
              className={`min-w-[140px] rounded-[8px] p-[0.6rem] w-full outline-none duration-300 ${
                isNegative(rrsp)
                  ? "border-red-500 border-[2px]"
                  : "border-[#838383] border-[1px]"
              }`}
              type="number"
              placeholder={`0`}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
              onChange={(e) =>
                dispatch(
                  updateAsset({
                    category: "savingsInvestment",
                    key: "tfsa",
                    value: Number(e.target.value),
                  })
                )
              }
            />
          </div>
          <div>
            <label
              className="flex items-center gap-1 font-semibold"
              htmlFor="cottage"
            >
              <span className="text-nowrap">Non Registered Accounts</span>{" "}
              <CustomTooltip title="A non-registered account is an investment account that isn’t subject to tax-deferred or tax-free growth. Income earned in this account (like dividends, interest, or capital gains) is taxed annually at your regular income tax rate." />
            </label>
            <input
              className={`min-w-[140px] rounded-[8px] p-[0.6rem] w-full outline-none duration-300 ${
                isNegative(rrIf)
                  ? "border-red-500 border-[2px]"
                  : "border-[#838383] border-[1px]"
              }`}
              type="number"
              placeholder={`0`}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
              onChange={(e) =>
                dispatch(
                  updateAsset({
                    category: "savingsInvestment",
                    key: "nra",
                    value: Number(e.target.value),
                  })
                )
              }
            />
          </div>
          <h3 className="font-semibold text-[1rem] mt-3 underline">U.S. Accounts & Plans</h3>
          <div>
            <label
              className="flex items-center gap-1 font-semibold"
              htmlFor="realEstate"
            >
              <span className="text-nowrap">Traditional IRA & Roth IRA</span>{" "}
              <CustomTooltip title="Both are individual retirement accounts in the United States, but with key differences. A Traditional IRA allows tax-deferred contributions, meaning you pay taxes when you withdraw funds. A Roth IRA allows contributions with after-tax dollars, but qualified withdrawals are tax-free." />
            </label>
            <input
              className={`min-w-[140px] rounded-[8px] p-[0.6rem] w-full outline-none duration-300 ${
                isNegative(resp)
                  ? "border-red-500 border-[2px]"
                  : "border-[#838383] border-[1px]"
              }`}
              type="number"
              placeholder={`0`}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
              onChange={(e) =>
                dispatch(
                  updateAsset({
                    category: "savingsInvestment",
                    key: "ira&rothIra",
                    value: Number(e.target.value),
                  })
                )
              }
            />
          </div>
          <div>
            <label
              className="flex items-center gap-1 font-semibold"
              htmlFor="realEstate"
            >
              <span className="text-nowrap">Traditional 401(k) & 403(b)</span>{" "}
              <CustomTooltip title="These are employer-sponsored retirement plans in the U.S. Contributions to these plans are made with pre-tax income, reducing your taxable income for the year. Taxes are paid upon withdrawal during retirement. A 403(b) plan is generally for employees of non-profit organizations." />
            </label>
            <input
              className={`min-w-[140px] rounded-[8px] p-[0.6rem] w-full outline-none duration-300 ${
                isNegative(resp)
                  ? "border-red-500 border-[2px]"
                  : "border-[#838383] border-[1px]"
              }`}
              type="number"
              placeholder={`0`}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
              onChange={(e) =>
                dispatch(
                  updateAsset({
                    category: "savingsInvestment",
                    key: "k401&b403",
                    value: Number(e.target.value),
                  })
                )
              }
            />
          </div>
          <div>
            <label
              className="flex items-center gap-1 font-semibold"
              htmlFor="realEstate"
            >
              <span className="text-nowrap">Roth 401(k) & 403(b)</span>{" "}
              <CustomTooltip title="Similar to a Traditional 401(k) or 403(b), but with a Roth 401(k) or Roth 403(b), contributions are made with after-tax income. Qualified withdrawals in retirement are tax-free. These plans are offered by employers and may have matching contributions." />
            </label>
            <input
              className={`min-w-[140px] rounded-[8px] p-[0.6rem] w-full outline-none duration-300 ${
                isNegative(resp)
                  ? "border-red-500 border-[2px]"
                  : "border-[#838383] border-[1px]"
              }`}
              type="number"
              placeholder={`0`}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
              onChange={(e) =>
                dispatch(
                  updateAsset({
                    category: "savingsInvestment",
                    key: "rothK401&b403",
                    value: Number(e.target.value),
                  })
                )
              }
            />
          </div>
          <div>
            <label
              className="flex items-center gap-1 font-semibold"
              htmlFor="realEstate"
            >
              <span className="text-nowrap">457 Plan</span>{" "}
              <CustomTooltip title="A 457 plan is a tax-advantaged retirement savings plan available to government and certain non-profit employees in the U.S. Contributions are made with pre-tax income, and taxes are paid upon withdrawal. Some 457 plans allow in-service withdrawals while still employed." />
            </label>
            <input
              className={`min-w-[140px] rounded-[8px] p-[0.6rem] w-full outline-none duration-300 ${
                isNegative(resp)
                  ? "border-red-500 border-[2px]"
                  : "border-[#838383] border-[1px]"
              }`}
              type="number"
              placeholder={`0`}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
              onChange={(e) =>
                dispatch(
                  updateAsset({
                    category: "savingsInvestment",
                    key: "america457",
                    value: Number(e.target.value),
                  })
                )
              }
            />
          </div>
          <div>
            <label
              className="flex items-center gap-1 font-semibold"
              htmlFor="realEstate"
            >
              <span className="text-nowrap">Thrift Savings Plan</span>{" "}
              <CustomTooltip title="The TSP is a U.S. government-sponsored retirement savings plan available to federal employees and members of the uniformed services. It operates similarly to a 401(k) plan, offering tax-deferred contributions, with matching contributions from employers in certain cases." />
            </label>
            <input
              className={`min-w-[140px] rounded-[8px] p-[0.6rem] w-full outline-none duration-300 ${
                isNegative(resp)
                  ? "border-red-500 border-[2px]"
                  : "border-[#838383] border-[1px]"
              }`}
              type="number"
              placeholder={`0`}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
              onChange={(e) =>
                dispatch(
                  updateAsset({
                    category: "savingsInvestment",
                    key: "tSavingsPlan",
                    value: Number(e.target.value),
                  })
                )
              }
            />
          </div>
          <div>
            <label
              className="flex items-center gap-1 font-semibold"
              htmlFor="realEstate"
            >
              <span className="text-nowrap">SEP IRA</span>{" "}
              <CustomTooltip title="A SEP IRA is a retirement plan designed for self-employed individuals or small business owners. Employers contribute to their employees’ accounts, and the contributions are tax-deferred. SEP IRAs have higher contribution limits than Traditional IRAs." />
            </label>
            <input
              className={`min-w-[140px] rounded-[8px] p-[0.6rem] w-full outline-none duration-300 ${
                isNegative(resp)
                  ? "border-red-500 border-[2px]"
                  : "border-[#838383] border-[1px]"
              }`}
              type="number"
              placeholder={`0`}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
              onChange={(e) =>
                dispatch(
                  updateAsset({
                    category: "savingsInvestment",
                    key: "sepIra",
                    value: Number(e.target.value),
                  })
                )
              }
            />
          </div>
          <div>
            <label
              className="flex items-center gap-1 font-semibold"
              htmlFor="realEstate"
            >
              <span className="text-nowrap">SIMPLE IRA</span>{" "}
              <CustomTooltip title="A SIMPLE IRA is a retirement plan for small businesses and self-employed individuals. It allows both employees and employers to contribute, with tax-deferred growth. It is easier to administer than other retirement plans but has lower contribution limits than other employer-sponsored plans." />
            </label>
            <input
              className={`min-w-[140px] rounded-[8px] p-[0.6rem] w-full outline-none duration-300 ${
                isNegative(resp)
                  ? "border-red-500 border-[2px]"
                  : "border-[#838383] border-[1px]"
              }`}
              type="number"
              placeholder={`0`}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                e.currentTarget.blur()
              }
              onChange={(e) =>
                dispatch(
                  updateAsset({
                    category: "savingsInvestment",
                    key: "simpleIra",
                    value: Number(e.target.value),
                  })
                )
              }
            />
          </div>

          {/* Dynamic Input Fields */}
          {dynamicInputs.map((input) => (
            <div key={input.id}>
              <label
                className="flex items-center gap-1 font-semibold"
                htmlFor="realEstate"
              >
                <span className="text-nowrap">{input.label}</span>{" "}
                <Icon
                  className="text-[#838383] text-[1rem]"
                  icon="material-symbols:info-outline"
                />
              </label>
              <input
                className="border-[1px] border-[#838383] rounded-[8px] p-[0.6rem] w-full"
                type="number"
                name={input.label.trim().split(" ").join("")}
                value={input.value}
                placeholder={`0`}
                onChange={(e) => handleDynamicInputChange(e, input.id)}
                onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                  e.currentTarget.blur()
                }
                onKeyDown={handleKeyDownUtil}
              />
            </div>
          ))}

          {/* New Dynamic Input Field */}
          {showNewInputField && (
            <div className="mt-3 flex flex-col items-center">
              <div className="flex items-center justify-between md:gap-4 gap-2 w-full">
                <input
                  ref={dynamicFieldTitleRef}
                  className="border-[1px] border-[#838383] rounded-[5px]  px-1 py-[2px] flex-1"
                  type="text"
                  name="label"
                  value={newInput.label}
                  placeholder="Enter name"
                  onChange={handleInputChange}
                />
                <div className="flex items-center md:gap-3 gap-1">
                  <button
                    className="bg-[#000000] text-white font-semibold rounded px-2 py-[2px]"
                    onClick={handleSaveInput}
                  >
                    Save
                  </button>
                  <button onClick={handleRemoveNewInput}>
                    <Icon
                      className="text-[#FF0000] text-[1.7rem]"
                      icon="material-symbols:delete"
                    />
                  </button>
                </div>
              </div>
              <input
                className="border-[1px] border-[#838383] rounded-[8px] px-2 py-[8px] mt-[2px] w-full"
                type="number"
                name="value"
                value={newInput.value}
                placeholder={`0`}
                onChange={handleInputChange}
                onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                  e.currentTarget.blur()
                }
                onKeyDown={handleKeyDownUtil}
              />
            </div>
          )}

          {/* "+ Add More" button in Sub-menu Container */}
          <div>
            <div className="mb-1 opacity-0">
              <label
                className="flex items-center gap-1 font-medium"
                htmlFor="property"
              >
                <span className="text-nowrap">Real Estate Assets</span>{" "}
                <Icon
                  className="text-[#838383] text-[1rem] min-w-[1rem] min-h-[1rem]"
                  icon="material-symbols:info-outline"
                />
              </label>
            </div>
            <button
              className="font-semibold text-nowrap border-[1px] border-[#E5E5E5] rounded-[8px] py-[0.2rem] px-[1rem]"
              onClick={handleAddNewInput}
            >
              <span className="text-[1.3rem] pr-1">+</span> Add More Savings &
              Investments
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SAndIInputFields;
