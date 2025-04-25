import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal } from "antd";
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { numberWithCommas } from "../../utils/numberWithCommas";

export function OtherIncomeViewModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    calculatedResult: {
      otherIncomeResult: { addedOtherIncomesList },
    },
    otherIncome: { otherIncomeType, otherIncomeAmount, otherIncomeFrequency },
  } = useAppSelector((state) => state.CRICalculator);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const modifiedOtherIncomeAddedList = addedOtherIncomesList?.map((item) => {
    const otherIncomeAnnualAmount =
      Number(item?.otherIncomeAmount) * Number(item?.otherIncomeFrequency);
    return {
      otherIncomeType: item.otherIncomeType,
      otherIncomeAnnualAmount,
    };
  });

  if (
    otherIncomeType !== "Select One" &&
    otherIncomeAmount.trim() &&
    otherIncomeFrequency.trim()
  ) {
    const otherIncomeAnnualAmount =
      Number(otherIncomeAmount) * Number(otherIncomeFrequency);
    modifiedOtherIncomeAddedList?.push({
      otherIncomeType,
      otherIncomeAnnualAmount,
    });
  }

  const totalIncome = modifiedOtherIncomeAddedList?.reduce(
    (total: number, curr) => {
      return Number(curr.otherIncomeAnnualAmount) + total;
    },
    0
  );

  return (
    <>
      <Icon
        className="text-gray-400 hover:text-white hover:font-extrabold md:min-w-[1.5rem] min-w-[1.2rem] md:min-h-[1.5rem] min-h-[1.2rem] inline-block ml-1 cursor-pointer"
        icon="material-symbols:info-outline"
        onClick={() => showModal()}
      />
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closeIcon={
          <Icon
            className="text-red-500 border-[1px] border-red-500 rounded-sm p-[1px]"
            icon="gridicons:cross"
            width="24"
            height="24"
          />
        }
      >
        <div className="space-y-[1rem]">
          <h3 className="text-[1.3rem] font-semibold">Your Added Other Incomes</h3>
          <ul className="space-y-[0.5rem] text-[1rem]">
            {modifiedOtherIncomeAddedList?.map((item, index) => {
              return (
                <li key={index}>
                  <span>{item.otherIncomeType}</span> :{" "}
                  <span className="font-semibold">
                    {numberWithCommas(item?.otherIncomeAnnualAmount)}
                  </span>
                  <span className="font-semibold ml-1">Annually</span>
                </li>
              );
            })}

            <li className="font-semibold">
              <span>Total Other Income</span> :{" "}
              <span className="font-semibold">
                {numberWithCommas(Number(totalIncome))}
              </span>
              <span className="font-semibold ml-1">Annually</span>
            </li>
          </ul>
        </div>
      </Modal>
    </>
  );
}
