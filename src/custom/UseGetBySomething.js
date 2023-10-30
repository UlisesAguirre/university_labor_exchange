import { useState, useEffect } from 'react';


function useGetBySomething(apiEndpoint, identifier) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    async function fetchData() {
      try {
        setLoading(true)

        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`
        };

        const response = await fetch(`${apiEndpoint}/${identifier}`, {
          headers,
        });

        if (!response.ok) {
          throw new Error(response.status);
        }

        const responseData = await response.json();

        setData(responseData);
        setLoading(false);

      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchData();
  }, [apiEndpoint, identifier]);

  return { data, loading, error };
}

export default useGetBySomething;
