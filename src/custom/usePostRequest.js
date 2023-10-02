import { useState } from 'react';

const usePostRequest = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const postData = async (url, data) => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }

            setIsLoading(false);
            const responseData = await response.text();

            return responseData;
        } catch (error) {
            setIsLoading(false);
            setError(error.message || 'Hubo un problema en la solicitud POST');
        }
    };

    return { postData, isLoading, error };
};

export default usePostRequest;
