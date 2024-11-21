interface Author {
  _id: string;
  name: string;
  image: string;
}
interface Tag {
  _id: string;
  name: string;
}

interface Material {
  _id: string;
  name: string;
}

interface Pattern {
  _id: string;
  name: string;
}

interface Brand {
  _id: string;
  name: string;
}

interface Category {
  _id: string;
  name: string;
}

interface Collection {
  _id: string;
  description: string;
  featured: boolean;
  image: string;
  name: string;
  products: number;
}

interface Color {
  _id: string;
  name: string;
  hexCode: string; // Ví dụ nếu có mã màu
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
  price: number;
  salePrice?: number;
}
interface Blog {
  _id: string;
  title: string;
  author: Author;

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
