import { useEffect, useState, useRef } from 'react'
import './App.css'
import { cards } from './logic/constants'
import { Cronometer } from './components/Cronometer'
import { ArrowUp } from './components/Icons'
import { WinnerModal } from './components/WinnerModal'
import { Board } from './components/Board'
import { FiltersProvider } from './context/Filters'
import { useResponsiveQuantity } from './logic/useResponsiveQuantity'
import { AnimatePresence, motion } from "motion/react"


function App() {
  const [cardsState, setCardsState] = useState(cards)
  const [actualCard, setActualCard] = useState(null)
  const [cardsHistory, setCardsHistory] = useState([])
  const [enterCondition, setEnterCondition] = useState(true)
  const [modalEnabled, setModalEnabled] = useState(false)

  const mapQuantity = useResponsiveQuantity()

  // Detectar cambios en la variable de actualCard
  /* useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return // Evita ejecutar en el primer render
    }
    if (firstRenderDev.current) {
      firstRenderDev.current = false
      return // Evita ejecutar en el primer render modo Dev
    }

    // Agregar la carta actual al historial
    const newCardsHistory = [...cardsHistory]
    if(newCardsHistory.length !== cards.length-1){
      newCardsHistory.push(actualCard)
      setCardsHistory(newCardsHistory)
    }
  }, [actualCard]) */

  // Control del modal del historial
  const handleModalEnabled = () =>{
    setModalEnabled(prev => !prev)
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
          <section className='game turn'>
            <div className='history-grid'>
              {
                cardsHistory.slice(-mapQuantity).reverse()?.map((element, index) => (
                  <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, boxShadow: "10px 10px #000" }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{type: "spring", stiffness: 300, damping: 15 }} 
                  key={element.id} 
                  className='square-history'>
                    <img src={element.image} alt={element.title} />
                  </motion.div>
                ))
              }
            </div>
            {cardsHistory.length >= mapQuantity
            ? 
            <div className='cards-history'>
              <button onClick={handleModalEnabled}>
                <ArrowUp />
              </button>
            </div> : null}
          </section>
        </footer>
        <FiltersProvider>
          <AnimatePresence>
            {
              modalEnabled && (
                <WinnerModal 
                modalEnabled={modalEnabled} 
                cardsHistory={[...cardsHistory]} 
                handleModalEnabled={handleModalEnabled}
                />
              )
            }
          </AnimatePresence>
        </FiltersProvider>
      </div>
    </>
  )
}

export default App
