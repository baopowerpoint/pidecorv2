import React from "react";

import PageContainer from "@/components/shared/PageContainer";

import CollectionViewPage from "./_components/CollectionViewPage";

export const metadata = {
  title: "Dashboard : Tạo mói danh mục",
};

type PageProps = { params: { collectionId: string } };
export default async function Page({ params }: PageProps) {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <CollectionViewPage collectionId={params.collectionId} />
      </div>
    </PageContainer>
  );
}
