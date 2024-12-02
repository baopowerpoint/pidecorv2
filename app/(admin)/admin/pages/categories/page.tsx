import React from "react";

import { getAllBlogs } from "@/lib/actions/blog.action";
import { getAllCategories } from "@/lib/actions/category.action";
import { Blog, Category } from "@/types/global";

import CategoryBlogForm from "../_components/CategoryBlogForm";
import CategoryBlogListing from "../_components/CategoryBlogListing";

async function Page() {
  const data = await getAllCategories({ select: "_id name" });
  const categoryData = JSON.parse(data || "[]").map((category: Category) => ({
    label: category.name,
    value: category._id,
  }));
  const blogs = await getAllBlogs({});
  const blogData = JSON.parse(blogs || "[]").map((blog: Blog) => ({
    label: blog.title,
    value: blog._id,
  }));
  return (
    <>
      <CategoryBlogForm categoryData={categoryData} blogData={blogData} />
      <CategoryBlogListing />
    </>
  );
}

export default Page;
