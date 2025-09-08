import userService from "@/api/userService/userService";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Permissions, User } from "@/interfaces/User";
import { NAMESPACES } from "@/translations/namespaces";
import { formatDate } from "@/utils/dateHelpers";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsEye } from "react-icons/bs";
import { NavLink } from "react-router-dom";

export const useProductColumns = (
  updateUserPermissions?: (userId: number, newPermissions: number[]) => void
): ColumnDef<User>[] => {
  const { t, i18n } = useTranslation([
    NAMESPACES.dataTable,
    NAMESPACES.common,
    NAMESPACES.UsersTable,
  ]);

  const lang = i18n.language;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [allPermissions, setAllPermissions] = useState<Permissions[]>([]);

  useEffect(() => {
    const getPermissions = async () => {
      const res = await userService.getPermissions();
      setAllPermissions(res.data.results);
    };
    getPermissions();
  }, []);

  const handleOpenDialog = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleSavePermissions = async () => {
    if (!selectedUser) return;

    try {
      const body = {
        user_id: selectedUser.id,
        permissions: selectedUser.user_permissions,
        action: "add",
      };

      await userService.updateUserPermissions(body);

      // Update the parent component's state immediately
      if (updateUserPermissions) {
        updateUserPermissions(
          selectedUser.id,
          selectedUser.user_permissions || []
        );
      }

      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to update permissions:", error);
      // Handle error (show toast, etc.)
    }
  };

  return [
    {
      accessorKey: "id",
      header: t("UsersTable:id"),
      cell: ({ row }) => (
        <div className="capitalize w-fit mx-auto">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "first_name",
      header: t("UsersTable:name"),
      cell: ({ row }) => (
        <div className="capitalize sm:text-xl text-base text-center">
          {row.original.first_name
            ? `${row.original.first_name} ${row.original.last_name}`
            : row.original.username}
        </div>
      ),
    },
    {
      accessorKey: "user_type",
      header: t("UsersTable:rank"),
      cell: ({ row }) => (
        <div className="capitalize sm:text-xl text-base text-center">
          {row.getValue("user_type")}
        </div>
      ),
    },
    {
      accessorKey: "permissions",
      header: t("UsersTable:permissions"),
      cell: ({ row }) => {
        // Get permission names from IDs
        const userPermissionNames = row.original.user_permissions
          ?.map((permId) => allPermissions.find((p) => p.id === permId)?.name)
          .filter(Boolean);

        return (
          <>
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-gray-600">
                {userPermissionNames?.length
                  ? userPermissionNames.join(", ")
                  : t("UsersTable:no_permissions")}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleOpenDialog(row.original)}
              >
                {t("common:edit")}
              </Button>
            </div>

            {/* Dialog lives INSIDE the cell */}
            {selectedUser?.id === row.original.id && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {t("UsersTable:edit_permissions")}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {allPermissions.map((perm) => (
                      <div
                        key={perm.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          checked={selectedUser?.user_permissions?.includes(
                            perm.id
                          )}
                          onCheckedChange={(checked) => {
                            if (!selectedUser) return;
                            setSelectedUser({
                              ...selectedUser,
                              user_permissions: checked
                                ? [
                                    ...(selectedUser.user_permissions || []),
                                    perm.id,
                                  ]
                                : selectedUser.user_permissions?.filter(
                                    (p) => p !== perm.id
                                  ) || [],
                            });
                          }}
                        />
                        <span>{perm.name}</span>
                      </div>
                    ))}
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      {t("common:cancel")}
                    </Button>
                    <Button onClick={handleSavePermissions}>
                      {t("common:save")}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </>
        );
      },
    },
    {
      accessorKey: "date_joined",
      header: t("UsersTable:date_joined"),
      cell: ({ row }) => (
        <div className="capitalize sm:text-xl text-base text-center">
          {formatDate(row.getValue("date_joined"), lang)}
        </div>
      ),
    },
    {
      accessorKey: "last_login",
      header: t("UsersTable:last_login"),
      cell: ({ row }) => (
        <div className="capitalize sm:text-xl text-base text-center">
          {formatDate(row.getValue("last_login"), lang)}
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-3">
          <NavLink to={`/user?id=${row.original.id}`}>
            <Button size={"icon"} variant={"outline"} className="size-10">
              <BsEye className="size-6" />
            </Button>
          </NavLink>
        </div>
      ),
    },
  ];
};
