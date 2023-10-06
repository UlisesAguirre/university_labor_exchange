import { useState } from "react"

const useFrom = (props) => {

    const [data, setData] = useState(props.inicialData); //valores iniciales del form
    const [errors, setErrors] = useState({});

    const changeHandler = (e) => {
        const { value, name } = e.target;
        if(name === 'idCarrer'){
            setData({...data, [name]: parseInt(value)});
        }
        setData({ ...data, [name]: value })
    };

    const blurHandler = (e) => {
        changeHandler(e);
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

            // Object.entries(data).forEach(([name, value]) => {
            //     if (name === 'idCarrer' || name === 'floor' || name === 'addressNumber' || name === 'approvedSubjects' || name === 'currentCareerYear') {
            //         setData({ ...data, [name]: parseInt(value) })
            //         console.log(name)
            //         console.log(typeof(value))
            //     }
            // })
            
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
    }
}

export default useFrom
