import { useState, useEffect } from 'react';

//FIXME: falta acceder al nombre del archivo que estoy recibiendo que esta en el header.

function UseGetCurriculum(userId, refetch) {
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const downloadFile = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`
        };

        const response = await fetch(`https://localhost:7049/api/Student/GetCurriculum/${userId}`,{headers});
        if (!response.ok) {
          if(response.status === 404){
            throw new Error(' Aún no tiene un curriculum');
          } else {
            throw new Error(`Error al descargar el archivo: ${response.status}`);
          }
        }

        const blob = await response.blob();

        setFileData(blob);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    downloadFile();
  }, [userId, refetch]);

  return { fileData, loading, error };
}

export default UseGetCurriculum;