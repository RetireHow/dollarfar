/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { toast } from "react-toastify";
import RedStar from "../../components/UI/RedStar";
import { baseUrl } from "../../api/apiConstant";
// import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

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
  // const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Proceed with API call or further processing
      try {
        setLoading(true);
        const res = await fetch(
          `${baseUrl}/ebook-downloaded-users/create-user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (!res.ok) {
          throw new Error("Internal server error!");
        }
        await res.json();
        setLoading(false);
        toast.success("Thank you! An email sent. Please check your inbox.", {
          position: "top-center",
        });
        // navigate("/admin-dashboard");
      } catch (error: any) {
        toast.error(error.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-900 shadow-md rounded-lg p-8 w-full max-w-lg dark:border-[1px] dark:border-gray-500">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
          Download Your eBook
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* First Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-bold text-gray-700 dark:text-white"
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
              className="block text-sm font-bold text-gray-700 dark:text-white"
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
              className="block text-sm font-bold text-gray-700 dark:text-white"
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
              className="block text-sm font-bold text-gray-700 dark:text-white"
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
            disabled={loading ? true : false}
            className={`w-full text-white py-2 rounded-md hover:bg-blue-700 dark:hover:bg-neutral-700 transition flex justify-center items-center h-[45px] ${
              loading ? "bg-blue-300 hover:bg-blue-300 dark:bg-neutral-300 dark:hover:bg-neutral-300" : "bg-blue-600 dark:bg-neutral-800"
            }`}
          >
            {loading ? (
              <Icon
                icon="eos-icons:three-dots-loading"
                width="30"
                height="30"
              />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
