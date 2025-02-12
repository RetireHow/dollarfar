import { Outlet } from "react-router-dom";
import Stepper from "./Stepper";

export default function BudgetCalcLayout() {
  return (
    <section>
      <Stepper steps={[1, 2, 3, 4, 5, 6, 7, 8]}/>
      <div>
        <Outlet />
      </div>
    </section>
  );
}
