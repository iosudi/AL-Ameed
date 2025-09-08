import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import dashboardService from "@/api/dashboardService/dashboardService";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, UserResult } from "@/interfaces/User";
import { NAMESPACES } from "@/translations/namespaces";
import { useTranslation } from "react-i18next";
import { useProductColumns } from "./UsersTableColumn";

export function UsersTable() {
  const { t } = useTranslation([
    NAMESPACES.dataTable,
    NAMESPACES.staffCars,
    NAMESPACES.modals,
  ]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [currentPage, setCurrentPage] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const pageSize = 5;
  const offset = currentPage * pageSize;

  const [users, setUsers] = React.useState<UserResult>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

  // Fetch users whenever currentPage changes
  React.useEffect(() => {
    handleUsers();
  }, [currentPage]);

  async function handleUsers() {
    try {
      setIsLoading(true);
      const res = await dashboardService.getUsers(offset, pageSize);
      if (res.status === 200) {
        setUsers(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Function to update a specific user in the state
  const updateUserPermissions = (userId: number, newPermissions: number[]) => {
    setUsers((prevUsers) => ({
      ...prevUsers,
      results: prevUsers.results.map((user) =>
        user.id === userId
          ? { ...user, user_permissions: newPermissions }
          : user
      ),
    }));
  };

  const columnsLength: number = useProductColumns(updateUserPermissions).length;

  // Calculate pagination info
  const totalPages = Math.ceil(users.count / pageSize);
  const hasNextPage = users.next !== null;
  const hasPreviousPage = users.previous !== null;

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (hasPreviousPage) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const table = useReactTable<User>({
    data: users.results,
    columns: useProductColumns(updateUserPermissions),
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
    // Disable built-in pagination since we're handling it server-side
    manualPagination: true,
    pageCount: totalPages,
  });

  return (
    <div className="w-full space-y-4 mt-8">
      <div>
        <Table>
          <TableHeader className="rounded-xl overflow-hidden border border-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="bg-[#5B1213]" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    className="text-center py-4 md:text-2xl text-lg font-bold px-4"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columnsLength} className="text-center py-8">
                  {t("common:loading")}...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow className="border-0" key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columnsLength} className="text-center py-8">
                  {t("modals:no_results")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {t("dataTable:showing")} {offset + 1} {t("dataTable:to")}{" "}
          {Math.min(offset + pageSize, users.count)} {t("dataTable:of")}{" "}
          {users.count} {t("dataTable:results")}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {t("dataTable:page")} {currentPage + 1} {t("dataTable:of")}{" "}
            {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={!hasPreviousPage || isLoading}
          >
            {t("prev")}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={!hasNextPage || isLoading}
          >
            {t("next")}
          </Button>
        </div>
      </div>
    </div>
  );
}
