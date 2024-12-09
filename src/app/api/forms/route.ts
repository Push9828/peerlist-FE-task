import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, questions } = body;

    if (!title || !questions || !Array.isArray(questions)) {
      return NextResponse.json(
        { message: "Invalid form data: title and questions are required." },
        { status: 400 }
      );
    }

    const newForm = await prisma.form.create({
      data: {
        title,
        questions,
      },
    });

    return NextResponse.json(
      { message: "Form published successfully!", newForm: newForm },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Failed to process the request." },
      { status: 500 }
    );
  }
}
