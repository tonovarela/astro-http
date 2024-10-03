
import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";
export const prerender = false;


const searchClientByID = async (id: number) => {
    return await db.select().from(Clients).where(eq(Clients.id, id));
}


export const GET: APIRoute = async ({ params, request }) => {
    const client = await  searchClientByID(+params.id!);
    
    if (client.length === 0){
        return new Response(JSON.stringify({ error: "Client not found" }),{ status: 404, headers: { 'Content-Type': 'application/json' } });
    }
    return new Response(JSON.stringify({ client }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
);
}

export const DELETE: APIRoute = async ({ params, request }) => {
    const client = await  searchClientByID(+params.id!);
    if (client.length === 0){
        return new Response(JSON.stringify({ error: "Client not found" }),{ status: 404, headers: { 'Content-Type': 'application/json' } });
    }
    const {rowsAffected} = await db.delete(Clients).where(eq(Clients.id, +params.id!));
    return new Response(JSON.stringify({ rowsAffected,clientId: +params.id! }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
);
}

export const PATCH: APIRoute = async ({ params, request }) => {
    const client = await  searchClientByID(+params.id!);
    if (!client){
        return new Response(JSON.stringify({ error: "Client not found" }),{ status: 404, headers: { 'Content-Type': 'application/json' } });
    }
    const {id,...body} = await request.json();    
    const {rowsAffected}= await db.update(Clients).set(body).where(eq(Clients.id, +params.id!));
    if (rowsAffected === 0){
        return new Response(JSON.stringify({ error: "Client not found" }),{ status: 404, headers: { 'Content-Type': 'application/json' } });
    }
    return new Response(JSON.stringify({clientUpdated:body}),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
);
}

