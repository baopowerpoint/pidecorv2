import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

export default function PageContainer({
  children,
  scrollable = true,
  otherClasses,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
  otherClasses?: string;
}) {
  return (
    <div className={otherClasses}>
      {scrollable ? (
        <ScrollArea className="h-[calc(100dvh-52px)]">
          <div className="h-full p-4 md:px-6">{children}</div>
        </ScrollArea>
      ) : (
        <div className="h-full p-4 md:px-6">{children}</div>
      )}
    </div>
  );
}
