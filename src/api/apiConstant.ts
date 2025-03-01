export let baseUrl = "https://dollarfar-backend-rust.vercel.app";

if (import.meta.env.MODE === "development") {
  baseUrl = "http://localhost:5000";
  // baseUrl = "https://dollarfar-backend-rust.vercel.app";
  // baseUrl = "https://api.dollarfar.com";
} else {
  baseUrl = "https://dollarfar-backend-rust.vercel.app";
  // baseUrl = "https://dollarfar-backend-rust.vercel.app";
  // baseUrl = "https://api.dollarfar.com";
}
