import { Plus } from "lucide-react";
import Link from "next/link";
import { type SearchParams } from "nuqs/server";
import React, { Suspense } from "react";

import Heading from "@/components/shared/Heading";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { cn } from "@/lib/utils";

import PageContainer from "@/components/shared/PageContainer";
import ProductAction from "@/components/ProductAction";

export const metadata = {
  title: "Dashboard: Quản lý sản phẩm",
};

type PageProps = {
  searchParams: Promise<SearchParams>; // Next.js 15+: async searchParams prop
};
export default async function Page({ searchParams }: PageProps) {
  const sp = await searchParamsCache.parse(searchParams);
  const key = serialize({ ...sp });

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title="Quản lý sản phẩm" description="Quản lý sản phẩm" />
          <Link
            href="/admin/products/create"
            className={cn(buttonVariants(), "text-xs md:text-sm")}
          >
            <Plus className="mr-2 size-4" /> Tạo mới
          </Link>
        </div>
        <Separator />
        <ProductAction />
        <Suspense key={key} fallback={<p>loading...</p>}>
          <p>{sp.q}</p>
        </Suspense>
      </div>
    </PageContainer>
  );
}
