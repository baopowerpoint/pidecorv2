import Image from "next/image";
import React from "react";

import BlogTable from "@/components/shared/table/BlogTable";
import { getAllBlogs } from "@/lib/actions/blog.action";

export default async function BlogListingPage() {
  const blogs = await getAllBlogs({});

  if (!blogs)
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
  return <BlogTable blogData={JSON.parse(blogs)} />;
}
