// import errorLottie from "@/assets/lottiefiles/ERROR.json";

import React from "react";

// Define a safe, flexible error type
type CartErrorType =
  | {
      status?: number;
      data?: { message?: string };
      error?: string;
      message?: string;
    }
  | Error
  | null
  | undefined;

const getErrorMessage = (error: CartErrorType): string => {
  if (!error) return "Unexpected error.";

  // Handle native Error objects
  if (error instanceof Error) {
    return error.message;
  }

  // Handle structured API errors
  if (typeof error === "object") {
    if (error.status) {
      return `Error ${error.status}: ${error.data?.message || error.error || "Unknown error"}`;
    }
    return error.message || "An unknown error occurred.";
  }

  return "Unexpected error.";
};

const CartError: React.FC<{ error: CartErrorType }> = ({ error }) => {
  return (
    <div className="min-h-screen flex items-center flex-col justify-center p-4">
      {/* <Lottie animationData={errorLottie} className="w-96" /> */}
      <div>
        <p className="text-red-600 font-medium">{getErrorMessage(error)}</p>
        <p className="text-sm text-gray-500 mt-2">Please try again later.</p>
      </div>
    </div>
  );
};

export default CartError;
