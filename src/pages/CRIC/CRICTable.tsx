import { useAppSelector } from "../../redux/hooks";
import { numberWithCommas } from "../../utils/numberWithCommas";

type TItem = {
  OASAmount?: number;
  PPBenefitAmount?: number;
  age?: number;
  annualRIG?: number;
  employerPensionAmount?: number;
  otherIncomeAmount?: number;
  retirementSavingsAmount?: number;
};

function calculateTotalFields(item: TItem): number {
  if (!item.age) {
    return 0;
  }
  return Object.entries(item)
    ?.filter(
      ([key, value]) =>
        value !== undefined && // Exclude undefined fields
        key !== "age" && // Exclude 'age'
        key !== "annualRIG" // Exclude 'annualRIG'
    )
    .reduce((sum, [, value]) => sum + (value as number), 0); // Sum up the remaining values
}

import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal } from "antd";
import { useState } from "react";
import { isNegative } from "../../utils/isNegative";

function CRICTooltipWithTwoAccount({
  data,
}: {
  data: {
    TFSAAnnualBalance: number;
    NRAAnnualBalance: number;
    annualRetirementIncomeFromBothAccount: number;
    currency: string;
  };
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
          <h3 className="text-[1.3rem] font-semibold">
            TFSA + Non Registered Account(s)
          </h3>
          <div className="space-y-[0.5rem] text-[1rem]">
            <p>
              TFS Account :
              <span className="font-medium">
                {" "}
                {data.currency}
                {numberWithCommas(parseInt(data.TFSAAnnualBalance.toString()))}
              </span>
              <span className="font-medium ml-1">Annually</span>
            </p>
            <p>
              Non Reg. Account :{" "}
              <span className="font-medium">
                {data.currency}
                {numberWithCommas(parseInt(data.NRAAnnualBalance.toString()))}
              </span>
              <span className="font-medium ml-1">Annually</span>
            </p>
            <p>
              Both accounts :{" "}
              <span className="font-medium">
                {data.currency}
                {numberWithCommas(data.annualRetirementIncomeFromBothAccount)}
              </span>
              <span className="font-medium ml-1">Annually</span>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}

function CRICRetirementDifferenceModal({
  data,
}: {
  data: {
    retirementIncomeGoal: number;
    retirementIncome: number;
    difference: number;
    currency: string;
  };
}) {
  const { retirementIncomeGoal, retirementIncome, difference, currency } =
    data || {};
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Icon
        className={`min-w-[1.5rem] min-h-[1.5rem] inline-block ml-1 cursor-pointer hover:font-extrabold ${
          isNegative(difference)
            ? "text-red-300 hover:text-red-500"
            : "text-green-300 hover:text-green-500"
        }`}
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
        {isNegative(difference) ? (
          <div className="p-4 text-[1.2rem]">
            <p>
              You're almost there! Your estimated retirement income is{" "}
              <span className="font-semibold text-black">
                {currency}
                {numberWithCommas(retirementIncome)}
              </span>
              , but your goal is{" "}
              <span className="font-semibold text-black">
                {currency}
                {numberWithCommas(retirementIncomeGoal)}
              </span>
              —a difference of{" "}
              <span className="font-semibold text-black">
                {currency}
                {numberWithCommas(difference)}
              </span>
              . Small adjustments can help you bridge this gap and secure the
              retirement you deserve! 😢
            </p>
          </div>
        ) : (
          <div className="text-[1.2rem] p-4">
            Congratulations! 🎉 Your estimated retirement income is{" "}
            <span className="font-semibold text-black">
              {currency}
              {numberWithCommas(retirementIncome)}
            </span>
            , meeting your goal of{" "}
            <span className="font-semibold text-black">
              {currency}
              {numberWithCommas(retirementIncomeGoal)}
            </span>
            . You’re on track for the comfortable retirement you planned
            for—enjoy this well-deserved milestone! 😃
          </div>
        )}
      </Modal>
    </>
  );
}

export default function CRICTable() {
  const { currency } = useAppSelector((state) => state.globalCurrency);
  const {
    finalResult,
    generalInfo: { annualRetirementIncomeGoal },
    retirementSavings: { TFSA, NRA },
    employerPension: { pensionPlanType },
    otherIncome: { otherIncomeType },
    calculatedResult: {
      retirementSavingsResult: {
        TFSASavings: { annualRetirementIncome: TFSAAnnualRetirementIncome },
        nonRegAccountSavings: {
          annualRetirementIncome: NRAAnnualRetirementIncome,
        },
        annualRetirementIncomeFromBothAccount,
      },
    },
  } = useAppSelector((state) => state.CRICalculator);

  return (
    <section className="mt-[5rem]">
      <div className="overflow-x-auto rounded-[10px]">
        <table className="mb-[1.5rem] bg-[#F8F8F8] rounded-lg border-[1px] border-gray-300 shadow-md w-full text-center min-w-[600px] text-[14px]">
          <thead className="text-[1rem] font-extrabold bg-gray-800 text-white">
            <tr className="border-b-[1px] border-b-[#0000001A]">
              <th className="border-b-[1px] border-gray-200 p-4">Age</th>
              <th className="border-b-[1px] border-gray-200 p-4">Canada Pension Plan</th>
              <th className="border-b-[1px] border-gray-200 p-4">Old Age Security</th>
              <th className="border-b-[1px] border-gray-200 p-4">Employer Pension/{pensionPlanType}</th>
              <th className="border-b-[1px] border-gray-200 p-4">
                Accumulated Savings (
                {TFSA.hasTFSA == "Yes" && NRA.hasNRA == "Yes"
                  ? "TFSA + Non Reg. Account(s)"
                  : TFSA.hasTFSA == "Yes"
                  ? "TFSA"
                  : NRA.hasNRA == "Yes"
                  ? "Non Reg. Account(s)"
                  : ""}
                )
                {TFSA.hasTFSA == "Yes" && NRA.hasNRA == "Yes" && (
                  <CRICTooltipWithTwoAccount
                    data={{
                      TFSAAnnualBalance: TFSAAnnualRetirementIncome,
                      NRAAnnualBalance: NRAAnnualRetirementIncome,
                      annualRetirementIncomeFromBothAccount,
                      currency,
                    }}
                  />
                )}
              </th>
              <th className="border-b-[1px] border-gray-200 p-4">Other Income/{otherIncomeType}</th>

              <th className="border-b-[1px] border-gray-200 p-4 min-w-[170px]">
                Total Estimated Retirement Income
              </th>
            </tr>
          </thead>
          <tbody>
            {finalResult?.map((item: TItem, index: number) => {
              const {
                age,
                OASAmount,
                PPBenefitAmount,
                employerPensionAmount,
                otherIncomeAmount,
                retirementSavingsAmount,
              } = item || {};
              const difference =
                calculateTotalFields(item) - Number(annualRetirementIncomeGoal);
              return (
                <tr
                  key={index}
                  className="border-b-[1px] border-b-[#0000001A] hover:bg-gray-200"
                >
                  <td className="border-b-[1px] border-gray-200 p-4">{age}</td>
                  <td className="border-b-[1px] border-gray-200 p-4">
                    {currency}
                    {PPBenefitAmount ? numberWithCommas(PPBenefitAmount) : 0}
                  </td>
                  <td className="border-b-[1px] border-gray-200 p-4">
                    {currency}
                    {OASAmount
                      ? numberWithCommas(parseInt(OASAmount?.toString()))
                      : 0}
                  </td>
                  <td className="border-b-[1px] border-gray-200 p-4">
                    {currency}
                    {employerPensionAmount
                      ? numberWithCommas(employerPensionAmount)
                      : 0}
                  </td>
                  <td className="border-b-[1px] border-gray-200 p-4">
                    {currency}
                    {retirementSavingsAmount
                      ? numberWithCommas(retirementSavingsAmount)
                      : 0}
                  </td>
                  <td className="border-b-[1px] border-gray-200 p-4">
                    {currency}
                    {otherIncomeAmount
                      ? numberWithCommas(otherIncomeAmount)
                      : 0}
                  </td>

                  <td
                    className={`border-b-[1px] border-gray-200 p-4 flex items-center justify-center ${
                      isNegative(difference)
                        ? "text-red-500 font-medium"
                        : "text-green-500"
                    }`}
                  >
                    {currency}
                    {calculateTotalFields(item)
                      ? numberWithCommas(
                          parseInt(calculateTotalFields(item)?.toString())
                        )
                      : 0}
                    {isNegative(difference) ? (
                      <span className="text-[1.3rem] ml-1">😢</span>
                    ) : (
                      <span className="text-[1.3rem] ml-1">😃</span>
                    )}
                    <CRICRetirementDifferenceModal
                      data={{
                        retirementIncomeGoal: Number(
                          annualRetirementIncomeGoal
                        ),
                        retirementIncome: parseInt(
                          calculateTotalFields(item)?.toString()
                        ),
                        difference,
                        currency,
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}