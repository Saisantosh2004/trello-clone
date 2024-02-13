'use client'

import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { signOut } from "next-auth/react"

export default function LogoutButton(){
    return (
        <button 
            className="bg-gray-300 px-4 py-2 ml-2 rounded inline-flex gap-2 items-center" 
            onClick={()=>{signOut()}}
        >
            Logout <FontAwesomeIcon icon={faArrowRightFromBracket}/>
        </button>
    )
}