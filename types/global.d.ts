/* eslint-disable no-use-before-define */
import { IBlog } from "@/database/blog.model";

interface Author {
  _id: string;
  name: string;
  image: string;
}
interface ShippingAddress {
  province: string;
  district: string;
  ward: string;
  detail: string;
}
interface Tag {
  _id: string;
  name: string;
}

interface CollectionBlog {
  _id: string;
  collectionId: Collection;
  blogId: Blog;
}
interface CategoryBlog {
  _id: string;
  categoryId: Category;
  blogId: Blog;
}
interface Material {
  _id: string;
  name: string;
  description: string;
  image: string;
  products: number;
}

interface Pattern {
  _id: string;
  name: string;
}

interface Brand {
  _id: string;
  name: string;
  description: string;
  image: string;
  products: number;
}
interface Collection {
  _id: string;
  description: string;
  slug: string;
  category: string;
  featured: boolean;
  image: string;
  name: string;
  products: number;
}
interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  collections: Collection[];
  products: number;
}

interface User {
  _id: string;
  clerkId: string;
  name: string;
  username: string;
  email: string;
  role: string;
  likes: number;
  shippingAddress: ShippingAddress | null;
  picture: string;
}

interface Color {
  _id: string;
  products: number;
  hex: string; // Ví dụ nếu có mã màu
}

interface Dimensions {
  length: number;
  width: number;
  height: number;
}

interface MotorSpecifications {
  motorType: string;
  power: number;
  voltage: number;
}

interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  images: string[];
  featuredImage: string;
  sku: string;
  price: number;
  stock: number;
  specs?: {
    name: string;
    value: string;
  }[];
  salePrice: number;
  categoryId: Category;
  brandId: Brand;
  materialId: Material;
  collectionId: Collection;
  colors: Color[];
  tags: Tag[];
}
interface Blog extends Partial<IBlog> {
  _id: string;
  title: string;
  description: string;
  content: string;
  author: Author;
  thumbnail: string;
  createdAt: Date;
  likes: number;
  tags: Tag[];
  views: number;
}
type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
type ErrorResponse = ActionResponse<undefined> & { success: false };
type APIErrorResponse = NextResponse<ErrorResponse>;
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;
export type Roles = "admin" | "moderator";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
