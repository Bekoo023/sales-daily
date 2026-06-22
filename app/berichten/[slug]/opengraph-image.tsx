import { dsCard, dsCardSize, dsCardContentType } from "@/app/_og/card";
import { getPost } from "@/lib/posts";

export const runtime = "nodejs";
export const size = dsCardSize;
export const contentType = dsCardContentType;
export const alt = "De Salesvloer — playbook";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return dsCard({ title: "De Salesvloer" });
  return dsCard({
    num: String(post.num).padStart(2, "0"),
    technique: post.technique,
    title: post.title,
    kicker: `Regel ${post.num}`,
  });
}
