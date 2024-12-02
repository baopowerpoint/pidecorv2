import { notFound } from "next/navigation";
import React from "react";

import { getMaterialById } from "@/lib/actions/material.action";

import MaterialForm from "./MaterialForm";

type TMaterialViewPageProps = {
  materialId: string;
};
export default async function MaterialViewPage({
  materialId,
}: TMaterialViewPageProps) {
  let material = null;
  let pageTitle = "Tạo mới nhãn hiệu";

  if (materialId !== "create") {
    const data = await getMaterialById({ materialId });
    if (!data) notFound();
    material = JSON.parse(data);

    pageTitle = "Chỉnh sửa nhãn hiệu";
    return (
      <MaterialForm type="edit" pageTitle={pageTitle} initialData={material} />
    );
  }

  return <MaterialForm type="create" pageTitle={pageTitle} />;
}
