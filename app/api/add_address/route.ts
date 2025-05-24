import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();


export async function POST(req:Request){

   try{
    const {clientId,street,city,state,country,postalCode,isDefault}=await req.json();


    const user=await prisma.user.findUnique({
        where:{
            clientId
        }
    })

    const userId=user?.id||"";


    const address=await prisma.address.create({ 
        data:{
            userId,
            street,
            city,
            state,
            country,
            postalCode,
            isDefault
        }
    })

    
   

    return NextResponse.json({message:"Address added successfully"},{status:200});
   }catch(error){
    return NextResponse.json({message:"Error adding address"},{status:500});
   }
}       