import { writable } from "svelte/store";
import type { Product } from "../types";

export const products = writable<Product[]>([
  {
    id: 1,
    name: "Triple QX Fully Syn Engine Oil 5W-30 C3 - 5Ltr",
    description: "Triple QX Fully Syn Engine Oil 5W-30 C3 - 5Ltr DESC",
    imageUrl:
      "https://lkqmedia.eurocarparts.com/product/521776061/?guid=ztc6puxzh91kydwt997djdir35rzk4nrsow14ra&currentVersion=1715768573000&t=resize&height=482&width=482",
    brandId: 1,
    brand: {
      id: 1,
      name: "Triple QX",
    },
    categoryId: 1,
    category: {
      id: 1,
      name: "Oils",
    },
    inStock: true,
    initialPrice: 47.49,
    discountPercentage: 0,
    finalPrice: 47.49,
  },
  {
    id: 2,
    name: "Shell Helix HX8 C3 Engine Oil - 5W-30 - 1Ltr",
    description: "Shell Helix HX8 C3 Engine Oil - 5W-30 - 1Ltr DESC",
    imageUrl:
      "https://lkqmedia.eurocarparts.com/product/521773722/?guid=ztc6puxzh91kyzqzex3qdg3nh1x8ui1nu64ngje&currentVersion=1721058383000&t=resize&height=482&width=482",
    brandId: 2,
    brand: {
      id: 2,
      name: "Shell",
    },
    categoryId: 1,
    category: {
      id: 1,
      name: "Oils",
    },
    inStock: true,
    initialPrice: 6.73,
    discountPercentage: 0,
    finalPrice: 6.73,
  },
  {
    id: 3,
    name: "Castrol Magnatec C3 Engine Oil - 5W-30 - 4ltr",
    description: "Castrol Magnatec C3 Engine Oil - 5W-30 - 4ltr DESC",
    imageUrl:
      "https://lkqmedia.eurocarparts.com/product/521772391/?guid=ztc6puxzh91kb8kneaa7f9wzsh1g7a1mjar9ere&currentVersion=1721056010000&t=resize&height=482&width=482",
    brandId: 3,
    brand: {
      id: 3,
      name: "Castrol",
    },
    categoryId: 1,
    category: {
      id: 1,
      name: "Oils",
    },
    specialTagId: 1,
    specialTag: {
      id: 1,
      name: "Best seller",
    },
    inStock: true,
    initialPrice: 48.49,
    discountPercentage: 10,
    finalPrice: 43.64,
  },
  {
    id: 4,
    name: "Bosch Car Battery 075 4 Year Guarantee",
    description: "Bosch Car Battery 075 4 Year Guarantee DESC",
    imageUrl:
      "https://lkqmedia.eurocarparts.com/product/444770757/?guid=ztc6puxzh91ky7rmpgzpux53998h5uz8qd4s4ky&currentVersion=1716834548000&t=resize&height=482&width=482",
    brandId: 4,
    brand: {
      id: 4,
      name: "Bosch",
    },
    categoryId: 2,
    category: {
      id: 2,
      name: "Batteries",
    },
    specialTagId: 1,
    specialTag: {
      id: 1,
      name: "Best seller",
    },
    inStock: true,
    initialPrice: 93.19,
    discountPercentage: 5,
    finalPrice: 88.53,
  },
  {
    id: 5,
    name: "Varta 100 Car Battery - 4 Year Guarantee",
    description: "Varta 100 Car Battery - 4 Year Guarantee DESC",
    imageUrl:
      "https://lkqmedia.eurocarparts.com/product/444771002/?guid=ztc6puxzh91kbx1388hq6gxeanmc9fkm5o59h1y&currentVersion=1722960115000&t=resize&height=482&width=482",
    brandId: 5,
    brand: {
      id: 5,
      name: "Varta",
    },
    categoryId: 2,
    category: {
      id: 2,
      name: "Batteries",
    },
    specialTagId: 2,
    specialTag: {
      id: 2,
      name: "Limited offer",
    },
    inStock: true,
    initialPrice: 149.99,
    discountPercentage: 40,
    finalPrice: 89.99,
  },
  {
    id: 6,
    name: "Bosch 501 12V 5W Capless Bulb Clear - Single Bulb",
    description: "Bosch 501 12V 5W Capless Bulb Clear - Single Bulb DESC",
    imageUrl:
      "https://lkqmedia.eurocarparts.com/product/481770139/?guid=ztc6puxzh91kbk6adhfux3nutd4zopbpzaifika&currentVersion=1723035120000&t=resize&height=482&width=482",
    brandId: 4,
    brand: {
      id: 4,
      name: "Bosch",
    },
    categoryId: 3,
    category: {
      id: 3,
      name: "Bulbs",
    },
    inStock: false,
    initialPrice: 1.19,
    discountPercentage: 0,
    finalPrice: 1.19,
  },
]);
