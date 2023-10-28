import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import './faqContainer.css'

const FaqContainer = ({title, description}) => {

    const [visible, setVisible] = useState(false)

    const [icon, setIcon] = useState(faChevronDown);

    const clickHandler = () => {
        setVisible(!visible);
        setIcon(icon === faChevronDown ? faChevronUp : faChevronDown);
    }

    return (
        <div className='faqContainer-container'>
            <button className={'faqContainer-bttn button'} onClick={clickHandler}><h3>{title}</h3><FontAwesomeIcon icon={icon} /></button>
            {visible &&
                description
            }
        </div>
    )
}

export default FaqContainer
