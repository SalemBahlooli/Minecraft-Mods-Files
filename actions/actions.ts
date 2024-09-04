"use server";
import { db } from "@/lib/prisma";
// app/actions.ts

import { revalidatePath } from "next/cache";

export async function createFile(
  name: string,
  description: string,
  image: string
) {
  try {
    const newFile = await db.file.create({
      data: {
        name,
        image,
        description,
      },
    });
    revalidatePath("/admin");
    return { success: true, file: newFile };
  } catch (error) {
    console.error("Error creating file:", error);
    return { success: false, error: error };
  }
}

export async function createVersion(
  fileId: number,
  version: string,
  url: string,
  releaseDate: string,
  modloader: string
) {
  try {
    const newVersion = await db.fileVersion.create({
      data: {
        fileId,
        version,
        url,
        releaseDate: new Date(releaseDate),
        modloader,
        downloads: 0,
      },
    });
    revalidatePath("/admin");
    return { success: true, version: newVersion };
  } catch (error) {
    console.error("Error creating version:", error);
    return { success: false, error: error };
  }
}

export async function getFiles() {
  try {
    const files = await db.file.findMany({
      include: {
        versions: {
          orderBy: {
            releaseDate: "desc",
          },
        },
      },
    });
    return { success: true, files };
  } catch (error) {
    console.error("Error fetching files:", error);
    return { success: false, error: error };
  }
}

export async function incrementDownload(versionId: number) {
  try {
    const updatedVersion = await db.fileVersion.update({
      where: { id: versionId },
      data: {
        downloads: {
          increment: 1,
        },
      },
    });
    revalidatePath("/");
    return { success: true, version: updatedVersion };
  } catch (error) {
    console.error("Error incrementing download count:", error);
    return { success: false, error: error };
  }
}

export async function getFileWithVersions(fileId: number) {
  try {
    const file = await db.file.findUnique({
      where: { id: fileId },
      include: { versions: true },
    });
    if (!file) {
      throw new Error("File not found");
    }
    return { success: true, file };
  } catch (error) {
    console.error("Error fetching file with versions:", error);
    return { success: false, error: error };
  }
}
