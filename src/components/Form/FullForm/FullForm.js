import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import './fullForm.css';
import { useNavigate } from 'react-router-dom';
import BasicInput from '../../Shared/BasicInput/BasicInput';
import BasicButton from '../../Shared/BasicButton/BasicButton';
import usePostRequest from '../../../custom/usePostRequest';
import Spinner from '../../Shared/Spinner/Spinner';

const FullForm = ({ title, nameButton, typeForm }) => {

    const navigate = useNavigate();

    const { postData, isLoading, error } = usePostRequest();

    const regex = {
        name: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,50}$/,
        lastName: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,50}$/,
        socialReason: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,50}$/,
        legajo: /^\d{5}$/,
        cuit: /^\d{2}-\d{8}-\d$/,
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    };

    const [passwordErrors, setPasswordErrors] = useState({
        uppercase: false,
        lowercase: false,
        number: false,
        minLength: false
    });

    const [validPassword, setValidPassword] = useState(false)

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

        const updatedValidInput = {
            ...validInput,
            [eventTarget]:
                eventTarget !== 'confirmPassword'
                    ? regex[eventTarget].test(input[eventTarget])
                    : input.confirmPassword === input.password,
        };

        // Configura todos los demás campos en null para mostrar solo un ErrorMessage
        for (const key in updatedValidInput) {
            if (key !== eventTarget) {
                if (updatedValidInput[key] === false) {
                    updatedValidInput[key] = null;
                }
            }
        }

        setValidInput(updatedValidInput);

        //Set para el manejo del mensaje de password
        setValidPassword(true);

    };

    const handlerChangeInput = (e) => {

        //Set para el manejo del mensaje de password
        setValidPassword(false);

        //La misma logica que el Blur, ya que que el handler se bugueaba con el password
        for (const key in validInput) {
            if (key !== e.target.name) {
                if (validInput[key] === false) {
                    validInput[key] = null;
                }
            }
        }

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
                    minLength: passwordValue.length < 8,
                });
            }
        } else {
            setInput({ ...input, [e.target.name]: e.target.value.toLowerCase() });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const validationInputs = Object.values(validInput).some((valid) => !valid);

        if (validationInputs) {
            alert('Complete correctamente todos los campos');
        } else {

            const { confirmPassword, ...data } = input;
            const dataUser = { ...data };

            const url = (typeForm === 'Soy alumno') ?
                "https://localhost:7049/api/Register/RegisterStudent" :
                "https://localhost:7049/api/Register/RegisterCompany";


            const response = await postData(url, dataUser);

            if (response) {
                alert('Usuario registrado correctamente');
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

            } else {
                alert("Error al crear el usuario.");
            }

        }
    };

    return (
        <div className="fullForm-container">
            {isLoading && <Spinner />}
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
                                position="right"
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
                                position="right"
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
                                position="right"
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
                                position="right"
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
                                position="right"
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
                            "Email invalido"
                        }
                        position="left"
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
                                {validPassword !== false ?
                                    <div className='bad-input'>
                                        <p> <FontAwesomeIcon icon={faTriangleExclamation} /> Contraseña invalida</p>
                                    </div>
                                    : <>
                                        <div className={passwordErrors.uppercase ? "bad-input" : "correct-input"}>
                                            <p>
                                                {passwordErrors.uppercase ?
                                                    <FontAwesomeIcon icon={faTriangleExclamation} />
                                                    : <FontAwesomeIcon icon={faCheck} />
                                                }
                                                Debe incluir una mayúscula.
                                            </p>
                                        </div>
                                        <div className={passwordErrors.lowercase ? "bad-input" : "correct-input"}>
                                            <p>
                                                {passwordErrors.lowercase ?
                                                    <FontAwesomeIcon icon={faTriangleExclamation} />
                                                    : <FontAwesomeIcon icon={faCheck} />
                                                }
                                                Debe incluir una minúscula.
                                            </p>
                                        </div>
                                        <div className={passwordErrors.number ? "bad-input" : "correct-input"}>
                                            <p>
                                                {passwordErrors.number ?
                                                    <FontAwesomeIcon icon={faTriangleExclamation} />
                                                    : <FontAwesomeIcon icon={faCheck} />
                                                }
                                                Debe contener un número.
                                            </p>
                                        </div>
                                        <div className={passwordErrors.minLength ? "bad-input" : "correct-input"}>
                                            <p>
                                                {passwordErrors.minLength ?
                                                    <FontAwesomeIcon icon={faTriangleExclamation} />
                                                    : <FontAwesomeIcon icon={faCheck} />
                                                }
                                                Minimo 8 caracteres.
                                            </p>
                                        </div>
                                    </>}

                            </>
                        }
                        position="left"
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
                        position="left"
                    />
                </div>
            </form>
            <BasicButton buttonName={nameButton} buttonHandler={submitHandler} />
        </div>
    );
};

export default FullForm;
