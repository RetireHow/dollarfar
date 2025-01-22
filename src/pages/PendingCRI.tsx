import { useEffect } from "react";

export default function PendingCRI() {
  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  });
  return (
    <div className="h-[100vh]">
      <h1 className="text-[1.5rem] text-center my-5">
        The Comprehensive Retirement Income Calculator will be available soon...
      </h1>
    </div>
  );
}
