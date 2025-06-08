import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();



export async function POST(req:Request){
    try{
        const {userId,productId,quantity,price}=await req.json();
      //  console.log(userId,productId,quantity);
     // console.log(price);
     // console.log(userId);

        const user=await prisma.user.findUnique({
            where:{
                clientId:userId
            }
        });

        const cart=await prisma.cart.findUnique({
            where:{
                userId:user?.id
            }
        });
        

        



   
         await prisma.cartItem.create({
            data:{
                cartId:cart?.id||"",
                productId:productId,
                quantity:quantity,
                price:price
            }
         });  

         console.log("cart item created");

        return NextResponse.json({message:"Cart found"},{status:200});
        
        
        






    }catch(error){
        return NextResponse.json({message:"Error adding to cart"},{status:500});
    }
}