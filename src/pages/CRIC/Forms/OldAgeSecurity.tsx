import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  calculateOASBenefit,
  updateOldAgeSecurityField,
} from "../../../redux/features/CRIC/CRICSlice";
import { useEffect, useState } from "react";
import Error from "../../../components/UI/Error";
import { toast } from "react-toastify";
import CRICTooltip from "../CRICTooltip";
import CRICRedStar from "../CRICRedStar";
import MandatoryUserHints from "../MandatoryUserHints";
import { Select } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";

const canadaLivingAgeOptions = [{ value: "Select One", label: "Select One" }];
for (let i = 1; i <= 40; i++) {
  canadaLivingAgeOptions.push({
    value: i.toString(),
    label: i.toString(),
  });
}

export default function OldAgeSecurity() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    OASPensionReceivingAge,
    numberOYearsLivedInCanada,
    willLiveInCanadaAtleast40Years,
    willLiveInCanadaUntil65,
  } = useAppSelector((state) => state.CRICalculator.oldAgeSecurity);

  const [showError, setShowError] = useState(false);

  const handleNext = () => {
    if (
      OASPensionReceivingAge == "Select One" ||
      willLiveInCanadaAtleast40Years == "Select One" ||
      willLiveInCanadaUntil65 == "Select One"
    ) {
      toast.error("Please fill in the required fields.");
      return setShowError(true);
    }

    if (willLiveInCanadaAtleast40Years == "No") {
      if (numberOYearsLivedInCanada == "Select One") {
        toast.error("Please fill in the required fields.");
        return setShowError(true);
      }
    }
    dispatch(calculateOASBenefit(undefined));
    navigate("/CRIC/summary");
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
          Old Age Security
        </h3>

        <MandatoryUserHints />

        <div>
          <div className="flex items-center gap-2 font-semibold mb-2">
            <div>
              Do you expect to be living in Canada when you reach the age of 65?
              <CRICRedStar />
              <CRICTooltip title="Indicate whether you anticipate residing in Canada when you turn 65. This information helps determine your eligibility for the Old Age Security (OAS) pension, as living in Canada at that age can influence your benefits." />
            </div>
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
            options={[
              { value: "Select One", label: "Select One" },
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ]}
            suffixIcon={
              <Icon
                className="text-[1.5rem] text-gray-600"
                icon="iconamoon:arrow-down-2"
              />
            }
            onChange={(value) =>
              dispatch(
                updateOldAgeSecurityField({
                  key: "willLiveInCanadaUntil65",
                  value: value,
                })
              )
            }
            value={willLiveInCanadaUntil65}
          ></Select>
          {showError && willLiveInCanadaUntil65 == "Select One" && (
            <Error message="This field is required" />
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 font-semibold mb-2">
            <p>
              Will you have lived in Canada for at least 40 years between age 18
              and 65?
              <CRICRedStar />
              <CRICTooltip title='Select "Yes" or "No" based on whether you will have accumulated at least 40 years of residence in Canada between the ages of 18 and 65. This period of residence is a key factor in determining your eligibility for the full OAS pension.' />
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
            options={[
              { value: "Select One", label: "Select One" },
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ]}
            suffixIcon={
              <Icon
                className="text-[1.5rem] text-gray-600"
                icon="iconamoon:arrow-down-2"
              />
            }
            onChange={(value) =>
              dispatch(
                updateOldAgeSecurityField({
                  key: "willLiveInCanadaAtleast40Years",
                  value: value,
                })
              )
            }
            value={willLiveInCanadaAtleast40Years}
          ></Select>
          {showError && willLiveInCanadaAtleast40Years == "Select One" && (
            <Error message="This field is required" />
          )}
        </div>

        {willLiveInCanadaAtleast40Years == "No" && (
          <>
            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <p>
                  How many years will you have lived in Canada between age 18
                  and 65?
                  <CRICRedStar />
                  <CRICTooltip title="Enter the total number of years you will have lived in Canada during the period from age 18 to 65. This helps determine your eligibility and the amount of OAS pension you may receive. If unsure, estimate based on your history of residence in Canada." />
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
                options={canadaLivingAgeOptions}
                suffixIcon={
                  <Icon
                    className="text-[1.5rem] text-gray-600"
                    icon="iconamoon:arrow-down-2"
                  />
                }
                onChange={(value) =>
                  dispatch(
                    updateOldAgeSecurityField({
                      key: "numberOYearsLivedInCanada",
                      value: value,
                    })
                  )
                }
                value={numberOYearsLivedInCanada}
              ></Select>
              {showError && numberOYearsLivedInCanada == "Select One" && (
                <Error message="This field is required" />
              )}
            </div>
          </>
        )}

        <div>
          <div className="flex items-center gap-2 font-semibold mb-2">
            <p>
              At what age do you plan to receive your OAS pension?
              <CRICRedStar />
              <CRICTooltip title="Choose the age at which you plan to start receiving your Old Age Security (OAS) pension. While you can begin as early as 65, deferring it beyond 65 can increase your monthly payments. Consider your financial needs and retirement goals when making this choice." />
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
            options={[
              { value: "Select One", label: "Select One" },
              { value: "65", label: "65" },
              { value: "66", label: "66" },
              { value: "67", label: "67" },
              { value: "68", label: "68" },
              { value: "69", label: "69" },
              { value: "70", label: "70" },

              { value: "71", label: "71" },
              { value: "72", label: "72" },
              { value: "73", label: "73" },
              { value: "74", label: "74" },
              { value: "75", label: "75" },
              { value: "76", label: "76" },
              { value: "77", label: "77" },
              { value: "78", label: "78" },
              { value: "79", label: "79" },
              { value: "80", label: "80" },
              { value: "81", label: "81" },
              { value: "82", label: "82" },
              { value: "83", label: "83" },
              { value: "84", label: "84" },
              { value: "85", label: "85" },
              { value: "86", label: "86" },
              { value: "87", label: "87" },
              { value: "88", label: "88" },
              { value: "89", label: "89" },
              { value: "90", label: "90" },
            ]}
            suffixIcon={
              <Icon
                className="text-[1.5rem] text-gray-600"
                icon="iconamoon:arrow-down-2"
              />
            }
            onChange={(value) =>
              dispatch(
                updateOldAgeSecurityField({
                  key: "OASPensionReceivingAge",
                  value: value,
                })
              )
            }
            value={OASPensionReceivingAge}
          ></Select>
          {showError && OASPensionReceivingAge == "Select One" && (
            <Error message="This field is required" />
          )}
        </div>

        <div className="grid grid-cols-2 md:gap-5 gap-3">
          <button
            onClick={handleBack}
            className="border-[1px] md:text-[1.25rem] text-[18px] border-gray-600 hover:bg-black hover:text-white duration-200 text-black rounded-[10px] px-[1.5rem] py-[10px]"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="text-white md:text-[1.25rem] text-[18px] p-[0.8rem] rounded-[10px] bg-black"
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
}
