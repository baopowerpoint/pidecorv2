"use client";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

import { brandColumns } from "@/constants/columDef";
import { deleteBrand } from "@/lib/actions/brand.action";
import logger from "@/lib/logger";
import { Brand } from "@/types/global";

import DataTable from "../DataTable";

const BrandTable = ({ brandData }: { brandData: Brand[] }) => {
  const router = useRouter();
  const actions = [
    {
      label: <IconEdit />,
      onClick: (row: Brand) => {
        router.push(`/admin/brands/${row._id}`);
      },
    },
    {
      label: <IconTrash />,
      onClick: async (row: Brand) => {
        try {
          await deleteBrand({ brandId: row._id, path: "/admin/brands" });
        } catch (error) {
          logger.error(error);
        }
      },
    },
  ];

  return (
    <DataTable
      caption="Nhãn hiệu"
      columns={brandColumns}
      data={brandData}
      actions={actions}
    />
  );
};

export default BrandTable;
