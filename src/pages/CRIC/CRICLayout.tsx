import { Outlet } from "react-router-dom";
import CRICStepper from "./CRICStepper";

const formSteps = [
  {
    title: "General Information",
    link: "/CRIC",
    step: 1,
  },
  {
    title: "Canada Pension Plan",
    link: "/CRIC/PP",
    step: 2,
  },
  {
    title: "Employer Pension/RRIF",
    link: "/CRIC/employer-pension",
    step: 3,
  },
  {
    title: "Accumulated Savings",
    link: "/CRIC/retirement-savings",
    step: 4,
  },
  {
    title: "Other Income",
    link: "/CRIC/other-income",
    step: 5,
  },
  {
    title: "Old Age Security",
    link: "/CRIC/OAS",
    step: 6,
  },
  {
    title: "Summary",
    link: "/CRIC/summary",
    step: 7,
  },
];

export default function CRICLayout() {
  return (
    <section>
      <CRICStepper steps={formSteps} />
      <div>
        <Outlet />
      </div>
    </section>
  );
}
