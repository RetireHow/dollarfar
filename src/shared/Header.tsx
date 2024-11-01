import { Link } from "react-router-dom";
import siteLogo from "../assets/Dollar-logo.svg";
export default function Header() {
  return (
    <div
      style={{ boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.10)" }}
      className="md:px-[5rem] px-[1rem] sticky top-0 bg-white z-[999] flex items-center justify-between h-[100px]"
      data-html2canvas-ignore
    >
      <Link to="/">
        <img className="w-[100px] h-[100px]" src={siteLogo} alt="Logo Image" />
      </Link>
    </div>
  );
}
