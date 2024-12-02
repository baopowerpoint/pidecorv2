"use client";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import { tagColumns } from "@/constants/columDef";
import { deleteTag } from "@/lib/actions/tag.action";
import logger from "@/lib/logger";
import { Tag } from "@/types/global";

import DataTable from "../DataTable";

const TagTable = ({ tagData }: { tagData: Tag[] }) => {
  const router = useRouter();
  const actions = [
    {
      label: <IconEdit />,
      onClick: (row: Tag) => {
        router.push(`/admin/tags/${row._id}`);
      },
    },
    {
      label: <IconTrash />,
      onClick: async (row: Tag) => {
        try {
          await deleteTag({ tagId: row._id, path: "/admin/tags" });
          toast.success("Xoá thẻ thành công");
        } catch (error) {
          logger.error(error);
        }
      },
    },
  ];

  return (
    <DataTable
      caption="Thẻ"
      columns={tagColumns}
      data={tagData}
      actions={actions}
    />
  );
};

export default TagTable;
