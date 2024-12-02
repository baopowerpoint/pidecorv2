import React from "react";

import PageContainer from "@/components/shared/PageContainer";

import BlogViewPage from "../_components/BlogViewPage";

export const metadata = {
  title: "Dashboard : Tạo mói nhãn hiệu",
};

type PageProps = { params: { blogId: string } };
export default async function Page({ params }: PageProps) {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <BlogViewPage blogId={params.blogId} />
      </div>
    </PageContainer>
  );
}
