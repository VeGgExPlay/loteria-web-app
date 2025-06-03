import { useState, useEffect } from "react";

export function useResponsiveQuantity(defaultCantidad = 5, smallCantidad = 3, breakpoint = 500){
    const [mapQuantity, setMapQuantity] = useState(
        window.innerWidth < breakpoint ? smallCantidad : defaultCantidad
    )

    useEffect(() => {
        const handleResize = () => {
            setMapQuantity(window.innerWidth < breakpoint ? smallCantidad : defaultCantidad)
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    }, [defaultCantidad, smallCantidad, breakpoint])

    return {mapQuantity}
}