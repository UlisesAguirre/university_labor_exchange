import React from 'react'
import UseGetCurriculum from '../../custom/useGetCurriculum';

const DownloadCurriculum = ({ userid }) => {
    const { fileData } = UseGetCurriculum(userid);

    const handleDownloadFile = (e) => {
        e.preventDefault()
        if (fileData) {
            const url = window.URL.createObjectURL(fileData);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'curriculum.pdf');
            document.body.appendChild(link);
            link.click();
        }
    }

    return (
        <button className='button' onClick={handleDownloadFile}>Descargar cv</button>
    )
}

export default DownloadCurriculum
