import { faCancel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CancelButton({ onClick }:{onClick:()=>void}) {
    return (
        <button 
            className="bg-yellow-500 text-black p-2 rounded-md flex gap-2 items-center w-full justify-center mt-2"
            onClick={onClick}
        >
            <FontAwesomeIcon icon={faCancel} />
            Cancel Edit
        </button>
    )
}