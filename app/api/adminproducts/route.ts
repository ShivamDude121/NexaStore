import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();

export async function GET(request:Request){

    try{

    const {searchParams}=new URL(request.url);
    const id=searchParams.get("id");
    if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }


    const admin = await prisma.admin.findUnique({
        where:{
            clientId:id
        }
    })

    const products=await prisma.product.findMany({
        where:{
            adminId:admin?.id
        }
    })

    

    return NextResponse.json(products);
}
catch(error){
    console.log(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
}