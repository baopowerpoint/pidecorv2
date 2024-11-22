import { notFound } from "next/navigation";

import { dummyCollections } from "@/data/collections";
import { Collection } from "@/types/global";

import CategoryView from "../view/CategoryView";

type TCategoryViewPageProps = {
  slug: string;
};
export default async function CategoryViewPage({
  slug,
}: TCategoryViewPageProps) {
  let category = null;
  const pageTitle = "Danh mục";
  if (slug !== "create") {
    category = dummyCollections[0] as Collection;

    if (!category) {
      notFound();
    }
    return <CategoryView initialData={category} />;
  }
  return <div>{pageTitle}</div>;
}
