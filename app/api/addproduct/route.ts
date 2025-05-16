import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();


export async function POST(request: Request) {

    try{
    const body=await request.json();
    const {name,description,cost,warranty,stock,images,id}=body;

    const admin = await prisma.admin.findUnique({
        where:{
            clientId:id
        }
    })

    const adminId=admin?.id;

    const product=await prisma.product.create({
        data:{
            name,
            description,
            cost,
            warranty,
            stock,
            images,
            adminId
        }
    })
    console.log(product);


    return NextResponse.json({message:'Product created successfully'},{status:200})
}
catch(error){
    console.log(error);
    return NextResponse.json({message:'Product creation failed'},{status:500})
}

}

