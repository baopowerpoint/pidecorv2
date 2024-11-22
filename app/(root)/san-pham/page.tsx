import { SearchParams } from "nuqs";
import { Suspense } from "react";

import ProductCard from "@/components/cards/ProductCard";
import { Pagination } from "@/components/Pagination";
import ProductAction from "@/components/ProductAction";
import Heading from "@/components/shared/Heading";
import PageContainer from "@/components/shared/PageContainer";
import { Separator } from "@/components/ui/separator";
import products from "@/data/mock";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { Product } from "@/types/global";

export const metadata = {
  title: "Pidecor | Sản phẩm",
};

type pageProps = {
  searchParams: SearchParams;
};
export default async function Page({ searchParams }: pageProps) {
  searchParamsCache.parse(searchParams);

  const key = serialize({ ...searchParams });
  return (
    <PageContainer>
      <div className="space-y-4">
        <Heading title="Sản phẩm" description="Sản phẩm trong pidecor.vn" />
      </div>
      <Separator />
      <ProductAction />
      <Suspense key={key} fallback={<div>Đang tải...</div>}>
        <div className="mt-10 grid  w-full grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 md:p-0 min-[1080px]:grid-cols-3 xl:grid-cols-4">
          {products.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <Pagination />
      </Suspense>
    </PageContainer>
  );
}
