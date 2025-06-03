import { useEffect } from 'react'
import './App.css'
import { Cronometer } from './components/Cronometer'
import { ArrowUp } from './components/Icons'
import { WinnerModal } from './components/WinnerModal'
import { Board } from './components/Board'
import { FiltersProvider } from './context/Filters'
import { useResponsiveQuantity } from './logic/useResponsiveQuantity'
import { AnimatePresence, motion } from "motion/react"
import { useCronometer } from './logic/useCronometer'
import { useCardSpeech } from './logic/useCardSpeech'
import { useCardGame } from './hooks/useCardsGame'
import { HistoryGrid } from './components/HistoryGrid'
import { HistoryModal } from './components/HistoryModal'

function App() {
  const {
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
    setModalEnabled
  } = useCardGame()

  const {
    setPause, 
    setActive, 
    setTimeLeft, 
    setFirstTime
  } = useCronometer()

  // Reproducir el audio al cambiar la carta
  useCardSpeech(actualCard)

  const { mapQuantity } = useResponsiveQuantity()

  // Control del modal del historial
  const handleModalEnabled = () =>{
    setModalEnabled(prev => !prev)
  }

  // Reestablecer todos los valores por defecto al presionar el botón de reset
  const resetButton = () => {
    setCardsState(cards)
    setActualCard(null)
    setCardsHistory([])
    setEnterCondition(true)
    setModalEnabled(false)
    setPause(false)
    setActive(prev => !prev)
    setTimeLeft(null)
    setEnterCondition(true)
    setFirstTime(true)
  }

  //Comprobar que sea la última carta
  useEffect(() => {
    if(cardsState.length === 1){
      setEnterCondition(false)
    }
  }, [cardsState])

  // Hacer un shuffle para obtener una carta nueva aleatoria
  const shuffleCard = () => {
    if(!enterCondition) return
    if(actualCard === null){
      setActualCard(cards[Math.floor(Math.random() * cardsState.length)])
      return
    }

    // Agregar la carta actual al historial
    const newCardsHistory = [...cardsHistory]
    if(newCardsHistory.length !== cards.length-1){
      newCardsHistory.push(actualCard)
      setCardsHistory(newCardsHistory)
    }

    // Obtener un índice diferente al historial
    const newAvailable = cardsState.filter(obj => !cardsHistory.some(e => e.id === obj.id))
    if (newAvailable.length === 0) {
      const newEnterCondition = false
      setEnterCondition(newEnterCondition)
      return
    }

    const randomIndex = Math.floor(Math.random() * newAvailable.length)
    newAvailable[randomIndex].id

    

    // Elimina la carta del cardsState
    const newCardsState = [...cardsState]
    const filteredCardsState = newCardsState.filter(i => i.id !== newAvailable[randomIndex].id)
    setCardsState(filteredCardsState)

    // Establecer la nueva carta
    const newActualCard = cards[newAvailable[randomIndex].id]
    setActualCard(newActualCard)
  }

  return (
    <>
      <div className='background-animated'></div>
      <div className='container'>
        <main className='board'>
          <Board actualCard={actualCard}/>
        </main>
        <aside>
          <Cronometer shuffleCardFunction={shuffleCard} enterCondition={enterCondition} actualCard={setActualCard}></Cronometer>
        </aside>
        <footer>
          <HistoryGrid cardsHistory={cardsHistory} mapQuantity={mapQuantity} handleModalEnabled={handleModalEnabled}/>
        </footer>
        <FiltersProvider>
          <HistoryModal modalEnabled={modalEnabled} cardsHistory={cardsHistory} handleModalEnabled={handleModalEnabled}/>
        </FiltersProvider>
      </div>
    </>
  )
}

export default App
