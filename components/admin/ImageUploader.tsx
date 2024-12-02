"use client";

import { X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { UploadDropzone } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

interface Props {
  type: "multiple" | "single";
  onUploadComplete: (urls: string[]) => void;

  onRemoveImage: (url: string) => void;
  imgUrls: string[];
}

const ImageUploader = ({
  type,
  onUploadComplete,

  onRemoveImage,
  imgUrls,
}: Props) => {
  const [canUploadMore, setCanUploadMore] = useState<boolean>(true);

  useEffect(() => {
    if (type === "single" && imgUrls.length === 1) {
      setCanUploadMore(false);
    } else {
      setCanUploadMore(true);
    }
  }, [imgUrls, type]);

  return (
    <div>
      <UploadDropzone
        className={cn(
          "border-dashed ut-label:text-secondary ut-allowed-content:small-compact",
          !canUploadMore
            ? "border-slate-300 ut-button:bg-slate-200 ut-button:disabled"
            : "border-primary ut-button:bg-pink-500"
        )}
        disabled={!canUploadMore}
        endpoint="imageUploader"
        onBeforeUploadBegin={(files: File[]) => {
          return files;
        }}
        onClientUploadComplete={(res) => {
          const urls = res.map((file) => file.url);

          onUploadComplete(urls);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />

      {imgUrls.length > 0 && (
        <div className={`mt-2 grid w-fit grid-cols-4 gap-2`}>
          {imgUrls?.map((img) => (
            <div key={img} className="relative size-32 overflow-hidden">
              <Image
                alt="product"
                className="size-full object-cover"
                height={200}
                src={img}
                width={200}
              />
              <div className="absolute right-0 top-0 z-10">
                <Button
                  className=""
                  size="sm"
                  variant="ghost"
                  onClick={() => onRemoveImage(img)}
                >
                  <X />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
