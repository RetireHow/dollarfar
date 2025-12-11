import { Outlet } from "react-router-dom";
import Header from "../shared/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../shared/Footer";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

export default function MainLayout() {
  const isOnline = useOnlineStatus();
  if (!isOnline) {
    toast.warning("You are offline! Please check your internet connection.", {
      autoClose: 10000,
    });
  }
  return (
    <main id="report">
      <Header />
      <div>
        <Outlet />
      </div>
      <ToastContainer />
      <Footer />
    </main>
  );
}
