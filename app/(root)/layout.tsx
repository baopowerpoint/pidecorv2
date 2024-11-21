import React from "react";

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navigation/navbar";
import RightSidebar from "@/components/navigation/RightSidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative bg-light-850">
      <Navbar />
      <div className="w-full flex-col items-start  md:flex md:flex-row">
        <section className="flex min-h-screen w-full flex-1 flex-col  max-md:pb-14 ">
          <div className="mx-auto w-full">{children}</div>
          {/* <CallButton /> */}
        </section>
        <RightSidebar />
      </div>
      <Footer />
    </main>
  );
};

export default RootLayout;
