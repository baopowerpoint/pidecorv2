import { createSearchParamsCache, parseAsString } from "nuqs/server";
import React from "react";

import AutoCurtainSection from "@/components/sections/AutoCurtainSection";
import BlogSection from "@/components/sections/BlogSection";
import CollectionSection from "@/components/sections/CollectionSection";
import HeroSection from "@/components/sections/HeroSection";
import ProductSection from "@/components/sections/ProductSection";

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
  console.log(searchParamsCache.parse(searchParams));
  return (
    <div className="mt-28 p-4">
      <section className="flex w-full flex-col justify-center  gap-4 sm:items-center">
        <HeroSection />
      </section>
      <section className="mt-11">
        <AutoCurtainSection />
      </section>
      <section className="mt-11">
        <ProductSection />
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
