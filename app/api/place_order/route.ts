import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma=new PrismaClient();


export async function POST(req:Request){

    try{

    const {clientId,cartItems,selectedAddress}=await req.json();

   // console.log(clientId,cartItems,selectedAddress);

    const addressId=selectedAddress.id;

    const user=await prisma.user.findUnique({
        where:{
            clientId
        }
    })

    const userId=user?.id||"";

    await Promise.all(
        cartItems.map(async(item:any)=>{

            const productid=item.id;
            const quantity=item.quantity;
            const price=item.price;
            const totalAmount=price*quantity;


            const product=await prisma.product.findUnique({
                where:{
                    id:productid
                }
            })

            const adminId=product?.adminId||"";

            await prisma.order.create({
                data:{
                    priceAtOrder:price,
                    adminId,
                    addressId,
                    userId,
                    productId:productid,
                    quantity,
                    totalAmount
                }
            })

            



            



            return 0;
            



        })
      


    

        
        
    );
    // return NextResponse.json({message:"Order placed successfully"});

    const cart=await prisma.cart.findUnique({
        where:{
            userId
        }
    })
    
    
    const cartid=cart?.id||"";

    await prisma.cartItem.deleteMany({
        where:{
            cartId:cartid
        }
    })


    return NextResponse.json({message:"Order placed successfully"});





    } catch (error) {
        console.error('Error placing order:', error);
        return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
    }
}


