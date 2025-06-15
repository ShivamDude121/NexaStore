

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();



export async function GET(request:Request){


    try{

    const {searchParams}=new URL(request.url);
    const id=searchParams.get("clientId");

    ///console.log(id);

    const user=await prisma.user.findUnique({
        where:{
            clientId:id||""
        }
    })

    //console.log(user);

    const userId=user?.id;

    const orders=await prisma.order.findMany({
        where:{
            userId:userId||""
        }
    })

    //console.log(orders);

    return NextResponse.json({orders}, {status:200});
}
catch(error){
    return NextResponse.json({error:"Internal server error"}, {status:500});
}



    

    
   
}