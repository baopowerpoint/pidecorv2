const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  COLLECTION: (slug: string) => `/bo-suu-tap/${slug}`,
  PRODUCTS: "/san-pham",
  PRODUCT: (slug: string) => `/san-pham/${slug}`,
  QUESTION: (id: string) => `/question/${id}`,
  TAGS: (id: string) => `/tags/${id}`,
  CATEGORY: (slug: string) => `/danh-muc/${slug}`,
};
export default ROUTES;
