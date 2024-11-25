import { z } from "zod";
export const AddressFormSchema = z.object({
  name: z.string().min(1, { message: "Tên không được để trống" }),
  phone: z.string(),
  addressDetail: z.object({
    province: z.object({ id: z.string(), name: z.string() }),
    district: z.object({ id: z.string(), name: z.string() }),
    ward: z.object({ id: z.string(), name: z.string() }),
    detail: z.string(),
  }),
  note: z.string(),
});

export const UserSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." }),
  email: z.string().email({ message: "Please provide a valid email address." }),
  bio: z.string().optional(),
  image: z
    .string()
    .url({ message: "Please provide a valid URL." })
    .optional()
    .nullable(),
  location: z.string().optional(),
  portfolio: z
    .string()
    .url({ message: "Please provide a valid URL." })
    .optional(),
  reputation: z.number().optional(),
});
export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please provide a valid email address." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long. " })
    .max(100, { message: "Password cannot exceed 100 characters." }),
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(30, { message: "Username cannot exceed 30 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),

  name: z
    .string()
    .min(1, { message: "Name is required." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces.",
    }),

  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please provide a valid email address." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
});
export const AccountSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required." }),
  name: z.string().min(1, { message: "Name is required." }),
  image: z.string().optional().nullable(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .optional(),
  provider: z.string().min(1, { message: "Provider is required." }),
  providerAccountId: z
    .string()
    .min(1, { message: "Provider Account ID is required." }),
});

export const ProductFormSchema = z.object({
  title: z.string().min(1, { message: "Require" }),
  description: z.string().min(1, { message: "Require" }),
  content: z.string(),
  price: z.coerce.number(),
  salePrice: z.coerce.number(),
  quantity: z.coerce.number(),
  category: z.string(),
  brand: z.string(),
  material: z.string(),
  tags: z
    .array(
      z
        .string()
        .min(1, { message: "Thẻ không được để trống" })
        .max(20, { message: "Thẻ không được quá 20 ký tự" })
    )
    .min(1, { message: "Cần ít nhất 1 thẻ" })
    .max(3, { message: "Không được quá 3 thẻ" }),
  colors: z
    .array(
      z
        .string()
        .min(1, { message: "Màu không được để trống" })
        .max(7, { message: "Màu không được quá 7 ký tự" })
    )
    .min(1, { message: "Cần ít nhất 1 màu" })
    .max(5, { message: "Không được quá 5 màu" }),
  images: z
    .array(
      z
        .string()
        .min(1, { message: "Ảnh không được để trống" })
        .url({ message: "Ảnh không hợp lệ" })
    )
    .min(1, { message: "Cần ít nhất 1 ảnh" })
    .max(5, { message: "Không được quá 5 ảnh" }),
});
export const BrandFormSchema = z.object({
  name: z.string().min(1, { message: "Tên không được để trống" }),
  image: z
    .array(z.string().url({ message: "Ảnh không hợp lệ" }))
    .max(1, {
      message: "Chỉ được tối đa 1 ảnh",
    })
    .min(1, { message: "Cần ít nhất 1 ảnh" }),
  description: z.string().min(1, { message: "Mô tả không được để trống" }),
});
export const CategoryFormSchema = z.object({
  name: z.string().min(1, { message: "Tên không được để trống" }),
  image: z.array(z.string().url({ message: "Ảnh không hợp lệ" })).max(1, {
    message: "Chỉ được tối đa 1 ảnh",
  }),
  description: z.string().min(1, { message: "Mô tả không được để trống" }),
});
export const CollectionFormSchema = z.object({
  name: z.string().min(1, { message: "Tên không được để trống" }),
  image: z.array(z.string().url({ message: "Ảnh không hợp lệ" })).max(1, {
    message: "Chỉ được tối đa 1 ảnh",
  }),
  description: z.string().min(1, { message: "Mô tả không được để trống" }),
});
