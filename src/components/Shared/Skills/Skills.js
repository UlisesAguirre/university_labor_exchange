import {useState } from 'react'
import useGetRequest from '../../../custom/useGetRequest';
import './skills.css';
import Spinner from '../Spinner/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

const Skills = ({ form, setForm, setSkillsError }) => {

    const { getData, loading, error } = useGetRequest('https://localhost:7049/api/Skill/GetSkillsForForm');

    const skillsList = getData;

    useEffect(() => {
        setSkillsError(error)
    })

    const [messageError, setMessageError] = useState('');

    const [jobPositionSkill, setSkills] = useState(
        {
            idSkill: '',
            skillLevel: '',
        }
    )

    const changeHandler = (e) => {
        const { value, name } = e.target;
        setSkills({ ...jobPositionSkill, [name]: value })
    };

    const addSkill = (e) => {
        e.preventDefault();
        if (jobPositionSkill.idSkill && jobPositionSkill.skillLevel) {
            jobPositionSkill.idSkill = parseInt(jobPositionSkill.idSkill);
            if (form.jobPositionSkill.filter((s) => s.idSkill === jobPositionSkill.idSkill).length !== 0) {
                setMessageError('La habilidad seleccionada ya existe en su lista! Debe eliminarla y volver a cargarla si desea actualizarla')
            } else {
                setForm({ ...form, jobPositionSkill: [...form.jobPositionSkill, { idSkill: jobPositionSkill.idSkill, skillLevel: jobPositionSkill.skillLevel }] });
                setMessageError('')
            }

        }else{
            setMessageError("Debe completar ambos campos para agregar la habilidad");
        }
    }

    function getSkillNameById(idSkill) {
        const skill = skillsList.find((item) => item.idSkill === idSkill);
        return skill ? skill.skillName : null;
    }

    const deleteSkill = (idSkill, e) => {
        e.preventDefault()
        setForm({ ...form, jobPositionSkill: form.jobPositionSkill.filter(s => s.idSkill !== idSkill) });
    }


    return (

        <>
            {(loading) && <Spinner />}
            <div className='skills-form'>
                <div className="skills-form-column">
                    <label className='skills-form-label'>Habilidad</label>
                    <select name="idSkill" onChange={changeHandler} value={jobPositionSkill.idSkill}>
                        <option value={''} >Seleccione Habilidad</option>
                        {skillsList.map((s) => <option key={s.idSkill} value={s.idSkill}>{s.skillName}</option>)}
                    </select>

                    <label className='skills-form-label'>Nivel de habilidad</label>
                    <select name="skillLevel" onChange={changeHandler} value={jobPositionSkill.skillLevel}>
                        <option value='' >Seleccione Nivel de Habilidad</option>
                        <option value={"Bajo"}>Bajo</option>
                        <option value={"Intermedio"}>Intermedio</option>
                        <option value={"Alto"}>Alto</option>
                    </select>

                    <button className='skills-form-button button' onClick={addSkill}>Agregar Habilidad</button>
                    {messageError && <div className="form-user-error-message">{messageError}</div>}
                </div>

                <div className="skills-form-column">
                    {form.jobPositionSkill &&
                        <table>
                            <caption>Habilidades</caption>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Nivel</th>
                                </tr>
                            </thead>
                            <tbody>
                                {form.jobPositionSkill.map((ns, index) => (
                                    <tr key={index}>
                                        <td>{getSkillNameById(ns.idSkill)}</td>
                                        <td>{ns.skillLevel}</td>
                                        <td><button className="skills-form-button button" onClick={(e) => deleteSkill(ns.idSkill, e)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button></td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table >
                    }
                </div>
            </div>

        </>
    )
}

export default Skills
