import { useState, useCallback } from 'react';

const useHttp = () => {
    const [errorMessage, setErrorMessage] = useState(null);

    const getRequest = useCallback(async (url, dataHandler) => {
        try {
            const response = await fetch(url);

            if (response.status !== 200 || !response.ok) {
                throw new Error('There was an error fetching location data.');
            }

            const data = await response.json();

            dataHandler(data);
            setErrorMessage(null);
        } catch(error) {
            setErrorMessage(error.message);
        }
    }, []);

    return {
        getRequest,
        errorMessage
    }
}

export default useHttp;