import { ActionError, defineAction } from "astro:actions";
import { db, eq, Posts } from "astro:db";
import { z } from "zod";

export const getPostLikes =  defineAction({
    accept: "json",
    input: z.string(),
    handler: async (postId,context) => {            
        
      const posts = await db.select()
          .from(Posts)
          .where(eq(Posts.id, postId));          
          
      return { likes:posts.at(0)?.likes ?? 0 };
    },
  });