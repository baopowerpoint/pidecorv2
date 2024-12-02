import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

import Heading from "@/components/shared/Heading";
import PageContainer from "@/components/shared/PageContainer";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Dashboard: Quản lý trang",
};

export default async function Page() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title="Quản lý Trang" description="Quản lý Trang" />
        </div>
        <Separator />
        <section className="w-full flex-1">
          <div className="small-semibold flex flex-col gap-2 text-primary-500 underline">
            <Link href="/admin/pages/collections">
              Gán bài viết cho bộ sưu tập{" "}
              <IconChevronRight className="inline w-4" />
            </Link>
            <Link href="/admin/pages/categories">
              Gán bài viết cho danh mục{" "}
              <IconChevronRight className="inline w-4" />
            </Link>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
