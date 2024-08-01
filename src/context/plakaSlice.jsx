import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const PlakaContext = createContext();

export const PlakaProvider = ({ children }) => {
    const [plaka, setPlaka] = useState([]);
    const [aracId, setAracId] = useState([]);
    const [data, setData] = useState([]);
    const [printData, setPrintData] = useState([]);
    const [history, setHistory] = useState(false);

    const values = { plaka, setPlaka, data, setData, setHistory, history, aracId, setAracId, setPrintData, printData };

    return (
        <PlakaContext.Provider value={values}>
            {children}
        </PlakaContext.Provider>
    );
};

PlakaProvider.propTypes = {
    children: PropTypes.node,
};
