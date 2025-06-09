import SignInView from "@/modules/auth/views/SignInView";
import { Card } from "@/components/ui/card";
import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function Page() {
   const session = await auth.api.getSession({
      headers: await headers(),
    });
  
    if (!!session) {
      redirect("/");
    }
  return <SignInView />;
}

export default Page;
