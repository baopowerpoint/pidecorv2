import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/route";
import { getTimeStamp } from "@/lib/utils";
import { Blog, Tag } from "@/types/global";

import TagCard from "./TagCard";
import Metric from "../Metric";

interface Props {
  blog: Blog;
}
const BlogCard = ({
  blog: {
    _id,
    title,
    author,

    createdAt,

    likes,

    tags,

    views,
  },
}: Props) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular line-clamp-1 flex text-dark-400 sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <Link href={ROUTES.QUESTION(_id)}>
            <h3 className="sm:h3-semibold base-semibold line-clamp-1 flex-1 text-dark-400">
              {title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="mt-3.5 flex w-full flex-wrap gap-2">
        {tags.map((tag: Tag) => (
          <TagCard key={tag._id} _id={_id} name={tag.name} compact />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.image}
          alt={author.name}
          value={author.name}
          title={`• Đăng ${getTimeStamp(createdAt)}`}
          href={ROUTES.PRODUCT(author._id)}
          textStyles="body-medium text-dark400_light700"
        />
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/icons/like.svg"
            alt="like"
            value={likes}
            title=" Lượt thích"
            textStyles="small-medium text-dark400_light800"
          />

          <Metric
            imgUrl="/icons/eye.svg"
            alt="views"
            value={views}
            title=" Lượt xem"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
