import { Icon } from "@iconify/react/dist/iconify.js";
import { Input, Modal, Select } from "antd";
import { useState } from "react";
import { antYesNoSelectOptions } from "./options/selectOptions";
import { TAntSelectOption } from "./TAntSelectOption";
import { TEmployerPension } from "../../redux/features/CRIC/CRIC.types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateAddedEmployerPension } from "../../redux/features/CRIC/CRICSlice";
import { handleKeyDownUtil } from "../../utils/handleKeyDownUtil";
import { toast } from "react-toastify";

// Pension Plan Options
const pensionPlanTypeOptions: TAntSelectOption[] = [
  { value: "Select One", label: "Select One" },
  { value: "Defined Benefit Plan", label: "Defined Benefit Plan" },
  { value: "Defined Contribution Plan", label: "Defined Contribution Plan" },
  { value: "RRIF/RRSP Plan", label: "RRIF/RRSP Plan" },
];

const employerPensionStartReceivingAgesOptions = [
  { value: "Select One", label: "Select One" },
];
for (let i = 50; i <= 100; i++) {
  employerPensionStartReceivingAgesOptions.push({
    value: i.toString(),
    label: i.toString(),
  });
}

export default function EditAddedEmployerPensionModal({
  index,
  item,
}: {
  index: number;
  item: TEmployerPension;
}) {
  const dispatch = useAppDispatch();
  const {
    generalInfo: { lifeExpectency },
  } = useAppSelector((state) => state.CRICalculator);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    annualPension,
    inflationRate,
    isIndexedToInflation,
    pensionPlanType,
    pensionReceivingAge,
  } = item || {};

  const [type, setType] = useState(pensionPlanType);
  const [amount, setAmount] = useState(annualPension);
  const [startAge, setStartAge] = useState(pensionReceivingAge);
  const [rate, setRate] = useState(inflationRate);
  const [isIndexed, setIsIndexed] = useState(isIndexedToInflation);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setType(pensionPlanType);
    setAmount(annualPension);

    setStartAge(pensionReceivingAge);
    setRate(inflationRate);
    setIsIndexed(isIndexedToInflation);
  };

  const handleUpdateAddedEmployerPension = (index: number) => {
    dispatch(
      updateAddedEmployerPension({
        index,
        item: {
          annualPension: amount,
          inflationRate: rate,
          isIndexedToInflation: isIndexed,
          pensionPlanType: type,
          pensionReceivingAge: startAge,
          pensionStopReceivingAge: lifeExpectency,
        },
      })
    );
    toast.success("Successfully Updated.");
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
              Edit Employer Pension Plan
            </h3>
            <Icon
              onClick={handleCancel}
              className="text-red-500 text-[1.8rem] cursor-pointer"
              icon="material-symbols:close"
            />
          </div>

          <section className="grid grid-cols-2 gap-3">
            <div>
              <div className="font-semibold mb-2">
                <p>Select Pension Plan Type:</p>
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
                options={pensionPlanTypeOptions}
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
              <div className="font-semibold mb-2">
                <p>Annual Pension Amount:</p>
              </div>
              <Input
                size="large"
                style={{
                  height: 45,
                  width: "100%",
                  border: "1px solid #838383",
                  borderRadius: "8px",
                }}
                variant="borderless"
                placeholder="Enter your estimated annual pension amount"
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                onKeyDown={handleKeyDownUtil}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                value={amount}
              />
            </div>

            <div>
              <div className="font-semibold mb-2">
                <p>Pension Receiving Age:</p>
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
                options={employerPensionStartReceivingAgesOptions}
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
              <div className="flex items-end gap-2 font-semibold mb-2">
                <p>Indexed to inflation?</p>
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
                options={antYesNoSelectOptions}
                suffixIcon={
                  <Icon
                    className="text-[1.5rem] text-gray-600"
                    icon="iconamoon:arrow-down-2"
                  />
                }
                onChange={(value) => {
                  setIsIndexed(value);
                }}
                value={isIndexed}
              ></Select>
            </div>

            {isIndexed == "No" && (
              <div>
                <div className="font-semibold flex items-end gap-1 mb-2">
                  <p>Inflation rate:</p>
                </div>
                <Input
                  size="large"
                  style={{
                    height: 45,
                    width: "100%",
                    border: "1px solid #838383",
                    borderRadius: "8px",
                  }}
                  variant="borderless"
                  type="number"
                  placeholder="Enter your estimated income"
                  onWheel={(e) => e.currentTarget.blur()}
                  onKeyDown={handleKeyDownUtil}
                  onChange={(e) => {
                    setRate(e.target.value);
                  }}
                  value={rate}
                />
              </div>
            )}
          </section>

          <button
            onClick={() => handleUpdateAddedEmployerPension(index)}
            className="text-white w-full rounded-[10px] py-[0.8rem] flex justify-center items-center h-[50px] bg-black"
          >
            Save
          </button>
        </div>
      </Modal>
    </>
  );
}
