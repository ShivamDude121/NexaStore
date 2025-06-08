import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma=new PrismaClient();



export async function GET(req:Request){

    try{
    const {searchParams}=new URL(req.url);
    const clientId=searchParams.get('clientId')||"";
    


    const user=await prisma.user.findUnique({
        where:{
            clientId
        }
    })

    const userId=user?.id||"";

    const cart=await prisma.cart.findUnique({
        where:{
            userId
        }
    })

    const cartItems=await prisma.cartItem.findMany({
        where:{
            cartId:cart?.id
        }
    })


    
    
    

   
    

    
    

    return NextResponse.json({cartItems},{status:200});
}
catch(error){
    return NextResponse.json({message:"Error fetching address"},{status:500});
}
}