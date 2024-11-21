import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-wrap justify-between gap-8">
          {/* Company Info */}
          <div className="grow basis-full space-y-4 md:basis-1/4 lg:basis-1/5">
            <h2 className="text-lg font-semibold">Pidecor.vn</h2>
            <p className="text-sm text-muted-foreground">Rèm cửa hiện đại</p>
          </div>

          {/* Services */}
          <div className="grow basis-full md:basis-1/4 lg:basis-1/5">
            <h3 className="base-semibold mb-4 text-dark-100">Bộ sưu tập</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  Rèm vải
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Rèm cầu vồng
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Rèm sáo
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Rèm cuốn
                </Link>
              </li>
            </ul>
          </div>
          <div className="grow basis-full md:basis-1/4 lg:basis-1/5">
            <h3 className="base-semibold mb-4 text-dark-100">Pidecorvn</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Bài viết
                </Link>
              </li>
            </ul>
          </div>
          <div className="grow basis-full md:basis-1/4 lg:basis-1/5">
            <h3 className="base-semibold mb-4 text-dark-100">Tài khoản</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  Đăng nhập
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Đăng ký
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="grow basis-full md:basis-1/4 lg:basis-1/5">
            <h3 className="base-semibold mb-4 text-sm text-dark-100">
              Chính sách
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  Chính sách bảo hành
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Chính sách giao hàng
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="grow basis-full md:basis-1/4 lg:basis-1/5">
            <h3 className="mb-4 text-sm font-semibold">Nhận thông tin</h3>
            <form className="mx-auto max-w-sm space-y-2 sm:mx-0">
              <Input type="email" placeholder="Nhập email" />
              <Button type="submit" className="w-full">
                Gửi
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="text-center text-sm text-muted-foreground sm:text-left">
            © 2024 Pidecorvn. Đã khai báo bộ công thương.
          </div>
          <div className="flex space-x-4">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
