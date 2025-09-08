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

import rentService from "@/api/rentService/rentService";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RentalRequest, RentalResults } from "@/interfaces/RentalRequest";
import { NAMESPACES } from "@/translations/namespaces";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useProductColumns } from "./RentToOwnRequestsTableColumn";

export function RentToOwnRequestTable() {
  const { t } = useTranslation([
    NAMESPACES.dataTable,
    NAMESPACES.rentRequests,
    NAMESPACES.modals,
  ]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [currentPage, setCurrentPage] = React.useState(0);
  const offset = currentPage * 5;
  const [rentalRequests, setRentalRequests] = React.useState<RentalRequest>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const columnsLength: number = useProductColumns({ setRentalRequests }).length;

  React.useEffect(() => {
    fetchRentalRequests();
  }, []);

  async function fetchRentalRequests() {
    const res = await rentService.getRentToOwnRequests(offset, 5);
    console.log(res.data);

    if (res.status === 200) {
      setRentalRequests(res.data);
    } else {
      toast.error(t("common:error_fetching_data"));
    }
  }

  const table = useReactTable<RentalResults>({
    data: rentalRequests.results,
    columns: useProductColumns({ setRentalRequests }),
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
          disabled={!rentalRequests?.previous}
        >
          {t("prev")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={!rentalRequests?.next}
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
}
