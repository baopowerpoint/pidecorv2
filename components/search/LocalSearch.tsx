"use client";
import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";

import { withSuspense } from "../HOC/withSuspense";
import { Input } from "../ui/input";

interface LocalSearchProps {
  imgSrc: string;
  placeholder: string;
  otherclasses?: string;
}

function LocalSearchComponent({
  imgSrc,
  placeholder,
  otherclasses,
}: LocalSearchProps) {
  return (
    <div
      className={cn(
        "background-light-800 flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ",
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
        defaultValue=""
        className={cn(
          "paragraph-regular placeholder no-focus border-none shadow-sm outline-none placeholder:text-dark-400"
        )}
      />
    </div>
  );
}

export default withSuspense(LocalSearchComponent);
