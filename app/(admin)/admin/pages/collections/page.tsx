import React from "react";

import { getAllBlogs } from "@/lib/actions/blog.action";
import { getAllCollections } from "@/lib/actions/collection.action";
import { Blog, Collection } from "@/types/global";

import CollectionBlogForm from "../_components/CollectionBlogForm";
import CollectionBlogListing from "../_components/CollectionBlogListing";

export default async function Page() {
  const data = await getAllCollections({ select: "_id name" });
  const collectionData = JSON.parse(data || "[]").map(
    (collection: Collection) => ({
      label: collection.name,
      value: collection._id,
    })
  );
  const blogs = await getAllBlogs({});
  const blogData = JSON.parse(blogs || "[]").map((blog: Blog) => ({
    label: blog.title,
    value: blog._id,
  }));
  return (
    <>
      <CollectionBlogForm collectionData={collectionData} blogData={blogData} />
      <CollectionBlogListing />
    </>
  );
}
