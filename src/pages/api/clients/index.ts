import type { APIRoute } from "astro";
import { response } from "./response";
import prisma from "@db";
import {v4 as UUID } from  'uuid';

export const prerender = false;


export const GET: APIRoute = async ({ params, request }) => {    

    const clients = await prisma.client.findMany();
    return response(clients, 200);
    
}


export const POST: APIRoute = async ({ params, request }) => {
    try {        
        const { id, ...body } = await request.json();        
        const newID = UUID();
        const client =await prisma.client.create({ data:{id:newID, ...body }});
       return response(client, 200);       
    } catch (e) {              
        return response({ message:"Body not found" }, 400);
    }



}