import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
    const persona = { name: "John Doe", age: 30 };
    return new Response(JSON.stringify(persona),
        { status: 200, headers: { 'Content-Type': 'application/json' } });
}