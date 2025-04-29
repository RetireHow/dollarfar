import { ReactChild } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: ReactChild }) {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  if (name && email) {
    return children;
  } else {
    return <Navigate to="/admin-login" replace></Navigate>;
  }
}
