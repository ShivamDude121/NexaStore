"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Wait until session is loaded
    //@ts-ignore  
    if (session?.user?.role === "ADMIN") {
      router.push("/admin/dashboard");
      //@ts-ignore
    } else if (session?.user?.role === "USER") {
      router.push("/user/dashboard");
    } else {
      router.push("/login");
    }
  }, [session, status, router]);

  return <div>Redirecting...</div>;
}
