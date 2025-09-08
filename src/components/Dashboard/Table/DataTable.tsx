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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Vehicles } from "@/interfaces/Vehicles";
import { NAMESPACES } from "@/translations/namespaces";
import { useTranslation } from "react-i18next";
import { FiSearch } from "react-icons/fi";
import { useProductColumns } from "./columns";

export function DataTable() {
  const { t } = useTranslation(NAMESPACES.dataTable);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [currentPage, setCurrentPage] = React.useState(0);
  const offset = currentPage * 5;
  const limit = 5;
  const { user } = useAuth();

  // Function to determine type filters based on user permissions
  const getTypeFilters = React.useMemo(() => {
    if (user?.is_superuser) {
      return {}; // No type filter for superuser - shows all
    }

    if (!user?.user_permissions || user.user_permissions.length === 0) {
      return {}; // No permissions, no filter
    }

    const permissions = user.user_permissions;
    const typeFilters: string[] = [];

    // Check for specific permissions and add corresponding filters
    if (permissions.includes(185)) {
      // Rent to own permission
      typeFilters.push("rent_to_own");
    }

    if (permissions.includes(176)) {
      // Can view rental permission
      typeFilters.push("rent");
    }

    if (permissions.includes(144)) {
      // Can view car listing permission
      typeFilters.push("new", "used");
    }

    // If user has type filters, return them as a comma-separated string
    // Otherwise return empty object (no type filter)
    return typeFilters.length > 0 ? { type: typeFilters.join(",") } : {};
  }, [user]);

  const params = getTypeFilters;
  const { data } = useVehicles(params, offset, limit);
  const columns = useProductColumns({ params, offset, limit });
  const columnsLength = columns.length;

  const [products, setProducts] = React.useState<Vehicles[]>([]);

  React.useEffect(() => {
    if (data?.data?.results) {
      setProducts(data.data.results);
    }
  }, [data]);

  const table = useReactTable<Vehicles>({
    data: products,
    columns: columns,
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
      <div className="flex items-center justify-between gap-6 py-4">
        <div className="flex items-center gap-2 border-white border rounded pl-4 px-2 grow">
          <Input
            placeholder={t("search_placeholder")}
            value={(table.getColumn("info")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("info")?.setFilterValue(event.target.value)
            }
            className="border-0 py-7 md:!text-2xl sm:!text-lg text-base"
          />
          <FiSearch className="md:size-8 size-6" />
        </div>

        <Select
          dir="rtl"
          onValueChange={(value) => {
            if (value === "") {
              table.setSorting([]);
            } else {
              const [id, dir] = value.split(":");
              table.setSorting([{ id, desc: dir === "desc" }]);
            }
          }}
        >
          <SelectTrigger className="sm:min-w-[220px] min-w-[150px] py-7 sm:text-xl rounded cursor-pointer">
            <SelectValue placeholder={t("sort_by")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price:desc">أعلى سعر</SelectItem>
            <SelectItem value="price:asc">أقل سعر</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
                  لا يوجد نتائج.
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
