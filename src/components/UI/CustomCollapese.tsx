import { Icon } from "@iconify/react/dist/iconify.js";
import { Collapse } from "antd";
import type { CollapseProps } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { isNegative } from "../../utils/isNegative";
import { useEffect } from "react";
import {
  setCity1SubTotalCost,
  setCity2SubTotalCost,
  setFromCityCurrencySymbol,
  setSubTotalIndex,
  setToCityCurrencySymbol,
} from "../../redux/features/COLC/COLCSlice";
import { numberWithCommas } from "../../utils/numberWithCommas";

export default function CustomCollapese() {
  const { COLCModifiedCostData } = useAppSelector(
    (state) => state.COLCalculator
  );
  const dispatch = useAppDispatch();
  const { selectedCityName1, selectedCityName2 } = useAppSelector(
    (state) => state.COLCalculator
  );

  //Calculate subtotal
  const city1SubTotalCost = COLCModifiedCostData?.reduce((prev, curr) => {
    return curr.city1TotalCost + prev;
  }, 0);
  const city1OtherCurrencySubTotalCost = COLCModifiedCostData?.reduce(
    (prev, curr) => {
      // if (curr.category == "Salaries And Financing") {
      //   return 0 + prev;
      // }
      return curr.city1TotalCostOtherCurrencyPrice + prev;
    },
    0
  );

  const city2SubTotalCost = COLCModifiedCostData?.reduce((prev, curr) => {
    return curr.city2TotalCost + prev;
  }, 0);
  const city2OtherCurrencySubTotalCost = COLCModifiedCostData?.reduce(
    (prev, curr) => {
      return curr.city2TotalCostOtherCurrencyPrice + prev;
    },
    0
  );
  const subTotalIndex =
    ((Number(city2OtherCurrencySubTotalCost?.toFixed(2)) -
      Number(city1SubTotalCost?.toFixed(2))) /
      Number(city1SubTotalCost?.toFixed(2))) *
    100;

  const { city1TotalCostCurrencySymbol, city2TotalCostCurrencySymbol } =
    COLCModifiedCostData[0] || {};

  useEffect(() => {
    dispatch(setCity1SubTotalCost(city1SubTotalCost));
    dispatch(setCity2SubTotalCost(city2OtherCurrencySubTotalCost));
    dispatch(setSubTotalIndex(subTotalIndex));
    dispatch(setFromCityCurrencySymbol(city1TotalCostCurrencySymbol));
    dispatch(setToCityCurrencySymbol(city2TotalCostCurrencySymbol));
  }, [
    COLCModifiedCostData,
    dispatch,
    city1SubTotalCost,
    city2OtherCurrencySubTotalCost,
    subTotalIndex,
    city2TotalCostCurrencySymbol,
    city1TotalCostCurrencySymbol,
  ]);

  const headerItems: CollapseProps["items"] = [
    {
      key: "5635645",
      label: (
        <div
          onClick={(d) => {
            d.preventDefault();
          }}
          className="grid grid-cols-4 gap-5 font-medium text-[20px]"
        >
          <p>Category</p>
          <div className="ml-3 relative" title="City you are moving from">
            {selectedCityName1 && (
              <p className="text-[14px] text-green-500 absolute top-[-0.9rem]">
                City From
              </p>
            )}
            <p>{selectedCityName1}</p>
          </div>

          <div className="ml-5 relative" title="City you are moving to">
            {selectedCityName2 && (
              <p className="text-[14px] text-green-500 absolute top-[-0.9rem]">
                City To
              </p>
            )}
            <p className="text-orange-700">{selectedCityName2}</p>
          </div>
          <p className="ml-8">Difference</p>
        </div>
      ),
      children: "",
    },
  ];

  COLCModifiedCostData?.map((item) => {
    const {
      category,
      city1TotalCost,
      city2TotalCost,
      totalLivingIndex,
      items,
      city1TotalCostCurrencySymbol,
      city2TotalCostCurrencySymbol,

      city1TotalCostOtherCurrencyPrice,
      city2TotalCostOtherCurrencyPrice,
    } = item || {};
    headerItems.push({
      key: category,
      label: (
        <div className="grid grid-cols-4 gap-5 font-medium md:text-[18px] text-[16px]">
          <p className="flex items-center gap-1">
            {category == "Restaurants" ? (
              <Icon icon="ri:restaurant-2-fill" width="24" height="24" />
            ) : category == "Markets" ? (
              <Icon icon="mdi:cart" width="24" height="24" />
            ) : category == "Transportation" ? (
              <Icon icon="tabler:car-filled" width="24" height="24" />
            ) : category == "Rent Per Month" ? (
              <Icon icon="fa6-solid:bed" width="24" height="24" />
            ) : category == "Utilities (Monthly)" ? (
              <Icon icon="healthicons:electricity" width="24" height="24" />
            ) : category == "Buy Apartment Price" ? (
              <Icon icon="material-symbols:apartment" width="24" height="24" />
            ) : category == "Salaries And Financing" ? (
              <Icon icon="mingcute:wallet-fill" width="24" height="24" />
            ) : category == "Sports And Leisure" ? (
              <Icon icon="maki:bicycle-share" width="24" height="24" />
            ) : category == "Clothing And Shoes" ? (
              <Icon icon="map:clothing-store" width="24" height="24" />
            ) : category == "Childcare" ? (
              <Icon icon="healthicons:child-care" width="24" height="24" />
            ) : (
              ""
            )}
            <span>{category}</span>
          </p>
          <div>
            <p className="ml-3">
              {city1TotalCostCurrencySymbol}{" "}
              {numberWithCommas(Number(city1TotalCost.toFixed(2)))}
            </p>
            <p className="ml-3 text-orange-700">
              ({city2TotalCostCurrencySymbol}{" "}
              {numberWithCommas(
                Number(city1TotalCostOtherCurrencyPrice.toFixed(2))
              )}
              )
            </p>
          </div>

          <div>
            <p className="ml-5">
              {city1TotalCostCurrencySymbol}{" "}
              {numberWithCommas(
                Number(city2TotalCostOtherCurrencyPrice.toFixed(2))
              )}
            </p>
            <p className="ml-5 text-orange-700">
              ({city2TotalCostCurrencySymbol}{" "}
              {numberWithCommas(Number(city2TotalCost.toFixed(2)))})
            </p>
          </div>

          <p
            className={`ml-8 flex items-center ${
              isNegative(totalLivingIndex) ? "text-[#4CAF50]" : "text-red-500"
            }`}
          >
            {isNegative(totalLivingIndex)
              ? `${totalLivingIndex.toFixed(2)}`
              : `+${totalLivingIndex.toFixed(2)}`}
            <span className="ml-1">%</span>
          </p>
        </div>
      ),
      children: (
        <div className="space-y-3 rounded-lg p-2 border-[1px] border-gray-200 bg-[#FFF] shadow-lg">
          {items?.map((item, index) => {
            const {
              itemName,
              city1ItemPrice,
              city2ItemPrice,
              city1CurrencySymbol,
              city2CurrencySymbol,
              livingIndex,
              city1OtherCurrencyItemPrice,
              city2OtherCurrencyItemPrice,
            } = item || {};
            return (
              <div
                key={index}
                className="grid grid-cols-4 gap-5 md:text-[16px] text-[14px] border-b-[1px] border-gray-300 pb-3"
              >
                <p className="flex items-center">{itemName}</p>
                {Number(city1ItemPrice) ? (
                  <div>
                    <p>
                      {city1CurrencySymbol}{" "}
                      {numberWithCommas(Number(city1ItemPrice.toFixed(2)))}
                    </p>
                    <p className="text-orange-700">
                      ({city2CurrencySymbol}{" "}
                      {numberWithCommas(
                        Number(city1OtherCurrencyItemPrice.toFixed(2))
                      )}
                      )
                    </p>
                  </div>
                ) : (
                  <p>N/A</p>
                )}

                {Number(city2ItemPrice) ? (
                  <div>
                    <p>
                      {city1CurrencySymbol}{" "}
                      {numberWithCommas(
                        Number(city2OtherCurrencyItemPrice.toFixed(2))
                      )}
                    </p>
                    <p className="text-orange-700">
                      ({city2CurrencySymbol}{" "}
                      {numberWithCommas(Number(city2ItemPrice.toFixed(2)))})
                    </p>
                  </div>
                ) : (
                  <p>N/A</p>
                )}
                <p
                  className={`flex items-center ${
                    isNegative(livingIndex) ? "text-[#4CAF50]" : "text-red-500"
                  }`}
                >
                  {isNegative(item?.livingIndex)
                    ? `${livingIndex.toFixed(2)}`
                    : `+${livingIndex.toFixed(2)}`}
                  <span className="ml-1">%</span>
                </p>
              </div>
            );
          })}
        </div>
      ),
    });
  });

  return (
    <div>
      <p className="text-right flex items-center justify-end gap-1 md:text-[1.2rem] text-[1rem] font-medium text-gray-600">
        <span>Click on row or down arrow</span>
        (
        <Icon
          className="text-black font-extrabold"
          icon="iconamoon:arrow-down-2-light"
          width="35"
          height="35"
        />
        ) to
        <span>see details.</span>
      </p>
      <Collapse
        rootClassName="bg-[#F8F8F8]"
        expandIconPosition="end"
        expandIcon={(panelProps) => {
          const { isActive, panelKey } = panelProps as {
            isActive: boolean;
            panelKey: number;
          };

          return (
            <>
              {panelKey == 5635645 ? (
                <div className="font-bold relative w-[40px] h-[40px]"></div>
              ) : (
                <div>
                  {isActive ? (
                    <div className="mt-9">
                      <Icon
                        icon="iconamoon:arrow-up-2-light"
                        width="35"
                        height="35"
                      />
                    </div>
                  ) : (
                    <div
                      title="Click here to expand and see details"
                      className="mt-9"
                    >
                      <Icon
                        icon="iconamoon:arrow-down-2-light"
                        width="35"
                        height="35"
                      />
                    </div>
                  )}
                </div>
              )}
            </>
          );
        }}
        items={headerItems}
        className="rounded-none"
      />
      {/* Footer  */}
      <div className="grid grid-cols-4 font-semibold border-[1px] border-gray-300 px-4 py-3  text-[16px] bg-[#F8F8F8]">
        <p className="flex items-center">
          <Icon
            className="mr-1"
            icon="fluent-mdl2:total"
            width="20"
            height="20"
          />
          <span>Total</span>
        </p>
        <div>
          <p className="ml-[6px]">
            {city1TotalCostCurrencySymbol}{" "}
            {numberWithCommas(Number(city1SubTotalCost?.toFixed(2)))}
          </p>
          <p className="ml-[6px] text-orange-700">
            ({city2TotalCostCurrencySymbol}{" "}
            {numberWithCommas(
              Number(city1OtherCurrencySubTotalCost?.toFixed(2))
            )}
            )
          </p>
        </div>
        <div>
          <p className="ml-[6px]">
            {city1TotalCostCurrencySymbol}{" "}
            {numberWithCommas(
              Number(city2OtherCurrencySubTotalCost?.toFixed(2))
            )}
          </p>
          <p className="ml-[6px] text-orange-700">
            ({city2TotalCostCurrencySymbol}{" "}
            {numberWithCommas(Number(city2SubTotalCost?.toFixed(2)))})
          </p>
        </div>
        <p
          className={`ml-3 flex items-center ${
            isNegative(subTotalIndex) ? "text-[#4CAF50]" : "text-red-500"
          }`}
        >
          {isNegative(subTotalIndex)
            ? `${subTotalIndex.toFixed(2)}`
            : `+${subTotalIndex.toFixed(2)}`}
          <span className="ml-1">%</span>
        </p>
      </div>
    </div>
  );
}
