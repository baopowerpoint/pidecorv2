import React from "react";

import PageContainer from "@/components/shared/PageContainer";

import MaterialViewPage from "../_components/MaterialViewPage";

export const metadata = {
  title: "Dashboard : Tạo mói nhãn hiệu",
};

type PageProps = { params: { materialId: string } };
export default async function Page({ params }: PageProps) {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <MaterialViewPage materialId={params.materialId} />
      </div>
    </PageContainer>
  );
}
