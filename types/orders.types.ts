export interface OrderResponse {
    orders: Order[];
    totalOrders: number;
    totalPages: number;
    currentPage: number;
}

// 🔹 Main order structure
export interface Order {
    _id: string;
    userId?: string | null;
    sessionId: string;
    billingDetails?: BillingDetails;
    items: OrderItem[];
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;
    status: "pending" | "paid" | "cancelled" | string;
    paymentStatus: "paid" | "unpaid" | string;
    paymentMethod: string;
    stripeSessionId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// 🔹 Customer billing info
export interface BillingDetails {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

// 🔹 Order item
export interface OrderItem {
    _id: string;
    productId: Product;
    variantId: Variant;
    size: string;
    quantity: number;
    price: number;
}

// 🔹 Product info
export interface Product {
    _id: string;
    title: string;
    price: number;
    id: string;
}

// 🔹 Variant info
export interface Variant {
    _id: string;
    color: {
        name: string;
        value: string;
    };
    images: VariantImage[];
}

// 🔹 Variant image info
export interface VariantImage {
    url: string;
    publicId?: string;
    _id: string;
}
