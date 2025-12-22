import { useEffect } from "react";
import BookedSessions from "./BookedSessions/BookedSessions";
import ConsultationScheduleForm from "./BookedSessions/ConsultationScheduleForm";
import NextStepPlans from "./NextStepPlans/NextStepPlans";
import RetirementStats from "./NextStepPlans/RetirementStats";

export default function RetireeRequests() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <main>
      <RetirementStats />
      <BookedSessions />
      <NextStepPlans />
      <ConsultationScheduleForm />
    </main>
  );
}
