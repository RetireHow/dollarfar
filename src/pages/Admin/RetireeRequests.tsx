import { useEffect } from "react";
import BookedSessions from "./BookedSessions/BookedSessions";
import ConsultationScheduleForm from "./BookedSessions/ConsultationScheduleForm";
import RetirementStats from "./NextStepPlans/RetirementStats";
import POCInterestTable from "./POCInterestTable/POCInterestTable";

export default function RetireeRequests() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <main>
      <RetirementStats />
      <BookedSessions />
      <POCInterestTable />
      <ConsultationScheduleForm />
    </main>
  );
}
