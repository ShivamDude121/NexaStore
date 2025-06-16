

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();



export async function GET(request:Request){


    try{

    const {searchParams}=new URL(request.url);
    const id=searchParams.get("orderId");
    //console.log(id);

      const order=await prisma.order.findUnique({
        where:{
            id:id||""
        }
    })
    //console.log(order);

    return NextResponse.json({order}, {status:200});
}
catch(error){
    return NextResponse.json({error:"Internal server error"}, {status:500});
}
}   