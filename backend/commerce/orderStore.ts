import type { OrderRecord } from "@/types/ecommerce";
import { getFirebaseAdminDb } from "@/backend/firebase/admin";

declare global {
  // eslint-disable-next-line no-var
  var __dsOrderStore: Map<string, OrderRecord> | undefined;
}

const memoryStore = globalThis.__dsOrderStore ?? new Map<string, OrderRecord>();

if (!globalThis.__dsOrderStore) {
  globalThis.__dsOrderStore = memoryStore;
}

const COLLECTION_NAME = "commerce_orders";

export async function saveOrder(order: OrderRecord) {
  const db = getFirebaseAdminDb();

  if (db) {
    await db.collection(COLLECTION_NAME).doc(order.id).set(order);
    return order;
  }

  memoryStore.set(order.id, order);
  return order;
}

export async function getOrder(orderId: string) {
  const db = getFirebaseAdminDb();

  if (db) {
    const snapshot = await db.collection(COLLECTION_NAME).doc(orderId).get();
    return snapshot.exists ? (snapshot.data() as OrderRecord) : null;
  }

  return memoryStore.get(orderId) || null;
}

export async function updateOrder(orderId: string, patch: Partial<OrderRecord>) {
  const currentOrder = await getOrder(orderId);

  if (!currentOrder) {
    return null;
  }

  const updatedOrder: OrderRecord = {
    ...currentOrder,
    ...patch,
    updatedAt: new Date().toISOString(),
  };

  await saveOrder(updatedOrder);
  return updatedOrder;
}
