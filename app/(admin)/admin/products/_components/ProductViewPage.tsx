import { notFound } from "next/navigation";
import React from "react";

import ProductForm from "./ProductForm";

type TProductViewPageProps = {
  productId: string;
};
export default async function ProductViewPage({
  productId,
}: TProductViewPageProps) {
  const product = null;
  let pageTitle = "Tạo mới sản phẩm";

  if (productId !== "create") {
    const product = null;
    if (!product) {
      notFound();
    }
    pageTitle = "Chỉnh sửa sản phẩm";
  }
  return <ProductForm initialData={product} pageTitle={pageTitle} />;
}
