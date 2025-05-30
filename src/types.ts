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

export type Order = {
  orderId: number;
  pickupName: string;
  pickupPhoneNumber: string;
  pickupEmail: string;
  userId: string;
  user: User;
  status: string;
  paymentMethod: string;
  orderDate: Date;
  lastUpdate?: Date;
  paid: boolean;
  orderDetails: OrderDetails[];
  orderTotal: number;
  totalItems: number;
};

export type OrderDetails = {
  orderDetailsId: number;
  orderId: number;
  order: Order;
  productId: number;
  product: Product;
  productNameAtOrder: string;
  productPriceAtOrder: number;
  quantity: number;
  price: number;
};

export type ShoppingCart = {
  id: number;
  userId: string;
  cartItems: CartItem[];
  cartTotal: number;
};

export type CartItem = {
  id: number;
  productId: number;
  product: Product;
  quantity: number;
  shoppingCartId: number;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
};

export type OrderFilters = {
  userId: string;
  searchString: string;
  status: string;
  pageNumber: number;
  pageSize: number;
};

export type PaginationFields = {
  pageNumber: number;
  pageSize: number;
};

export type ProductFilters = {
  category: string;
  brands: string[];
  specialTags: string[];
  searchString: string;
  sortingOptions: string;
  pageNumber: number;
  pageSize: number;
  outOfStock: boolean;
  onlyWithDiscount: boolean;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  brandId: number;
  brand: Brand;
  specialTagId?: number | null;
  specialTag?: SpecialTag | null;
  categoryId: number;
  category: Category;
  inStock: boolean;
  initialPrice: number;
  discountPercentage: number;
  finalPrice: number;
};

export type ProductCreateDto = {
  brandId: number;
  name: string;
  description: string;
  inStock: boolean;
  specialTagId?: number | null;
  categoryId: number;
  initialPrice: number;
  imageUrl: string;
  discountPercentage: number;
};

export type ProductUpdateDto = {
  productId: number;
  brandId: number;
  name: string;
  description: string;
  inStock: boolean;
  specialTagId?: number | null;
  categoryId: number;
  initialPrice: number;
  imageUrl: string;
  discountPercentage: number;
};
