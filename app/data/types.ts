export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: 'merchandise' | 'membership' | 'bundle';
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    customerInfo: CustomerInfo;
    status: 'pending' | 'confirmed' | 'completed';
    createdAt: Date;
}

export interface CustomerInfo {
    name: string;
    email: string;
    zelleUsername: string;
}

export interface ZellePayment {
    amount: number;
    zelleUsername: string;
    orderId: string;
    timestamp: Date;
}