import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const NEXT_AUTH_CONFIG = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: 'email', type: 'text', placeholder: '' },
            password: { label: 'password', type: 'password', placeholder: '' },
          },
          async authorize(credentials: any) {

            const user = await prisma.client.findUnique({
                where: {
                    email: credentials.email,
                    password: credentials.password
                }
            })

            if (user) {
                return {
                    id: user.id,
                    firstname: user.firstName,
                    lastname: user.lastName,
                    role: user.role
                }
            }
  
             
            return null;
          },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ user, token }: any) => {
        if (user) {
            console.log(user);
            token.uid = user.id;
            token.role = user.role;
            token.firstname = user.firstname;
            token.lastname = user.lastname;
        }
        return token;
        },
      session: ({ session, token, user }: any) => {
          if (session.user) {
              session.user.id = token.uid
              session.user.role = token.role
              session.user.firstname = token.firstname
              session.user.lastname = token.lastname
          }
          return session
      }
    },
    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/login',
        verifyRequest: '/login',
        newUser: '/signup',
    }
  }