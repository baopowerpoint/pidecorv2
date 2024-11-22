"use client";
import Image from "next/image";
import { Options } from "nuqs";
import React, { useTransition } from "react";

import { cn } from "@/lib/utils";

import { Input } from "../ui/input";

interface LocalSearchProps {
  imgSrc: string;
  placeholder: string;
  otherclasses?: string;
  searchQuery: string;
  setSearchQuery: (
    value: string | ((old: string) => string | null) | null,
    options?: Options | undefined
  ) => Promise<URLSearchParams>;
  setPage: (
    value: number | ((old: number) => number | null) | null,
    options?: Options | undefined
  ) => Promise<URLSearchParams>;
}

function LocalSearchComponent({
  imgSrc,
  placeholder,
  otherclasses,

  searchQuery,
  setPage,
  setSearchQuery,
}: LocalSearchProps) {
  const [isLoading, startTransition] = useTransition();

  const handleSearch = (value: string) => {
    setSearchQuery(value, { startTransition });
    setPage(1);
  };

  return (
    <div
      className={cn(
        "flex items-center border border-dashed gap-4 w-full  px-4 rounded-lg",
        otherclasses
      )}
    >
      <Image
        src={imgSrc}
        width={24}
        height={24}
        alt="search"
        className="cursor-pointer"
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery ?? ""}
        onChange={(e) => handleSearch(e.target.value)}
        className={cn(
          "paragraph-regular placeholder no-focus border-none shadow-sm outline-none placeholder:text-dark-400 bg-light-900",
          isLoading && "animate-pulse"
        )}
      />
    </div>
  );
}

export default LocalSearchComponent;
