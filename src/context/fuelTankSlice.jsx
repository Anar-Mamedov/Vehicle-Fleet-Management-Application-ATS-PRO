import { createContext, useState } from 'react'

export const FuelTankContext = createContext()

export const FuelTankProvider = ({ children }) => {
    const [id, setId] = useState([]);

    return (
        <FuelTankContext.Provider value={{ id, setId }}>
            {children}
        </FuelTankContext.Provider>
    );
}