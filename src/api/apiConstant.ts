export let baseUrl =
  "https://wordpressprojects-dollarfar-backend.qklxx5.easypanel.host";

if (import.meta.env.MODE === "development") {
  baseUrl = "http://localhost:5000";
} else {
  baseUrl = "https://wordpressprojects-dollarfar-backend.qklxx5.easypanel.host";
}
