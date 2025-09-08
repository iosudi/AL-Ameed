import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";

type PaginationProps = {
  pageCount: number;
  currentPage: number;
  onPageChange: (selected: number) => void;
};

export const Pagination = ({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const { t } = useTranslation();
  return (
    <ReactPaginate
      breakLabel=".."
      nextLabel={t("next")}
      onPageChange={(event) => onPageChange(event.selected)}
      pageRangeDisplayed={1}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      previousLabel={t("prev")}
      forcePage={currentPage}
      containerClassName="flex justify-center items-center space-x-1 mt-8"
      pageClassName="sm:w-10 sm:h-10 w-8 h-8 flex items-center justify-center rounded-lg border border-[#d40000] hover:bg-neutral-700 transition-all cursor-pointer"
      pageLinkClassName="w-full h-full flex items-center justify-center"
      activeClassName="bg-neutral-800 text-white border-[#d40000]"
      previousClassName="flex items-center justify-center gap-3 hover:bg-white hover:text-black sm:px-4 px-2 py-1 rounded cursor-pointer"
      nextClassName="flex items-center justify-center gap-3 hover:bg-white hover:text-black sm:px-4 px-2 py-1 rounded cursor-pointer"
      breakClassName="sm:w-10 sm:h-10 w-8 h-8 flex items-center justify-center"
      disabledClassName="opacity-50 pointer-events-none"
    />
  );
};

export default Pagination;
