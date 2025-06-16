

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();



export async function PATCH(request:Request){


    try{

    const {searchParams}=new URL(request.url);
    const id=searchParams.get("orderId");
    const body=await request.json();
    const status=body.status;
    console.log(id);
    console.log(status);

      const order=await prisma.order.update({
        where:{
            id:id||""
        },
        data:{
            status:status||""
        }
    })
    console.log(order);

    return NextResponse.json({message:"Order status updated successfully"}, {status:200});
}
catch(error){
    return NextResponse.json({error:"Internal server error"}, {status:500});
}
}   