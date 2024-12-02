import Image from "next/image";
import React from "react";

import CollectionBlogTable from "@/components/shared/table/CollectionBlogTable";
import { getAllCollectionBlogs } from "@/lib/actions/collection-blog.action";

export default async function CollectionBlogListing() {
  const blogs = await getAllCollectionBlogs({});

  if (!blogs || blogs === "[]")
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
  return <CollectionBlogTable collectionBlogData={JSON.parse(blogs)} />;
}
