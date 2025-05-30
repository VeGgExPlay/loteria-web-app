import { useEffect, useState } from 'react'
import './App.css'
import { cards } from './logic/constants'
import { Cronometer } from './components/Cronometer'
import { ArrowUp } from './components/Icons'
import { WinnerModal } from './components/WinnerModal'
import { Board } from './components/Board'
import { FiltersProvider } from './context/Filters'


function App() {
  const [cardsState, setCardsState] = useState(cards)
  const [actualCard, setActualCard] = useState(null)
  const [cardsHistory, setCardsHistory] = useState([])
  const [enterCondition, setEnterCondition] = useState(true)
  const [modalEnabled, setModalEnabled] = useState(false)

  const cantidad = 10 // Cantidad de resultados visibles del historial

  // Control del modal del historial

  const handleModalEnabled = () =>{
    setModalEnabled(prev => !prev)
  }

  useEffect(() => {
    if(cardsState.length === 1){
      setEnterCondition(false)
    }
  }, [cardsState])

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
    const newAvailable = cardsState.filter(obj => !newCardsHistory.some(e => e.id === obj.id))
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
          <section className='game turn'>
            <div className='history-grid'>
              {
                cardsHistory.slice(-cantidad).reverse()?.map((element, index) => (
                  <div key={index} className='square-history'>
                    <img src={element.image} alt={element.title} />
                  </div>
                ))
              }
            </div>
            {cardsHistory.length >= 10 
            ? 
            <div className='cards-history'>
              <button onClick={handleModalEnabled}>
                <ArrowUp />
              </button>
            </div> : null}
          </section>
        </footer>
        <FiltersProvider>
          <WinnerModal modalEnabled={modalEnabled} cardsHistory={[...cardsHistory]} handleModalEnabled={handleModalEnabled}/>
        </FiltersProvider>
      </div>
    </>
  )
}

export default App
