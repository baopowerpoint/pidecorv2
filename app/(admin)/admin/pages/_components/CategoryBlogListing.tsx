import Image from "next/image";
import React from "react";

import CategoryBlogTable from "@/components/shared/table/CategoryBlogTable";
import { getAllCategoryBlogs } from "@/lib/actions/category-blog.action";

export default async function CategoryBlogListing() {
  const blogs = await getAllCategoryBlogs({});

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
  return <CategoryBlogTable categoryBlogData={JSON.parse(blogs)} />;
}
