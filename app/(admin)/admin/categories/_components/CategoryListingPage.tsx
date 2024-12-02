import Image from "next/image";
import React from "react";

import CategoryTable from "@/components/shared/table/CategoryTable";
import { getAllCategories } from "@/lib/actions/category.action";

export default async function CategoryListingPage() {
  const categories = await getAllCategories({});
  if (!categories)
    return (
      <div>
        <h1 className="base-semibold"> Không tìm thấy dữ liệu!</h1>
        <Image
          src="/images/no-document.png"
          alt="no document image"
          width={100}
          height={100}
        />
      </div>
    );
  return <CategoryTable categoryData={JSON.parse(categories)} />;
}
