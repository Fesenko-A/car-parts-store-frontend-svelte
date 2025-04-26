import { products } from "../../../stores/productStore";
import type { PageLoad } from "./$types";
import { get } from "svelte/store";

export const load: PageLoad = ({ params }) => {
  const id = parseInt(params.id);
  const allProducts = get(products);
  const product = allProducts.find((p) => p.id === id);

  return {
    product,
  };
};
