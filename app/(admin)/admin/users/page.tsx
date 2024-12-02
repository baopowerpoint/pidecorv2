import React from "react";

import Heading from "@/components/shared/Heading";
import PageContainer from "@/components/shared/PageContainer";
import { Separator } from "@/components/ui/separator";

import UserListingPage from "./_components/UserListingPage";

export const metadata = {
  title: "Dashboard: Quản lý người dùng",
};

export default async function Page() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Quản lý Người dùng"
            description="Quản lý Người dùng"
          />
        </div>
        <Separator />
        <UserListingPage />
      </div>
    </PageContainer>
  );
}
