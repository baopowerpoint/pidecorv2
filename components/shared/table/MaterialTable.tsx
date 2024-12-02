"use client";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

import { materialColumns } from "@/constants/columDef";
import { deleteMaterial } from "@/lib/actions/material.action";
import logger from "@/lib/logger";
import { Material } from "@/types/global";

import DataTable from "../DataTable";

const MaterialTable = ({ materialData }: { materialData: Material[] }) => {
  const router = useRouter();
  const actions = [
    {
      label: <IconEdit />,
      onClick: (row: Material) => {
        router.push(`/admin/materials/${row._id}`);
      },
    },
    {
      label: <IconTrash />,
      onClick: async (row: Material) => {
        try {
          await deleteMaterial({
            materialId: row._id,
            path: "/admin/materials",
          });
        } catch (error) {
          logger.error(error);
        }
      },
    },
  ];

  return (
    <DataTable
      caption="Chất liệu"
      columns={materialColumns}
      data={materialData}
      actions={actions}
    />
  );
};

export default MaterialTable;
