import { notFound } from "next/navigation";
import React from "react";

import { getCategoryById } from "@/lib/actions/category.action";

import CategoryForm from "./CategoryForm";

type TCategoryViewPageProps = {
  categoryId: string;
};
export default async function CategoryViewPage({
  categoryId,
}: TCategoryViewPageProps) {
  let category = null;
  let pageTitle = "Tạo mới danh mục";

  if (categoryId !== "create") {
    const data = await getCategoryById({ categoryId });
    if (!data) {
      notFound();
    }
    category = JSON.parse(data);
    pageTitle = "Chỉnh sửa danh mục";
    return (
      <CategoryForm pageTitle={pageTitle} type="edit" initialData={category} />
    );
  }

  return <CategoryForm pageTitle={pageTitle} type="create" />;
}
