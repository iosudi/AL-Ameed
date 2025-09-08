import { NAMESPACES } from "@/translations/namespaces";
import { Rating, ThinStar } from "@smastrom/react-rating";
import { useTranslation } from "react-i18next";

type RatingProps = {
  values: Record<string, number>;
  onRatingChange: (category: string, value: number) => void;
};

export const RatingTable = ({ values, onRatingChange }: RatingProps) => {
  const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#ff0000",
    inactiveFillColor: "transparent",
    activeStrokeColor: "#ff0000",
    inactiveStrokeColor: "#ff0000",
    itemStrokeWidth: 1,
  };

  const { t } = useTranslation(NAMESPACES.productDetails);

  return (
    <table className="grow">
      <tbody>
        <tr>
          <td className="xl:text-2xl sm:text-xl text-sm  lg:p-4 py-2 px-2">
            {t("carRate.price")}
          </td>
          <td>
            <Rating
              style={{ maxWidth: 200 }}
              value={values.price_rating}
              onChange={(val: number) => onRatingChange("price_rating", val)}
              itemStyles={myStyles}
            />
          </td>
          <td className="xl:text-2xl sm:text-xl text-sm lg:p-4 py-2 px-2 ">
            {t("carRate.comfort")}
          </td>
          <td>
            <Rating
              style={{ maxWidth: 200 }}
              value={values.comfort_rating}
              onChange={(val: number) => onRatingChange("comfort_rating", val)}
              itemStyles={myStyles}
            />
          </td>
        </tr>
        <tr>
          <td className="xl:text-2xl sm:text-xl text-sm text-base lg:p-4 py-2 px-2 ">
            {t("carRate.interior")}
          </td>
          <td>
            <Rating
              style={{ maxWidth: 200 }}
              value={values.interior_rating}
              onChange={(val: number) => onRatingChange("interior_rating", val)}
              itemStyles={myStyles}
            />
          </td>
          <td className="xl:text-2xl sm:text-xl text-sm text-base lg:p-4 py-2 px-2 ">
            {t("carRate.exterior")}
          </td>
          <td>
            <Rating
              style={{ maxWidth: 200 }}
              value={values.exterior_rating}
              onChange={(val: number) => onRatingChange("exterior_rating", val)}
              itemStyles={myStyles}
            />
          </td>
        </tr>
        <tr>
          <td className="xl:text-2xl sm:text-xl text-sm text-base lg:p-4 py-2 px-2 ">
            {t("carRate.reliability")}
          </td>
          <td>
            <Rating
              style={{ maxWidth: 200 }}
              value={values.reliability_rating}
              onChange={(val: number) =>
                onRatingChange("reliability_rating", val)
              }
              itemStyles={myStyles}
            />
          </td>
          <td className="xl:text-2xl sm:text-xl text-sm text-base lg:p-4 py-2 px-2 ">
            {t("carRate.performance")}
          </td>
          <td>
            <Rating
              style={{ maxWidth: 200 }}
              value={values.performance_rating}
              onChange={(val: number) =>
                onRatingChange("performance_rating", val)
              }
              itemStyles={myStyles}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default RatingTable;
