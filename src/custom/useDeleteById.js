import { useState } from 'react';

function useDeleteById() {
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [errorDelete, setErrorDelete] = useState(null);

    const deleteData = async (apiEndpoint, id) => {
        try {
            setLoadingDelete(true);

            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const requestOptions = {
                method: 'DELETE',
                headers,
            };

            const response = await fetch(`${apiEndpoint}/${id}`, requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setLoadingDelete(false);
            
            const responseData = await response.text();

            return responseData;

        } catch (error) {
            setErrorDelete(error);
            setLoadingDelete(false);
        }
    };

    return { loadingDelete, errorDelete, deleteData };
}

export default useDeleteById;
