import { ErrorFallback } from "../../components/ErrorFallback";
import UserTable from "./UserTable";
import { ErrorBoundary } from "react-error-boundary";

export default function AdminDashboard() {
  return (
    <main>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
          <UserTable />
      </ErrorBoundary>
    </main>
  );
}
