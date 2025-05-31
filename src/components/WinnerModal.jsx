import { motion } from "motion/react"
import { ArrowDown } from "./Icons"
import { useFilters } from "../logic/useFilters"

export function WinnerModal({ cardsHistory, modalEnabled, handleModalEnabled }) {
    const {setFilters, filterCards} = useFilters()
    
    if (!modalEnabled) return null

    // Ejecutar cada vez que se hagan cambios en el input
    const handleChangeFilter = (event) => {
        setFilters(
            {
                title: event.target.value
            }
        )
    }

    const filteredCards = filterCards(cardsHistory)

    return (
        <motion.section 
        className='winner'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        layout
        >
            <motion.div 
            className='text'
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
                <h2>Historial de cartas</h2>
                <input id="search" type="text" placeholder="Buscar carta..." onChange={handleChangeFilter}/>
                <motion.div className="overflow-scroll" layout>
                    <motion.div className="text-container" layout>
                        {
                            filteredCards?.map((element, index) => (
                                <motion.div 
                                key={index} 
                                className='square-history' 
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1, boxShadow: "10px 10px #000" }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{type: "spring", stiffness: 300, damping: 15 }}
                                >
                                    <img src={element.image} alt={element.title} />
                                </motion.div>
                            ))
                        }
                    </motion.div>
                </motion.div>
                <div className="cards-history">
                    <button onClick={handleModalEnabled}><ArrowDown /></button>
                </div>
            </motion.div>
        </motion.section>
    )
}