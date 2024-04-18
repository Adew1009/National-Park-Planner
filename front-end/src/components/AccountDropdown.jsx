import * as React from "react";

import Button from "react-bootstrap/esm/Button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ChangePasswordDialog from "./ChangePasswordDialog";
import DisplayNameDialog from "./DispalyNameDialog";

export function AccountDropdown(setUser, user) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="btn-sm" variant="outline-primary">
          Account Options
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-51">
        <DropdownMenuSeparator />
        <ChangePasswordDialog setUser={setUser} />
        <DisplayNameDialog user={user} setUser={setUser} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
