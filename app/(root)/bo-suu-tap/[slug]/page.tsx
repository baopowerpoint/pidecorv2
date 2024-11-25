import React from "react";

import PageContainer from "@/components/shared/PageContainer";

type PageProps = { params: { slug: string } };

export default async function Page({ params }: PageProps) {
  return (
    <PageContainer>
      category{/* <CategoryView slug={params.slug} /> */}
    </PageContainer>
  );
}
