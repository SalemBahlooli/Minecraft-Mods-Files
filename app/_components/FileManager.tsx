"use client";

import React, { useState, useEffect } from "react";
import { File, FileVersion, Category } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";

import { incrementDownload } from "@/actions/actions";
import { formatNumber } from "@/lib/utils";
import FileCard from "./FileCard";

type FileWithVersionsAndCategories = File & {
  versions: FileVersion[];
  categories: Category[];
};

interface FileManagerProps {
  initialFiles: FileWithVersionsAndCategories[];
}

const FileManager: React.FC<FileManagerProps> = ({ initialFiles }) => {
  const [files, setFiles] =
    useState<FileWithVersionsAndCategories[]>(initialFiles);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setFiles(initialFiles);
  }, [initialFiles]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownload = async (versionId: number) => {
    const result = await incrementDownload(versionId);
    if (result.success) {
      setFiles((prevFiles) =>
        prevFiles.map((file) => ({
          ...file,
          versions: file.versions.map((v) =>
            v.id === versionId ? { ...v, downloads: v.downloads + 1 } : v
          ),
        }))
      );
    } else {
      setError(`Failed to update download count. Error: ${result.error}`);
    }
  };

  const filteredFiles = files.filter(
    (file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-4 relative">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {error && <ErrorMessage error={error} />}
      <FileGrid files={filteredFiles} onDownload={handleDownload} />
      <ScrollTopButton show={showScrollTop} onClick={scrollToTop} />
    </div>
  );
};

const SearchBar: React.FC<{
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}> = ({ searchTerm, setSearchTerm }) => (
  <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 py-4">
    <div className="relative">
      <Input
        placeholder="البحث عن المودات..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  </div>
);

const ErrorMessage: React.FC<{ error: string }> = ({ error }) => (
  <div className="text-red-500 mb-4">{error}</div>
);

const FileGrid: React.FC<{
  files: FileWithVersionsAndCategories[];
  onDownload: (versionId: number) => Promise<void>;
}> = ({ files, onDownload }) => (
  <Masonry
    breakpointCols={{
      default: 3,
      1100: 2,
      700: 1,
    }}
    className="flex w-auto"
    columnClassName="bg-clip-padding px-2"
  >
    {files.map((file) => (
      <FileCard
        key={file.id}
        file={file}
        onDownload={onDownload}
        formatNumber={formatNumber}
      />
    ))}
  </Masonry>
);

const ScrollTopButton: React.FC<{ show: boolean; onClick: () => void }> = ({
  show,
  onClick,
}) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-4 right-4"
      >
        <Button
          size="icon"
          variant="secondary"
          onClick={onClick}
          className="rounded-full shadow-lg"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </motion.div>
    )}
  </AnimatePresence>
);

export default FileManager;
