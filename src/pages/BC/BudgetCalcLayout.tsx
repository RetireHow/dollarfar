import { Outlet } from "react-router-dom";
import BudgetCalcCard from "./BudgetCalcCard";
import Stepper from "./Stepper";
import { useAppDispatch } from "../../redux/hooks";
import { useEffect } from "react";
import { resetActiveStep } from "../../redux/features/stepperSlice/stepperSclie";

export default function BudgetCalcLayout() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetActiveStep());
  }, [dispatch]);
  return (
    <section>
      <Stepper />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 mb-[3rem]">
        <Outlet />
        <BudgetCalcCard />
      </div>
    </section>
  );
}
