import { useState, useEffect } from 'react';


function useGetBySomething(apiEndpoint, identifier) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    async function fetchData() {
      try {
        setLoading(true)
        const response = await fetch(`${apiEndpoint}/${identifier}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        setData(responseData);
        setLoading(false);

      } catch (error) {

        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, [apiEndpoint, identifier]);

  return { data, loading, error };
}

export default useGetBySomething;
