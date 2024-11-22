import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/route";

import { Badge } from "../ui/badge";

interface Props {
  _id: string;
  name: string;
  products?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

const TagCard = ({
  _id,
  name,
  products,
  showCount,
  compact,
  remove,
  isButton,
  handleRemove,
}: Props) => {
  const Content = (
    <>
      <Badge className="flex flex-row gap-2 rounded-md border-none bg-light-800 px-3 py-1.5 uppercase text-light-400 !shadow-none">
        <span>{name}</span>
        {remove && (
          <Image
            src="/icons/close.svg"
            width={12}
            height={12}
            alt="close icon"
            className="cursor-pointer object-contain invert-0 dark:invert"
            onClick={handleRemove}
          />
        )}
      </Badge>

      {showCount && <p className="small-medium text-dark-500">{products}</p>}
    </>
  );
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };
  if (compact) {
    return isButton ? (
      <button
        onClick={(e) => handleClick(e)}
        className="flex justify-between gap-2"
      >
        {Content}
      </button>
    ) : (
      <Link href={ROUTES.TAGS(_id)} className="flex justify-between gap-2">
        {Content}
      </Link>
    );
  }
  return <div>TagCard</div>;
};

export default TagCard;
