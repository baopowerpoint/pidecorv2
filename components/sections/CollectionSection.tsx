import React from "react";

import CollectionCard from "../cards/CollectionCard";
import { Collection } from "@/types/global";

const CollectionSection = ({
  collectionData,
}: {
  collectionData: Collection[];
}) => {
  return (
    <>
      <h1 className="h1-bold text-center text-dark-100">
        Khám phá
        <span className="text-primary-500"> Bộ sưu tập</span>
      </h1>
      <div className="mt-10 grid w-full grid-cols-1 flex-col gap-6 lg:grid-cols-2">
        {collectionData?.map((collection) => (
          <CollectionCard key={collection._id} collection={collection} />
        ))}
      </div>
    </>
  );
};

export default CollectionSection;
