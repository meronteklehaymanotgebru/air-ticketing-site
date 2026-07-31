import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const existing = await prisma.user.findFirst();
    if (existing) {
      return NextResponse.json({ message: "Admin user already exists." });
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);
    const user = await prisma.user.create({
      data: {
        email: "admin@flyethiopia.com",
        password: hashedPassword,
        name: "Super Admin",
        role: "ADMIN",
        branch: "Headquarters",
      },
    });

    return NextResponse.json({ message: "Default admin created!", email: user.email, password: "admin123" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to seed admin" }, { status: 500 });
  }
}
