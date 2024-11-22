import React from "react";

import PageContainer from "@/components/shared/PageContainer";
import { dummyCollections } from "@/data/collections";

import CategoryViewPage from "../../../../components/shared/CategoryViewPage";
type PageProps = { params: { slug: string } };

export default async function Page({ params }: PageProps) {
  return (
    <PageContainer>
      <CategoryViewPage slug={params.slug} />
    </PageContainer>
  );
}
