import { NextRequest, NextResponse } from "next/server";
import { productsById } from "@/app/data/products";
import { saveOrder } from "@/backend/commerce/orderStore";
import { checkRateLimit } from "@/lib/rateLimit";
import type {
  CartItem,
  CheckoutPaymentMethod,
  CheckoutRequest,
  CheckoutResponse,
  OrderRecord,
} from "@/types/ecommerce";

const pickupLocation = "TD-W 1701";
const paymentMethods: CheckoutPaymentMethod[] = ["zelle", "cash", "venmo"];

function isPaymentMethod(value: unknown): value is CheckoutPaymentMethod {
  return typeof value === "string" && paymentMethods.includes(value as CheckoutPaymentMethod);
}

function createOrderId() {
  const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = crypto.randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase();
  return `DS-${dateStamp}-${randomSuffix}`;
}

function normalizeItems(items: CheckoutRequest["items"]): CartItem[] {
  const normalizedItems = items.map((item) => {
    const product = productsById.get(item.productId);

    if (!product) {
      throw new Error(`Unknown product: ${item.productId}`);
    }

    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 10) {
      throw new Error(`Invalid quantity for ${product.name}`);
    }

    if (product.inStock === false) {
      throw new Error(`${product.name} is currently unavailable.`);
    }

    return {
      ...product,
      quantity: item.quantity,
    };
  });

  if (!normalizedItems.length) {
    throw new Error("At least one item is required.");
  }

  return normalizedItems;
}

function getRequesterId(request: NextRequest, cartId: string) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";
  return `${ip}:${cartId}`;
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as CheckoutRequest;
    const customerName = payload.customerInfo?.name?.trim();
    const customerEmail = payload.customerInfo?.email?.trim();

    if (!payload.cartId) {
      return NextResponse.json({ error: "Missing cart session." }, { status: 400 });
    }

    if (!customerName || !customerEmail) {
      return NextResponse.json(
        { error: "Customer name and email are required." },
        { status: 400 }
      );
    }

    if (!isPaymentMethod(payload.paymentMethod)) {
      return NextResponse.json(
        { error: "Select a payment method." },
        { status: 400 }
      );
    }

    const rateLimit = checkRateLimit(getRequesterId(request, payload.cartId), {
      limit: 10,
      windowMs: 10 * 60 * 1000,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Too many checkout attempts. Retry in ${Math.ceil(
            rateLimit.retryAfterMs / 1000
          )} seconds.`,
        },
        { status: 429 }
      );
    }

    const items = normalizeItems(payload.items);
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const orderId = createOrderId();
    const now = new Date().toISOString();

    const baseOrder: OrderRecord = {
      id: orderId,
      cartId: payload.cartId,
      items,
      subtotal,
      total: subtotal,
      pickupLocation,
      customerInfo: {
        name: customerName,
        email: customerEmail,
        ...(payload.customerInfo.notes?.trim()
          ? { notes: payload.customerInfo.notes.trim() }
          : {}),
      },
      paymentMethod: payload.paymentMethod,
      paymentStatus: "pending",
      status: "pending_payment",
      createdAt: now,
      updatedAt: now,
    };

    const order = await saveOrder(baseOrder);

    const response: CheckoutResponse = {
      order,
      message: "Order received. Payment confirmation and membership processing will be sent by email.",
      nextSteps: [
        `Keep order number ${order.id} for your records.`,
        "Your order remains pending until the club confirms payment.",
        `Pickup location: ${pickupLocation}`,
      ],
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to process checkout.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
