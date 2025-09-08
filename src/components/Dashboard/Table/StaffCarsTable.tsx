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

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useVehicles } from "@/hooks/useVehicles";
import { Vehicles } from "@/interfaces/Vehicles";
import { NAMESPACES } from "@/translations/namespaces";
import { useTranslation } from "react-i18next";
import { useProductColumns } from "./StaffCarsColumns";

export function StaffCarsTable() {
  const { t } = useTranslation([
    NAMESPACES.dataTable,
    NAMESPACES.staffCars,
    NAMESPACES.modals,
  ]);
  const columnsLength: number = useProductColumns().length;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [currentPage, setCurrentPage] = React.useState(0);
  const offset = currentPage * 5;
  const { data } = useVehicles({ staff_only: true }, offset, 5);
  const [products, setProducts] = React.useState<Vehicles[]>([]);

  React.useEffect(() => {
    if (data?.data?.results) {
      setProducts(data.data.results);
    }
  }, [data]);

  const table = useReactTable<Vehicles>({
    data: products,
    columns: useProductColumns(),
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
