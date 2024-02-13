'use client'

import { faCancel, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type Props = {
    onDelete: () => void;
}

export default function DeleteWithConfirmation({ onDelete }: Props) {

    const [wannaDelete, setWannaDelete] = useState(false);

    if (wannaDelete) {
        return (
            <div>
                <h4 className="mb-2 text-center">Are you sure?</h4>
                <div className="grid grid-cols-2 gap-2">
                    <div className="">
                        <button
                            className="btn w-full grow block with-icon justify-center"
                            onClick={() => setWannaDelete(false)}>
                            <FontAwesomeIcon icon={faCancel} />
                            Cancel
                        </button>
                    </div>
                    <div className="" onClick={onDelete}>
                        <button className="grow w-full block btn red with-icon justify-center">
                            <FontAwesomeIcon icon={faTrash} />
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <button className="bg-red-500 text-white p-2 w-full flex justify-center items-center gap-2 rounded-md mt-2" onClick={() => setWannaDelete(true)}>
            <FontAwesomeIcon icon={faTrash} />
            Delete Card
        </button>
    )
}