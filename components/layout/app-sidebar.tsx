"use client";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Theo dõi cửa hàng",
      url: "#",
      items: [
        {
          title: "Tổng quan",
          url: "/admin/overview",
        },
        {
          title: "Tương tác",
          url: "/admin/interactions",
        },
      ],
    },
    {
      title: "Quản lý",
      url: "#",
      items: [
        {
          title: "Quản lý sản phẩm",
          url: "/admin/products",
        },
        {
          title: "Quản lý nhãn hiệu",
          url: "/admin/brands",
          isActive: true,
        },
        {
          title: "Quản lý danh mục",
          url: "/admin/categories",
        },
        {
          title: "Quản lý bộ sưu tập",
          url: "/admin/collections",
        },
        {
          title: "Quản lý đơn hàng",
          url: "/admin/orders",
        },
        {
          title: "Quản lý người dùng",
          url: "/admin/users",
        },
        {
          title: "Quản lý review",
          url: "/admin/reviews",
        },
        {
          title: "Quản lý bài viết",
          url: "/admin/blogs",
        },
        {
          title: "Quản lý trang",
          url: "/admin/pages",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-4">
          <Image
            src="/images/logo_symbol.svg"
            className=""
            width={30}
            height={30}
            alt="pidecor logo"
          />
          <p className="paragraph-semibold">Pidecor Admin</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.url === pathname}>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <SidebarGroup>
          <SidebarGroupLabel>Thông tin quản trị viên</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SignedIn>
                  <UserButton showName />
                </SignedIn>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
