import React from "react";

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navigation/navbar";
import RightSidebar from "@/components/navigation/RightSidebar";
import { getAllCategories } from "@/lib/actions/category.action";
import { getAllCollections } from "@/lib/actions/collection.action";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getAllCategories({ select: "name slug" });
  const collections = await getAllCollections({ select: "name slug" });

  return (
    <main className="relative bg-light-850">
      <Navbar />
      <div className="w-full flex-col items-start  md:flex md:flex-row">
        <section className="flex min-h-screen w-full flex-1 flex-col  max-md:pb-14 ">
          <div className="mx-auto mt-28 w-full">{children}</div>
          {/* <CallButton /> */}
        </section>
        <RightSidebar
          categoryData={JSON.parse(categories || "[]")}
          collectionData={JSON.parse(collections || "[]")}
        />
      </div>
      <Footer />
    </main>
  );
}
