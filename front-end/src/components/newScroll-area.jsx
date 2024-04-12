import * as React from "react";
import { Link } from "react-router-dom";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function ScrollAreaParks({ parksArray }) {
  return (
    <ScrollArea className="h-72 w-50 rounded-md border bg-light">
      <div className="p-4">
        <h4 className="mb-4 text- font-medium leading-none">
          All National Parks and Monunment
        </h4>
        {parksArray.map(({ name, code }) => (
          <>
            <div key={code} className="text-sm">
              <Link to={`/park/${name}/${code}`}>{name}</Link>
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  );
}
