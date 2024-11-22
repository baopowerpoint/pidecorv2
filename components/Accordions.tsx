"use client";
import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Accordions = ({
  items,
}: {
  items: {
    id: number;
    title: string;
    content: React.ReactNode;
  }[];
}) => {
  return (
    <Accordion type="single" collapsible>
      {items?.map((item) => {
        return (
          <AccordionItem key={item.id} value="item-1">
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default Accordions;
