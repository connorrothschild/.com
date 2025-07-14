import { type NextRequest, NextResponse } from "next/server";
import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    const content = {
      to: "connorrothschild@gmail.com",
      from: "connor@connorrothschild.com",
      subject: `New Contact Form Submission from ${name}`,
      text: message,
      html: `<h1>New email submission from ${name}</h1><p>${message}</p><p>Reply to: ${email}</p>`,
    };

    await sendgrid.send(content);
    return NextResponse.json(
      { message: "Message sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("ERROR", error);
    return NextResponse.json({ message: "Message not sent." }, { status: 400 });
  }
}
