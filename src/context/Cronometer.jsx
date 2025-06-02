import { createContext, useState } from "react";

export const CronometerContext = createContext()

export function CronometerProvider({children}){
    const [timeLeft, setTimeLeft] = useState(null)
    const [active, setActive] = useState(false)
    const [firstTime, setFirstTime] = useState(true)
    const [pause, setPause] = useState(false)

    return(
        <CronometerContext.Provider value={{
            timeLeft,
            setTimeLeft,
            active,
            setActive,
            firstTime,
            setFirstTime,
            pause,
            setPause
        }}>
            {children}
        </CronometerContext.Provider>
    )
}