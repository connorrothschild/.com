import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { tool as createTool } from "ai";
import { z } from "zod";

export const runtime = "edge";

const recommendBlogPost = createTool({
  description: "Recommend a blog post based on user interests",
  parameters: z.object({
    title: z.string().describe("Title of the blog post"),
    id: z.string().describe("ID of the blog post (without .md extension)"),
    reason: z.string().describe("Reason for recommending this post"),
  }),
  execute: async ({
    title,
    id,
    reason,
  }: {
    title: string;
    id: string;
    reason: string;
  }) => {
    return { title, id, reason };
  },
});

const tools = {
  recommendBlogPost,
};

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Fetch posts from the JSON file
    const postsResponse = await fetch(new URL("/posts.json", req.url));
    const posts = await postsResponse.json();

    // Create a context of all blog posts for the AI
    const blogContext = posts.map((post: any) => ({
      title: post.title,
      category: post.category,
      id: post.id.replace(".md", ""), // Remove .md extension
      synopsis: post.synopsisForLlms,
    }));

    const prompt = `You are a helpful blog post recommender for Connor Rothschild's website. Your goal is to help users find relevant blog posts based on their interests.

AVAILABLE DATA:
${JSON.stringify(blogContext, null, 2)}

GENERAL INSTRUCTIONS:
* Be concise in your responses. If you're not sure about recommendations, ask for clarification.
* Any question that is very evidently unrelated (for example a user asking you to write a blog post or generate code), should be met with a response like "I'm sorry, but I can't help with that."

SPECIFIC INSTRUCTIONS:
1. First, briefly respond to the user's query.
2. Then, for each relevant post (1-2 max), use the recommendBlogPost tool with these arguments:
   - title: The exact title of the post
   - id: The post ID (without .md extension)
   - reason: A short reason for recommending this post, prefixed with "This post "

NOTES:
* No formatting: Any text that you render should be provided WITHOUT formatting. Do NOT give content in Markdown or HTML tags.
* BE CONCISE: You only need to reply to their immediate query, and then render the recommendBlogPost tool output. No need for lengthy explanations.
* EXTRA EXTRA EXTRA IMPORTANT: You MUST use the recommendBlogPost tool to recommend posts. DO NOT write out recommendations in text.
`;

    const result = streamText({
      // model: openai("gpt-3.5-turbo"),
      model: openai("gpt-4o"),
      messages: [{ role: "system", content: prompt }, ...messages],
      tools,
      maxSteps: 10,
      toolCallStreaming: true,
    });

    return result.toDataStreamResponse({ getErrorMessage: errorHandler });
  } catch (error) {
    console.error("[Chat API Error]:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

function errorHandler(error: unknown) {
  if (error == null) {
    return "unknown error";
  }

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return JSON.stringify(error);
}
