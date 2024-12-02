"use client";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

import { categoryBlogColumns } from "@/constants/columDef";
import { deleteCategoryBlog } from "@/lib/actions/category-blog.action";
import logger from "@/lib/logger";
import { CategoryBlog } from "@/types/global";

import DataTable from "../DataTable";

const CategoryBlogTable = ({
  categoryBlogData,
}: {
  categoryBlogData: CategoryBlog[];
}) => {
  const router = useRouter();
  const actions = [
    {
      label: <IconEdit />,
      onClick: (row: CategoryBlog) => {
        router.push(`/admin/categoryBlogs/${row._id}`);
      },
    },
    {
      label: <IconTrash />,
      onClick: async (row: CategoryBlog) => {
        try {
          await deleteCategoryBlog({
            categoryBlogId: row._id,
            path: "/admin/categoryBlogs",
          });
        } catch (error) {
          logger.error(error);
        }
      },
    },
  ];
  console.log(categoryBlogData);
  return (
    <DataTable
      caption="Danh sách bài viết theo danh mục"
      columns={categoryBlogColumns}
      data={categoryBlogData}
      actions={actions}
    />
  );
};

export default CategoryBlogTable;
