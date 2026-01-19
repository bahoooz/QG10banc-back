import { prisma } from "../lib/prisma.js";

export const getNotesService = async () => {
  const notes = await prisma.note.findMany({
    include: {
      members: true,
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    where: {
      pin: false,
    },
  });

  return notes;
};

export const getPinnedNotesService = async () => {
  const notes = await prisma.note.findMany({
    include: {
      members: true,
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    where: {
      pin: true,
    },
  });

  return notes;
};
