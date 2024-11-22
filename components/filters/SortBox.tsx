"use client";
import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SortProps {
  value: string;
  label: string;
}
interface SortBoxProps {
  sortKey: string;
  title: string;
  options: SortProps[];
  setSortValue: (
    value: string | ((old: string) => string | null) | null
  ) => Promise<URLSearchParams>;
  sortValue: string;
}
export function SortBox({
  title,
  options,
  setSortValue,
  sortValue,
}: SortBoxProps) {
  const handleSelect = (value: string) => {
    setSortValue(value || null); // Cập nhật giá trị sortValue vào URL
  };
  return (
    <Select value={sortValue ?? ""} onValueChange={handleSelect}>
      <SelectTrigger className="no-focus w-[180px]">
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SortBox;
