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

import sellService from "@/api/sellService/sellService";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/context/AuthContext";
import { useVehicles } from "@/hooks/useVehicles";
import { SellRequest, SellRequestResult } from "@/interfaces/SellRequest";
import { NAMESPACES } from "@/translations/namespaces";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useProductColumns } from "./UserSellRequestsColumn";

export function UserSellRequests() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { user } = useAuth();
  const userId = searchParams.get("id") || user?.id.toString() || "";

  const { t } = useTranslation([NAMESPACES.dataTable, NAMESPACES.modals]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [currentPage, setCurrentPage] = React.useState(0);
  const offset = currentPage * 5;
  const { data } = useVehicles({}, offset, 5);
  const [products, setProducts] = React.useState<SellRequest>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const columnsLength: number = useProductColumns({ setProducts }).length;

  React.useEffect(() => {
    handleUsers();
  }, []);

  async function handleUsers() {
    const res = await sellService.getSellRequests(offset, 5, userId);

    if (res.status === 200) setProducts(res.data);
  }

  const table = useReactTable<SellRequestResult>({
    data: products.results,
    columns: useProductColumns({ setProducts }),
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
        pageSize: 5,
      },
    },
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
            {table.getRowModel().rows.length ? (
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
                <TableCell
                  colSpan={columnsLength}
                  className="text-center py-8 "
                >
                  {t("modals:no_results")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={!data?.data?.previous}
        >
          {t("prev")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={!data?.data?.next}
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
}
