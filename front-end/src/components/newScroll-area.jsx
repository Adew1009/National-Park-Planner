import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function ScrollAreaJournal({ journal }) {
  return (
    <ScrollArea className="rounded-md border bg-light">{journal}</ScrollArea>
  );
}
