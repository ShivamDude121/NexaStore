import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma=new PrismaClient();



export async function GET(req:Request){

    try{
    const {searchParams}=new URL(req.url);
    const addressId=searchParams.get('addressId')||"";
    const address=await prisma.address.findUnique({
        where:{
            id:addressId||""
        }
    })
   // console.log(address);
    return NextResponse.json({address}, {status:200});
}
catch(error){                   
    return NextResponse.json({error:"Internal server error"}, {status:500});
}
}