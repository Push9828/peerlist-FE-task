import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formId, answers } = body;

    if (!formId || !Array.isArray(answers)) {
      return NextResponse.json(
        { message: "Invalid data: formId and answers are required." },
        { status: 400 }
      );
    }

    const form = await prisma.form.findUnique({
      where: { id: formId },
    });

    if (!form) {
      return NextResponse.json({ message: "Form not found." }, { status: 404 });
    }

    const response = await prisma.response.create({
      data: {
        formId,
        answers: JSON.stringify(answers),
      },
    });

    return NextResponse.json(
      { message: "Response submitted successfully!", response },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing response submission:", error);
    return NextResponse.json(
      { message: "Failed to submit response." },
      { status: 500 }
    );
  }
}
