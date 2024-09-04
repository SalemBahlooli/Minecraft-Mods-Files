import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import Image from "next/image";
import { File, FileVersion } from "@prisma/client";
import { formatNumber } from "@/lib/utils";

type FileWithVersions = File & { versions: FileVersion[] };

interface PopularModsWidgetProps {
  popularMods: FileWithVersions[];
}

const PopularModsWidget: React.FC<PopularModsWidgetProps> = ({
  popularMods,
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>المودات الأكثر شعبية</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {popularMods.map((mod) => {
            const totalDownloads = mod.versions.reduce(
              (sum, version) => sum + version.downloads,
              0
            );
            return (
              <li key={mod.id} className="flex items-center space-x-4">
                <Image
                  src={mod.image || "/placeholder-mod.png"}
                  alt={mod.name}
                  width={48}
                  height={48}
                  className="rounded-md"
                />
                <div className="flex-grow">
                  <h3 className="text-sm font-semibold">{mod.name}</h3>
                  <p className="text-xs text-gray-500 truncate">
                    {mod.description}
                  </p>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Download className="h-4 w-4 mr-1" />
                  {formatNumber(totalDownloads)}
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PopularModsWidget;
