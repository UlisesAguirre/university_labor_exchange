import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react'
import { ThemeContext } from '../../Context/ThemeContext/ThemeContext';
import './error.css'

const Error = ({ error }) => {

    const { theme } = useContext(ThemeContext);

    let message;

    switch (error) {
        case '400':
            message = 'Solicitud incorrecta';
            break;
        case '401':
            message = 'No autorizado'
            break;
        case '404':
            message = 'No encontrado'
            break;
        case '403':
            message = 'Acceso prohibido'
            break;
        case '500':
            message = 'Interno del servidor'
            break;
        case 'Failed to fetch':
            message = 'Al recuperar datos'
            break;
        default:
            message = 'No especificado'
            break;
    }


    return (
        <div className={`error-container ${theme}`}>
            <FontAwesomeIcon icon={faTriangleExclamation} beat size="2xl" />
            <div className='error-description'>Error {error === 'Failed to fetch' ? '' : error} - {message}</div>
        </div>
    )
}

export default Error
