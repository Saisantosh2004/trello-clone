'use client'

import { redirect } from "next/navigation";
import { createBoard } from "../actions/boardAction"
import { RoomInfo } from "@liveblocks/node";

export default function NewBoardPage(){

    async function handleNewBoardSubmit(formData:FormData){
        const boardName = formData.get('name')?.toString() || '';
        const roomInfo  = await createBoard(boardName)
        if(roomInfo){
            redirect(`/boards/${roomInfo.id}`)
        }
    }


    return (
        <div>
            <form className="max-w-xs block" action={handleNewBoardSubmit}>
                <h1 className="text-2xl mb-4">Create New Board</h1>
                <input type="text" placeholder="Board Name" name="name"/>
                <button type="submit" className="mt-2 w-full">Create Board</button>
            </form>
        </div>
    )
}