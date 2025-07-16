import { useState, FormEvent } from "react";
import { Star } from "lucide-react";

interface FeedbackData {
  rating: string;
  useful: string;
  improve: string;
  email?: string;
  consent: boolean;
}

export default function FeedbackForm() {
  const [formData, setFormData] = useState<FeedbackData>({
    rating: "",
    useful: "",
    improve: "",
    email: "",
    consent: false,
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Feedback submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl rounded-2xl p-8">
        {submitted ? (
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-green-700">🎉 Thank you!</h2>
            <p className="text-gray-700">Your feedback helps us improve the book for others.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Star className="text-yellow-500" /> Share Your Feedback
            </h2>
            <p className="text-gray-600 text-sm">
              We appreciate your honest thoughts about <strong>Retier How?</strong>
            </p>

            {/* Rating */}
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                How helpful was the book?
              </label>
              <select
                id="rating"
                name="rating"
                required
                className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg px-4 py-2 bg-white shadow-sm"
                value={formData.rating}
                onChange={handleChange}
              >
                <option value="">Select rating</option>
                <option value="1">1 - Not helpful</option>
                <option value="2">2</option>
                <option value="3">3 - Neutral</option>
                <option value="4">4</option>
                <option value="5">5 - Very helpful</option>
              </select>
            </div>

            {/* Most Useful */}
            <div>
              <label htmlFor="useful" className="block text-sm font-medium text-gray-700 mb-1">
                What did you find most useful?
              </label>
              <textarea
                id="useful"
                name="useful"
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                value={formData.useful}
                onChange={handleChange}
              />
            </div>

            {/* Improvements */}
            <div>
              <label htmlFor="improve" className="block text-sm font-medium text-gray-700 mb-1">
                What could be improved?
              </label>
              <textarea
                id="improve"
                name="improve"
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                value={formData.improve}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email (optional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Consent */}
            <div className="flex items-start gap-2">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                className="mt-1 accent-blue-600"
                checked={formData.consent}
                onChange={handleChange}
              />
              <label htmlFor="consent" className="text-sm text-gray-700">
                You can use my feedback for marketing.
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white py-2 px-6 rounded-lg font-semibold shadow-md"
            >
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
