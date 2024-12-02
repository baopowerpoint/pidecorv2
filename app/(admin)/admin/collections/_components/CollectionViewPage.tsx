import { notFound } from "next/navigation";
import React from "react";

import { getAllCategories } from "@/lib/actions/category.action";
import { getCollectionById } from "@/lib/actions/collection.action";
import { Category } from "@/types/global";

import CollectionForm from "./CollectionForm";

type TCollectionViewPageProps = {
  collectionId: string;
};
export default async function CollectionViewPage({
  collectionId,
}: TCollectionViewPageProps) {
  let collection = null;
  let pageTitle = "Tạo mới bộ sưu tập";
  const categories = await getAllCategories({});
  const categoryData = JSON.parse(categories ?? "[]").map(
    (category: Category) => ({
      value: category._id,
      label: category.name,
    })
  );

  if (collectionId !== "create") {
    const data = await getCollectionById({ collectionId });

    if (!data) {
      notFound();
    }
    collection = JSON.parse(data);
    pageTitle = "Chỉnh sửa bộ sưu tập";
    return (
      <CollectionForm
        pageTitle={pageTitle}
        categoryData={categoryData}
        type="edit"
        initialData={collection}
      />
    );
  }

  return (
    <CollectionForm
      pageTitle={pageTitle}
      categoryData={categoryData}
      type="create"
    />
  );
}
