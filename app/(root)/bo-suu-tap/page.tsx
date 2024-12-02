import { notFound } from "next/navigation";

import CollectionCard from "@/components/cards/CollectionCard";
import Heading from "@/components/shared/Heading";
import PageContainer from "@/components/shared/PageContainer";
import { Separator } from "@/components/ui/separator";
import { getAllCollections } from "@/lib/actions/collection.action";
import { Collection } from "@/types/global";

export const metadata = {
  title: "Pidecor | Bộ sưu tập",
};

export default async function Page() {
  const data = await getAllCollections({});
  const collections: Collection[] = JSON.parse(data || "[]");
  if (!collections) return notFound();
  return (
    <PageContainer>
      <div className="space-y-4">
        <Heading title="Bộ sưu tập" description="Bộ sưu tập" />
      </div>
      <Separator />
      <div className="mt-10 grid w-full grid-cols-1 flex-col gap-6 lg:grid-cols-2">
        {collections?.map((collection: Collection) => (
          <CollectionCard key={collection._id} collection={collection} />
        ))}
      </div>
    </PageContainer>
  );
}
