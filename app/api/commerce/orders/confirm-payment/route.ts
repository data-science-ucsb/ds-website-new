import { NextRequest, NextResponse } from "next/server";
import { getOrder, updateOrder } from "@/backend/commerce/orderStore";

export async function POST(request: NextRequest) {
  const secret = process.env.ORDER_CONFIRMATION_SECRET;
  const authorization = request.headers.get("authorization");

  if (!secret || authorization !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { orderId, paymentReference } = (await request.json()) as {
      orderId?: string;
      paymentReference?: string;
    };

    if (!orderId) {
      return NextResponse.json({ error: "Missing order ID." }, { status: 400 });
    }

    const order = await getOrder(orderId);

    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    if (order.paymentStatus === "paid") {
      return NextResponse.json({ order });
    }

    const updatedOrder = await updateOrder(orderId, {
      paymentStatus: "paid",
      status: "paid",
      paymentReference: paymentReference?.slice(0, 200) || "manual-confirmation",
    });

    return NextResponse.json({ order: updatedOrder });
  } catch {
    return NextResponse.json({ error: "Unable to confirm payment." }, { status: 400 });
  }
}
