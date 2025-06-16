



import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();



export async function GET(request:Request){


    try{

    const {searchParams}=new URL(request.url);
    const id=searchParams.get("userId");
    console.log(id);

      const user=await prisma.user.findUnique({
        where:{
            id:id||""
        }
    })
    const client=await prisma.client.findUnique({
        where:{
            id:user?.clientId||""
        }
    })
        console.log(client);

    return NextResponse.json({client}, {status:200});
}
catch(error){
    return NextResponse.json({error:"Internal server error"}, {status:500});
}
}   