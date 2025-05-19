import React, { useState } from "react";
import { toast } from "react-toastify";
import RedStar from "../components/UI/RedStar";

interface FormData {
  fullName: string;
  email: string;
  mobile: string;
  city: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  mobile?: string;
  city?: string;
}

export const Ebook1: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10,15}$/.test(formData.mobile)) {
      newErrors.mobile = "Invalid mobile number";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Proceed with API call or further processing
      console.log("Form Data:", formData);
      toast.success("Thank you!", { position: "top-center" });
      // Reset form if needed
      // setFormData({ fullName: '', email: '', mobile: '', city: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Download Your eBook
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* First Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-bold text-gray-700"
            >
              Full Name
              <RedStar />
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your full name"
              aria-invalid={!!errors.fullName}
              aria-describedby="fullName-error"
              required
            />
            {errors.fullName && (
              <p id="fullName-error" className="text-red-500 text-sm mt-1">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-gray-700"
            >
              Email
              <RedStar />
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your email"
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
              required
            />
            {errors.email && (
              <p id="email-error" className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-bold text-gray-700"
            >
              Mobile
              <RedStar />
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.mobile ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your mobile number"
              aria-invalid={!!errors.mobile}
              aria-describedby="mobile-error"
              required
            />
            {errors.mobile && (
              <p id="mobile-error" className="text-red-500 text-sm mt-1">
                {errors.mobile}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-bold text-gray-700"
            >
              City
              <RedStar />
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.city ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your city"
              aria-invalid={!!errors.city}
              aria-describedby="city-error"
              required
            />
            {errors.city && (
              <p id="city-error" className="text-red-500 text-sm mt-1">
                {errors.city}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
