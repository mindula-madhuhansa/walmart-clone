import { Product } from "@/typings/productTypings";

export default function getCartTotal(products: Product[]): string {
  const total = products.reduce(
    (accumulator: number, currentProduct: Product) =>
      accumulator + currentProduct.price,
    0
  );

  return `${
    products[0]?.currency ? products[0]?.currency : "USD"
  } ${total.toFixed(2)}`;
}
