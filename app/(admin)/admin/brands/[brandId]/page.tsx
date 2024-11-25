import React from "react";

import PageContainer from "@/components/shared/PageContainer";

import BrandViewPage from "../_components/BrandViewPage";

export const metadata = {
  title: "Dashboard : Tạo mói nhãn hiệu",
};

type PageProps = { params: { brandId: string } };
export default async function Page({ params }: PageProps) {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <BrandViewPage brandId={params.brandId} />
      </div>
    </PageContainer>
  );
}
