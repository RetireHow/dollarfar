import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import CRICTooltip from "../CRICTooltip";
import CRICRedStar from "../CRICRedStar";
import {
  calculateRetirementSavings,
  resetNRAWithSelectedNo,
  resetTFSAWithSelectedNo,
  updateAgeByAgeField,
  updateRetirementSavingsField,
} from "../../../redux/features/CRIC/CRICSlice";
import { handleKeyDownUtil } from "../../../utils/handleKeyDownUtil";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Input, Modal, Select } from "antd";
import { useState } from "react";
import MandatoryUserHints from "../MandatoryUserHints";
import Error from "../../../components/UI/Error";
import { toast } from "react-toastify";
import {
  antSelectFrequencyOptions,
  antYesNoSelectOptions,
} from "../options/selectOptions";

const TFSAorNRASavingsReceivingAgeOptions = [
  { value: "Select One", label: "Select One" },
];
for (let i = 50; i <= 100; i++) {
  TFSAorNRASavingsReceivingAgeOptions.push({
    value: i.toString(),
    label: i.toString(),
  });
}

function CRICTooltipWithLink() {
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
        className="text-[#838383] hover:text-black hover:font-extrabold min-w-[1.5rem] min-h-[1.5rem] inline-block md:ml-5 ml-4 cursor-pointer"
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
        <p className="text-[1.4rem] text-gray-500 p-3">
          <span>
            {" "}
            Please use E & Y personal tax calculator to estimate your average
            tax rate and input that value here. Here is the website link :{" "}
          </span>
          <a
            className="text-green-500"
            target="_blank"
            href="https://www.eytaxcalculators.com/en/2024-personal-tax-calculator.html"
          >
            https://www.eytaxcalculators.com/en/2024-personal-tax-calculator.html
          </a>
        </p>
      </Modal>
    </>
  );
}

export default function RetirementSavings() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);

  const {
    retirementSavings: {
      TFSA: {
        TFSAOngoingContributionAmount,
        TFSAOngoingContributionFrequency,
        TFSAcurrentTotal,
        TFSAreturnRate,
        hasTFSA,
      },
      NRA: {
        NRAOngoingContributionAmount,
        NRAOngoingContributionFrequency,
        NRAcurrentTotal,
        NRAreturnRate,
        NRAtaxRate,
        hasNRA,
      },
      TFSAorNRASavingsReceivingAge,
    },
  } = useAppSelector((state) => state.CRICalculator);

  const handleNext = () => {
    //Exclude the account when select No
    if (hasTFSA == "No") {
      dispatch(resetTFSAWithSelectedNo(undefined));
    }
    if (hasNRA == "No") {
      dispatch(resetNRAWithSelectedNo(undefined));
    }

    if (hasTFSA == "Yes" && hasNRA == "Yes") {
      if (
        !TFSAOngoingContributionAmount ||
        TFSAOngoingContributionFrequency == "Select One" ||
        !TFSAcurrentTotal ||
        !TFSAreturnRate ||
        TFSAorNRASavingsReceivingAge == "Select One" ||
        !NRAOngoingContributionAmount ||
        NRAOngoingContributionFrequency == "Select One" ||
        !NRAcurrentTotal ||
        !NRAreturnRate ||
        !NRAtaxRate ||
        TFSAorNRASavingsReceivingAge == "Select One"
      ) {
        toast.error("Please fill in the required fields.");
        return setShowError(true);
      }
      dispatch(calculateRetirementSavings(undefined));
    } else if (hasTFSA == "Yes") {
      if (
        !TFSAOngoingContributionAmount ||
        TFSAOngoingContributionFrequency == "Select One" ||
        !TFSAcurrentTotal ||
        !TFSAreturnRate ||
        TFSAorNRASavingsReceivingAge == "Select One"
      ) {
        toast.error("Please fill in the required fields.");
        return setShowError(true);
      }
      dispatch(calculateRetirementSavings(undefined));
    } else if (hasNRA == "Yes") {
      if (
        !NRAOngoingContributionAmount ||
        NRAOngoingContributionFrequency == "Select One" ||
        !NRAcurrentTotal ||
        !NRAreturnRate ||
        !NRAtaxRate ||
        TFSAorNRASavingsReceivingAge == "Select One"
      ) {
        toast.error("Please fill in the required fields.");
        return setShowError(true);
      }
      dispatch(calculateRetirementSavings(undefined));
    } else {
      dispatch(
        updateAgeByAgeField({
          mainKey: "retirementSavingsResult",
          subKey: "retirementSavingsAgeByAge",
        })
      );
      dispatch(resetTFSAWithSelectedNo(undefined));
      dispatch(resetNRAWithSelectedNo(undefined));
    }

    if (
      TFSAOngoingContributionFrequency == "0" &&
      Number(TFSAOngoingContributionAmount) > 0
    ) {
      toast.error("Please select ongoing contribution frequency for TFSA");
      return setShowError(true);
    }

    if (
      NRAOngoingContributionFrequency == "0" &&
      Number(NRAOngoingContributionAmount) > 0
    ) {
      toast.error(
        "Please select ongoing contribution frequency for non registered account(s)."
      );
      return setShowError(true);
    }
    navigate("/CRIC/other-income");
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    window.scrollTo({ top: 330, behavior: "smooth" });
  }, []);

  return (
    <main>
      <section className="space-y-[2rem] md:text-[1rem] text-[14px]">
        <h3 className="font-extrabold md:text-[2rem] text-[18px]">
          Accumulated Savings(TFSA/Non Registered Account(s))
        </h3>

        <MandatoryUserHints />

        <div>
          <div className="font-semibold mb-2">
            <p>
              Do you have any other savings, such as a Tax-Free Savings Account
              (TFSA), that you plan on using for your retirement?
              <CRICTooltip title="Select 'Yes' if you have additional savings, such as a TFSA or non-registered (taxable) account, that you intend to use for retirement. These accounts can supplement your employer pension or government benefits." />
            </p>
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
              dispatch(
                updateRetirementSavingsField({
                  mainKey: "TFSA",
                  subKey: "hasTFSA",
                  value: value,
                })
              );
            }}
            value={hasTFSA}
          ></Select>
        </div>

        {hasTFSA === "Yes" && (
          <section className="space-y-[2rem] border-[1px] border-gray-300 p-3 rounded-md shadow-sm">
            <h1 className="font-semibold md:text-[1.5rem] text-[1rem] mb-[-0.5rem]">
              Your Tax Free Savings Account
            </h1>
            <div>
              <div className="font-semibold mb-2">
                <p>
                  What is the current total value of your TFSA ( Tax Free
                  Savings Account )?
                  <CRICRedStar />
                  <CRICTooltip title="Enter the total amount currently saved in your TFSA. A TFSA allows your investments to grow tax-free, making it an effective tool for retirement savings." />
                </p>
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
                placeholder="Enter TFSA Total Value"
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                onKeyDown={handleKeyDownUtil}
                onChange={(e) => {
                  dispatch(
                    updateRetirementSavingsField({
                      mainKey: "TFSA",
                      subKey: "TFSAcurrentTotal",
                      value: e.target.value,
                    })
                  );
                }}
                value={TFSAcurrentTotal}
              />
              {!TFSAcurrentTotal && showError && (
                <Error message="This field is required" />
              )}
            </div>

            <div>
              <div className="font-semibold mb-2">
                <p>
                  Frequency of your ongoing contribution for TFSA
                  <CRICRedStar />
                  <CRICTooltip title="Select how often you contribute to your savings account. Common options include weekly, bi-weekly, monthly, or annually, depending on your savings schedule." />
                </p>
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
                  dispatch(
                    updateRetirementSavingsField({
                      mainKey: "TFSA",
                      subKey: "TFSAOngoingContributionFrequency",
                      value: value,
                    })
                  );
                }}
                value={TFSAOngoingContributionFrequency}
              ></Select>
              {TFSAOngoingContributionFrequency == "Select One" &&
                showError && <Error message="This field is required" />}
              {TFSAOngoingContributionFrequency == "0" &&
                Number(TFSAOngoingContributionAmount) > 0 &&
                showError && (
                  <Error message="Please select frequency other than none (e.g., weekly, monthly, annually)" />
                )}
            </div>

            <div>
              <div className="font-semibold mb-2">
                <p>
                  Amount of your ongoing contribution to TFSA (Applicable
                  Maximum only)? <CRICRedStar />
                  <CRICTooltip title="Specify the amount you regularly contribute to your TFSA. This can include monthly, bi-weekly, or annual contributions that help grow your retirement savings over time." />
                </p>
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
                placeholder="Enter ongoing contribution amount to TFSA"
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                onKeyDown={handleKeyDownUtil}
                onChange={(e) => {
                  dispatch(
                    updateRetirementSavingsField({
                      mainKey: "TFSA",
                      subKey: "TFSAOngoingContributionAmount",
                      value: e.target.value,
                    })
                  );
                }}
                value={TFSAOngoingContributionAmount}
              />
              {!TFSAOngoingContributionAmount && showError && (
                <Error message="This field is required" />
              )}
            </div>

            <div>
              <div className="font-semibold mb-2">
                <p>
                  What rate of return/interest rate would you like to use for
                  this TFSA account?
                  <CRICRedStar />
                  <CRICTooltip title="Enter the estimated annual rate of return or interest rate you expect from your TFSA investments. This rate will help calculate how your savings grow over time." />
                </p>
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
                placeholder="Enter interest rate for TFSA"
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                onKeyDown={handleKeyDownUtil}
                onChange={(e) => {
                  dispatch(
                    updateRetirementSavingsField({
                      mainKey: "TFSA",
                      subKey: "TFSAreturnRate",
                      value: e.target.value,
                    })
                  );
                }}
                value={TFSAreturnRate}
              />
              {!TFSAreturnRate && showError && (
                <Error message="This field is required" />
              )}
            </div>
          </section>
        )}

        <div>
          <div className="font-semibold mb-2">
            <p>
              Do you have any other savings, such as a non-registered account,
              that you plan on using for your retirement?
              <CRICTooltip title="Select 'Yes' if you have additional savings, such as a TFSA or non-registered (taxable) account, that you intend to use for retirement. These accounts can supplement your employer pension or government benefits." />
            </p>
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
              dispatch(
                updateRetirementSavingsField({
                  mainKey: "NRA",
                  subKey: "hasNRA",
                  value: value,
                })
              );
            }}
            value={hasNRA}
          ></Select>
        </div>

        {hasNRA == "Yes" ? (
          <section className="space-y-[2rem] border-[1px] border-gray-300 p-3 rounded-md shadow-sm">
            <h1 className="font-semibold md:text-[1.5rem] mb-[-0.5rem] text-[1rem]">
              Your Non Registered Account(s)
            </h1>
            <div>
              <div className="font-semibold mb-2">
                <p>
                  What is the current total value of your non-registered
                  (Taxable) Account(s)?
                  <CRICRedStar />
                  <CRICTooltip title="Enter the total amount currently saved in your non-registered accounts. These accounts are taxable but provide additional flexibility for your retirement savings." />
                </p>
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
                placeholder="Enter total amount of non-registered account"
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                onKeyDown={handleKeyDownUtil}
                onChange={(e) => {
                  dispatch(
                    updateRetirementSavingsField({
                      mainKey: "NRA",
                      subKey: "NRAcurrentTotal",
                      value: e.target.value,
                    })
                  );
                }}
                value={NRAcurrentTotal}
              />
              {!NRAcurrentTotal && showError && (
                <Error message="This field is required" />
              )}
            </div>

            <div>
              <div className="font-semibold mb-2">
                <p>
                  Frequency of your ongoing contribution for non-registered
                  account
                  <CRICRedStar />
                  <CRICTooltip title="Select how often you contribute to your non-registered account. Choose from options like weekly, bi-weekly, monthly, or annually." />
                </p>
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
                  dispatch(
                    updateRetirementSavingsField({
                      mainKey: "NRA",
                      subKey: "NRAOngoingContributionFrequency",
                      value: value,
                    })
                  );
                }}
                value={NRAOngoingContributionFrequency}
              ></Select>
              {NRAOngoingContributionFrequency == "Select One" && showError && (
                <Error message="This field is required" />
              )}
              {NRAOngoingContributionFrequency == "0" &&
                Number(NRAOngoingContributionAmount) > 0 &&
                showError && (
                  <Error message="Please select frequency other than none (e.g., weekly, monthly, annually)" />
                )}
            </div>

            <div>
              <div className="font-semibold mb-2">
                <p>
                  Amount of your ongoing contribution to non-registered account
                  (Applicable Maximum only)?
                  <CRICRedStar />
                  <CRICTooltip title="Specify the amount you contribute regularly to your non-registered accounts. Regular contributions help ensure your savings grow steadily over time." />
                </p>
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
                placeholder="Enter ongoing contribution amount of non-registered account"
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                onKeyDown={handleKeyDownUtil}
                onChange={(e) => {
                  dispatch(
                    updateRetirementSavingsField({
                      mainKey: "NRA",
                      subKey: "NRAOngoingContributionAmount",
                      value: e.target.value,
                    })
                  );
                }}
                value={NRAOngoingContributionAmount}
              />
              {!NRAOngoingContributionAmount && showError && (
                <Error message="This field is required" />
              )}
            </div>

            <div>
              <div className="font-semibold mb-2">
                <p>
                  What rate of return/interest rate would you like to use for
                  this non-registered account?
                  <CRICRedStar />
                  <CRICTooltip title="Enter the annual rate of return or interest rate you expect from your non-registered account investments. This rate is used to project future growth." />
                </p>
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
                placeholder="Enter interest rate of non-registered account"
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                onKeyDown={handleKeyDownUtil}
                onChange={(e) => {
                  dispatch(
                    updateRetirementSavingsField({
                      mainKey: "NRA",
                      subKey: "NRAreturnRate",
                      value: e.target.value,
                    })
                  );
                }}
                value={NRAreturnRate}
              />
              {!NRAreturnRate && showError && (
                <Error message="This field is required" />
              )}
            </div>
            <div>
              <div className="font-semibold mb-2">
                <p>
                  What average tax rate that you would like to use for this
                  non-registered account ?
                  <CRICRedStar />
                  <CRICTooltipWithLink />
                  <span className="text-gray-500 ml-1">(Click on this icon to calculate average tax rate.)</span>
                </p>
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
                placeholder="Enter average tax rate"
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                onKeyDown={handleKeyDownUtil}
                onChange={(e) => {
                  dispatch(
                    updateRetirementSavingsField({
                      mainKey: "NRA",
                      subKey: "NRAtaxRate",
                      value: e.target.value,
                    })
                  );
                }}
                value={NRAtaxRate}
              />
              {!NRAtaxRate && showError && (
                <Error message="This field is required" />
              )}
            </div>
          </section>
        ) : (
          ""
        )}

        <div>
          <div className="font-semibold mb-2">
            <p>
              At what age do you plan to start receiving your savings from your
              TFSA or non-registered account?
              <CRICRedStar />
              <CRICTooltip title="Select the age at which you plan to start withdrawing from your retirement savings. This impacts the duration over which your savings will need to support your retirement." />
            </p>
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
            options={TFSAorNRASavingsReceivingAgeOptions}
            suffixIcon={
              <Icon
                className="text-[1.5rem] text-gray-600"
                icon="iconamoon:arrow-down-2"
              />
            }
            onChange={(value) => {
              dispatch(
                updateRetirementSavingsField({
                  mainKey: "TFSAorNRASavingsReceivingAge",
                  value: value,
                })
              );
            }}
            value={TFSAorNRASavingsReceivingAge}
          ></Select>
          {TFSAorNRASavingsReceivingAge == "Select One" && showError && (
            <Error message="This field is required" />
          )}
        </div>

        <div className="grid grid-cols-2 w-full md:gap-5 gap-3">
          <button
            onClick={handleBack}
            className="border-[1px] md:text-[1.25rem] text-[18px] w-full border-gray-600 hover:bg-black hover:text-white duration-200 text-black rounded-[10px] px-[1.5rem] py-[10px]"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="text-white md:text-[1.25rem] text-[18px] p-[0.8rem] rounded-[10px] w-full bg-black"
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
}
