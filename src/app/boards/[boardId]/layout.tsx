'use client';
import { RoomProvider } from "@/app/liveblocks.config";
import { BoardContextProvider } from "@/components/BoardContest";
import { LiveList } from "@liveblocks/core";
import { useParams } from "next/navigation";
import React from "react";

type PageProps = {
    children: React.ReactNode,
    modal: React.ReactNode,
}

export default function BoardLayout({ children, modal }: PageProps) {
    const params = useParams();
    return (
        <BoardContextProvider>
            <RoomProvider
                id={params.boardId.toString()}
                initialPresence={{}}
                initialStorage={{
                    columns: new LiveList(),
                    cards: new LiveList(),
                }}>
                {children}
                {modal}
            </RoomProvider>
        </BoardContextProvider>
    );
}

// boardcontext provider and room provider kep here also becuase need to pass data for modal component also