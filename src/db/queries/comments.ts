import { cache } from 'react';

import type { Comment } from '@prisma/client';
import { db } from '@/db';

export type CommentWithAuther = Comment & {
  user: { name: string | null; image: string | null };
};

/*
 * When we wrap using `cache`, it helps us to avoid duplication api request
 * That means this is a mechanism like react-query is doing
 * This is asynchronus caching
 */
export const fetchCommentByPostId = cache(
  (postId: string): Promise<CommentWithAuther[]> => {
    return db.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
  }
);
