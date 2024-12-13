import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { useEffect } from "react";
import {
  resetActiveStep,
  setTotalSteps,
} from "../../redux/features/stepperSlice/stepperSclie";
import Stepper from "../BC/Stepper";
import CRICResultCard from "./CRICResultCard";
import CRICBarChart from "./CRICBarChart";

export default function CRICLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetActiveStep());
    dispatch(setTotalSteps(4));
  }, [dispatch]);

  return (
    <section>
      <Stepper steps={[1, 2, 3, 4]}/>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 mb-[3rem]">
        <Outlet />
        <CRICResultCard />
      </div>
      <CRICBarChart />
    </section>
  );
}
