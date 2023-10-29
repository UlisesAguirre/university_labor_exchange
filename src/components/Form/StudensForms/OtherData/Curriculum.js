import { useEffect, useState } from 'react'
import Spinner from '../../../Shared/Spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import usePutRequest from '../../../../custom/usePutRequest';
import UseGetCurriculum from '../../../../custom/useGetCurriculum';

const Curriculum = ({ userId, name, lastName, setcurriculum, errors, setErrors, setCurriculumError }) => {

  const [refetch, setRefetch] = useState(false)
  const { sendPutRequest, loadingPutRequest, putRequestError } = usePutRequest();
  const { fileData, loading, error } = UseGetCurriculum(userId, refetch);
  const [file, setfile] = useState(null);
  const [curriculumName, setCurriculumName] = useState('Ningun archivo seleccionado')

  useEffect(() => {
    setCurriculumError(error !== 'Aún no tiene un curriculum' ? error : null)
  })

  useEffect(() => {
    if (fileData) {
      setfile(fileData);
      setCurriculumName(`${name}${lastName}.pdf`)
      setcurriculum(true)
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

    const formData = new FormData();

    const allowedExtensions = /(.pdf)$/i;

    if (files[0]) {


      if (!allowedExtensions.test(files[0].name)) {

        setErrors({ ...errors, 'curriculum': 'Solo se aceptan las extenciones .pdf' });

      } else {
        setCurriculumName(files[0].name);

        formData.append('Id', userId);
        formData.append('Curriculum', files[0]);

        const response = await sendPutRequest("https://localhost:7049/api/Student/AddCurriculum", formData);

        if (response) {
          setRefetch(!refetch);
          setcurriculum(true);
          setErrors({ ...errors, 'curriculum': '' });
        }
      }
    }

  }

  const deteleCurriculum = async (e) => {
    e.preventDefault()
    const response = await sendPutRequest("https://localhost:7049/api/Student/DeleteCurriculum", userId, 'application/json');
    setRefetch(!refetch);
    setfile('')
    setCurriculumName('Ningun archivo seleccionado')
    setcurriculum(false);
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
            <button className='button delete-button' onClick={deteleCurriculum}><FontAwesomeIcon icon={faTrash} /></button>
            <button className='button delete-button' onClick={handleDownloadFile}><FontAwesomeIcon icon={faDownload} /></button>
          </>
        }

        {loading && <span> Cargando archivo...</span>}
      </div>

      {errors.curriculum && <div className="form-user-error-message">{errors?.curriculum}</div>}
      {putRequestError && <div className="form-user-error-message">{putRequestError}</div>}

    </>
  )
}

export default Curriculum
