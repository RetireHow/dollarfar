import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

export default function EbookTestimonial() {
  return (
    // Add this section after your calculators section
    <section className="lg:mx-[5rem] md:mx-[2rem] mx-[1rem] my-[4rem]">
      <div className="text-center mb-8">
        <h2 className="font-bold md:text-[2rem] text-[1.5rem] mb-2 dark:text-white">
          What Readers Are Saying
        </h2>
        <p className="text-[#696969] dark:text-gray-300">
          Join thousands of satisfied customers who transformed their finances
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            quote:
              "This ebook changed how I manage my money. Worth every penny!",
            author: "Sarah J.",
            rating: 5,
          },
          {
            quote:
              "The investment strategies alone paid for the book 10x over.",
            author: "Michael T.",
            rating: 5,
          },
          {
            quote:
              "Finally a finance guide that's actually easy to understand.",
            author: "Priya K.",
            rating: 4,
          },
        ].map((testimonial, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < testimonial.rating
                      ? "text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-300 italic mb-4">
              "{testimonial.quote}"
            </p>
            <p className="font-medium text-gray-800 dark:text-gray-100">
              - {testimonial.author}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/purchase-ebook"
          className="bg-black hover:bg-gray-800 text-white dark:bg-purple-600 dark:hover:bg-purple-700 font-bold py-3 px-8 rounded-lg inline-flex items-center gap-2 transition-all duration-300 hover:scale-105"
        >
          <span>Get Instant Access</span>
          <img src={assets.arrowWhite} alt="Arrow" className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
