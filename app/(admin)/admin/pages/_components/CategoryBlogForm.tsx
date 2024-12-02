"use client";
import { IconLoader } from "@tabler/icons-react";
import React, { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormSelect } from "@/components/forms/FormSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { createCategoryBlog } from "@/lib/actions/category-blog.action";
import logger from "@/lib/logger";
import { CategoryBlog } from "@/types/global";

const CategoryBlogForm = ({
  initialData,
  categoryData,
  blogData,
}: {
  initialData?: CategoryBlog;
  categoryData: Selection[];
  blogData: Selection[];
}) => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      categoryId: initialData?.categoryId.toString() || "",
      blogId: initialData?.blogId.toString() || "",
    },
  });
  const handleSubmit: SubmitHandler<{
    categoryId: string;
    blogId: string;
  }> = useCallback(async (data: { categoryId: string; blogId: string }) => {
    try {
      setLoading(true);
      await createCategoryBlog({
        categoryId: data!.categoryId,
        blogId: data!.blogId,
        path: "admin/pages/categories",
      });
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      logger.error(error);
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle>Gán bài viết cho danh mục</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex w-full gap-4">
              <FormSelect
                name="categoryId"
                label="Danh mục"
                placeholder="Chọn danh mục"
                options={categoryData}
                form={form}
              />
              <FormSelect
                name="blogId"
                label="Bài viết"
                placeholder="Chọn bài viết"
                options={blogData}
                form={form}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading && (
                <IconLoader className="w-6 animate-spin text-white" />
              )}
              Gán
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CategoryBlogForm;
