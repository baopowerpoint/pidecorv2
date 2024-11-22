import React from "react";

import Heading from "@/components/shared/Heading";
import PageContainer from "@/components/shared/PageContainer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/lib/utils";

import { BarGraph } from "./bar-graph";
import { CompareGraph } from "./compare-graph";
import { RecentSales } from "./recent-sales";

const OverviewPage = () => {
  return (
    <PageContainer>
      <div className="space-y-2">
        <Heading
          title="Tổng quan"
          description="Theo dõi doanh thu và đơn hàng của bạn."
        />
      </div>
      <div className="mt-4 space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng doanh thu
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="size-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="base-semibold font-bold">
                {formatCurrency(1000000)}
              </div>
              <p className="small-regular text-light-400">
                +20.1% từ tháng trước
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đơn hàng</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="size-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+145</div>
              <p className="text-xs text-muted-foreground">
                +19% từ tháng trước
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <BarGraph />
          </div>
          <Card className="col-span-4 md:col-span-3">
            <CardHeader>
              <CardTitle>Đơn hàng gần đây</CardTitle>
              <CardDescription>Bạn có 20 đơn hàng tháng này.</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <ScrollArea className="h-full">
                <RecentSales />
              </ScrollArea>
            </CardContent>
          </Card>
          <div className="col-span-4">
            <CompareGraph />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default OverviewPage;
