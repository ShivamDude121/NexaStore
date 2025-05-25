import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma=new PrismaClient();




export async function GET(request: Request) {

    try{
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id')||"";

    const product = await prisma.product.findUnique({
        where: { id: id },
    });

    return NextResponse.json({product:product}, {status:200});
}
catch(error){
        console.log(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}