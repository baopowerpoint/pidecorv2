"use client";
import React, { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormSelect } from "@/components/forms/FormSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { createCollectionBlog } from "@/lib/actions/collection-blog.action";
import logger from "@/lib/logger";
import { CollectionBlog } from "@/types/global";

const CollectionBlogForm = ({
  initialData,
  collectionData,
  blogData,
}: {
  initialData?: CollectionBlog;
  collectionData: Selection[];
  blogData: Selection[];
}) => {
  const form = useForm({
    defaultValues: {
      collectionId: initialData?.collectionId.toString() || "",
      blogId: initialData?.blogId.toString() || "",
    },
  });
  const handleSubmit: SubmitHandler<{
    collectionId: string;
    blogId: string;
  }> = useCallback(async (data: { collectionId: string; blogId: string }) => {
    try {
      await createCollectionBlog({
        collectionId: data!.collectionId,
        blogId: data!.blogId,
        path: "admin/pages/collections",
      });
    } catch (error) {
      logger.error(error);
      toast.error("Có lỗi xảy ra");
    }
  }, []);
  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle>Gán bài viết cho bộ sưu tập</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-3"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="flex flex-1 gap-4">
              <FormSelect
                name="collectionId"
                label="Bộ sưu tập"
                placeholder="Chọn bộ sưu tập"
                options={collectionData}
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
            <Button className="mt-10 w-fit">Gán</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CollectionBlogForm;
