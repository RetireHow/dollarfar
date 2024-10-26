import { Outlet } from "react-router-dom";
import Header from "../shared/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MainLayout() {
  return (
    <main>
      <Header />
      <div>
        <Outlet />
      </div>
      <ToastContainer />
    </main>
  );
}
