import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal } from "antd";
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { numberWithCommas } from "../../utils/numberWithCommas";

export function EmployerPensionViewModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    calculatedResult: {
      employerPensionResult: { addedEmployerPensionsList },
    },
    employerPension: {
      pensionPlanType,
      annualPension,
      isIndexedToInflation,
      inflationRate,
    },
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

  const modifiedEmployerPensionList = addedEmployerPensionsList?.map((item) => {
    return {
      pensionPlanType: item.pensionPlanType,
      annualPension: item.annualPension,
      isIndexedToInflation: item.isIndexedToInflation,
      inflationRate: item.inflationRate,
    };
  });

  if (pensionPlanType !== "Select One" && annualPension.trim()) {
    modifiedEmployerPensionList?.push({
      pensionPlanType,
      annualPension,
      isIndexedToInflation,
      inflationRate,
    });
  }

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
          <h3 className="text-[1.3rem] font-semibold">Your Added Plans</h3>
          <ul className="space-y-[0.5rem] text-[1rem]">
            {modifiedEmployerPensionList?.map((item, index) => {
              return (
                <li key={index}>
                  <span>{item.pensionPlanType}</span> :{" "}
                  <span className="font-semibold">
                    {numberWithCommas(Number(item?.annualPension))}
                  </span>
                  {item.inflationRate.trim() &&
                    item.isIndexedToInflation == "No" && (
                      <span className="ml-1 text-gray-600">
                        (
                        <span className="text-orange-600 font-medium">
                          <svg
                            className="inline-block w-4 h-4 mr-1 text-orange-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 2a1 1 0 01.894.553l7 14A1 1 0 0117 18H3a1 1 0 01-.894-1.447l7-14A1 1 0 0110 2zM10 7a1 1 0 100 2 1 1 0 000-2zm1 4H9v4h2v-4z" />
                          </svg>
                          Inflation Rate:{" "}
                          <span className="font-semibold">
                            {item.inflationRate}%
                          </span>
                        </span>{" "}
                        Applicable)
                      </span>
                    )}
                </li>
              );
            })}
          </ul>
        </div>
      </Modal>
    </>
  );
}
