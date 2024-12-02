"use client";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

import { collectionColumn } from "@/constants/columDef";
import { deleteCollection } from "@/lib/actions/collection.action";
import logger from "@/lib/logger";
import { Collection } from "@/types/global";

import DataTable from "../DataTable";

const CollectionTable = ({
  collectionData,
}: {
  collectionData: Collection[];
}) => {
  const router = useRouter();
  const actions = [
    {
      label: <IconEdit />,
      onClick: (row: Collection) => {
        router.push(`/admin/collections/${row._id}`);
      },
    },
    {
      label: <IconTrash />,
      onClick: async (row: Collection) => {
        try {
          await deleteCollection({
            collectionId: row._id,
            path: "/admin/collections",
          });
        } catch (error) {
          logger.error(error);
        }
      },
    },
  ];

  return (
    <DataTable
      caption="Bộ sưu tập"
      columns={collectionColumn}
      data={collectionData}
      actions={actions}
    />
  );
};

export default CollectionTable;
