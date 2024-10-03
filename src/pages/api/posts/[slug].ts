
import type { APIRoute } from "astro";
import { getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
    const { slug } = params
    if (!slug) {
        return new Response(JSON.stringify({ message: 'Slug required' }),
            { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
    const post = await getEntry("blog", slug);
    if (!post) {
        return new Response(JSON.stringify({ message: 'Not found' }),
            { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
    return new Response(JSON.stringify(post),
        { status: 200, headers: { 'Content-Type': 'application/json' } });
}
export const POST: APIRoute = async ({ params, request }) => {
    return new Response(JSON.stringify({ message: 'Not implemented POST' }));
}
export const PATCH: APIRoute = async ({ params, request }) => {
    return new Response(JSON.stringify({ message: 'Not implemented PATCH'  }));
}
export const PUT: APIRoute = async ({ params, request }) => {
    return new Response(JSON.stringify({ message: 'Not implemented PUT' }));
}
export const DELETE: APIRoute = async ({ params, request }) => {
    return new Response(JSON.stringify({ message: 'Not implemented DELETE' }));
}
