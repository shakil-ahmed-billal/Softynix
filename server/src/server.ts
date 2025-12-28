import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await prisma.$connect();

    console.log("database to database successfuly");

    app.listen(PORT, () => {
      console.log(`server is running successfully http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
