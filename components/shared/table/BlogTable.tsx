"use client";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

import { blogColumns } from "@/constants/columDef";
import { deleteBlog } from "@/lib/actions/blog.action";
import logger from "@/lib/logger";
import { Blog } from "@/types/global";

import DataTable from "../DataTable";

const BlogTable = ({ blogData }: { blogData: Blog[] }) => {
  const router = useRouter();
  const actions = [
    {
      label: <IconEdit />,
      onClick: (row: Blog) => {
        router.push(`/admin/blogs/${row._id}`);
      },
    },
    {
      label: <IconTrash />,
      onClick: async (row: Blog) => {
        try {
          await deleteBlog({ blogId: row._id, path: "/admin/blogs" });
        } catch (error) {
          logger.error(error);
        }
      },
    },
  ];

  return (
    <DataTable
      caption="Nhãn hiệu"
      columns={blogColumns}
      data={blogData}
      actions={actions}
    />
  );
};

export default BlogTable;
