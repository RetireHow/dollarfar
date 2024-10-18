import { Outlet } from "react-router-dom";
import Header from "../shared/Header";

export default function MainLayout() {
  return (
    <main>
      <Header />
      <div><Outlet /></div>
    </main>
  );
}
