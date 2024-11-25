import { notFound } from "next/navigation";
import React from "react";

import { getBrandById } from "@/lib/actions/brand.action";

import BrandForm from "./BrandForm";

type TBrandViewPageProps = {
  brandId: string;
};
export default async function BrandViewPage({ brandId }: TBrandViewPageProps) {
  let brand = null;
  let pageTitle = "Tạo mới nhãn hiệu";

  if (brandId !== "create") {
    const data = await getBrandById({ brandId });
    if (!data) notFound();
    brand = JSON.parse(data);

    pageTitle = "Chỉnh sửa nhãn hiệu";
  }

  return <BrandForm pageTitle={pageTitle} initialData={brand} />;
}
