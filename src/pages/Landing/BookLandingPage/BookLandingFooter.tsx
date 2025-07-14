import { Link } from "react-router-dom";

export default function BookLandingFooter() {
  return (
    <footer
      id="footer"
      className="bg-black text-center md:py-8 py-5 px-3 text-white"
    >
      <ul className="flex items-center justify-center mb-5 gap-5 text-[1.2rem]">
        <li>
          <Link className="hover:underline" to="/book-landing">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link className="hover:underline" to="/book-landing">
            Terms & Conditions
          </Link>
        </li>
        <li>
          <Link className="hover:underline" to="/book-landing">
            Refund Policy
          </Link>
        </li>
      </ul>
      <p className="text-[14px]">
        (c) Copyright All rights reserved by Retirehow? Inc{" "}
        {new Date().getFullYear()}
      </p>
    </footer>
  );
}
