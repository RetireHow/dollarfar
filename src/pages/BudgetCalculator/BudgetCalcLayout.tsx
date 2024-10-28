import { Outlet } from "react-router-dom";
import BudgetCalcCard from "./BudgetCalcCard";
import Stepper from "./Stepper";

export default function BudgetCalcLayout() {
  return (
    <section>
      <Stepper/>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 mb-[3rem]">
        <Outlet />
        <BudgetCalcCard />
      </div>
    </section>
  );
}
