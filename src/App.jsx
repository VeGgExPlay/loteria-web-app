import { useEffect, useContext } from 'react'
import './App.css'
import { Cronometer } from './components/Cronometer'
import { Board } from './components/Board'
import { FiltersProvider } from './context/Filters'
import { useResponsiveQuantity } from './logic/useResponsiveQuantity'
import { useCronometer } from './logic/useCronometer'
import { useCardSpeech } from './logic/useCardSpeech'
import { HistoryGrid } from './components/HistoryGrid'
import { HistoryModal } from './components/HistoryModal' 
import { useShuffleCard } from './logic/useShuffleCard'
import { CardsGameContext } from './context/CardsGame'

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
  } = useContext(CardsGameContext)

  const {
    setPause, 
    setActive, 
    setTimeLeft, 
    setFirstTime
  } = useCronometer()

  const shuffleCard = useShuffleCard()

  // Reproducir el audio al cambiar la carta
  useCardSpeech(actualCard)

  // Ajustar la cantidad de cartas en pantalla según el ancho
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

  const handleClick = () => {
    shuffleCard()
    console.log(actualCard)
  }

  return (
    <>
      <div className='background-animated'></div>
      <div className='container'>
        <main className='board'>
          <Board actualCard={actualCard}/>
        </main>
        <aside>
          <Cronometer shuffleCardFunction={handleClick} enterCondition={enterCondition} actualCard={setActualCard}></Cronometer>
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
