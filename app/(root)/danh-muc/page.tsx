import { notFound } from "next/navigation";

import CategoryCard from "@/components/cards/CategoryCard";
import Heading from "@/components/shared/Heading";
import PageContainer from "@/components/shared/PageContainer";
import { Separator } from "@/components/ui/separator";
import { getAllCategories } from "@/lib/actions/category.action";
import { Category } from "@/types/global";

export const metadata = {
  title: "Pidecor | Danh mục",
};

export default async function Page() {
  const data = await getAllCategories({});
  console.log(data);
  const categories: Category[] = JSON.parse(data || "[]");
  if (!categories) return notFound();
  return (
    <PageContainer>
      <div className="group- space-y-4">
        <Heading title="Danh mục" description="Danh mục" />
      </div>
      <Separator />
      <div className="mt-10 grid w-full grid-cols-1 flex-col gap-6 lg:grid-cols-4">
        {categories?.map((category: Category) => (
          <CategoryCard key={category._id} categoryData={category} />
        ))}
      </div>
    </PageContainer>
  );
}
