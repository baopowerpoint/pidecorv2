import { SearchParams } from "nuqs";
import { Suspense } from "react";

import ProductAction from "@/components/ProductAction";
import Heading from "@/components/shared/Heading";
import PageContainer from "@/components/shared/PageContainer";
import { Separator } from "@/components/ui/separator";
import { getAllCategories } from "@/lib/actions/category.action";
import { searchParamsCache, serialize } from "@/lib/searchparams";

import ProductListing from "../_components/ProductListing";

export const metadata = {
  title: "Pidecor | Sản phẩm",
};

type pageProps = {
  searchParams: SearchParams;
};
export default async function Page({ searchParams }: pageProps) {
  searchParamsCache.parse(searchParams);
  const categories = await getAllCategories({ select: "name _id" });

  const key = serialize({ ...searchParams });
  return (
    <PageContainer>
      <div className="space-y-4">
        <Heading title="Sản phẩm" description="Sản phẩm trong pidecor.vn" />
      </div>
      <Separator />
      <ProductAction categoryOptions={JSON.parse(categories || "[]")} />
      <Suspense key={key} fallback={<div>Đang tải...</div>}>
        <ProductListing />
      </Suspense>
    </PageContainer>
  );
}
