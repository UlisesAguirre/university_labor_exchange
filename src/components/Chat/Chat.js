import React from 'react'
import { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const Chat = () => {

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

    const steps = [
        {
            id: '1',
            message: 'Hola! Estoy aquí para ayudarte. ¿En qué área necesitas información? Puedes elegir una de las siguientes opciones:',
            trigger: '2',
        },
        {
            id: '2',
            options: [
                { value: 1, label: 'Agregar nuevas habilidades', trigger: '3' },
                { value: 2, label: 'Ofertas laborales', trigger: '4' },
                { value: 3, label: 'Pasantías', trigger: '5' },
                { value: 4, label: 'Otros', trigger: '6' },
            ],
        },
        {
            id: '3',
            message: 'Nuevas Habilidades',
            trigger: '7',
        },
        {
            id: '4',
            message: 'Actualización de carreras',
            trigger: '7',
        },
        {
            id: '5',
            message: 'Pasantías',
            trigger: '7',
        },
        {
            id: '6',
            message: 'Para más información contactese por email a facultad@gmail.com',
            trigger: '7',
        },
        {
            id: '7',
            message: 'Tiene otra consulta?',
            trigger: '8',
        },
        {
            id: '8',
            options: [
                { value: 1, label: 'Si', trigger: '9' },
                { value: 2, label: 'No', trigger: '10' }
            ]
        },
        {
            id: '9',
            message: '¿En qué área necesitas información? Puedes elegir una de las siguientes opciones:',
            trigger: '2'

        },
        {
            id:'10',
            message: 'Chau!',
            trigger: '11',
        },
        {
            id: '11',
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