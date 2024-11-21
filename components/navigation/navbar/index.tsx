import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import GlobalSearch from "@/components/search/GlobalSearch";
import { Button } from "@/components/ui/button";

import MobileNavigation from "./MobileNavigation";
import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full gap-5 bg-light-900 px-2 py-6 shadow-light-300 sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/images/logo_symbol.svg"
          width={23}
          height={23}
          alt="Pidecor Logo"
        />
        <p className="base-bold  text-dark-100 ">
          <span className="text-primary-500">Pi</span>decor
        </p>
      </Link>
      <div className="flex items-center">
        <div className="flex-between gap-2">
          <div className="hidden md:flex">
            <NavLinks isMobileNav={false} />
          </div>
          <GlobalSearch />
          <Button variant="ghost" size="icon" className="" asChild>
            <Link href="/gio-hang" className="text-dark-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
              >
                <clipPath id="clip0_177_5257">
                  <path d="M0 0H24V24H0Z" />
                </clipPath>
                <g clipPath="url(#clip0_177_5257)" stroke="currentColor">
                  <path d="M4.6715 6.6279C4.85916 5.12661 6.13536 4 7.64833 4H16.3516C17.8646 4 19.1408 5.12661 19.3285 6.6279L20.5785 16.6279C20.8023 18.4185 19.4061 20 17.6016 20H6.39833C4.59384 20 3.19768 18.4185 3.4215 16.6279L4.6715 6.6279Z" />
                  <path
                    d="M9 9C9 9.79565 9.31607 10.5587 9.87868 11.1213C10.4413 11.6839 11.2044 12 12 12C12.7957 12 13.5587 11.6839 14.1213 11.1213C14.6839 10.5587 15 9.79565 15 9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </Link>
          </Button>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <MobileNavigation />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
