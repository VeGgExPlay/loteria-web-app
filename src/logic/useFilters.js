import { useContext } from "react";
import { FiltersContext } from "../context/Filters";

export function useFilters(){
    const {filters, setFilters} = useContext(FiltersContext)

    const filterCards = (cards) => {
        const normalizedFilter = filters.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim(); // <- elimina espacios al inicio y final

        // Si no hay filtro, devolver todo el array
        if (!normalizedFilter) return cards;

        return cards.filter(card => {
            const normalizedTitle = card.title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")

            // Devolver todas las cards que cumplan esta función
            return normalizedTitle.includes(normalizedFilter) //|| !normalizedFilter
        })

    }

    return {filters, setFilters, filterCards}
}