"use client";

import { Column, useMutation, useStorage } from "@/app/liveblocks.config";
import { default as BoardColumn } from "@/components/Column";
import NewColumnForm from "./forms/NewColumnForm";
import { ReactSortable } from "react-sortablejs";
import { LiveList, LiveObject, shallow } from "@liveblocks/client";

export default function Columns() {
    
    const columns = useStorage(
        (root) => root.columns.map((c) => ({ ...c })),
        shallow
    );

    const updateColumns = useMutation(
        ({ storage }, columns: LiveObject<Column>[]) => {
            storage.set("columns", new LiveList(columns));
        },
        []
    );

    function setColumnsOrder(sortedColumns: Column[]) {
        const newColumns: LiveObject<Column>[] = [];
        sortedColumns.forEach((sortedColumn, newIndex) => {
            const newSortedColumn = { ...sortedColumn };
            newSortedColumn.index = newIndex;
            newColumns.push(new LiveObject(newSortedColumn));
        });
        updateColumns(newColumns);
    }

    if (!columns) {
        return;
    }

    return (
        <div className="grid grid-rows-2 gap-2">
            <ReactSortable
                className="flex flex-wrap gap-2"
                list={columns}
                ghostClass="opacity-40"
                setList={setColumnsOrder}
                group={"board-column"}
            >
                {columns?.length > 0 &&
                    columns.map((column) => <BoardColumn key={column.id} {...column} /> )}
            </ReactSortable>
            <NewColumnForm />
        </div>
    );
}
