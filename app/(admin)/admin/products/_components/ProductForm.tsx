/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ImageUploader from "@/components/admin/ImageUploader";
import TagCard from "@/components/cards/TagCard";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductFormSchema } from "@/lib/validation";

const Editor = dynamic(() => import("@/components/editors"), {
  ssr: false,
});
const selectOptions = {
  category: [
    { value: "beauty", label: "Beauty Products" },
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "home", label: "Home & Garden" },
    { value: "sports", label: "Sports & Outdoors" },
  ],
  material: [
    { value: "wood", label: "Wood" },
    { value: "metal", label: "Metal" },
    { value: "plastic", label: "Plastic" },
  ],
};
const FormSelect = ({
  name,
  label,
  placeholder,
  options,
  form,
}: {
  name: string;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  form: any;
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <Select onValueChange={field.onChange} value={field.value || ""}>
          <FormControl>
            <SelectTrigger className="paragraph-regular light-border-2 no-focus min-h-[20px] border bg-light-800 text-dark-300">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options.map((option) => (
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
);
const FormInput = ({
  name,
  label,
  placeholder,
  type = "text",
  form,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  form: any;
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

const TagInput = ({
  name,
  label,
  maxLength,
  maxItems,
  placeholder,
  form,
}: {
  name: "tags" | "colors";
  label: string;
  maxLength: number;
  maxItems: number;
  placeholder: string;
  form: any;
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <div>
            <Input
              placeholder={placeholder}
              onKeyDown={(e) => {
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
              }}
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
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
const ProductForm = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initialData,
  pageTitle,
}: {
  initialData: null;
  pageTitle: string;
}) => {
  const editorRef = useRef<MDXEditorMethods>(null);
  const defaultValues = {
    title: "",
    description: "",
    content: "",
    price: 0,
    salePrice: 0,
    quantity: 0,
    category: "",
    brand: "",
    tags: [],
    colors: [],
    material: "",
    images: [],
  };

  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    values: defaultValues,
  });

  const handleCreateProduct = (data: z.infer<typeof ProductFormSchema>) => {
    console.log(data);
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="small-semibold">{pageTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateProduct)}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormInput
                name="title"
                label="Tên sản phẩm"
                placeholder="Nhập tên sản phẩm"
                form={form}
              />
              <FormInput
                name="description"
                label="Mô tả"
                placeholder="Nhập mô tả"
                form={form}
              />
              <FormInput
                name="price"
                label="Giá bán"
                placeholder="Nhập giá bán"
                type="number"
                form={form}
              />
              <FormInput
                name="salePrice"
                label="Giá nhập"
                placeholder="Nhập giá nhập"
                type="number"
                form={form}
              />
              <FormInput
                name="quantity"
                label="Số lượng"
                placeholder="Nhập số lượng"
                type="number"
                form={form}
              />
              <FormSelect
                name="collection"
                label="Bộ sưu tập"
                placeholder="Chọn bộ sưu tập"
                options={selectOptions.category}
                form={form}
              />
              <FormSelect
                name="category"
                label="Danh mục"
                placeholder="Chọn danh mục"
                options={selectOptions.category}
                form={form}
              />
              <FormSelect
                name="brand"
                label="Nhãn hiệu"
                placeholder="Chọn nhãn hiệu"
                options={selectOptions.category}
                form={form}
              />
              <FormSelect
                name="material"
                label="Chất liệu"
                placeholder="Chọn chất liệu"
                options={selectOptions.material}
                form={form}
              />

              <TagInput
                name="tags"
                label="Thẻ"
                maxLength={15}
                maxItems={3}
                placeholder="Thêm thẻ..."
                form={form}
              />
              <TagInput
                name="colors"
                label="Màu"
                maxLength={7}
                maxItems={5}
                placeholder="Thêm màu..."
                form={form}
              />
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <div className="col-span-full">
                    <ImageUploader
                      imgUrls={field.value}
                      type="multiple"
                      onRemoveImage={(url) =>
                        field.onChange(
                          field.value.filter((img: string) => img !== url)
                        )
                      }
                      onUploadComplete={(urls) =>
                        field.onChange([...field.value, ...urls])
                      }
                      onUploading={() => {}}
                    />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="col-span-full flex w-full flex-col">
                    <FormLabel className="paragraph-semibold text-dark-400">
                      Nội dung
                      <span className="text-primary-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Editor
                        editorRef={editorRef}
                        value={field.value}
                        fieldChange={field.onChange}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Thêm sản phẩm</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
