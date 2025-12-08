import BookedSessions from "./BookedSessions/BookedSessions";
import NextStepPlans from "./NextStepPlans/NextStepPlans";
// import RetirementStats from "./NextStepPlans/RetirementStats";

export default function RetireeRequests() {
  return (
    <main>
      {/* <RetirementStats /> */}
      <BookedSessions />
      <NextStepPlans />
    </main>
  );
}
