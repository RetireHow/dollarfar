export let baseUrl = "https://dollarfar-backend-rust.vercel.app";

if (import.meta.env.MODE === "development") {
  baseUrl = "http://localhost:5000";
} else {
  baseUrl = "https://dollarfar-backend-rust.vercel.app";
}
