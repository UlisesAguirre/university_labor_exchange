import React from 'react'
import UseGetCurriculum from '../../custom/useGetCurriculum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const DownloadCurriculum = ({ userid, name, lastName, setModal }) => {
    const { fileData } = UseGetCurriculum(userid);

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
        <button className='button' onClick={handleDownloadFile}>
            <FontAwesomeIcon icon={faDownload} /> Descargar cv
        </button>
    )
}

export default DownloadCurriculum
