import * as React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function YourParksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="btn-sm" variant="outline-success">
          Your Parks
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-55">
        <DropdownMenuSeparator />
        <Button
          className="btn-sm"
          variant="outline-success"
          as={Link}
          to="/visitedparks"
        >
          Your Visited Parks
        </Button>
        <DropdownMenuSeparator />
        <Button
          className="btn-sm"
          variant="outline-success"
          as={Link}
          to="/wishparks"
        >
          Your Park Wish List
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
