export type ProductCategory = "merchandise" | "membership" | "bundle";

export type CheckoutPaymentMethod = "zelle" | "cash" | "venmo";

export type OrderStatus =
  | "pending_payment"
  | "payment_review"
  | "paid"
  | "fulfilled"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "needs_review";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  inventory?: number;
  inStock?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CheckoutItemInput {
  productId: string;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  notes?: string;
}

export interface CheckoutRequest {
  cartId: string;
  items: CheckoutItemInput[];
  paymentMethod: CheckoutPaymentMethod;
  customerInfo: CustomerInfo;
}

export interface OrderRecord {
  id: string;
  cartId: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  pickupLocation: string;
  customerInfo: CustomerInfo;
  paymentMethod: CheckoutPaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  paymentReference?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutResponse {
  order: OrderRecord;
  message: string;
  nextSteps?: string[];
}
