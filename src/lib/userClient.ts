import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export async function getUserEmail() : Promise<string>{
    const session = await getServerSession(authOptions);
    const email = session?.user?.email || '';

    return email;
}