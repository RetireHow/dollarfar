import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import ebookMockup from "../../assets/EbookMockup.png";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function EbookOverview() {
  return (
    // Add this section just before your calculators section
    <section className="lg:mx-[5rem] md:mx-[2rem] mx-[1rem] my-[4rem]">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-md border border-gray-200 dark:border-gray-700">
        <div className="flex-1">
          <h2 className="font-bold md:text-[2rem] text-[1.5rem] mb-4 dark:text-white">
            Master Personal Finance with Our Exclusive Ebook
          </h2>
          <p className="text-[#696969] dark:text-gray-300 mb-6 md:text-[1.1rem]">
            Take your financial knowledge to the next level with our
            comprehensive guide covering budgeting, investing, retirement
            planning, and more.
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center text-[#696969] dark:text-gray-300">
              <Icon icon="iconamoon:check-thin" width="24" height="24" />
              200+ pages of expert financial advice
            </li>
            <li className="flex items-center text-[#696969] dark:text-gray-300">
              <Icon icon="iconamoon:check-thin" width="24" height="24" />
              Practical worksheets and templates
            </li>
            <li className="flex items-center text-[#696969] dark:text-gray-300">
              <Icon icon="iconamoon:check-thin" width="24" height="24" />
              Lifetime updates and bonus content
            </li>
          </ul>
          <Link
            to="/purchase-ebook"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg inline-flex items-center gap-2 transition-all duration-300 hover:scale-105"
          >
            <span>Get the Ebook Now</span>
            <img src={assets.arrowWhite} alt="Arrow" className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative">
            <img
              src={ebookMockup}
              alt="Financial Freedom Ebook"
              className="w-full max-w-[300px] rounded-lg shadow-xl border-4 border-white dark:border-gray-800 transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500"
            />
            <div className="absolute -bottom-4 -right-4 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 px-3 py-1 rounded-full font-bold text-sm">
              $19.99
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
