import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect } from "react";

export default function COLCLoading() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <main className="flex items-center justify-center min-h-[500px] w-full">
      <div>
        <Icon
          className="text-green-500"
          icon="line-md:loading-loop"
          width="100"
          height="100"
        />
      </div>
    </main>
  );
}
