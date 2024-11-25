import { notFound } from "next/navigation";
import React from "react";

import CategoryForm from "./CollectionForm";

type TCollectionViewPageProps = {
  collectionId: string;
};
const CollectionViewPage = ({ collectionId }: TCollectionViewPageProps) => {
  const collection = null;
  let pageTitle = "Tạo mới bộ sưu tập";

  if (collectionId !== "create") {
    const category = null;
    if (!category) {
      notFound();
    }
    pageTitle = "Chỉnh sửa bộ sưu tập";
  }

  return <CategoryForm pageTitle={pageTitle} initialData={collection} />;
};

export default CollectionViewPage;
