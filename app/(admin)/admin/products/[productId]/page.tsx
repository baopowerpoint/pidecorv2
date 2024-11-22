import React from "react";

import ProductViewPage from "../_components/ProductViewPage";
import PageContainer from "@/components/shared/PageContainer";

export const metadata = {
  title: "Dashboard : Xem sản phẩm",
};

type PageProps = { params: { productId: string } };
export default async function Page({ params }: PageProps) {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <ProductViewPage productId={params.productId} />
      </div>
    </PageContainer>
  );
}
