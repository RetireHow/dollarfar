/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  resetOTPFields,
  updateOTPField,
} from "../../../redux/features/OTP/OTP";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "react-toastify";
import { baseUrl } from "../../../api/apiConstant";

const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { newPassword, confirmPassword, email, otp } = useAppSelector(
    (state) => state.OTP
  );
  console.log("otp================> ", typeof otp);

  const [showError, setShowError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState<boolean>(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!newPassword || !confirmPassword) {
      return setShowError(true);
    }

    if (newPassword !== confirmPassword) {
      return setShowError(true);
    }

    // Implement your password reset logic here
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/api/reset-password`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
          newPassword,
        }),
      });
      const data = await response.json();
      if (!data?.success) {
        return toast.error(data?.message);
      } else {
        dispatch(resetOTPFields());
        toast.success(data?.message);
        navigate("/admin-login");
      }
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      toast.error("There is something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center py-[2rem] bg-gray-100 dark:bg-gray-900 px-4">
      <form
        onSubmit={handleReset}
        className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-2">
          Reset Your Password
        </h2>

        <div className="my-5">
          <div className="mb-2">
            <label
              htmlFor="newPassword"
              className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2"
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={isVisible ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newPassword}
                onChange={(e) => {
                  dispatch(
                    updateOTPField({
                      key: "newPassword",
                      value: e.target.value,
                    })
                  );
                }}
                placeholder="Enter new password"
              />
              {isVisible ? (
                <Icon
                  onClick={() => setIsVisible(!isVisible)}
                  className="absolute top-[6px] right-2 text-[1.8rem] text-[#CCCCCC] cursor-pointer"
                  icon="mdi:eye-off"
                />
              ) : (
                <Icon
                  onClick={() => setIsVisible(!isVisible)}
                  className="absolute top-[6px] right-2 text-[1.8rem] text-[#CCCCCC] cursor-pointer"
                  icon="mdi:eye"
                />
              )}
            </div>
          </div>
          {showError && !newPassword && (
            <p className="text-center text-red-500">This field is required.</p>
          )}
        </div>

        <div className="mb-2">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={isVisibleConfirmPassword ? "text" : "password"}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => {
                dispatch(
                  updateOTPField({
                    key: "confirmPassword",
                    value: e.target.value,
                  })
                );
              }}
              placeholder="Enter confirm password"
            />
            {isVisibleConfirmPassword ? (
              <Icon
                onClick={() =>
                  setIsVisibleConfirmPassword(!isVisibleConfirmPassword)
                }
                className="absolute top-[6px] right-2 text-[1.8rem] text-[#CCCCCC] cursor-pointer"
                icon="mdi:eye-off"
              />
            ) : (
              <Icon
                onClick={() =>
                  setIsVisibleConfirmPassword(!isVisibleConfirmPassword)
                }
                className="absolute top-[6px] right-2 text-[1.8rem] text-[#CCCCCC] cursor-pointer"
                icon="mdi:eye"
              />
            )}
          </div>
        </div>

        {showError && !confirmPassword && (
          <p className="text-center text-red-500">This field is required.</p>
        )}
        {showError && confirmPassword && newPassword !== confirmPassword && (
          <p className="text-center text-red-500">Password does not match.</p>
        )}
        <button
          type="submit"
          disabled={isLoading ? true : false}
          className={`w-full text-white py-2 rounded-md hover:bg-blue-700 transition flex justify-center items-center h-[45px] mt-5 ${
            isLoading ? "bg-blue-300 hover:bg-blue-300" : "bg-blue-600"
          }`}
        >
          {isLoading ? (
            <Icon icon="eos-icons:three-dots-loading" width="30" height="30" />
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
