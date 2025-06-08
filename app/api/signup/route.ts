import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { firstName, lastName, email, password, role } = await req.json();


    try{

    const user = await prisma.client.create({
        data: {
            firstName,
            lastName,
            email,
            password,
            role,
    
        },
    });

    if (role === 'ADMIN') {
        await prisma.admin.create({
            data: {
                clientId: user.id
            }
        });
    }
    else{
         const x=await prisma.user.create({
            data: {
                clientId: user.id
            }
        });

        await prisma.cart.create({
            data: {
                userId: x.id
            }
        });

        


    }
}
catch(error){
    console.log(error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
}



    return NextResponse.json({ message: 'User created successfully' }, { status: 200 });
}



