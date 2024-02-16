import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import Link from "next/link";
import { Logo } from "./Logo";
import { useOthers } from "@/app/liveblocks.config";

export default async function(){

    const session = await getServerSession(authOptions);

    return(
        <header className='bg-[#E1F0DA] p-4 px-8'>
            <div className="flex justify-around gap-3 items-center">
                    <span className='logo'><Logo/></span>
                    <div>
                        {session && (
                            <>
                                {/* <span>{session?.user?.name}</span> */}
                                <div className="flex justify-center items-center">
                                    <img className="size-8 rounded-full" src={session?.user?.image || ' '} alt="avatar" />
                                    <LogoutButton/>
                                </div>
                            </>
                        )}

                        {!session && (
                            <>
                                <LoginButton/>
                            </>
                        )}
                    </div>
            </div>
        </header>
    )
}