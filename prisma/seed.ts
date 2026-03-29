import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.room.createMany({
    data: [
      { name: 'Server Room', description: 'Main server room' },
      { name: 'Conference Room A', description: 'Main conference room' },
      { name: 'Lab', description: 'Research laboratory' },
    ],
    skipDuplicates: true,
  });

  console.log('Seed completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
