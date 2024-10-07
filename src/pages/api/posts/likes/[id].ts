
import type { APIRoute } from "astro";
import { db, eq, Posts } from "astro:db";



export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
    
    const postId = params.id ?? '';
    const posts = await db.select()
        .from(Posts)
        .where(eq(Posts.id, postId));
    if (posts.length === 0) {
        return new Response(JSON.stringify({ error: "Post not found" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

  
    return new Response(JSON.stringify(posts[0]),{ status: 200, headers: { 'Content-Type': 'application/json' } });
}

export const PUT: APIRoute = async ({ params, request }) => {
    const postId = params.id ?? '';
    const {likes =0} = await request.json();
    const posts = await db.select()
        .from(Posts)
        .where(eq(Posts.id, postId));
    if (posts.length === 0) {
        return new Response(JSON.stringify({ error: "Post not found" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
    await db.update(Posts).set({ likes: posts[0].likes + likes }).where(eq(Posts.id, postId));
    return new Response(JSON.stringify(posts[0],),{ status: 200, headers: { 'Content-Type': 'application/json' } });

}