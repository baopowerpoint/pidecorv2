import { IMaterial } from "@/database/material.model";

// user
export interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}
export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}
export interface DeleteUserParams {
  clerkId: string;
}

// brand
export interface CreateBrandParams {
  name: string;
  image: string;
  description: string;
  path: string;
}
export interface DeleteBrandParams {
  brandId: string;
  path: string;
}
export interface GetBrandByIdParams {
  brandId: string;
}
export interface EditBrandParams {
  brandId: string;
  updateData: {
    name: string;
    image: string;
    description: string;
  };
  path: string;
}

// category
export interface CreateCategoryParams {
  name: string;
  image: string;
  description: string;
  path: string;
}
export interface GetAllCategoriesParams {
  limit?: number;
  select?: string;
  page?: number;
}
export interface DeleteCategoryParams {
  categoryId: string;
  path: string;
}
export interface GetCategoryByIdParams {
  categoryId: string;
}
export interface EditCategoryParams {
  categoryId: string;
  updateData: {
    name: string;
    image: string;
    description: string;
  };
  path: string;
}
// collection
export interface CreateCollectionParams {
  name: string;
  image: string;
  category: string;
  description: string;
  path: string;
}
export interface GetAllCollectionsParams {
  limit?: number;
  page?: number;
  select?: string;
}
export interface DeleteCollectionParams {
  collectionId: string;
  path: string;
}
export interface GetCollectionByIdParams {
  collectionId: string;
}
export interface EditCollectionParams {
  collectionId: string;
  updateData: {
    name: string;
    image: string;
    description: string;
    category: string;
  };
  path: string;
}

// material
export interface CreateMaterialParams {
  name: string;
  image: string;
  description: string;
  path: string;
}
export interface DeleteMaterialParams {
  materialId: string;
  path: string;
}
export interface GetMaterialByIdParams {
  materialId: string;
}
export interface EditMaterialParams {
  materialId: string;
  updateData: Patial<IMaterial>;
  path: string;
}
// product

export interface CreateProductParams {
  title: string;
  description: string;
  content: string;
  price: number;
  salePrice: number;
  stock: number;
  collection: string;
  material: string;
  brand: string;
  category: string;
  tags: string[];
  colors: string[];
  specs?: {
    name: string;
    value: string;
  }[];
  images: string[];
}

export interface GetAllProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  categories?: string;
  sort?: string;
}

export interface GetProductByIdParams {
  productId: string;
}
export interface EditProductParams {
  productId: string;
  updateData: Partial<IProduct>;
  path: string;
}
export interface DeleteProductParams {
  productId: string;
  path: string;
}
export interface GetProductBySlugParams {
  slug: string;
}
// blogs
export interface GetAllBlogsParams {
  limit?: number;
  page?: number;
}

export interface DeleteBlogParams {
  blogId: string;
  path: string;
}

export interface GetBlogByIdParams {
  blogId: string;
}

export interface CreateBlogParams {
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  tags: string[];
  authorId: string;
  path: string;
}
// category blog
export interface CreateCategoryBlogParams {
  categoryId: string;
  blogId: string;
  path: string;
}
export interface DeleteCategoryBlogParams {
  categoryBlogId: string;
  path: string;
}

// color
export interface DeleteColorParams {
  colorId: string;
  path: string;
}

// tag
export interface DeleteTagParams {
  tagId: string;
  path: string;
}

// collection blog

export interface CreateCollectionBlogParams {
  collectionId: string;
  blogId: string;
  path: string;
}

export interface DeleteCollectionBlogParams {
  collectionBlogId: string;
  path: string;
}
