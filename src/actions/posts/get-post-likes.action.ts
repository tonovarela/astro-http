import prisma from "@db";
import {  defineAction } from "astro:actions";
import { db, eq, Posts } from "astro:db";
import { z } from "zod";

export const getPostLikes =  defineAction({
    accept: "json",
    input: z.string(),
    handler: async (postId,context) => {                    
      const post = await prisma.post.findFirst({
        where: {
          id: postId,
        },
      }); 
      console.log(post);     
      // const posts = await db.select()
      //     .from(Posts)
      //     .where(eq(Posts.id, postId));          
          
      return { likes:post?.likes ?? 0 };
    },
  });