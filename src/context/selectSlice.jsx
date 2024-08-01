import { createContext, useState } from 'react'
import PropTypes from 'prop-types';

export const SelectContext = createContext()

export const SelectProvider = ({ children }) => {
    const [townId, setTownId] = useState(0);
    const [varisSehirId, setVarisSehirID] = useState(0);
    const [fuelTankId, setFuelTankId] = useState([]);

    const values = { townId, setTownId, setVarisSehirID, varisSehirId, setFuelTankId, fuelTankId }

    return (
        <SelectContext.Provider value={values}>
            {children}
        </SelectContext.Provider>
    );
}

SelectProvider.propTypes = {
    children: PropTypes.node,
};