import { useEffect } from "react";

export default function MoneyStretch() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <main className="min-h-screen m-5 font-bold text-lg">
      <h1>Coming soon..</h1>
    </main>
  );
}
