export type Product = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  brandId: number;
  brand: Brand;
  specialTagId?: number;
  specialTag?: SpecialTag;
  categoryId: number;
  category: Category;
  inStock: boolean;
  initialPrice: number;
  discountPercentage: number;
  finalPrice: number;
};

export type Brand = {
  id: number;
  name: string;
};

export type Category = {
  id: number;
  name: string;
};

export type SpecialTag = {
  id: number;
  name: string;
};
