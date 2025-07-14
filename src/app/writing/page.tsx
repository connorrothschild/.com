import { redirect } from "next/navigation";

export default function WritingPage() {
  // Redirect to the first post
  return redirect("/writing/audacity-goes-the-furthest");
}
