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
