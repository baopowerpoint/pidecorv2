import { notFound } from "next/navigation";
import React from "react";

import CategoryForm from "./CategoryForm";

type TCategoryViewPageProps = {
  categoryId: string;
};
export default async function CategoryViewPage({
  categoryId,
}: TCategoryViewPageProps) {
  const category = null;
  let pageTitle = "Tạo mới danh mục";

  if (categoryId !== "create") {
    const category = null;
    if (!category) {
      notFound();
    }
    pageTitle = "Chỉnh sửa danh mục";
    return <CategoryForm pageTitle={pageTitle} type="edit" />;
  }

  return <CategoryForm pageTitle={pageTitle} type="create" />;
}
