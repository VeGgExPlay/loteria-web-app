import { cards as initialCards } from "../logic/constants";
import { createContext, useState } from "react";

export const CardsGameContext = createContext();

export function CardsGameProvider({ children }) {
  const [cards] = useState(initialCards);
  const [cardsState, setCardsState] = useState(initialCards);
  const [actualCard, setActualCard] = useState(null);
  const [cardsHistory, setCardsHistory] = useState([]);
  const [enterCondition, setEnterCondition] = useState(true);
  const [modalEnabled, setModalEnabled] = useState(false);

  return (
    <CardsGameContext.Provider
      value={{
        cards,
        cardsState,
        setCardsState,
        actualCard,
        setActualCard,
        cardsHistory,
        setCardsHistory,
        enterCondition,
        setEnterCondition,
        modalEnabled,
        setModalEnabled,
      }}
    >
      {children}
    </CardsGameContext.Provider>
  );
}
