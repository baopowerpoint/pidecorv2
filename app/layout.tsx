import { viVN } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";

// import "@uploadthing/react/styles.css";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const mont = localFont({
  src: "./fonts/MontserratVF.ttf",
  variable: "--font-mont",
  weight: "100 200 300 400 500 600 700 800 900",
});
const pacifico = localFont({
  src: "./fonts/PacificoVF.ttf",
  variable: "--font-pacifico",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Pidecor.vn - Rèm Cửa Cao Cấp Tại Việt Nam",
  description:
    "Pidecor.vn chuyên cung cấp các loại rèm cửa cao cấp, đa dạng mẫu mã, phù hợp với mọi không gian sống. Liên hệ ngay để nhận tư vấn miễn phí!",
  authors: [],
  openGraph: {
    title: "Pidecor.vn - Rèm Cửa Cao Cấp Tại Việt Nam",
    description:
      "Pidecor.vn cung cấp các loại rèm cửa chất lượng cao, phong cách hiện đại, giá cả hợp lý. Đặt hàng ngay!",
    url: "https://pidecor.vn",
  },
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ClerkProvider localization={viVN}>
      <html lang="en" className="custom-scrollbar">
        <body className={`${mont.className} ${pacifico.variable} antialiased`}>
          <NextTopLoader showSpinner={true} />
          <NuqsAdapter> {children}</NuqsAdapter>
          <Toaster />
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
};
export default RootLayout;
