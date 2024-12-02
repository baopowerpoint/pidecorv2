import Image from "next/image";
import React from "react";

import CollectionTable from "@/components/shared/table/CollectionTable";
import { getAllCollections } from "@/lib/actions/collection.action";

export default async function CollectionListingPage() {
  const collections = await getAllCollections({});
  if (!collections)
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
  return <CollectionTable collectionData={JSON.parse(collections)} />;
}
