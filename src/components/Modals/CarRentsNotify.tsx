import i18n from "@/i18n";
import { Installment } from "@/interfaces/RentalRequest";
import { NAMESPACES } from "@/translations/namespaces";
import { formatDate } from "@/utils/dateHelpers";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function CarRentsNotify({
  installments,
}: {
  installments: Installment[];
}) {
  const { t } = useTranslation(NAMESPACES.modals);

  useEffect(() => {
    console.log(installments);
  }, [installments]);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">{t("payment_date")}</TableHead>
            <TableHead className="text-center">{t("status")}</TableHead>
            <TableHead className="text-center">{t("payment_amount")}</TableHead>
            <TableHead className="text-center">
              {t("send_notification")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {installments.map((installment: Installment) => (
            <TableRow>
              <TableCell className="text-center">
                {formatDate(installment.due_date, i18n.language)}
              </TableCell>

              <TableCell className="text-center">
                {installment.is_paid ? (
                  <Badge
                    variant={"outline"}
                    className="border-green-400 text-green-400"
                  >
                    {t("paid")}
                  </Badge>
                ) : (
                  <Badge
                    variant={"outline"}
                    className="border-red-400 text-red-400"
                  >
                    {t("not_paid")}
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-center">
                BHD {installment.amount}
              </TableCell>
              <TableCell className="text-center">
                <Button
                  size={"icon"}
                  variant={"outline"}
                  className="justify-self-center"
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_4_1632)">
                      <path
                        d="M27.0312 13.4661C26.5309 13.4661 26.1249 13.0601 26.1249 12.5598C26.1249 9.08949 24.7742 5.82823 22.3212 3.3741C21.9672 3.0201 21.9672 2.44617 22.3212 2.09216C22.6752 1.73816 23.2491 1.73816 23.6033 2.09216C26.3982 4.88813 27.9374 8.60628 27.9374 12.5598C27.9374 13.0601 27.5314 13.4661 27.0312 13.4661Z"
                        fill="white"
                      />
                      <path
                        d="M2.26074 13.466C1.76049 13.466 1.35449 13.06 1.35449 12.5597C1.35449 8.60615 2.89397 4.888 5.68993 2.09314C6.04394 1.73914 6.61809 1.73914 6.97209 2.09314C7.3261 2.44714 7.3261 3.02129 6.97209 3.3753C4.51796 5.8281 3.16699 9.08936 3.16699 12.5597C3.16699 13.06 2.76099 13.466 2.26074 13.466Z"
                        fill="white"
                      />
                      <path
                        d="M14.6465 29.4766C12.1477 29.4766 10.1152 27.4441 10.1152 24.9453C10.1152 24.4451 10.5212 24.0391 11.0215 24.0391C11.5217 24.0391 11.9277 24.4451 11.9277 24.9453C11.9277 26.445 13.1468 27.6641 14.6465 27.6641C16.1459 27.6641 17.3652 26.445 17.3652 24.9453C17.3652 24.4451 17.7712 24.0391 18.2715 24.0391C18.7717 24.0391 19.1777 24.4451 19.1777 24.9453C19.1777 27.4441 17.1453 29.4766 14.6465 29.4766Z"
                        fill="white"
                      />
                      <path
                        d="M24.6147 25.8516H4.67723C3.51101 25.8516 2.5625 24.9031 2.5625 23.7371C2.5625 23.1182 2.83199 22.5323 3.30215 22.1299C5.13987 20.5771 6.1875 18.3201 6.1875 15.9288V12.5598C6.1875 7.89582 9.98176 4.10156 14.646 4.10156C19.31 4.10156 23.1042 7.89582 23.1042 12.5598V15.9288C23.1042 18.3201 24.1519 20.5771 25.9776 22.1215C26.4598 22.5323 26.7292 23.1182 26.7292 23.7371C26.7292 24.9031 25.7807 25.8516 24.6147 25.8516ZM14.646 5.91406C10.9809 5.91406 8 8.895 8 12.5598V15.9288C8 18.854 6.71806 21.6163 4.48386 23.505C4.4416 23.5412 4.375 23.6162 4.375 23.7371C4.375 23.9012 4.51284 24.0391 4.67723 24.0391H24.6147C24.7789 24.0391 24.9167 23.9012 24.9167 23.7371C24.9167 23.6162 24.8504 23.5412 24.8103 23.5074C22.5737 21.6163 21.2917 18.854 21.2917 15.9288V12.5598C21.2917 8.895 18.3108 5.91406 14.646 5.91406Z"
                        fill="white"
                      />
                      <path
                        d="M14.6465 5.91406C14.1462 5.91406 13.7402 5.50806 13.7402 5.00781V1.38281C13.7402 0.882561 14.1462 0.476562 14.6465 0.476562C15.1467 0.476562 15.5527 0.882561 15.5527 1.38281V5.00781C15.5527 5.50806 15.1467 5.91406 14.6465 5.91406Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_4_1632">
                        <rect
                          width="29"
                          height="29"
                          fill="white"
                          transform="translate(0.165039 0.476562)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
