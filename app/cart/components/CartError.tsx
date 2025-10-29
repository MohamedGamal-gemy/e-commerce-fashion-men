// import errorLottie from "@/assets/lottiefiles/ERROR.json";

const getErrorMessage = (error: any) =>
  error?.status
    ? `Error ${error.status}: ${error.data?.message || error.error}`
    : error?.message || "Unexpected error.";

const CartError = ({ error }: { error: any }) => {
  return (
    <div className="min-h-screen flex items-center flex-col justify-center p-4">
      {/* <Lottie animationData={errorLottie} className="w-96" /> */}
      <div className="">
        <p className="text-red-600 font-medium">{getErrorMessage(error)}</p>
        <p className="text-sm text-gray-500 mt-2">Please try again later.</p>
      </div>
    </div>
  );
};

export default CartError;
