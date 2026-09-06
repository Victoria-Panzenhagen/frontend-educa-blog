import Link from "next/link";

import { Card } from "@/components/ui/Card";
import type { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const description =
    post.content.length > 150
      ? `${post.content.slice(0, 150)}...`
      : post.content;

  return (
    <Card className="flex min-w-0 h-full flex-col">
      <div className="flex-1">
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {post.discipline.name}
        </span>

        <h2 className="mt-4 wrap-break-word text-xl font-bold text-foreground">
          {post.title}
        </h2>

        <p className="mt-3 wrap-break-word text-sm leading-6 text-muted">
          {description}
        </p>

        <p className="mt-5 text-sm text-muted">
          Por{" "}
          <span className="font-semibold text-foreground">{post.autor}</span>
        </p>
      </div>

      <Link
        href={`/posts/${post.id}`}
        className="mt-6 inline-flex w-fit rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark"
      >
        Ler post →
      </Link>
    </Card>
  );
}
