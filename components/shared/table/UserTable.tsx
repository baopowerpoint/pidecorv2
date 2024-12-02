"use client";
import React from "react";

import { userColumn } from "@/constants/columDef";
import { User } from "@/types/global";

import DataTable from "../DataTable";

const UserTable = ({ userData }: { userData: User[] }) => {
  return (
    <DataTable caption="Người dùng" columns={userColumn} data={userData} />
  );
};

export default UserTable;
