"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, CreditCard } from "lucide-react";
import CheckoutField from "./CheckoutField";
import useCheckout from "../hook/useCheckout";

export default function CheckoutForm({
  sessionId,
}: {
  sessionId: string | null;
}) {
  const { handleSubmit, onSubmit, register, errors, isSubmitting } =
    useCheckout({ sessionId });

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6 space-y-4 bg-slate-900 border-slate-800">
        <h2 className="text-xl font-semibold mb-2 text-sky-400">
          Billing Details
        </h2>

        <CheckoutField
          label="Full Name"
          id="fullName"
          placeholder="John Doe"
          register={register("fullName")}
          error={errors.fullName?.message}
        />

        <CheckoutField
          label="Email"
          id="email"
          type="email"
          placeholder="john@example.com"
          register={register("email")}
          error={errors.email?.message}
        />

        <CheckoutField
          label="Address"
          id="address"
          placeholder="123 Main St"
          register={register("address")}
          error={errors.address?.message}
        />

        <CheckoutField
          label="Phone"
          id="phone"
          placeholder="01145..."
          inputMode="numeric"
          type="tel"
          register={register("phone")}
          error={errors.phone?.message}
        />

        <div className="grid grid-cols-2 gap-4">
          <CheckoutField
            label="City"
            id="city"
            placeholder="Cairo"
            register={register("city")}
            error={errors.city?.message}
          />
          <CheckoutField
            label="Postal Code"
            id="postalCode"
            placeholder="12345"
            register={register("postalCode")}
            error={errors.postalCode?.message}
          />
        </div>

        <CheckoutField
          label="Country"
          id="country"
          placeholder="Egypt"
          register={register("country")}
          error={errors.country?.message}
        />

        <Button
          type="submit"
          className="w-full mt-4 bg-sky-500 hover:bg-sky-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              Place Order
            </>
          )}
        </Button>
      </Card>
    </motion.form>
  );
}
