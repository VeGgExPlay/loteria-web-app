import { cards as initialCards } from "../logic/constants";
import { useState } from "react";

export function useCardGame() {
  const [cards, setCards] = useState(initialCards);
  const [cardsState, setCardsState] = useState(initialCards);
  const [actualCard, setActualCard] = useState(null);
  const [cardsHistory, setCardsHistory] = useState([]);
  const [enterCondition, setEnterCondition] = useState(true);
  const [modalEnabled, setModalEnabled] = useState(false);

  return {
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
  };
}
