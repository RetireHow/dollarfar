import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { useEffect } from "react";
import { resetActiveStep } from "../../redux/features/stepperSlice/stepperSclie";
import Stepper from "../BC/Stepper";
import CRICResultCard from "./CRICResultCard";

export default function CRICLayout() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetActiveStep());
  }, [dispatch]);
  return (
    <section className="max-w-[1200px]">
      <Stepper />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 mb-[3rem]">
        <Outlet />
        <CRICResultCard />
      </div>
    </section>
  );
}
