import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white px-6 py-10 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto space-y-6 text-center">
        {/* Row 1: Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-300">
          <li>
            <Link
              to="/privacy-policy"
              className="hover:text-white hover:underline transition-colors"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              to="/terms-and-condition"
              className="hover:text-white hover:underline transition-colors"
            >
              Terms & Conditions
            </Link>
          </li>
          <li>
            <Link
              to="/refund-policy"
              className="hover:text-white hover:underline transition-colors"
            >
              Refund Policy
            </Link>
          </li>
        </ul>

        {/* Row 2: Copyright */}
        <p className="text-xs text-gray-400">
          &copy;Copyright All rights reserved by Retirehow? Inc{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
