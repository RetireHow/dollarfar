import { Outlet } from "react-router-dom";
import CRICStepper from "./CRICStepper";

export default function CRICLayout() {
  return (
    <section>
      <CRICStepper steps={[1, 2, 3, 4, 5, 6, 7]} />
      <div>
        <Outlet />
      </div>
    </section>
  );
}
