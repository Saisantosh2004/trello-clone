import { liveblocksClient } from "@/lib/LiveBlocksClient";
import { NextRequest } from "next/server";

export async function PUT(req:NextRequest){
    const {id,update} = await req.json();
    await liveblocksClient.updateRoom(id,update);
    return Response.json('true');
}