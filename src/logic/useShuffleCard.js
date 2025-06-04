import { useContext } from "react";
import { CardsGameContext } from "../context/CardsGame";

export function useShuffleCard() {
    const {
        cards,
        cardsState,
        setCardsState,
        actualCard,
        setActualCard,
        cardsHistory,
        setCardsHistory,
        enterCondition,
        setEnterCondition
      } = useContext(CardsGameContext)

  // Hacer un shuffle para obtener una carta nueva aleatoria
  const shuffleCard = () => {
    if (!enterCondition) return;
    if (actualCard === null) {
      setActualCard(cards[Math.floor(Math.random() * cardsState.length)]);
      return;
    }

    // Agregar la carta actual al historial
    const newCardsHistory = [...cardsHistory];
    if (newCardsHistory.length !== cards.length - 1) {
      newCardsHistory.push(actualCard);
      setCardsHistory(newCardsHistory);
    }

    // Obtener un índice diferente al historial
    const newAvailable = cardsState.filter(
      (obj) => !cardsHistory.some((e) => e.id === obj.id)
    );
    if (newAvailable.length === 0) {
      const newEnterCondition = false;
      setEnterCondition(newEnterCondition);
      return;
    }

    const randomIndex = Math.floor(Math.random() * newAvailable.length);
    newAvailable[randomIndex].id;

    // Elimina la carta del cardsState
    const newCardsState = [...cardsState];
    const filteredCardsState = newCardsState.filter(
      (i) => i.id !== newAvailable[randomIndex].id
    );
    setCardsState(filteredCardsState);

    // Establecer la nueva carta
    const selectedCard = newAvailable[randomIndex]
    //const newActualCard = cards[newAvailable[randomIndex].id];
    console.log(selectedCard)
    setActualCard(selectedCard);
  };

  return shuffleCard
}
