"use client";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

import { productColumns } from "@/constants/columDef";
import { deleteProduct } from "@/lib/actions/product.action";
import logger from "@/lib/logger";
import { Product } from "@/types/global";

import DataTable from "../DataTable";

const ProductTable = ({ productData }: { productData: Product[] }) => {
  const router = useRouter();
  const actions = [
    {
      label: <IconEdit />,
      onClick: (row: Product) => {
        router.push(`/admin/products/${row._id}`);
      },
    },
    {
      label: <IconTrash />,
      onClick: async (row: Product) => {
        try {
          await deleteProduct({
            productId: row._id,
            path: "/admin/products",
          });
        } catch (error) {
          logger.error(error);
        }
      },
    },
  ];

  return (
    <DataTable
      caption="Sản phẩm"
      columns={productColumns}
      data={productData}
      actions={actions}
    />
  );
};

export default ProductTable;
