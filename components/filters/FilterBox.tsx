"use client";

import { IconCirclePlus } from "@tabler/icons-react";
import { CheckIcon } from "lucide-react";
import { Options } from "nuqs";
import React from "react";

import { cn } from "@/lib/utils";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

interface CategoryOption {
  name: string;

  _id: string;
}
interface FilterBoxProps {
  filterKey: string;
  title: string;
  options: CategoryOption[];
  setFilterValue: (
    value: string | ((old: string) => string | null) | null,
    options?: Options | undefined
  ) => Promise<URLSearchParams>;
  filterValue: string;
}
const FilterBox = ({
  title,
  options,
  setFilterValue,
  filterValue,
}: FilterBoxProps) => {
  const selectedValuesSet = React.useMemo(() => {
    if (!filterValue) return new Set<string>();
    const values = filterValue.split(".");
    return new Set(values.filter((value) => value !== ""));
  }, [filterValue]);

  const handleSelect = (value: string) => {
    const newSet = new Set(selectedValuesSet);
    if (newSet.has(value)) {
      newSet.delete(value);
    } else {
      newSet.add(value);
    }
    setFilterValue(Array.from(newSet).join(".") || null);
  };
  const resetFilter = () => setFilterValue(null);
  return (
    <Popover>
      <div className="flex-start gap-2">
        <PopoverTrigger asChild>
          <Button variant="outline" className="border-dashed">
            <IconCirclePlus className="mr-2 size-4" />
            {title}
            {selectedValuesSet.size > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal lg:hidden"
                >
                  {selectedValuesSet.size}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {selectedValuesSet.size > 2 ? (
                    <Badge
                      variant="secondary"
                      className="rounded-sm px-1 font-normal"
                    >
                      {selectedValuesSet.size} selected
                    </Badge>
                  ) : (
                    Array.from(selectedValuesSet).map((name) => (
                      <Badge
                        variant="secondary"
                        key={name}
                        className="rounded-sm px-1 font-normal"
                      >
                        {options.find((option) => option._id === name)?.name ||
                          name}
                      </Badge>
                    ))
                  )}
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder={title} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option._id}
                    onSelect={() => handleSelect(option._id)}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        selectedValuesSet.has(option._id)
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className="size-4" aria-hidden="true" />
                    </div>

                    <span>{option.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              {selectedValuesSet.size > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={resetFilter}
                      className="justify-center text-center"
                    >
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </div>
    </Popover>
  );
};

export default FilterBox;
