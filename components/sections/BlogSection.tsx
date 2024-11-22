import React from "react";

import { blogs } from "@/data/blogs";

import BlogCard from "../cards/BlogCard";

const BlogSection = () => {
  return (
    <>
      <h1 className="h1-bold text-center text-dark-100">
        Tìm hiểu về xu hướng
        <span className="text-primary-500"> Rèm cửa</span>
      </h1>

      <div className="mt-10 flex w-full flex-col gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </>
  );
};

export default BlogSection;
