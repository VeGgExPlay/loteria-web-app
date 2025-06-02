import { useContext } from "react";
import { CronometerContext } from "../context/Cronometer";

export function useCronometer(){
    const {timeLeft, setTimeLeft, active, setActive, firstTime, setFirstTime, pause, setPause} = useContext(CronometerContext)

    return {timeLeft, setTimeLeft, active, setActive, firstTime, setFirstTime, pause, setPause}
}