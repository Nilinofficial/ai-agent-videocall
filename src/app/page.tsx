import { auth } from "@/lib/auth";
import HomeView from "@/modules/home/HomeView";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return <HomeView />;
}

export default page;
