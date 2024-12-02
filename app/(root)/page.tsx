import React, { Suspense } from "react";

import ProductAction from "@/components/ProductAction";
import AutoCurtainSection from "@/components/sections/AutoCurtainSection";
import BlogSection from "@/components/sections/BlogSection";
import CollectionSection from "@/components/sections/CollectionSection";
import HeroSection from "@/components/sections/HeroSection";
import Heading from "@/components/shared/Heading";
import PageContainer from "@/components/shared/PageContainer";
import ProductListingSkeleton from "@/components/skeleton/ProductListingSkeleton";
import { Separator } from "@/components/ui/separator";
import { getAllCategories } from "@/lib/actions/category.action";
import { getAllCollections } from "@/lib/actions/collection.action";
import { searchParamsCache, serialize } from "@/lib/searchparams";

import ProductListing from "./_components/ProductListing";

export const metadata = {
  title: "Trang chủ | Pidecor.vn",
};

type pageProps = {
  searchParams: Record<string, string>;
};

export default async function Home({ searchParams }: pageProps) {
  const a = searchParamsCache.parse(searchParams);
  const categories = await getAllCategories({ select: "name _id" });
  const collections = await getAllCollections({});
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
          <ProductAction categoryOptions={JSON.parse(categories || "[]")} />
          <Suspense key={key} fallback={<ProductListingSkeleton />}>
            <ProductListing />
          </Suspense>
        </PageContainer>
      </section>
      <section className="mt-11">
        <CollectionSection collectionData={JSON.parse(collections || "[]")} />
      </section>
      <section className="mt-11">
        <BlogSection />
      </section>
    </div>
  );
}
