import "dotenv/config";
import bcrypt from "bcryptjs";
import { dbConnect } from "../lib/db";
import User from "../lib/models/User";

async function seedUsers() {
  await dbConnect();

  const adminEmail = "admin@pos.com";
  const cashierEmail = "cashier@pos.com";
  const defaultPass = "123456";

  const adminHash = await bcrypt.hash(defaultPass, 10);
  const cashierHash = await bcrypt.hash(defaultPass, 10);

  await User.updateOne(
    { email: adminEmail },
    {
      $set: {
        name: "Admin",
        email: adminEmail,
        passwordHash: adminHash,
        role: "admin",
        isActive: true,
      },
    },
    { upsert: true },
  );

  await User.updateOne(
    { email: cashierEmail },
    {
      $set: {
        name: "Cashier",
        email: cashierEmail,
        passwordHash: cashierHash,
        role: "cashier",
        isActive: true,
      },
    },
    { upsert: true },
  );

  console.log("✅ Users seeded: admin & cashier");
  process.exit(0);
}

seedUsers().catch((e) => {
  console.error("❌ seed-users error:", e);
  process.exit(1);
});
