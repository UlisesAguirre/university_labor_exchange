import { useState } from 'react'
import Spinner from '../../../Shared/Spinner/Spinner';
import usePostRequest from '../../../../custom/usePostRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTrash, fas } from '@fortawesome/free-solid-svg-icons';
import usePutRequest from '../../../../custom/usePutRequest';
import useGetCurriculum from '../../../../custom/useGetCurriculum';

const Curriculum = ({ userId }) => {

  const { postData, isLoading, postError } = usePostRequest();
  const { sendPutRequest, loadingPutRequest, putRequestError } = usePutRequest();
  const { fileData, loading, error } = useGetCurriculum(userId);
  const [fileError, setFileError] = useState('');
  const [curriculumName, setCurriculumName] = useState('Ningun archivo seleccionado');
  const [deleteCurriculum, setDetele] = useState(true)


  const handleDownloadFile = (e) => {
    e.preventDefault()
    if (fileData) {
      const url = window.URL.createObjectURL(fileData);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', curriculumName);
      document.body.appendChild(link);
      link.click();
    }
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

        formData.append('Curriculum', files[0]);
        formData.append('Id', userId);

        const response = await postData("https://localhost:7049/api/Student/AddCurriculum", formData, {});

        setCurriculumName('curriculum.pdf')
        setDetele(true)
      }
    }

  }

  const deteleCurriculum = async (e) => {
    e.preventDefault()
    const response = await sendPutRequest("https://localhost:7049/api/Student/DeleteCurriculum", userId);
    setCurriculumName('Ningun archivo seleccionado')
    setDetele(false)
  }


  return (
    <>
      {isLoading && loadingPutRequest && loading && <Spinner />}
      <label>Curriculum Vitae </label>
      <div>
        <label className='add-curriculum'>
          Seleccione un Archivo
          <input type='file' name="curriculum" onChange={changeFileHandler} />
        </label>
        <span>{fileData ? 'curriculum.pdf' : curriculumName }</span>
        {fileData && deleteCurriculum &&
          <>
            <button className='delete-button' onClick={deteleCurriculum}><FontAwesomeIcon icon={faTrash} /></button>
            <button className='delete-button' onClick={handleDownloadFile}><FontAwesomeIcon icon={faDownload} /></button>
          </>
        }
        {loading && <span> Cargando archivo...</span>}
        {error && <span>{error === ' Aún no tiene un curriculum' ? '' : error}</span>}
      </div>

      {fileError && <div className="form-user-error-message">{fileError}</div>}
      {postError && <div className="form-user-error-message">{postError}</div>}

      <div>


      </div>

    </>
  )
}

export default Curriculum
