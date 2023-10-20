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
          throw new Error(`HTTP getError! Status: ${response.status}`);
        }

        const responseData = await response.json();
        setInfo(responseData);
        setGetLoading(false);
      } catch (getError) {
        setGetError(getError);
        setGetLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {info, getLoading, getError };
};

export default useGetRequest;