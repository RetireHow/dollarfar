import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal, Select } from "antd";
import { useState } from "react";
import { antSelectFrequencyOptions } from "./options/selectOptions";
import { TAntSelectOption } from "./TAntSelectOption";
import { TOtherIncomeItem } from "../../redux/features/CRIC/CRIC.types";
import { useAppDispatch } from "../../redux/hooks";
import { updateAddedOtherIncome } from "../../redux/features/CRIC/CRICSlice";
import { toast } from "react-toastify";

//Other Income Options
const otherIncomeAmountAnnuallyOptions: { value: string; label: string }[] = [];
for (let i = 100; i <= 35000; i = i + 100) {
  otherIncomeAmountAnnuallyOptions.push({
    value: i.toString(),
    label: i.toString(),
  });
}

const otherIncomeAmountSemiAnnuallyOptions: { value: string; label: string }[] =
  [];
for (let i = 100; i <= 17000; i = i + 100) {
  otherIncomeAmountSemiAnnuallyOptions.push({
    value: i.toString(),
    label: i.toString(),
  });
}

const otherIncomeAmountMonthlyOptions: { value: string; label: string }[] = [];
for (let i = 25; i <= 3000; i = i + 25) {
  otherIncomeAmountMonthlyOptions.push({
    value: i.toString(),
    label: i.toString(),
  });
}

const otherIncomeAmountWeeklyOptions: { value: string; label: string }[] = [];
for (let i = 25; i <= 700; i = i + 25) {
  otherIncomeAmountWeeklyOptions.push({
    value: i.toString(),
    label: i.toString(),
  });
}

const otherIncomeAmountBiWeeklyOptions: { value: string; label: string }[] = [];
for (let i = 25; i <= 1300; i = i + 25) {
  otherIncomeAmountBiWeeklyOptions.push({
    value: i.toString(),
    label: i.toString(),
  });
}

const otherIncomeAmountQuarterlyOptions: { value: string; label: string }[] =
  [];
for (let i = 100; i <= 900; i = i + 100) {
  otherIncomeAmountQuarterlyOptions.push({
    value: i.toString(),
    label: i.toString(),
  });
}

const otherIncomeTypeOptions: TAntSelectOption[] = [
  { value: "Employment", label: "Employment" },
  { value: "Rental Property", label: "Rental Property" },
  { value: "Business", label: "Business" },
  { value: "Annuities", label: "Annuities" },
  {
    value: "Pension from other Countries",
    label: "Pension from other Countries",
  },
];

const estimatedIncomeStartOrStopReceivingAgesOptions: {
  value: string;
  label: string;
}[] = [];
for (let i = 50; i <= 100; i++) {
  estimatedIncomeStartOrStopReceivingAgesOptions.push({
    value: i.toString(),
    label: i.toString(),
  });
}

export default function EditAddedOtherIncomeModal({
  index,
  item,
}: {
  index: number;
  item: TOtherIncomeItem;
}) {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    otherIncomeAmount,
    otherIncomeFrequency,
    otherIncomeStartReceivingAge,
    otherIncomeStopReceivingAge,
    otherIncomeType,
  } = item || {};

  const [type, setType] = useState(otherIncomeType);
  const [amount, setAmount] = useState(otherIncomeAmount);
  const [frequency, setFrequency] = useState(otherIncomeFrequency);
  const [startAge, setStartAge] = useState(otherIncomeStartReceivingAge);
  const [endAge, setEndAge] = useState(otherIncomeStopReceivingAge);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setType(otherIncomeType);
    setAmount(otherIncomeAmount);
    setFrequency(otherIncomeFrequency);
    setStartAge(otherIncomeStartReceivingAge);
    setEndAge(otherIncomeStopReceivingAge);
  };

  const handleUpdateAddedOtherIncome = (
    index: number
  ) => {
    dispatch(
      updateAddedOtherIncome({
        index,
        item: {
          otherIncomeAmount: amount,
          otherIncomeFrequency: frequency,
          otherIncomeStartReceivingAge: startAge,
          otherIncomeStopReceivingAge: endAge,
          otherIncomeType: type,
        },
      })
    );
    toast.success("Successfully Updated.")
    setIsModalOpen(false);
  };

  return (
    <>
      <p
        onClick={showModal}
        className="border-[1px] border-green-500 px-3 py-1 rounded-md text-green-500 cursor-pointer hover:bg-green-500 hover:text-white duration-300"
      >
        Edit
      </p>
      <Modal
        open={isModalOpen}
        closeIcon={false}
        footer={false}
        className="geist"
      >
        <div className="space-y-[1rem]">
          <div className="flex items-center justify-between">
            <h3 className="md:text-[1.5rem] text-[18px] font-bold">
              Edit Other Income
            </h3>
            <Icon
              onClick={handleCancel}
              className="text-red-500 text-[1.8rem] cursor-pointer"
              icon="material-symbols:close"
            />
          </div>

          <section className="grid grid-cols-2 gap-3">
            <div>
              <div className="font-semibold mb-1">
                <p>Select Income Type.</p>
              </div>
              <Select
                size="large"
                style={{
                  height: 45,
                  width: "100%",
                  border: "1px solid #838383",
                  borderRadius: "8px",
                }}
                variant="borderless"
                options={otherIncomeTypeOptions}
                suffixIcon={
                  <Icon
                    className="text-[1.5rem] text-gray-600"
                    icon="iconamoon:arrow-down-2"
                  />
                }
                onChange={(value) => {
                  setType(value);
                }}
                value={type}
              ></Select>
            </div>
            <div>
              <div className="font-semibold mb-1">
                <p>Select income frequency.</p>
              </div>
              <Select
                size="large"
                style={{
                  height: 45,
                  width: "100%",
                  border: "1px solid #838383",
                  borderRadius: "8px",
                }}
                variant="borderless"
                options={antSelectFrequencyOptions}
                suffixIcon={
                  <Icon
                    className="text-[1.5rem] text-gray-600"
                    icon="iconamoon:arrow-down-2"
                  />
                }
                onChange={(value) => {
                  setFrequency(value);
                }}
                value={frequency}
              ></Select>
            </div>
            <div>
              <div className="font-semibold mb-1">
                <p>Select estimated income.</p>
              </div>
              <Select
                size="large"
                disabled={otherIncomeFrequency == "Select One" ? true : false}
                showSearch
                style={{
                  height: 45,
                  width: "100%",
                  border: "1px solid #838383",
                  borderRadius: "8px",
                }}
                className={`${
                  otherIncomeFrequency == "Select One"
                    ? "bg-gray-100 !border-gray-200"
                    : ""
                }`}
                variant="borderless"
                options={
                  otherIncomeFrequency == "1"
                    ? otherIncomeAmountAnnuallyOptions
                    : otherIncomeFrequency == "2"
                    ? otherIncomeAmountSemiAnnuallyOptions
                    : otherIncomeFrequency == "12"
                    ? otherIncomeAmountMonthlyOptions
                    : otherIncomeFrequency == "52"
                    ? otherIncomeAmountWeeklyOptions
                    : otherIncomeFrequency == "26"
                    ? otherIncomeAmountBiWeeklyOptions
                    : otherIncomeFrequency == "4"
                    ? otherIncomeAmountQuarterlyOptions
                    : []
                }
                suffixIcon={
                  <Icon
                    className="text-[1.5rem] text-gray-600"
                    icon="iconamoon:arrow-down-2"
                  />
                }
                onChange={(value) => {
                  setAmount(value);
                }}
                value={amount}
              ></Select>
            </div>
            <div>
              <div className="font-semibold mb-1">
                <p>Select receiving age.</p>
              </div>
              <Select
                size="large"
                showSearch
                style={{
                  height: 45,
                  width: "100%",
                  border: "1px solid #838383",
                  borderRadius: "8px",
                }}
                variant="borderless"
                options={estimatedIncomeStartOrStopReceivingAgesOptions}
                suffixIcon={
                  <Icon
                    className="text-[1.5rem] text-gray-600"
                    icon="iconamoon:arrow-down-2"
                  />
                }
                onChange={(value) => {
                  setStartAge(value);
                }}
                value={startAge}
              ></Select>
            </div>
            <div>
              <div className="font-semibold mb-1">
                <p>Select stop receiving age</p>
              </div>
              <Select
                size="large"
                showSearch
                style={{
                  height: 45,
                  width: "100%",
                  border: "1px solid #838383",
                  borderRadius: "8px",
                }}
                variant="borderless"
                options={estimatedIncomeStartOrStopReceivingAgesOptions}
                suffixIcon={
                  <Icon
                    className="text-[1.5rem] text-gray-600"
                    icon="iconamoon:arrow-down-2"
                  />
                }
                onChange={(value) => {
                  setEndAge(value);
                }}
                value={endAge}
              ></Select>
            </div>
          </section>

          <button
            onClick={() => handleUpdateAddedOtherIncome(index)}
            className="text-white w-full rounded-[10px] py-[0.8rem] flex justify-center items-center h-[50px] bg-black"
          >
            Save
          </button>
        </div>
      </Modal>
    </>
  );
}
