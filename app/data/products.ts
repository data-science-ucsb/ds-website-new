import type { Product } from "@/types/ecommerce";

export const products: Product[] = [
  {
    id: "ds-shirt-2026",
    name: "DS UCSB Club Tee",
    description:
      "Soft everyday club t-shirt for pickup at a general meeting.",
    price: 18,
    image: "/images/25-26-tshirt.jpg",
    category: "merchandise",
    inventory: 150,
    inStock: true,
  },
  {
    id: "ds-membership-2026",
    name: "2026 Member Pass",
    description:
      "Annual membership with priority access to club events and merch drops. Ends at the end of the 26-27 school year.",
    price: 20,
    image: "/logo.png",
    category: "membership",
    inventory: 500,
    inStock: true,
  },
  {
    id: "ds-bundle-2026",
    name: "Tee + Membership Bundle",
    description:
      "Bundle pricing for one club tee and the 2026 member pass.",
    price: 34,
    image: "/images/homepage.png",
    category: "bundle",
    inventory: 120,
    inStock: true,
  },
];

export const productsById = new Map(products.map((product) => [product.id, product]));

export function getProductById(id: string) {
  return productsById.get(id);
}
