import Link from "next/link";

import Heading from "@/components/shared/Heading";
import PageContainer from "@/components/shared/PageContainer";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import MaterialListingPage from "./_components/MaterialListingPage";

export const metadata = {
  title: "Dashboard: Quản lý chất liệu",
};

export default async function Page() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title="Quản lý chất liệu" description="Quản lý chất liệu" />
          <Link
            href="/admin/materials/create"
            className={cn(buttonVariants(), " text-xs md:text-sm")}
          >
            Tạo mới
          </Link>
        </div>
        <Separator />
        <MaterialListingPage />
      </div>
    </PageContainer>
  );
}
