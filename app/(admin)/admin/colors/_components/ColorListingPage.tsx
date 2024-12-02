import Image from "next/image";
import React from "react";

import ColorTable from "@/components/shared/table/ColorTable";
import { getAllColors } from "@/lib/actions/color.action";

export default async function ColorListingPage() {
  const colors = await getAllColors();
  if (!colors)
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
  return <ColorTable colorData={JSON.parse(colors)} />;
}
