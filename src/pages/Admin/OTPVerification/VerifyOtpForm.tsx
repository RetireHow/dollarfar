/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import "./OTPStyles.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { updateOTPField } from "../../../redux/features/OTP/OTP";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "react-toastify";
import { baseUrl } from "../../../api/apiConstant";

const VerifyOtpForm: React.FC = () => {
  const navigate = useNavigate();
  const { otp, email } = useAppSelector((state) => state.OTP);
  const dispatch = useAppDispatch();

  const [showError, setShowError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleResend = () => {
    // Implement your resend OTP logic here
    console.log("Resend OTP");
  };

  const handleOTPChange = (value: string) => {
    dispatch(updateOTPField({ key: "otp", value: value }));
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp?.trim()?.length < 6) {
      return setShowError(true);
    }
    // Implement your OTP verification logic here
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/api/verify-otp`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (!data?.success) {
        return toast.error(data?.message);
      } else {
        toast.success(data?.message);
        navigate("/reset-password-form");
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
        onSubmit={handleVerify}
        className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-2">
          Verify Your Identity
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base">
          Enter the 6-digit code sent to your email address.
        </p>
        <div className="flex justify-center mb-2">
          <OtpInput
            value={otp}
            onChange={handleOTPChange}
            numInputs={6}
            shouldAutoFocus
            containerStyle="otp-container"
            renderInput={(props) => (
              <input
                {...props}
                className="otp-input w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white mx-1"
              />
            )}
          />
        </div>
        {showError && !otp && (
          <p className=" text-red-500 text-center">OTP is required.</p>
        )}
        {showError && otp && otp.length < 6 && (
          <p className=" text-red-500  text-center">
            Please fill in the all fields!
          </p>
        )}
        <div className="text-center mb-4">
          <span className="text-gray-600 dark:text-gray-300">
            Didn’t receive the code?
          </span>{" "}
          <button
            type="button"
            onClick={handleResend}
            className="text-blue-600 hover:underline dark:text-blue-400 font-semibold text-sm sm:text-base mt-5"
          >
            Send Again
          </button>
        </div>
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
            "Verify OTP"
          )}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtpForm;
