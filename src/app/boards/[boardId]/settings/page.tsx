'use server';

import { liveblocksClient } from "@/lib/LiveBlocksClient";
import BoardDeleteButton from "@/components/BoardDeleteButton";
import EmailsAccessList from "@/components/EmailAccessList";
import NewBoardAccess from "@/components/forms/NewBoardAccessForm";
import { getUserEmail } from "@/lib/userClient";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type PageProps = { 
    params: {
        boardId: string;
    }
}

export default async function BoardSettings({ params }: PageProps) {
    const { boardId } = params;
    const boardInfo = await liveblocksClient.getRoom(boardId);
    const userEmail = await getUserEmail();
    if (!boardInfo.usersAccesses[userEmail]) {
        console.log(boardInfo.usersAccesses)
        return 'Access denied';
    }
    return (
        <div>
            <div className="flex justify-between">
                <Link className="inline-flex gap-1 items-center btn mb-4"
                    href={`/boards/${boardId}`}>
                    <span><FontAwesomeIcon icon={faArrowLeft} /></span>
                    Go back to board
                </Link>
                <BoardDeleteButton boardId={boardId} />
            </div>

            <h1 className="text-2xl">Access to board {boardInfo.metadata.boardName}:</h1>
            <div className="mb-8">
                <EmailsAccessList boardId={boardId} usersAccesses={boardInfo.usersAccesses} />
            </div>
            <NewBoardAccess boardId={boardId} /> 
        </div>
    )
}