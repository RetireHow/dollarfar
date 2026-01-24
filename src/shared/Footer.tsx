import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-teal-300 to-orange-300 px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-6 text-center">
        {/* Row 1: Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-6 text-sm font-bold">
          <li>
            <Link
              to="/privacy-policy"
              className="hover:underline transition-colors"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              to="/terms-and-condition"
              className="hover:underline transition-colors"
            >
              Terms of Use
            </Link>
          </li>
          <li>
            <Link
              to="/refund-policy"
              className="hover:underline transition-colors"
            >
              Refund Policy
            </Link>
          </li>
        </ul>

        {/* Row 2: Copyright */}
        <p className="text-xs text-gray-700">
          &copy;Copyright All rights reserved by Retirehow? Inc{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
