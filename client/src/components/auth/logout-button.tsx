"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/use-logout";
import { LogOut } from "lucide-react";
import { useConfirm } from "../confirm-dialog";

export function LogoutButton() {
  const { logout, isPending } = useLogout();
  const confirm = useConfirm();

  const handleLogout = async () => {
    const confirmed = await confirm({
      title: "Are you sure?",
      description: "This will log you out of your account.",
      confirmText: "Log out",
      cancelText: "Cancel",
    });

    if (confirmed) {
      logout();
    }
  };

  return (
    <DropdownMenuItem
      onClick={handleLogout}
      disabled={isPending}
      className="flex items-center"
      variant="destructive"
    >
      <LogOut className="mr-2 h-4 w-4" />
      {isPending ? "Logging out..." : "Log out"}
    </DropdownMenuItem>
  );
}
