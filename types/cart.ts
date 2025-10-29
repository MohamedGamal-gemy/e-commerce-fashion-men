export type CartItem = {
  productId: {
    _id: string;
    title: string;
    price: number;
    id: string;
  };
  variantId: {
    _id: string;
    color: {
      name: string;
      value: string;
    };
    images: {
      url: string;
      publicId: string;
      _id: string;
    }[];
  };
  size: string;
  quantity: number;
  price: number;
  isAvailable: boolean;
};

export type Cart = {
  _id: string;
  sessionId: string;
  couponCode?: string | null;
  discountAmount: number;
  items: CartItem[];
  subtotal: number;
  totalItems: number;
  createdAt?: string;
  updatedAt?: string;
  userId?: string | null;
};
