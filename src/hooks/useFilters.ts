import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export interface SelectedFilters {
  [key: string]: string | string[];
}

export const useFilters = () => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});
  const navigate = useNavigate();
  const location = useLocation();
  const hasInitialized = useRef(false);

  // On mount: parse filters from URL only once
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filters: SelectedFilters = {};

    searchParams.forEach((value, key) => {
      if (filters[key]) {
        if (Array.isArray(filters[key])) {
          (filters[key] as string[]).push(value);
        } else {
          filters[key] = [filters[key] as string, value];
        }
      } else {
        filters[key] = value;
      }
    });

    setSelectedFilters(filters);
    setTimeout(() => {
      hasInitialized.current = true;
    }, 0);
  }, []);

  // Only apply filters on change, but skip the first load
  useEffect(() => {
    if (hasInitialized.current) {
      applyFilters();
    }
  }, [selectedFilters]);

  const handleCheckboxChange = (
    filterId: string,
    optionId: string,
    checked: boolean | string
  ) => {
    setSelectedFilters((prev) => {
      const current = prev[filterId];

      if (checked) {
        if (Array.isArray(current)) {
          return { ...prev, [filterId]: [...current, optionId] };
        } else {
          return { ...prev, [filterId]: [optionId] };
        }
      } else {
        if (Array.isArray(current)) {
          const updated = current.filter((id) => id !== optionId);
          return updated.length > 0
            ? { ...prev, [filterId]: updated }
            : omitKey(prev, filterId);
        } else {
          return omitKey(prev, filterId);
        }
      }
    });
  };

  const handleInputChange = (filterId: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterId]: value,
    }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => {
          params.append(key, val);
        });
      } else if (value) {
        params.append(key, value);
      }
    });

    const queryString = params.toString();
    navigate("/shop?" + queryString);
  };

  const clearFilter = () => {
    const currentParams = new URLSearchParams(location.search);
    const contractType = currentParams.get("type");

    if (contractType === "new") {
      setSelectedFilters({ type: "new" });
      navigate("/shop?type=new");
    } else {
      setSelectedFilters({});
      navigate("/shop");
    }
  };

  const omitKey = (
    obj: SelectedFilters,
    keyToRemove: string
  ): SelectedFilters => {
    const copy = { ...obj };
    delete copy[keyToRemove];
    return copy;
  };

  return {
    selectedFilters,
    handleCheckboxChange,
    handleInputChange,
    applyFilters,
    clearFilter,
    setSelectedFilters,
  };
};
