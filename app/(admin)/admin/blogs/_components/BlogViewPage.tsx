import { notFound } from "next/navigation";
import React from "react";

import { getBlogById } from "@/lib/actions/blog.action";

import BlogForm from "./BlogForm";

type TBlogViewPageProps = {
  blogId: string;
};
export default async function BlogViewPage({ blogId }: TBlogViewPageProps) {
  let blog = null;
  let pageTitle = "Tạo mới bài viết";

  if (blogId !== "create") {
    const data = await getBlogById({ blogId });
    if (!data) notFound();
    blog = JSON.parse(data);

    pageTitle = "Chỉnh sửa bài viết";
    return <BlogForm type="edit" pageTitle={pageTitle} initialData={blog} />;
  }

  return <BlogForm type="create" pageTitle={pageTitle} />;
}
