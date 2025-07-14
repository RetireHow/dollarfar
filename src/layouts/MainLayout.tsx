import { Outlet, useLocation } from "react-router-dom";
import Header from "../shared/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../shared/Footer";
import BookLandingFooter from "../pages/Landing/BookLandingPage/BookLandingFooter";

export default function MainLayout() {
  const location = useLocation()?.pathname;
  return (
    <main id="report">
      <Header />
      <div>
        <Outlet />
      </div>
      <ToastContainer />
      {location === "/book-landing" ? <BookLandingFooter /> : <Footer />}
    </main>
  );
}
