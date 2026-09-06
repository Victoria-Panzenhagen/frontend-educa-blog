import Link from 'next/link';

import { postsService } from '@/services/api/post';

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PostPage({
  params,
}: PostPageProps) {
  const { id } = await params;

  const post = await postsService.findOne(Number(id));

  return (
    <main className="mx-auto max-w-4xl p-8">
      <Link
        href="/"
        className="mb-8 inline-block"
      >
        ← Voltar
      </Link>

      <article>
        <h1 className="text-4xl font-bold">
          {post.title}
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          {post.discipline.name}
        </p>

        <div className="mt-8 whitespace-pre-wrap leading-7">
          {post.content}
        </div>
      </article>
    </main>
  );
}