import React from 'react'
import { useState } from 'react';

import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom'

const Chat = () => {

    const navigate = useNavigate();

    const theme = {
        background: 'var(--light-mode)',
        fontFamily: 'Kanit',
        headerBgColor: 'var(--primary-color)',
        headerFontColor: '#fff',
        headerFontSize: '15px',
        botBubbleColor: 'var(--primary-color)',
        botFontColor: '#fff',
        userBubbleColor: 'var(--secondary-color)',
        userFontColor: '#fff',
    };

    const handleRedirect = () => {
        navigate("/FAQ");
    };

    const steps = [
        {
            id: '1',
            message: 'Hola! Estoy aquí para ayudarte. ¿En qué área necesitas información? Puedes elegir una de las siguientes opciones:',
            trigger: '2',
        },
        {
            id: '2',
            options: [
                { value: 1, label: 'Cuenta Empresa', trigger: '3' },
                { value: 2, label: 'Cuenta Alumno', trigger: '4' },
                { value: 3, label: 'Publicar ofertas laborales', trigger: '5' },
                { value: 4, label: 'Postular a ofertas laborales', trigger: '6' },
                { value: 5, label: 'Agregar nuevas habilidades', trigger: '7' },
                { value: 6, label: 'Otros', trigger: '8' },
            ],
        },
        {
            id: '3',
            message: 'Para resolver tu duda selecciona: ¿Cómo creo una cuenta de Empresa?',
            trigger: () => {
                handleRedirect();
                return '9';
            },
        },
        {
            id: '4',
            message: 'Para resolver tu duda selecciona: ¿Cómo creo una cuenta de Alumno?',
            trigger: () => {
                handleRedirect();
                return '9';
            },
        },
        {
            id: '5',
            message: 'Para resolver tu duda selecciona: ¿Cuáles son los requisitos necesarios para publicar trabajo en relación de dependencia o pasantias?',
            trigger: () => {
                handleRedirect();
                return '9';
            },
        },
        {
            id: '6',
            message:'Para resolver tu duda selecciona: ¿Cuáles son los requisitos académicos necesarios para postularse a una pasantía o trabajo en relación de dependencia?',
            trigger: () => {
                handleRedirect();
                return '9';
            },
        },
        {
            id: '7',
            message:'Para resolver tu duda selecciona: ¿Es posible incluir una nueva habilidad?',
            trigger: () => {
                handleRedirect();
                return '9';
            },
        },
        {
            id: '8',
            message: 'Para más información contactese por email a facultad@gmail.com',
            trigger: '9'
        },

        {
            id: '9',
            message: 'Tiene otra consulta?',
            trigger: '10',
        },
        {
            id: '10',
            options: [
                { value: 1, label: 'Si', trigger: '11' },
                { value: 2, label: 'No', trigger: '12' }
            ]
        },
        {
            id: '11',
            message: '¿En qué área necesitas información? Puedes elegir una de las siguientes opciones:',
            trigger: '2'

        },
        {
            id: '12',
            message: 'Chau!',
            trigger: '13',
        },
        {
            id: '13',
            message: 'Cerrando chat',
            end: true,
        }
    ]

    const [opened, setOpened] = useState(true);

    const handleEnd = () => {
        setOpened(false);
        setTimeout(() => {
            setOpened(true);
        }, 1);
    };

    return (
        <ThemeProvider theme={theme}>
            {opened &&
                <ChatBot
                    handleEnd={handleEnd}
                    steps={steps}
                    floating={true}
                    userAvatar={'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'}
                    botAvatar={'https://cdn0.iconfinder.com/data/icons/artificial-intelligence-and-machine-learning-glyph/48/AI-Icon-17-512.png'}
                />
            }
        </ThemeProvider>
    );
}

export default Chat