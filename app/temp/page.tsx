"use client"

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const session = useSession();
  const router = useRouter();


  //@ts-ignore
  if(session.data?.user?.role === "ADMIN"){
    router.push("/admindashboard");//@ts-ignore
  } else if (session.data?.user?.role === "USER") {
    router.push("/dashboard");
  }
  else {
    router.push("/login");
  }

  
  return (
    <div>

       redirecting...
          </div>
  );
}
