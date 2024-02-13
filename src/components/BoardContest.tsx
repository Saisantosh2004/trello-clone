import { createContext, useState ,Dispatch} from "react";

export type openCardId = string |null;

export type BoardContextProps = {
    openCard?:openCardId
    setOpenCard? : Dispatch<React.SetStateAction<openCardId>>;
}


export const BoardContext = createContext<BoardContextProps>({});

export function  BoardContextProvider({children}:{children:React.ReactNode}){

    const [openCard,setOpenCard] = useState<openCardId>(null);

    return (
        <BoardContext.Provider value={{openCard,setOpenCard}}>
            {children}
        </BoardContext.Provider>
    )
}