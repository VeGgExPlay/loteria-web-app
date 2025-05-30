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
        <section className='winner'>
            <div className='text'>
                <h2>Historial de cartas</h2>
                <input id="search" type="text" placeholder="Buscar carta..." onChange={handleChangeFilter}/>
                <div className="overflow-scroll">
                    <div className="text-container">
                        {
                            filteredCards?.map((element, index) => (
                                <div key={index} className='square-history'>
                                    <img src={element.image} alt={element.title} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="cards-history">
                    <button onClick={handleModalEnabled}><ArrowDown /></button>
                </div>
            </div>
        </section>
    )
}