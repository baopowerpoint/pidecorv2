import Link from "next/link";
import React from "react";

import Heading from "@/components/shared/Heading";
import PageContainer from "@/components/shared/PageContainer";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import BrandListingPage from "./_components/BrandListingPage";

export const metadata = {
  title: "Dashboard: Quản lý thương hiệu",
};

export default async function Page() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Quản lý thương hiệu"
            description="Quản lý thương hiệu"
          />
          <Link
            href="/admin/brands/create"
            className={cn(buttonVariants(), " text-xs md:text-sm")}
          >
            Tạo mới
          </Link>
        </div>
        <Separator />
        <BrandListingPage />
      </div>
    </PageContainer>
  );
}
