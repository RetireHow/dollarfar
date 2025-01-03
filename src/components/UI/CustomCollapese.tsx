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

  const headerItems: CollapseProps["items"] = COLCModifiedCostData?.map(
    (item) => {
      const {
        category,
        city1TotalCost,
        city2TotalCost,
        totalLivingIndex,
        items,
      } = item || {};
      return {
        key: category,
        label: (
          <div className="grid grid-cols-4 gap-5 font-bold md:text-[18px] text-[14px]">
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
          <div className="space-y-3 rounded-lg p-2 border-[1px] border-gray-200 shadow-sm bg-gray-100">
            {items?.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-5 text-[16px] border-b-[1px] border-gray-300 pb-3 font-medium"
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
      };
    }
  );

  return (
    <Collapse
      rootClassName="bg-gray-100"
      expandIconPosition="end"
      expandIcon={(panelProps) => {
        const { isActive } = panelProps;
        return (
          <div>
            {isActive ? (
              <Icon icon="iconamoon:arrow-up-2-light" width="35" height="35" />
            ) : (
              <Icon
                icon="iconamoon:arrow-down-2-light"
                width="35"
                height="35"
              />
            )}
          </div>
        );
      }}
      items={headerItems}
      className="rounded-none"
    />
  );
}
