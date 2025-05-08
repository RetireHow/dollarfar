import { ErrorFallback } from "../../components/ErrorFallback";
import AdminDashboardGreeting from "./AdminDashboardGreeting";
import Logout from "./Logout";
import UserTable from "./UserTable";
import { ErrorBoundary } from "react-error-boundary";

export default function AdminDashboard() {
  return (
    <main>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Logout />
        <AdminDashboardGreeting />
        <UserTable />
      </ErrorBoundary>
    </main>
  );
}
