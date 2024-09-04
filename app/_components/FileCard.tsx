import React, { useState } from "react";
import Image from "next/image";
import { File, FileVersion, Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Calendar,
  Package,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FileWithVersionsAndCategories = File & {
  versions: FileVersion[];
  categories: Category[];
};

interface FileCardProps {
  file: FileWithVersionsAndCategories;
  onDownload: (versionId: number) => Promise<void>;
  formatNumber: (num: number) => string;
}

const FileCard: React.FC<FileCardProps> = ({
  file,
  onDownload,
  formatNumber,
}) => {
  const [expanded, setExpanded] = useState(false);
  const latestVersion = file.versions[0];
  const totalDownloads = file.versions.reduce(
    (sum, version) => sum + version.downloads,
    0
  );

  return (
    <Card className="mb-4 overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-4">
        <FileHeader file={file} />
        <FileDetails
          file={file}
          latestVersion={latestVersion}
          totalDownloads={totalDownloads}
          formatNumber={formatNumber}
        />
        <FileCategories categories={file.categories} />
        <ExpandButton
          expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        />
        <ExpandedContent
          expanded={expanded}
          file={file}
          onDownload={onDownload}
        />
      </CardContent>
    </Card>
  );
};

const FileHeader: React.FC<{ file: FileWithVersionsAndCategories }> = ({
  file,
}) => (
  <div className="flex items-center space-x-3 mb-2">
    <Image
      src={file.image || "/placeholder-mod.png"}
      alt={file.name}
      width={40}
      height={40}
      className="rounded-md"
    />
    <h3 className="text-lg font-semibold">{file.name}</h3>
  </div>
);

const FileDetails: React.FC<{
  file: FileWithVersionsAndCategories;
  latestVersion: FileVersion;
  totalDownloads: number;
  formatNumber: (num: number) => string;
}> = ({ file, latestVersion, totalDownloads, formatNumber }) => (
  <>
    <p className="text-sm text-gray-600 mb-2">{file.description}</p>
    <div className="flex justify-between text-sm text-gray-500 mb-2">
      <span className="flex items-center">
        <Calendar className="w-4 h-4 mr-1" />
        {new Date(latestVersion.releaseDate).toLocaleDateString("ar-EG")}
      </span>
      <span className="flex items-center">
        <Package className="w-4 h-4 mr-1" />
        {latestVersion.modloader}
      </span>
      <span className="flex items-center">
        <Download className="w-4 h-4 mr-1" />
        {formatNumber(totalDownloads)}
      </span>
    </div>
  </>
);

const FileCategories: React.FC<{ categories: Category[] }> = ({
  categories,
}) => (
  <div className="flex flex-wrap gap-1 mb-2">
    {categories.map((category) => (
      <Badge key={category.id} variant="secondary" className="text-xs">
        {category.name}
      </Badge>
    ))}
  </div>
);

const ExpandButton: React.FC<{ expanded: boolean; onClick: () => void }> = ({
  expanded,
  onClick,
}) => (
  <Button size="sm" variant="outline" onClick={onClick} className="w-full">
    {expanded ? (
      <>
        <ChevronUp className="w-4 h-4 mr-1" /> إخفاء الإصدارات
      </>
    ) : (
      <>
        <ChevronDown className="w-4 h-4 mr-1" /> عرض الإصدارات
      </>
    )}
  </Button>
);

const ExpandedContent: React.FC<{
  expanded: boolean;
  file: FileWithVersionsAndCategories;
  onDownload: (versionId: number) => Promise<void>;
}> = ({ expanded, file, onDownload }) => (
  <AnimatePresence>
    {expanded && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CurseForgeButton curseforge={file.cruseforge} />
        <VersionList versions={file.versions} onDownload={onDownload} />
      </motion.div>
    )}
  </AnimatePresence>
);

const CurseForgeButton: React.FC<{ curseforge: string | null }> = ({
  curseforge,
}) =>
  curseforge && (
    <Button
      size="sm"
      onClick={() => {
        window.open(curseforge, "_blank");
      }}
      className="bg-[#F16436] hover:bg-[#c63a0f] text-white transition-colors duration-300 mt-2 w-full"
    >
      <Image
        src="/cruseForge.png"
        alt="CurseForge"
        width={20}
        height={20}
        className="mr-2"
      />
      CurseForge
    </Button>
  );

const VersionList: React.FC<{
  versions: FileVersion[];
  onDownload: (versionId: number) => Promise<void>;
}> = ({ versions, onDownload }) => (
  <div className="mt-2 space-y-2">
    {versions.map((version) => (
      <div
        key={version.id}
        className="flex justify-between items-center py-2 border-t"
      >
        <span className="text-sm font-medium">الإصدار {version.version}</span>
        <Button
          size="sm"
          onClick={() => {
            onDownload(version.id);
            window.open(version.url, "_blank");
          }}
        >
          <Download className="w-4 h-4 mr-1" /> تنزيل
        </Button>
      </div>
    ))}
  </div>
);

export default FileCard;
