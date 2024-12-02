import Image from "next/image";
import React from "react";

import MaterialTable from "@/components/shared/table/MaterialTable";
import { getAllMaterials } from "@/lib/actions/material.action";

export default async function MaterialListingPage() {
  const materials = await getAllMaterials();

  if (!materials)
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
  return <MaterialTable materialData={JSON.parse(materials)} />;
}
