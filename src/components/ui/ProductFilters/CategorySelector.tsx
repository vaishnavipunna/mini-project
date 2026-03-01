"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownNoItems,
  DropdownSkeleton,
} from "../Dropdown";
import { useEffect, useState } from "react";
import { CategoryType } from "@/types/category";
import { useCategories } from "@/lib/api/categories/hooks";
import useQueryParams from "@/hooks/useQueryParams";

const CategorySelector = () => {
  const { categories, isLoading, error } = useCategories();
  const { queryParams, setQueryParam } = useQueryParams();

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<CategoryType | null>(null);

  // Sync selected category from URL on first render
  useEffect(() => {
    const categoryFromURL = queryParams.get("category");

    if (categoryFromURL && categories.length > 0) {
      const matched = categories.find((c) => c.slug === categoryFromURL);
      setSelected(matched || null);
    }
  }, [queryParams, categories]);

  if (isLoading) {
    return <DropdownSkeleton label="Select Category" />;
  }

  if (error) {
    console.error("Failed to fetch categories:", error);
  }

  if (categories.length === 0) {
    return <DropdownNoItems label="No category found" />;
  }

  const handleSelect = (category: CategoryType | null) => {
    setQueryParam("category", category?.slug ?? "");

    setSelected(category);
    setIsOpen(false);
  };

  return (
    <Dropdown
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={selected ? selected.name : "All Dresses"}
    >
      <DropdownItem
        label="All Dresses"
        isSelected={selected === null}
        onClick={() => handleSelect(null)}
      />

      {categories.map((category) => (
        <DropdownItem
          key={category.id}
          label={category.name}
          isSelected={selected?.id === category.id}
          onClick={() => handleSelect(category)}
        />
      ))}
    </Dropdown>
  );
};

export default CategorySelector;
