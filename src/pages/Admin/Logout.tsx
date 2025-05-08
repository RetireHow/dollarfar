import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Logout() {
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
    <div className="flex justify-end m-3 text-red-500">
      <div
        onClick={handleLogout}
        className="flex items-center gap-1 text-[1.3rem] font-medium cursor-pointer"
      >
        <button>Logout</button>
        <Icon icon="ic:outline-logout" width="25" height="25" />
      </div>
    </div>
  );
}
