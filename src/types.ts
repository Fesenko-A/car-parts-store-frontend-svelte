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
  userId?: string;
  searchString?: string;
  status?: string;
  pageNumber: number;
  pageSize: number;
};
