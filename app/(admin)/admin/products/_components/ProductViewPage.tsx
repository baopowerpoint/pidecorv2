import { notFound } from "next/navigation";
import React from "react";

import { getAllBrands } from "@/lib/actions/brand.action";
import { getAllCategories } from "@/lib/actions/category.action";
import { getAllCollections } from "@/lib/actions/collection.action";
import { getAllMaterials } from "@/lib/actions/material.action";
import { getProductById } from "@/lib/actions/product.action";
import { Brand, Category, Collection, Material } from "@/types/global";

import ProductForm from "./ProductForm";

type TProductViewPageProps = {
  productId: string;
};
export default async function ProductViewPage({
  productId,
}: TProductViewPageProps) {
  let product = null;
  let pageTitle = "Tạo mới sản phẩm";
  const categories = await getAllCategories({});
  const collections = await getAllCollections({});
  const brands = await getAllBrands();
  const materials = await getAllMaterials();
  const categoryData = JSON.parse(categories ?? "[]").map(
    (category: Category) => ({
      value: category._id,
      label: category.name,
    })
  );
  const collectionData = JSON.parse(collections ?? "[]").map(
    (collection: Collection) => ({
      value: collection._id,
      label: collection.name,
    })
  );
  const brandData = JSON.parse(brands ?? "[]").map((brand: Brand) => ({
    value: brand._id,
    label: brand.name,
  }));
  const materialData = JSON.parse(materials ?? "[]").map(
    (material: Material) => ({
      value: material._id,
      label: material.name,
    })
  );
  if (productId !== "create") {
    const data = await getProductById({ productId });
    if (!data) {
      notFound();
    }
    product = JSON.parse(data);
    pageTitle = "Chỉnh sửa sản phẩm";
    return (
      <ProductForm
        type="edit"
        categoryData={categoryData}
        collectionData={collectionData}
        brandData={brandData}
        materialData={materialData}
        initialData={product}
        pageTitle={pageTitle}
      />
    );
  }
  return (
    <ProductForm
      type="create"
      categoryData={categoryData}
      collectionData={collectionData}
      brandData={brandData}
      materialData={materialData}
      pageTitle={pageTitle}
    />
  );
}
