"use client";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

import { categoryColumn } from "@/constants/columDef";
import { deleteCategory } from "@/lib/actions/category.action";
import logger from "@/lib/logger";
import { Category } from "@/types/global";

import DataTable from "../DataTable";

const CategoryTable = ({ categoryData }: { categoryData: Category[] }) => {
  const router = useRouter();
  const actions = [
    {
      label: <IconEdit />,
      onClick: (row: Category) => {
        router.push(`/admin/categories/${row._id}`);
      },
    },
    {
      label: <IconTrash />,
      onClick: async (row: Category) => {
        try {
          await deleteCategory({
            categoryId: row._id,
            path: "/admin/categories",
          });
        } catch (error) {
          logger.error(error);
        }
      },
    },
  ];

  return (
    <DataTable
      caption="Danh mục"
      columns={categoryColumn}
      data={categoryData}
      actions={actions}
    />
  );
};

export default CategoryTable;
