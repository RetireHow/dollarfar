import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FileText,
  Download,
  MessageSquare,
  UserCheck,
  LayoutDashboard,
  ChevronRight,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { setActiveStyle } from "../../utils/setActiveStyle";
import { useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { toast } from "react-toastify";

export default function AdminLayout() {
  const [isVisible, setIsVisible] = useState(true);

  const isMobile = useIsMobile(768); // breakpoint: md

  const handleMobileViewNavClick = () => {
    if (isMobile && isVisible) {
      setIsVisible(false);
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure to logout?");
    if (!isConfirmed) {
      return;
    }
    localStorage.setItem("name", "");
    localStorage.setItem("email", "");
    navigate("/admin-login");
    toast.success("You are successfully logged out.");
  };

  return (
    <main className="flex dark:bg-gray-900 dark:text-gray-100">
      {/* ===== Mobile Menu Icon ===== */}

      {/* ===== Sidebar ===== */}
      <aside
        className={`min-h-screen p-5 min-w-60 shadow-lg shadow-right fixed duration-300 z-50 ${
          isVisible
            ? "left-[-0px] bg-gray-100 dark:bg-gray-800"
            : "left-[-210px] bg-transparent"
        }`}
      >
        {!isVisible ? (
          <ChevronRight
            className="absolute rounded-full z-50 right-[-15px] top-3 bg-gray-700 hover:bg-gray-900 dark:bg-gray-600 dark:hover:bg-gray-800 duration-300 text-white cursor-pointer p-1"
            size={40}
            onClick={() => setIsVisible(!isVisible)}
          />
        ) : (
          <ChevronLeft
            className="absolute rounded-full z-50 right-[-15px] top-3 bg-gray-700 hover:bg-gray-900 dark:bg-gray-600 dark:hover:bg-gray-800 duration-300 text-white cursor-pointer p-1"
            size={40}
            onClick={() => setIsVisible(!isVisible)}
          />
        )}

        <nav>
          <ul className="space-y-8">
            <li>
              <NavLink
                to="/admin"
                className="flex items-center gap-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mt-5"
                style={setActiveStyle}
                end
                onClick={handleMobileViewNavClick}
              >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li onClick={handleMobileViewNavClick}>
              <NavLink
                to="pdf-reports"
                className="flex items-center gap-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                style={setActiveStyle}
              >
                <FileText size={20} />
                <span>Calculator Reports</span>
              </NavLink>
            </li>
            <li onClick={handleMobileViewNavClick}>
              <NavLink
                to="ebook-downloads"
                className="flex items-center gap-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                style={setActiveStyle}
              >
                <Download size={20} />
                <span>Ebook Downloads</span>
              </NavLink>
            </li>

            <li onClick={handleMobileViewNavClick}>
              <NavLink
                to="retiree-requests"
                className="flex items-center gap-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                style={setActiveStyle}
              >
                <UserCheck size={20} />
                <span>Retiree Requests</span>
              </NavLink>
            </li>
            <li onClick={handleMobileViewNavClick}>
              <NavLink
                to="ebook-feedbacks"
                className="flex items-center gap-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                style={setActiveStyle}
              >
                <MessageSquare size={20} />
                <span>Ebook Feedbacks</span>
              </NavLink>
            </li>
            <li className="pt-16">
              <div
                onClick={handleLogout}
                className="flex items-center gap-3 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors cursor-pointer"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </div>
            </li>
          </ul>
        </nav>
      </aside>
      <section
        className={`m-3 bg-gray-50 dark:bg-gray-800 w-full p-5 rounded-md duration-300 ${
          !isMobile && isVisible
            ? "ml-64"
            : !isMobile && !isVisible
            ? "ml-10"
            : isMobile && isVisible
            ? "ml-0 mt-8"
            : "ml-0 mt-8"
        }`}
      >
        <Outlet />
      </section>
    </main>
  );
}
