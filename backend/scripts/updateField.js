import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const batchSize = 500;
  let skip = 0;
  while (true) {
    // Ambil batch
    const items = await prisma.animeHistory.findMany({
      skip,
      take: batchSize,
      select: { id: true, watch_eps: true }
    });
    console.log(items);

    if (items.length === 0) break;

    const updates = items
      .filter(i => i.watch_eps === null || i.watch_eps === undefined)
      .map(i => prisma.anime.update({
        where: { id: i.id },
        data: { watch_eps: "1" }
      }));
      
      if (updates.length) await Promise.all(updates);
    if (items.length < batchSize) break;
    skip += batchSize;
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
