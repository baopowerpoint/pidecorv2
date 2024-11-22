import { createSearchParamsCache, parseAsString } from "nuqs/server";
import React, { Suspense } from "react";

import ProductCard from "@/components/cards/ProductCard";
import { Pagination } from "@/components/Pagination";
import ProductAction from "@/components/ProductAction";
import AutoCurtainSection from "@/components/sections/AutoCurtainSection";
import BlogSection from "@/components/sections/BlogSection";
import CollectionSection from "@/components/sections/CollectionSection";
import HeroSection from "@/components/sections/HeroSection";
import Heading from "@/components/shared/Heading";
import PageContainer from "@/components/shared/PageContainer";
import { Separator } from "@/components/ui/separator";
import products from "@/data/mock";
import { serialize } from "@/lib/searchparams";
import { Product } from "@/types/global";

export const metadata = {
  title: "Trang chủ | Pidecor.vn",
};

type pageProps = {
  searchParams: Record<string, string>;
};
const searchParamsCache = createSearchParamsCache({
  name: parseAsString.withDefault(""),
});
export default async function Home({ searchParams }: pageProps) {
  searchParamsCache.parse(searchParams);

  const key = serialize({ ...searchParams });
  return (
    <div className="mt-28 p-4">
      <section className="flex w-full flex-col justify-center  gap-4 sm:items-center">
        <HeroSection />
      </section>
      <section className="mt-11">
        <AutoCurtainSection />
      </section>
      <section className="mt-11">
        <PageContainer>
          <div>
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
      </section>
      <section className="mt-11">
        <CollectionSection />
      </section>
      <section className="mt-11">
        <BlogSection />
      </section>
    </div>
  );
}
