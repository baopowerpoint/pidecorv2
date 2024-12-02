"use client";
import React, { useCallback } from "react";

import TagCard from "../cards/TagCard";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

export const TagInput = React.memo(
  ({ name, label, maxLength, maxItems, placeholder, form }: any) => {
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>, field: any) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const value = e.currentTarget.value.trim();
          if (value.length > maxLength) {
            form.setError(name, {
              message: `Không được dài hơn ${maxLength} ký tự.`,
            });
          } else if (field.value.includes(value)) {
            form.setError(name, {
              message: `${label} đã tồn tại.`,
            });
          } else if (field.value.length < maxItems) {
            form.setValue(name, [...field.value, value]);
            e.currentTarget.value = "";
          } else {
            form.setError(name, {
              message: `Tối đa ${maxItems} ${label.toLowerCase()}.`,
            });
          }
        }
      },
      [form, maxLength, maxItems, name, label]
    );

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Input
              placeholder={placeholder}
              onKeyDown={(e) => handleKeyDown(e, field)}
              className="paragraph-regular light-border-2 no-focus min-h-[20px] border bg-light-800 text-dark-300"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {field.value.map((item: string) => (
                <TagCard
                  key={item}
                  _id={item}
                  name={item}
                  compact
                  remove
                  isButton
                  handleRemove={() =>
                    form.setValue(
                      name,
                      field.value.filter((i: string) => i !== item)
                    )
                  }
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);
TagInput.displayName = "TagInput";
