import Boards from "@/components/Boards";
import LoginView from "@/components/views/LoginView";
import { authOptions } from "@/lib/authOptions";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {

    const session = await getServerSession(authOptions); 

    if(!session){
      return(
        <div>
          <LoginView/>
        </div>
      )
    }

    return (
      <div className="">
        <h1 className="text-4xl mb-4">Your Boards...</h1>

        <Boards/>

        <Link 
          href={'/new-board'} 
          className="btn primary inline-flex gap-2 items-center"
        >
            Create New Board <FontAwesomeIcon icon={faArrowRight} className="h-6"/>
        </Link>
      </div>
    )
}
