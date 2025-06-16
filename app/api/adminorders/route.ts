import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma=new PrismaClient();



export async function GET(req:Request){



    try{
    const {searchParams}=new URL(req.url);
    const id=searchParams.get('id')||"";

    const admin=await prisma.admin.findUnique({
        where:{
            clientId:id
        }
    })


    const order=await prisma.order.findMany({
        where:{
            adminId:admin?.id
        }
    })

    

   
    return NextResponse.json({"orders":order}, {status:200});
    
    }
    catch(error){
        return NextResponse.json({error:"Internal server error"}, {status:500});
    }
    
}
