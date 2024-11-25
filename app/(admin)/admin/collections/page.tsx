import Link from "next/link";
import React from "react";

import Heading from "@/components/shared/Heading";
import PageContainer from "@/components/shared/PageContainer";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Dashboard: Quản lý bộ sưu tập",
};

export default async function Page() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Quản lý Bộ sưu tập"
            description="Quản lý Bộ sưu tập"
          />
          <Link
            href="/admin/categories/create"
            className={cn(buttonVariants(), " text-xs md:text-sm")}
          >
            Tạo mới
          </Link>
        </div>
        <Separator />
        <div>Bộ sưu tập</div>
      </div>
    </PageContainer>
  );
}
