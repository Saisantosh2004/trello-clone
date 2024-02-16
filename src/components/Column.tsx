'use client'

import { ReactSortable } from "react-sortablejs";
import { Card, Column, useMutation, useStorage } from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/client";
import NewCardForm from "./forms/NewCardForm";
import { FormEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faCross, faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import {default as ColumnCard} from "./Card";
import CancelButton from "./CancelButton";


export default function Column({ id, name }: Column) {

    const [renameMode, setRenameMode] = useState(false);


    const columnCards = useStorage<Card[]>((root) => {
        return root.cards
            .filter((card) => card.columnId === id)
            .map((c) => ({ ...c }))
            .sort((a, b) => a.index - b.index);
    }, shallow);

    const updateCard = useMutation(({ storage }, index, updateData) => {
        const card = storage.get('cards').get(index);
        if (card) {
            for (let key in updateData) {
                card?.set(key as keyof Card, updateData[key]);
            }
        }
    }, [])

    const updateColumn = useMutation(({ storage }, id, newName) => {
        storage.get("columns").find((col) => col.toObject().id === id)?.set('name', newName);
        setRenameMode(false);

    }, []);


    const deleteColumn = useMutation(({ storage },id)=>{
        const columns = storage.get('columns')
        const columnIndex = columns.findIndex((col) => col.toObject().id === id);
        columns.delete(columnIndex)
    },[])


    //logic for sort cards within the column and in between columns
    const setTasksOrderForColumn = useMutation(({ storage }, sortedCards: Card[], newColumnId) => {
        const idsOfSortedCards = sortedCards.map((c) => c.id.toString());
        const allCards: Card[] = [...storage.get('cards').map(c => c.toObject())];
        idsOfSortedCards.forEach((sortedCardId, colIndex) => {
            const cardStorageIndex = allCards.findIndex(c => c.id.toString() === sortedCardId);
            updateCard(cardStorageIndex, {
                columnId: newColumnId,
                index: colIndex,
            })
        })
    }, [])

    async function handleNameSubmit(ev: FormEvent) {
        ev.preventDefault();
        const input = (ev.target as HTMLFormElement).querySelector('input');
        if (input) {
            const newColumnName = input.value;
            updateColumn(id, newColumnName);
            setRenameMode(false);
        }
    }



    return (
        <div className="w-48 shadow-md bg-[#6962AD] rounded-md p-2">
            {!renameMode && (
                <div className="flex justify-between">
                    <h3 className="font-bold">{name.toUpperCase()}</h3>
                    <button className="text-gray-300 flex gap-2" onClick={() => setRenameMode(true)}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </button>
                </div>
            )}
            {renameMode && (

                <div className="mb-8">
                    Edit name:
                    <form onSubmit={handleNameSubmit} className="mb-2">
                        <input type="text" defaultValue={name} />
                        <button type="submit"className="w-full mt-2" >Save</button>
                    </form>
                    
                    <button 
                        className="bg-red-500 text-white p-2 rounded-md flex gap-2 items-center w-full justify-center" 
                        onClick={()=>{deleteColumn(id)}}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                        Delete Column
                    </button>

                    <CancelButton onClick={()=>setRenameMode(false)} />

                </div>
            )}

            {!renameMode && columnCards && (
                <ReactSortable
                    list={columnCards}
                    setList={(items) => setTasksOrderForColumn(items, id)}
                    group="cards"
                    className="min-h-12"
                    ghostClass="opacity-40"
                >
                    {columnCards.map((card) => (
                        <ColumnCard key={id} id={card.id} name={card.name}/>
                    ))}
                </ReactSortable>
            )}
            {!renameMode && <NewCardForm columnId={id} />}
        </div>
    );
}
