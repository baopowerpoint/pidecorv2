"use client";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import { colorColumns } from "@/constants/columDef";
import { deleteColor } from "@/lib/actions/color.action";
import logger from "@/lib/logger";
import { Color } from "@/types/global";

import DataTable from "../DataTable";

const ColorTable = ({ colorData }: { colorData: Color[] }) => {
  const router = useRouter();
  const actions = [
    {
      label: <IconEdit />,
      onClick: (row: Color) => {
        router.push(`/admin/colors/${row._id}`);
      },
    },
    {
      label: <IconTrash />,
      onClick: async (row: Color) => {
        try {
          await deleteColor({
            colorId: row._id,
            path: "/admin/colors",
          });
          toast.success("Xoá màu thành công");
        } catch (error) {
          logger.error(error);
        }
      },
    },
  ];

  return (
    <DataTable
      caption="Màu"
      columns={colorColumns}
      data={colorData}
      actions={actions}
    />
  );
};

export default ColorTable;
