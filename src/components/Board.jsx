import { Frame } from "./Frame"

export function Board({actualCard}){
    return(
        <section className='center'>
            <Frame card={actualCard}/>
        </section>
    )
}