export function Frame({card}){
    if(card === null){
        return(
            <div>
                <div className="square">
                    La lotería
                </div>
            </div>
        )
    } else {
        return(
            <div>
                <div className="square">
                    <img src={card.image} alt={card.title} />
                </div>
            </div>
            
        )
    }
    
}