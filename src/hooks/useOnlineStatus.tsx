import { useEffect, useState } from "react";

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  async function checkConnection() {
    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 3000);

      await fetch("https://cloudflare.com/cdn-cgi/trace", {
        method: "HEAD",
        signal: controller.signal,
      });

      setIsOnline(true);
    } catch (_) {
      setIsOnline(false);
    }
  }

  useEffect(() => {
    checkConnection(); // initial check

    // const interval = setInterval(() => {
    //   checkConnection();
    // }, 5000); // check every 4 seconds

    // return () => clearInterval(interval);
  }, []);

  return isOnline;
}
