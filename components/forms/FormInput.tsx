import React from "react";

import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

export const FormInput = React.memo(
  ({ name, label, placeholder, type = "text", form, otherClassName }: any) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={otherClassName}>
          <FormLabel>{label}</FormLabel>
          <Input
            type={type}
            placeholder={placeholder}
            {...field}
            className="paragraph-regular light-border-2 no-focus min-h-[20px] border bg-light-800 text-dark-300"
          />
          <FormMessage />
        </FormItem>
      )}
    />
  )
);
FormInput.displayName = "FormInput";
