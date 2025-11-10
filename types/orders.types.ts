export interface OrderResponse {
    orders: Order[];
    totalOrders: number;
    totalPages: number;
    currentPage: number;
}

// 🔹 Main order structure
export interface Order {
    _id: string;
    userId?: string | User | null; // FE/alt naming
    user?: string | User | null;   // BE naming
    sessionId?: string | null;
    billingDetails?: BillingDetails;
    items: OrderItem[];
    subtotal: number;
    shipping?: number; // FE naming
    discount: number;
    total: number; // FE naming
    totalPrice?: number; // BE naming
    shippingPrice?: number; // BE naming
    status: "pending" | "paid" | "shipped" | "delivered" | "cancelled" | string;
    paymentStatus: "paid" | "unpaid" | string;
    paymentMethod: string;
    payment?: {
        method: "cash" | "card" | "paypal" | "wallet" | string;
        status: "pending" | "paid" | "failed" | "refunded" | string;
        transactionId?: string;
    };
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
    productId?: Product; // FE naming
    variantId?: Variant; // FE naming
    product?: Product;   // BE naming
    variant?: Variant;   // BE naming
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

// 🔹 Populated user reference
export interface User {
    _id: string;
    name?: string | null;
    email?: string | null;
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

export interface VariantImage {
    url: string;
    publicId?: string;
    _id: string;
}
