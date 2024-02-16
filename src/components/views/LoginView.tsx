'use client'

import { signIn } from "next-auth/react";

export default function LoginView() {
    return (
        <div className="flex items-center justify-center flex-col">
            <div className={"flex items-center justify-center flex-col"}>
                <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
                    No 1 Task Management
                </div>
                <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
                    Trello helps team move
                </h1>
                <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
                    work forward
                </div>
            </div>
            <div className={"text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto"}>
                Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique - accomplish it all with Taskify.
            </div>
            <div className="w-full p-8 text-center">
                <button
                    onClick={() => signIn('google')}
                    type="button"
                    className="btn"
                >
                    Get Trello for free
                </button>
            </div>
        </div>
    )
}