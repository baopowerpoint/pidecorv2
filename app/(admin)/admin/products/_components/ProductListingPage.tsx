import Image from "next/image";
import React from "react";

import ProductTable from "@/components/shared/table/ProductTable";
import { getAllProducts } from "@/lib/actions/product.action";

export default async function ProductListingPage() {
  const data = await getAllProducts({});
  const products = JSON.parse(data?.products || "[]");
  if (!products)
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
  return <ProductTable productData={products} />;
}
