"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const useCheckout = ({ sessionId, userId = null }) => {
  const checkoutSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(7, "Phone number is required"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    postalCode: z.string().min(2, "Postal code is required"),
    country: z.string().min(2, "Country is required"),
  });
  type CheckoutFormData = z.infer<typeof checkoutSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  // const onSubmit = async (data: CheckoutFormData) => {
  //   try {
  //     if (!sessionId && !userId) throw new Error("Cart session not found");

  //     // const res = await axios.post(
  //     //   "http://localhost:9000/api/checkout/create-order",
  //     //   {
  //     //     sessionId,
  //     //     userId,
  //     //     billingDetails: data,
  //     //   }
  //     // );

  //     // ✅ Redirect to Stripe Checkout
  //     if (res.data.url) {
  //       toast.success("Redirecting to payment...");
  //       window.location.href = res.data.url;
  //     } else {
  //       toast.error("Failed to get payment link");
  //     }
  //   } catch (err: any) {
  //     console.error("❌ Checkout error:", err);
  //     toast.error(err.response?.data?.error || err.message);
  //   }
  // };

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      if (!sessionId && !userId) throw new Error("Cart session not found");

      const res = await fetch(
        "http://localhost:9000/api/checkout/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            userId,
            billingDetails: data,
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData?.error || `Failed to create order: ${res.status}`
        );
      }

      const result = await res.json();

      // ✅ Redirect to Stripe Checkout
      if (result.url) {
        toast.success("Redirecting to payment...");
        window.location.href = result.url;
      } else {
        toast.error("Failed to get payment link");
      }
    } catch (err: any) {
      console.error("❌ Checkout error:", err);
      toast.error(err.message || "Something went wrong during checkout");
    }
  };

  return { handleSubmit, onSubmit, register, errors, isSubmitting };
};

export default useCheckout;
