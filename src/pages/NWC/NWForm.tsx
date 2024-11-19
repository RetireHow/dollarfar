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

export default function NWForm() {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const handleCalculate = (e: FormEvent) => {
    e.preventDefault();
    dispatch(calculateNetWorth());
  };

  return (
    <section className="mb-[5rem] grid md:grid-cols-2 grid-cols-1 gap-[2.5rem]">
      <div>
        <h3 className="font-bold text-[2rem] mb-[1.5rem]">Assets</h3>
        <div className="space-y-[2.5rem]">
          <PropertyInputFields />
          <SAndIInputFields />
          <PersonalItemsInputFields />
          <BusinessOwnershipFields />
          <VehiclesFields />
          <OtherAssetsFields />
        </div>
      </div>

      <div>
        <h3 className="font-bold text-[2rem] mb-[1.5rem]">Liabilities</h3>
        <div className="space-y-[2.5rem]">
          <HomeLoanFields />
          <PAndOLoanFields />
          <VehicleLoans />
          <TaxLiabilityFields />
          <CreditCardDueFields />
          <OtherDebtsFields />
        </div>
      </div>

      <div className="md:col-span-2 flex justify-center items-center">
        <button
          onClick={handleCalculate}
          className="bg-black text-white p-[0.8rem] rounded-[10px] w-[300px]"
        >
          Calculate
        </button>
      </div>
    </section>
  );
}
