"use client";

import React, { useEffect, useState } from "react";

import { File, FileVersion, Category } from "@prisma/client";
import FileManager from "./FileManager";
import CategoryWidget from "./CategoryWidget";
import PopularModsWidget from "./popularmods";
import RecentUpdatesWidget from "./RecentUpdatesWidget";
import AdBar from "./AdBar";

type FileWithVersionsAndCategories = File & {
  versions: FileVersion[];
  categories: Category[];
};

interface MainContentProps {
  initialFiles: FileWithVersionsAndCategories[];
  categories: Category[];
}

const MainContent: React.FC<MainContentProps> = ({
  initialFiles,
  categories,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [filteredFiles, setFilteredFiles] =
    useState<FileWithVersionsAndCategories[]>(initialFiles);

  useEffect(() => {
    if (selectedCategoryId) {
      setFilteredFiles(
        initialFiles.filter((file) =>
          file.categories.some((cat) => cat.id === selectedCategoryId)
        )
      );
    } else {
      setFilteredFiles(initialFiles);
    }
  }, [selectedCategoryId, initialFiles]);

  // Sort files by total downloads
  const sortedFiles = filteredFiles.sort((a, b) => {
    const downloadsA = a.versions.reduce(
      (sum, version) => sum + version.downloads,
      0
    );
    const downloadsB = b.versions.reduce(
      (sum, version) => sum + version.downloads,
      0
    );
    return downloadsB - downloadsA;
  });

  // Get top 10 most downloaded mods
  const popularMods = sortedFiles.slice(0, 5);

  // Get recent updates
  const recentUpdates = sortedFiles
    .map((file) => ({ ...file, latestVersion: file.versions[0] }))
    .sort(
      (a, b) =>
        new Date(b.latestVersion.releaseDate).getTime() -
        new Date(a.latestVersion.releaseDate).getTime()
    )
    .slice(0, 5);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategoryId((prevId) =>
      prevId === categoryId ? null : categoryId
    );
  };

  const handleLearnMoreClick = () => {
    console.log("Learn More clicked");
    // Add your logic here, e.g., open a modal or navigate to a new page
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="md:col-span-2">
          <FileManager initialFiles={sortedFiles} />
        </div>
        <div className="space-y-6">
          <CategoryWidget
            categories={categories}
            onCategoryClick={handleCategoryClick}
            selectedCategoryId={selectedCategoryId}
          />
          <PopularModsWidget popularMods={popularMods} />
          <RecentUpdatesWidget recentUpdates={recentUpdates} />
        </div>
      </div>
      <AdBar
        adContent="  Instagram حاب تعلن هنا ؟ تواصل معي"
        instagramUrl="https://www.instagram.com/mine_coder/"
      />
    </>
  );
};

export default MainContent;
