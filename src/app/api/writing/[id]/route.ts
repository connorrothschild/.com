import { getPost } from "@/lib/posts";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await getPost(id);
    return NextResponse.json({
      title: post.title,
      date: post.date,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Post not found" },
      { status: 404 }
    );
  }
}

