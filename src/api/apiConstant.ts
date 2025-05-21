export let baseUrl = "https://dollarfar-backend-five.vercel.app/api/v1";

if (import.meta.env.MODE === "development") {
  // baseUrl = "http://localhost:5000";
  baseUrl = "https://dollarfar-backend-five.vercel.app/api/v1";
} else {
  baseUrl = "https://dollarfar-backend-five.vercel.app/api/v1";
}
