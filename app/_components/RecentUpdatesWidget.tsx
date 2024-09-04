import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { File, FileVersion } from "@prisma/client";

type FileWithLatestVersion = File & { latestVersion: FileVersion };

interface RecentUpdatesWidgetProps {
  recentUpdates: FileWithLatestVersion[];
}

const RecentUpdatesWidget: React.FC<RecentUpdatesWidgetProps> = ({
  recentUpdates,
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>التحديثات الأخيرة</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {recentUpdates.map((mod) => (
            <li key={mod.id} className="flex items-center justify-between">
              <span className="text-sm font-medium">{mod.name}</span>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(mod.latestVersion.releaseDate).toLocaleDateString(
                  "ar-EG"
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentUpdatesWidget;
