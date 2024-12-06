import { Outlet } from "react-router-dom";
import BudgetCalcCard from "./BudgetCalcCard";
import Stepper from "./Stepper";
import { useAppDispatch } from "../../redux/hooks";
import { useEffect } from "react";
import { resetActiveStep, setTotalSteps } from "../../redux/features/stepperSlice/stepperSclie";

export default function BudgetCalcLayout() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetActiveStep());
    dispatch(setTotalSteps(7));
  }, [dispatch]);
  return (
    <section>
      <Stepper steps={[1, 2, 3, 4, 5, 6, 7]}/>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 mb-[3rem]">
        <Outlet />
        <BudgetCalcCard />
      </div>
    </section>
  );
}
