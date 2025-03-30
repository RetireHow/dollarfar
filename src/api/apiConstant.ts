export let baseUrl = "https://dollarfar-backend-lake.vercel.app";

if (import.meta.env.MODE === "development") {
  // baseUrl = "http://localhost:5000";
  baseUrl = "https://dollarfar-backend-lake.vercel.app";
} else {
  baseUrl = "https://dollarfar-backend-lake.vercel.app";
}
