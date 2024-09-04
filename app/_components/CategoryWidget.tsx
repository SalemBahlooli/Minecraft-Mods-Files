"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Category } from "@prisma/client";

interface CategoryWidgetProps {
  categories: Category[];
  onCategoryClick: (categoryId: number) => void;
  selectedCategoryId: number | null;
}

const CategoryWidget: React.FC<CategoryWidgetProps> = ({
  categories,
  onCategoryClick,
  selectedCategoryId,
}) => {
  return (
    <Card className="w-full mt-5">
      <CardHeader>
        <CardTitle>فئات المودات</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={
                selectedCategoryId === category.id ? "default" : "secondary"
              }
              className="cursor-pointer hover:bg-indigo-100 transition-colors duration-200"
              onClick={() => onCategoryClick(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryWidget;
