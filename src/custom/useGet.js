import { useState, useEffect } from 'react';

const useGetRequest = (url) => {
  const [info, setInfo] = useState([]);
  const [getLoading, setGetLoading] = useState(true);
  const [getError, setGetError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const headers = {};

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(response.status);
        }

        const responseData = await response.json();
        setInfo(responseData);
        setGetLoading(false);
      
      } catch (error) {

        setGetError(error.message);
        setGetLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {info, getLoading, getError };
};

export default useGetRequest;