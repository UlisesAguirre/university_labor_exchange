import { useEffect, useState } from 'react'
import Spinner from '../../../Shared/Spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import usePutRequest from '../../../../custom/usePutRequest';
import useGetCurriculum from '../../../../custom/useGetCurriculum';

const Curriculum = ({ userId }) => {
  const [refetch, setRefetch] = useState(false)
  const { sendPutRequest, loadingPutRequest, putRequestError } = usePutRequest();
  const { fileData, loading, error } = useGetCurriculum(userId, refetch);
  const [file, setfile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [curriculumName, setCurriculumName] = useState('Ningun archivo seleccionado')

  useEffect(() => {
    if (fileData) {
      setfile(fileData);
      setCurriculumName('curriculum.pdf')
    }
  }, [fileData])

  const handleDownloadFile = (e) => {
    e.preventDefault()
    const url = window.URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', curriculumName);
    document.body.appendChild(link);
    link.click();
  }

  const changeFileHandler = async (e) => {

    const { files } = e.target

    setFileError('');

    const formData = new FormData();

    const allowedExtensions = /(.pdf)$/i;

    if (files[0]) {

      setCurriculumName(files[0].name);

      if (!allowedExtensions.test(files[0].name)) {

        setFileError('Solo se aceptan las extenciones .pdf');

      } else {

        formData.append('Id', userId);
        formData.append('Curriculum', files[0]);

        const response = await sendPutRequest("https://localhost:7049/api/Student/AddCurriculum",formData);
        
        if (response) {
          setRefetch(true);
        }
      }
    }

  }

  const deteleCurriculum = async (e) => {
    e.preventDefault()
    const response = await sendPutRequest("https://localhost:7049/api/Student/DeleteCurriculum", userId, 'application/json');
    setRefetch(false);
    setfile('')
    setCurriculumName('Ningun archivo seleccionado')
  }


  return (
    <>
      {loadingPutRequest && loading && <Spinner />}

      <label>Curriculum Vitae </label>

      <div>

        <label className='add-curriculum'>
          Seleccione un Archivo
          <input type='file' name="curriculum" onChange={changeFileHandler} />
        </label>

        <span>{curriculumName}</span>

        {file &&
          <>
            <button className='delete-button' onClick={deteleCurriculum}><FontAwesomeIcon icon={faTrash} /></button>
            <button className='delete-button' onClick={handleDownloadFile}><FontAwesomeIcon icon={faDownload} /></button>
          </>
        }

        {loading && <span> Cargando archivo...</span>}
        {error && <span>{error === ' Aún no tiene un curriculum' ? '' : error}</span>}
      </div>

      {fileError && <div className="form-user-error-message">{fileError}</div>}
      {putRequestError && <div className="form-user-error-message">{putRequestError}</div>}

      <div>


      </div>

    </>
  )
}

export default Curriculum
