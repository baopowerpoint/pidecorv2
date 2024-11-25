import Image from "next/image";
import React from "react";

import BrandTable from "@/components/shared/table/BrandTable";
import { getAllBrands } from "@/lib/actions/brand.action";

export default async function BrandListingPage() {
  const brands = await getAllBrands();

  if (!brands)
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
  return <BrandTable brandData={JSON.parse(brands)} />;
}
