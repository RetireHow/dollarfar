import { ErrorFallback } from "../../components/ErrorFallback";
import EbookDownloadedUserTable from "../Ebook/EbookDownloadedUserTable";
import AdminDashboardGreeting from "./AdminDashboardGreeting";
import Logout from "./Logout";
import PdfDownloadedUserTable from "./PdfDownloadedUserTable";
import { ErrorBoundary } from "react-error-boundary";

export default function AdminDashboard() {
  return (
    <main>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Logout />
        <AdminDashboardGreeting />
        <PdfDownloadedUserTable />
        <EbookDownloadedUserTable/>
      </ErrorBoundary>
    </main>
  );
}
