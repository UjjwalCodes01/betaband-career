import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_auth")?.value === "authenticated";
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { candidateName, roleOrCourse, issueDate, issuedBy } = body;

    if (!candidateName || !roleOrCourse || !issueDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const id = nanoid(12).toUpperCase();

    const cert = await prisma.certificate.create({
      data: {
        id,
        candidateName: candidateName.trim(),
        roleOrCourse: roleOrCourse.trim(),
        issueDate: new Date(issueDate),
        issuedBy: issuedBy?.trim() || "BeatBand™",
      },
    });

    return NextResponse.json({ success: true, certificate: cert }, { status: 201 });
  } catch (error) {
    console.error("Create cert error:", error);
    return NextResponse.json({ error: "Failed to create certificate" }, { status: 500 });
  }
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const certs = await prisma.certificate.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ certificates: certs });
  } catch (error) {
    console.error("List certs error:", error);
    return NextResponse.json({ error: "Failed to fetch certificates" }, { status: 500 });
  }
}
