// import { useEffect } from "react";
import PropertyInputFields from "./Inputs/PropertyInputFields";

export default function NWForm() {
  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, []);

  return (
    <section className="mb-[5rem] grid md:grid-cols-2 grid-cols-1 gap-[2.5rem]">
      <div>
        <h3 className="font-bold text-[2rem] mb-[1.5rem]">Assets</h3>
        <div className="space-y-[1.5rem]">
        <PropertyInputFields/>
        </div>
      </div>


      <div>
        <h3 className="font-bold text-[2rem] mb-[1.5rem]">Liabilities</h3>
      </div>
    </section>
  );
}
