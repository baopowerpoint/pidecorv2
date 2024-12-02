"use client";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

import { collectionBlogColumns } from "@/constants/columDef";
import { deleteCollectionBlog } from "@/lib/actions/collection-blog.action";
import logger from "@/lib/logger";
import { CollectionBlog } from "@/types/global";

import DataTable from "../DataTable";

const CollectionBlogTable = ({
  collectionBlogData,
}: {
  collectionBlogData: CollectionBlog[];
}) => {
  const router = useRouter();
  const actions = [
    {
      label: <IconEdit />,
      onClick: (row: CollectionBlog) => {
        router.push(`/admin/collectionBlogs/${row._id}`);
      },
    },
    {
      label: <IconTrash />,
      onClick: async (row: CollectionBlog) => {
        try {
          await deleteCollectionBlog({
            collectionBlogId: row._id,
            path: "/admin/collectionBlogs",
          });
        } catch (error) {
          logger.error(error);
        }
      },
    },
  ];
  console.log(collectionBlogData);
  return (
    <DataTable
      caption="Danh sách bài viết theo danh mục"
      columns={collectionBlogColumns}
      data={collectionBlogData}
      actions={actions}
    />
  );
};

export default CollectionBlogTable;
