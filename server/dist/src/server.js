import app from "./app.js";
import { prisma } from "./lib/prisma.js";
const PORT = process.env.PORT || 3000;
async function main() {
    try {
        await prisma.$connect();
        console.log("database to database successfuly");
        app.listen(PORT, () => {
            console.log(`server is running successfully http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
        await prisma.$disconnect();
        process.exit(1);
    }
}
main();
//# sourceMappingURL=server.js.map