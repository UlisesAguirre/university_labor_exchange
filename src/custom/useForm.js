import { useState } from "react"

const useFrom = (props) => {

    const [data, setData] = useState(props.inicialData); //valores iniciales del form
    const [errors, setErrors] = useState({});

    const changeHandler = (e) => {
        const { value, name } = e.target;
        if (value === '') {
            setData({ ...data, [name]: null });
        } else {
            setData({ ...data, [name]: value })
        }

    }

    const changeFileHandler = (e) => {

        const { files, name } = e.target

        console.log(name)

        let error = '';

        const allowedExtensions = /(.pdf)$/i;

        if (files[0]) {
            
            if (!allowedExtensions.test(files[0].name)) {
                error = 'Solo se aceptan las extenciones .pdf';
            }

            setErrors({
                ...errors,
                [name]: error,
            })

            setData({ ...data, [name]: files[0] })
        }

    }

    const blurHandler = (e) => {
        const { name } = e.target
        setErrors({
            ...errors,
            [name]: props.validateData(data, name),
        })
    };


    const moveForwardHandler = (e) => {
        e.preventDefault();

        let isValid = true;

        Object.keys(data).forEach((name) => {
            const error = props.validateData(data, name)

            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: error,
            }))

            if (error) {
                isValid = false;
            }
        });

        if (!isValid) {

            alert('Hay errores');

        } else {

            props.stepForwardHandler(data);
        }

    }

    const moveBackHandler = (e) => {
        props.stepBackHandler()
    }

    return {
        data,
        errors,
        changeHandler,
        blurHandler,
        moveForwardHandler,
        moveBackHandler,
        changeFileHandler,
    }
}

export default useFrom
