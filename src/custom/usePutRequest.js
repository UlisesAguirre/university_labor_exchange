import { useState } from 'react';

const usePutRequest = () => {
    const [ loadingPutRequest, setLoadingPutRequest] = useState(false);
    const [ putRequestError, setPutRequestError] = useState(null);

    const sendPutRequest = async (url, data, contentType) => {
        try {
            setLoadingPutRequest(true);
            setPutRequestError(null);

            const token = localStorage.getItem('token');

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': contentType,
                    'Authorization': `Bearer ${token}`,
                },
                body: data,
            });

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }

            setLoadingPutRequest(false);
            const responseData = await response;

            return responseData;
        } catch (error) {
            setLoadingPutRequest(false); 
            setPutRequestError(error.message || 'Hubo un problema en la solicitud PUT');
        }
    };

    return {sendPutRequest, loadingPutRequest, putRequestError}
};

export default usePutRequest;