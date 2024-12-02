import React from "react";

import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const FormSelect = React.memo(
  ({ name, label, placeholder, options, form }: any) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value || ""}>
            <SelectTrigger className="paragraph-regular light-border-2 no-focus min-h-[20px] border bg-light-800 text-dark-300">
              <SelectValue
                className="placeholder:placeholder placeholder:small-medium"
                placeholder={placeholder}
              />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option: any) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
);
FormSelect.displayName = "FormSelect";
