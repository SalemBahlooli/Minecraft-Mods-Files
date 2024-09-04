import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ModCategoriesWidgetProps {
  categories: string[];
  onCategoryClick: (category: string) => void;
}

const ModCategoriesWidget: React.FC<ModCategoriesWidgetProps> = ({
  categories,
  onCategoryClick,
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>فئات المودات</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="cursor-pointer hover:bg-indigo-100 transition-colors duration-200"
              onClick={() => onCategoryClick(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModCategoriesWidget;
