import React from "react";

import PageContainer from "@/components/shared/PageContainer";

import CategoryViewPage from "../_components/CategoryViewPage";

export const metadata = {
  title: "Dashboard : Tạo mói danh mục",
};

type PageProps = { params: { categoryId: string } };
export default async function Page({ params }: PageProps) {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <CategoryViewPage categoryId={params.categoryId} />
      </div>
    </PageContainer>
  );
}
