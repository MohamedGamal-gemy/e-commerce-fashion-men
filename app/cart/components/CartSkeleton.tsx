"use client";
import React from "react";

const CartSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
      {/* Skeleton for Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 flex gap-4"
          >
            <div className="w-[100px] h-[100px] bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            <div className="flex-1 space-y-3">
              <div className="w-1/2 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="w-1/3 h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="w-2/3 h-4 bg-gray-300 dark:bg-gray-700 rounded mt-4"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Skeleton for Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-4">
        <div className="w-1/2 h-5 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="w-3/4 h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="w-1/3 h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="w-full h-10 bg-gray-300 dark:bg-gray-700 rounded mt-6"></div>
      </div>
    </div>
  );
};

export default CartSkeleton;
