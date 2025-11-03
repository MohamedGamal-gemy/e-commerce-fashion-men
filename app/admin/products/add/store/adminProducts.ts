"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:9000/api/products";

export const useAdminProducts = () => {
  const queryClient = useQueryClient();

  // 🟢 Get products
  // const getProducts = useQuery({
  //     queryKey: ["adminProducts"],
  //     queryFn: async () => {
  //         const res = await axios.get(API_URL);
  //         return res.data;
  //     },
  // });

  // 🟡 Add product
  const addProduct = useMutation({
    mutationFn: async (newProduct) => {
      const res = await axios.post(API_URL, newProduct);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminProducts"]);
    },
  });

  // 🟠 Edit product
  const editProduct = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axios.patch(`${API_URL}/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminProducts"]);
    },
  });

  // 🔴 Delete product
  const deleteProduct = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`${API_URL}/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminProducts"]);
    },
  });

  return { addProduct, editProduct, deleteProduct };
};
