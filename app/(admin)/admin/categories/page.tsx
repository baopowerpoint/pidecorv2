import Link from "next/link";
import React from "react";

import Heading from "@/components/shared/Heading";
import PageContainer from "@/components/shared/PageContainer";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import CategoryListingPage from "./_components/CategoryListingPage";

export const metadata = {
  title: "Dashboard: Quản lý danh mục",
};

export default async function Page() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title="Quản lý danh mục" description="Quản lý danh mục" />
          <Link
            href="/admin/categories/create"
            className={cn(buttonVariants(), " text-xs md:text-sm")}
          >
            Tạo mới
          </Link>
        </div>
        <Separator />
        <CategoryListingPage />
      </div>
    </PageContainer>
  );
}
