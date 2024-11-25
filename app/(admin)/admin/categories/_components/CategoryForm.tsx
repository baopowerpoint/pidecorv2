"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProps, useForm } from "react-hook-form";
import { z } from "zod";

import ImageUploader from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CategoryFormSchema } from "@/lib/validation";

const FormInput = ({
  name,
  label,
  placeholder,
  type = "text",
  form,
}: {
  name: "name" | "description" | "image";
  label: string;
  placeholder: string;
  type?: string;
  form: FormProps<z.infer<typeof CategoryFormSchema>>;
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input
            type={type}
            placeholder={placeholder}
            {...field}
            className="paragraph-regular light-border-2 no-focus min-h-[20px] border bg-light-800 text-dark-300"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
const CategoryForm = ({
  pageTitle,
  initialData,
}: {
  pageTitle: string;
  initialData?: null;
}) => {
  const defaultValues = {
    name: "",
    description: "",
    image: [],
  };
  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    values: defaultValues,
  });
  const handleAddBrand = (data: z.infer<typeof CategoryFormSchema>) => {
    console.log(data);
  };
  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="small-semibold">{pageTitle}</CardTitle>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-8"
              onSubmit={form.handleSubmit(handleAddBrand)}
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormInput
                  name="name"
                  label="Tên danh mục"
                  placeholder="Nhập tên danh mục"
                  form={form}
                />
                <FormInput
                  name="description"
                  label="Mô tả"
                  placeholder="Nhập mô tả"
                  form={form}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <div className="col-span-full">
                      <ImageUploader
                        imgUrls={field.value}
                        type="single"
                        onRemoveImage={(url) =>
                          field.onChange(
                            field.value.filter((img) => img !== url)
                          )
                        }
                        onUploadComplete={(urls) => field.onChange(urls)}
                        onUploading={() => {}}
                      />
                    </div>
                  )}
                />
              </div>
              <Button type="submit">Thêm danh mục</Button>
            </form>
          </Form>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default CategoryForm;
