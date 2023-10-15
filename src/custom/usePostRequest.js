import { useState } from 'react';

const usePostRequest = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [postError, setPostError] = useState(null);

    const postData = async (url, data, header) => {
        try {
            setIsLoading(true);
            setPostError(null);

            const response = await fetch(url, {
                method: 'POST',
                headers: header,
                body: data,
            });

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }

            setIsLoading(false);
            const responseData = await response.text();

            return responseData;
        } catch (postError) {
            setIsLoading(false);
            setPostError(postError.message || 'Hubo un problema en la solicitud POST');
        }
    };

    return { postData, isLoading, postError };
};

export default usePostRequest;
