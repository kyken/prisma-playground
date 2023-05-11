import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "alice@prisma.io",
      json: {
        hoge: "hoge",
        fuga: "fuga",
        piyo: undefined,
      },
    },
  });

  console.log(
    await prisma.user.findUnique({
      where: {
        email: "alice@prisma.io",
      },
    })
    // {
    //     id: 1,
    //     email: 'alice@prisma.io',
    //     json: { fuga: 'fuga', hoge: 'hoge' }
    // }
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
