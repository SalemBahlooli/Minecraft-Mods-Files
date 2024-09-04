import { db } from "@/lib/prisma";

import { File, FileVersion, Category, TutorialVideo } from "@prisma/client";
import MainContent from "./_components/MainContent";

type FileWithVersionsAndCategories = File & {
  versions: FileVersion[];
  categories: Category[];
  tutorial: TutorialVideo[];
};

export default async function Home() {
  const files = (await db.file.findMany({
    include: {
      versions: {
        orderBy: {
          releaseDate: "desc",
        },
      },

      categories: true,
    },
  })) as FileWithVersionsAndCategories[];

  const categories = await db.category.findMany();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-7xl mx-auto mt-5">
        <MainContent initialFiles={files} categories={categories} />
      </div>
    </div>
  );
}
