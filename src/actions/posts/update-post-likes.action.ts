import { defineAction } from "astro:actions";
import { db, eq, Posts } from "astro:db";
import { z } from "zod";

export const updatePostLikes =  defineAction({
    accept: "json",
    input: z.object({
        postId: z.string(),
        likes: z.number(),
    }),
    handler: async ({postId,likes},) => {                         
    const posts = await db.select()
                            .from(Posts)
            .where(eq(Posts.id, postId));        
        await db.update(Posts).set({ likes: posts[0].likes + likes }).where(eq(Posts.id, postId));        
        return  {
            post:posts[0],
        };

    }
  });