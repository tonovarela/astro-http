import type { APIRoute } from "astro";
import { response } from "./response";
import prisma from "@db";



export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {

    var clientId = params.clientId;
    const client = await prisma.client.findUnique({ where: { id: clientId } });
    if (!client) {
        return response({ message: "Client not found" }, 404);
    }
    return response({ client }, 200);
}

export const PATCH: APIRoute = async ({ params, request }) => {
    var clientId = params.clientId;
    const { id, ...body } = await request.json();
    const client = await prisma.client.update({ where: { id: clientId }, data: body });
    if (!client) {
        return response({ message: "Client not found" }, 404);
    }
    return response({ client, message: 'Client updated' }, 200);
}
export const DELETE: APIRoute = async ({ params, request }) => {
    var clientId = params.clientId;
    const client = await prisma.client.delete({ where: { id: clientId } });
    if (!client) {
        return response({ message: "Client not found" },400);
    }
    return response({ message: 'Client deleted' }, 200);
}

