import "dotenv/config";
import bcrypt from "bcryptjs";
import { dbConnect } from "../lib/db";
import User from "../lib/models/User";

async function run() {
  await dbConnect();

  const email = "admin@test.com";
  const plainPassword = "123456";

  const passwordHash = await bcrypt.hash(plainPassword, 10);

  await User.updateOne(
    { email },
    {
      $set: {
        name: "Admin",
        email,
        passwordHash,
        role: "admin",
        isActive: true,
      },
    },
    { upsert: true },
  );

  console.log("✅ Admin hazır:", email, "/", plainPassword);
  process.exit(0);
}

run().catch((e) => {
  console.error("❌ create-admin error:", e);
  process.exit(1);
});
