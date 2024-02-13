'use client'

import { signIn } from "next-auth/react";

export default function LoginView(){
    return (
        <div className="w-full p-8 text-center">
            <button 
                onClick={()=>signIn('google')}
                type="button"
                className="btn"
            >
                    Login
            </button>
        </div>
    )
}