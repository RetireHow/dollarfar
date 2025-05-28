import { FormEvent, useEffect } from "react";
import BusinessOwnershipFields from "./Inputs/BusinessOwnershipFields";
import CreditCardDueFields from "./Inputs/CreditCardDueFields";
import HomeLoanFields from "./Inputs/HomeLoanFields";
import OtherAssetsFields from "./Inputs/OtherAssetsFields";
import OtherDebtsFields from "./Inputs/OtherDebtsFields";
import PAndOLoanFields from "./Inputs/PAndOLoanFields";
import PersonalItemsInputFields from "./Inputs/PersonalItemsInputFields";
import PropertyInputFields from "./Inputs/PropertyInputFields";
import SAndIInputFields from "./Inputs/SAndIInputFields";
import TaxLiabilityFields from "./Inputs/TaxLiabilityFields";
import VehicleLoans from "./Inputs/VehicleLoans";
import VehiclesFields from "./Inputs/VehiclesFields";
import { useDispatch } from "react-redux";
import { calculateNetWorth } from "../../redux/features/NWSlice/NWSlice";
import { useAppSelector } from "../../redux/hooks";

export default function NWForm() {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { assets, liabilities } = useAppSelector((state) => state.NWCalculator);

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault();
    dispatch(calculateNetWorth());

    //Store inputs into local storage
    localStorage.setItem("nwcInputs", JSON.stringify({ assets, liabilities }));
  };

  useEffect(() => {
    const assetsString = localStorage.getItem("nwcInputs");
    if (!assetsString) {
      return;
    }
    const assets = JSON.parse(assetsString)?.assets;

    Object.keys(assets)?.forEach((category) => {
      Object.entries(assets[category])?.forEach((item) => {
        console.log(item);
      });
    });
  }, []);

  return (
    <section className="md:mb-[5rem] mb-[3rem] grid md:grid-cols-2 grid-cols-1 gap-[2.5rem]">
      <div>
        <h3 className="font-bold md:text-[2rem] text-[18px] mb-[1.5rem]">
          Assets
        </h3>
        <div className="space-y-[2.5rem] md:text-[1rem] text-[14px]">
          <PropertyInputFields />
          <SAndIInputFields />
          <PersonalItemsInputFields />
          <BusinessOwnershipFields />
          <VehiclesFields />
          <OtherAssetsFields />
        </div>
      </div>

      <div>
        <h3 className="font-bold md:text-[2rem] text-[18px] mb-[1.5rem]">
          Liabilities
        </h3>
        <div className="space-y-[2.5rem]">
          <HomeLoanFields />
          <PAndOLoanFields />
          <VehicleLoans />
          <TaxLiabilityFields />
          <CreditCardDueFields />
          <OtherDebtsFields />
        </div>
      </div>

      <div className="md:col-span-2 flex justify-center items-center border-[1px] rounded-md dark:border-gray-500">
        <button
          onClick={handleCalculate}
          className="bg-black text-[18px] text-white p-[0.8rem] rounded-[10px] w-full"
        >
          Calculate
        </button>
      </div>
    </section>
  );
}
