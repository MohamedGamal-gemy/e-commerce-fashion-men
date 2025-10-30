"use client";

import React from "react";
import OrdersPagination from "../../../admin/orders/components/OrdersPagination";

interface PaginationProps {
  totalPages?: number;
}

export const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  if (!totalPages || totalPages <= 1) return null;
  return (
    <div className="mt-12 flex justify-center">
      <OrdersPagination totalPages={totalPages} />
    </div>
  );
};

export default Pagination;


