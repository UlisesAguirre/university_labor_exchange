import React, { useEffect } from 'react'
import UseGetCurriculum from '../../custom/useGetCurriculum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../Shared/Spinner/Spinner';

const DownloadCurriculum = ({ userid, name, lastName, setModal, setCurriculumError }) => {

    const { fileData, loading, error } = UseGetCurriculum(userid);

    useEffect(() => {
        setCurriculumError(error !== 'Aún no tiene un curriculum' ? error : null)
    })

    const handleDownloadFile = (e) => {
        e.preventDefault()

        setModal({
            modalOpen: true,
            modalTitle: "Descargando CV...",
            modalMessage: "Aguarde unos segundos.",
        });

        if (fileData) {
            const url = window.URL.createObjectURL(fileData);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${name}${lastName}.pdf`);
            document.body.appendChild(link);
            link.click();
        }
    }

    return (
        <>
            {loading && <Spinner />}
            {error === 'Aún no tiene un curriculum' ?
                <button className='button' onClick={handleDownloadFile} disabled>
                    {error}
                </button>
                :
                error === null ?
                    <button className='button' onClick={handleDownloadFile}>
                        <FontAwesomeIcon icon={faDownload} /> Descargar cv
                    </button>
                    :
                    <></>

            }

        </>
    )
}

export default DownloadCurriculum
