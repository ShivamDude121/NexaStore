import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma=new PrismaClient();

export async function GET(request:Request){
    try{
    const {searchParams}=new URL(request.url);
    const id=searchParams.get("id");
    if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    console.log(id);

    const admin = await prisma.admin.findUnique({
        where:{
            clientId:id
        }
    })


    return NextResponse.json({balance:admin?.balance});
}
catch(error){
    console.log(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}



    

}