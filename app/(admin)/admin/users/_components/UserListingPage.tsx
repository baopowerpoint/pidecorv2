import Image from "next/image";
import React from "react";

import UserTable from "@/components/shared/table/UserTable";
import { getAllUsers } from "@/lib/actions/user.action";

export default async function UserListingPage() {
  const users = await getAllUsers();
  if (!users)
    return (
      <div>
        <h1 className="base-semibold"> Không tìm thấy dữ liệu!</h1>
        <Image
          src="/images/no-document.png"
          alt="no document image"
          width={100}
          height={100}
        />
      </div>
    );
  return <UserTable userData={JSON.parse(users)} />;
}
