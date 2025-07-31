import React, { useState } from "react";
import { Star } from "lucide-react";
import { baseUrl } from "../../../api/apiConstant";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react/dist/iconify.js";

interface FormData {
  name: string;
  email: string;
  city: string;
  rating: number;
  comments: string;
}

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    city: "",
    rating: 0,
    comments: "",
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [ratingError, setRatingError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRating = (value: number) => {
    setFormData((prev) => ({
      ...prev,
      rating: value,
    }));
    setRatingError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rating === 0) {
      setRatingError(true);
      return;
    }
    console.log("Feedback submitted:", formData);

    //API Call
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/feedbacks/create-feedback`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data?.success) {
        return setSubmitted(true);
      }else{
        toast.error("There is something went wrong!");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error: any) {
      setIsLoading(false);
      toast.error("There is something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="h-[60vh] flex justify-center items-center m-5">
        <div className="max-w-xl mx-auto p-6 rounded-xl bg-black text-white shadow-md">
          <h2 className="text-2xl font-semibold mb-2">
            Thank you for your feedback!
          </h2>
          <p className="text-sm text-gray-300">
            Your input helps us improve future editions of the eBook.
          </p>
        </div>
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl md:mx-auto md:m-10 m-5 md:p-8 p-5 bg-white text-black rounded-2xl shadow-xl space-y-6 border border-gray-900"
    >
      <div>
        <h2 className="text-3xl font-bold mb-1">We’d love your feedback</h2>
        <p className="text-sm text-gray-600">
          Help us improve the eBook by sharing your honest experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="e.g., John Doe"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-black bg-white focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="e.g., john@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-black bg-white focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            City<span className="text-red-500">*</span>
          </label>
          <input
            name="city"
            type="text"
            required
            placeholder="e.g., Toronto"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-black bg-white focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Rating<span className="text-red-500">*</span>
        </label>
        <div className="flex mt-1 space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 cursor-pointer transition ${
                formData.rating >= star ? "text-[#C5A947]" : "text-gray-300"
              }`}
              fill={formData.rating >= star ? "currentColor" : "none"}
              onClick={() => handleRating(star)}
            />
          ))}
        </div>
        {ratingError && (
          <p className="text-sm text-red-600 mt-1">
            Please select a star rating.
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Comments<span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-2">
          What did you like? What could be improved? Your honest thoughts help
          us evolve this book.
        </p>
        <textarea
          name="comments"
          rows={4}
          required
          placeholder="The good and the bad — we’d love to hear both."
          value={formData.comments}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md border border-black bg-white focus:outline-none focus:ring-2 focus:ring-black transition"
        ></textarea>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className={`px-6 py-2 text-white rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-black transition w-[180px] h-[45px] flex justify-center items-center ${isLoading ? 'bg-gray-500' : 'bg-black hover:bg-gray-800'}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <Icon icon="eos-icons:three-dots-loading" width="50" height="50" />
          ) : (
            "Submit Feedback"
          )}
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
