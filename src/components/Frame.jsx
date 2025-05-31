import { motion } from "motion/react"

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
            <motion.div key={card.id} animate={{ boxShadow: "10px 10px #000" }}>
                <div className="square">
                    <img src={card.image} alt={card.title} />
                </div>
            </motion.div>
            
        )
    }
    
}