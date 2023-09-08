import React, { useState } from 'react';
import './fullForm.css';
import { useNavigate } from 'react-router-dom';
import BasicInput from '../../Shared/BasicInput/BasicInput';

const FullForm = ({ title, nameButton, typeForm }) => {

    const navigate = useNavigate();

    const [passwordErrors, setPasswordErrors] = useState({
        uppercase: false,
        lowercase: false,
        number: false,
    });

    const regex = {
        name: /^[a-zA-Z]{3,}$/,
        lastName: /^[a-zA-Z]{3,}$/,
        socialReason: /^[a-zA-Z]{3,}$/,
        legajo: /^\d{5}$/,
        cuit: /^\d{2}-\d{8}-\d$/,
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    };

    const [input, setInput] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        ...(typeForm === 'Soy alumno'
            ? {
                name: '',
                lastName: '',
                legajo: '',
            }
            : {
                cuit: '',
                socialReason: '',
            }),
    });

    const [validInput, setValidInput] = useState({
        email: null,
        password: null,
        confirmPassword: null,
        ...(typeForm === 'Soy alumno'
            ? {
                name: '',
                lastName: '',
                legajo: '',
            }
            : {
                cuit: '',
                socialReason: '',
            }),
    });

    const handlerBlurInput = (e) => {
        const eventTarget = e.target.name;
        setValidInput({
            ...validInput,
            [eventTarget]:
                eventTarget !== 'confirmPassword'
                    ? regex[eventTarget].test(input[eventTarget])
                    : input.confirmPassword === input.password,
        });
    };

    const handlerChangeInput = (e) => {
        if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
            setInput({ ...input, [e.target.name]: e.target.value });

            // Validar la contraseña y mostrar mensajes de error específicos
            if (e.target.name === 'password') {
                const passwordValue = e.target.value;
                const isValid = regex.password.test(passwordValue);
                setValidInput({ ...validInput, [e.target.name]: isValid });

                // Actualizar los mensajes de error específicos
                setPasswordErrors({
                    uppercase: !/[A-Z]/.test(passwordValue),
                    lowercase: !/[a-z]/.test(passwordValue),
                    number: !/\d/.test(passwordValue),
                });
            }
        } else {
            setInput({ ...input, [e.target.name]: e.target.value.toLowerCase() });
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const validationInputs = Object.values(validInput).some((valid) => !valid);

        if (validationInputs) {
            alert('Complete correctamente todos los campos');
        } else {
            alert('Usuario registrado');
            console.log();
            // Agregar lógica para enviar input
            setInput({
                email: '',
                password: '',
                confirmPassword: '',
                ...(typeForm === 'Soy alumno'
                    ? {
                        name: '',
                        lastName: '',
                        legajo: '',
                    }
                    : {
                        cuit: '',
                        socialReason: '',
                    }),
            });

            navigate('/login');
        }
    };

    return (
        <div className="fullForm-container">
            <p className="title-form">{title}</p>
            <form action="" className="fullForm-box">
                <div>
                    {typeForm === 'Soy alumno' ? (
                        <>
                            <BasicInput
                                inputName={"Nombre:"}
                                name={"name"}
                                placeholder="Juan"
                                type={"text"}
                                event={handlerChangeInput}
                                onBlur={handlerBlurInput}
                                validInput={validInput}
                                errorMessage={
                                    "El nombre debe contener solo letras y un minimo de 3 caracteres"
                                }
                            />
                            <BasicInput
                                inputName={"Apellido:"}
                                name={"lastName"}
                                placeholder="Perez"
                                type={"text"}
                                event={handlerChangeInput}
                                onBlur={handlerBlurInput}
                                validInput={validInput}
                                errorMessage={
                                    "El apellido debe contener solo letras y un minimo de 3 caracteres"
                                }
                            />
                            <BasicInput
                                inputName={"Legajo:"}
                                name={"legajo"}
                                placeholder="50420"
                                type={"number"}
                                event={handlerChangeInput}
                                onBlur={handlerBlurInput}
                                validInput={validInput}
                                errorMessage={
                                    "El legajo debe estar compuesto por 5 numeros"
                                }
                            />

                        </>
                    ) : (
                        <>
                            <BasicInput
                                inputName={"CUIT:"}
                                name={"cuit"}
                                placeholder="20-12345678-9"
                                type={"text"}
                                event={handlerChangeInput}
                                onBlur={handlerBlurInput}
                                validInput={validInput}
                                errorMessage={
                                    "El cuit debe contener guiones"
                                }
                            />
                            <BasicInput
                                inputName={"Razon social:"}
                                name={"socialReason"}
                                placeholder="La casona srl"
                                type={"text"}
                                event={handlerChangeInput}
                                onBlur={handlerBlurInput}
                                validInput={validInput}
                                errorMessage={
                                    "La razon social debe contener solo letras y un minimo de 3 caracteres"
                                }
                            />
                        </>
                    )}
                </div>
                <div>
                    <BasicInput
                        inputName={"Email:"}
                        name={"email"}
                        placeholder="example@gmail.com"
                        type={"email"}
                        event={handlerChangeInput}
                        onBlur={handlerBlurInput}
                        validInput={validInput}
                        errorMessage={
                            "Email invalido: respete el formato (example@gmail.com)"
                        }
                    />
                    <BasicInput
                        inputName={"Contraseña:"}
                        name={"password"}
                        placeholder="*********"
                        type={"password"}
                        event={handlerChangeInput}
                        onBlur={handlerBlurInput}
                        validInput={validInput}
                        errorMessage={
                            <>
                                {passwordErrors.uppercase && (
                                    <div { /*AGREGAR LOGICA GREEN Y RED ALERT */}>Debe incluir una mayúscula.</div>
                                )}
                                {passwordErrors.lowercase && (
                                    <div>Debe incluir una minúscula.</div>
                                )}
                                {passwordErrors.number && (
                                    <div>Debe contener un número.</div>
                                )}
                            </>
                        }
                    />
                    <BasicInput
                        inputName={"Confirmar contraseña:"}
                        name={"confirmPassword"}
                        placeholder="*********"
                        type={"password"}
                        event={handlerChangeInput}
                        onBlur={handlerBlurInput}
                        validInput={validInput}
                        errorMessage={
                            "Las contraseñas no coiciden."
                        }
                    />
                </div>
            </form>
            <button className="button" onClick={submitHandler}>
                {nameButton}
            </button>
        </div>
    );
};

export default FullForm;
