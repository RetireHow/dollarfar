import { Icon } from "@iconify/react/dist/iconify.js";
import { Collapse } from "antd";
import type { CollapseProps } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { isNegative } from "../../utils/isNegative";

export default function CustomCollapese() {
  const { COLCModifiedCostData } = useAppSelector(
    (state) => state.COLCalculator
  );
  const { currency } = useAppSelector((state) => state.globalCurrency);
  const { selectedCityName1, selectedCityName2 } = useAppSelector(
    (state) => state.COLCalculator
  );

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
          <p>Name</p>
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
            <p>{selectedCityName2}</p>
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
    } = item || {};
    headerItems.push({
      key: category,
      label: (
        <div className="grid grid-cols-4 gap-5 font-medium md:text-[18px] text-[16px]">
          <p>{category}</p>
          <p className="ml-3">
            {currency}
            {city1TotalCost}
          </p>
          <p className="ml-5">
            {currency}
            {city2TotalCost}
          </p>
          <p className="ml-8 text-[#4CAF50]">
            {isNegative(totalLivingIndex)
              ? `${totalLivingIndex}`
              : `+${totalLivingIndex}`}
            <span className="ml-1">%</span>
          </p>
        </div>
      ),
      children: (
        <div className="space-y-3 rounded-lg p-2 border-[1px] border-gray-200 shadow-sm bg-[#FFF]">
          {items?.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-5 md:text-[16px] text-[14px] border-b-[1px] border-gray-300 pb-3 font-medium"
            >
              <p>{item?.itemName}</p>
              <p>
                {currency}
                {item?.city1ItemPrice}
              </p>
              <p>
                {currency}
                {item?.city2ItemPrice}
              </p>
              <p className="text-[#4CAF50]">
                {isNegative(item?.livingIndex)
                  ? `${item?.livingIndex}`
                  : `+${item?.livingIndex}`}
                <span className="ml-1">%</span>
              </p>
            </div>
          ))}
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
        rootClassName="bg-gray-100"
        expandIconPosition="end"
        expandIcon={(panelProps) => {
          const { isActive, panelKey } = panelProps as {
            isActive: boolean;
            panelKey: number;
          };

          return (
            <>
              {panelKey == 5635645 ? (
                <div className="font-bold relative w-[40px] h-[40px]">
                  {/* <img
                    className="w-[35px] rotate-180 absolute top-0 left-0"
                    src={clickAnimation}
                    alt="Click Animation"
                  />
                  <Icon
                    className="absolute top-5 left-1 rotating-icon"
                    icon="iconamoon:arrow-down-2-light"
                    width="35"
                    height="35"
                  /> */}
                </div>
              ) : (
                <div>
                  {isActive ? (
                    <Icon
                      icon="iconamoon:arrow-up-2-light"
                      width="35"
                      height="35"
                    />
                  ) : (
                    <div title="Click here to expand and see details">
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
    </div>
  );
}
