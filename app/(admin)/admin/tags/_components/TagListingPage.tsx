import Image from "next/image";
import React from "react";

import TagTable from "@/components/shared/table/TagTable";
import { getAllTags } from "@/lib/actions/tag.action";

export default async function TagListingPage() {
  const tags = await getAllTags();
  if (!tags)
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
  return <TagTable tagData={JSON.parse(tags)} />;
}
