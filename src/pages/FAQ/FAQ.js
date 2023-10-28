
import FaqContainer from '../../components/Shared/FaqContainer/FaqContainer'
import './faq.css'

const FAQ = () => {

    return (
        <div className='faq-container'>
            <h2>Preguntas Frecuentes</h2>

            <FaqContainer
                title={'¿Cómo creo una cuenta de Alumno?'}
                description={
                    <p>
                        Para iniciar la creación de tu cuenta, ve a la sección 'Registrarse' y elige la opción 'Alumno'. Una vez que completes este paso, tu cuenta requerirá validación. Después de que se haya validado, podrás proceder a proporcionar tu información. Con este paso finalizado, tendrás acceso a todas las oportunidades laborales disponibles.
                    </p>
                }
            />

            <FaqContainer
                title={"¿Cómo creo una cuenta de Empresa?"}
                description={
                    <p>
                        Para iniciar la creación de tu cuenta de empresa, dirígete a la sección 'Registrarse' y selecciona la opción 'Empresa'. Una vez completado este paso, tu cuenta requerirá validación. Después de su validación, podrás ingresar la información correspondiente. Al finalizar este proceso, tendrás acceso para publicar ofertas laborales y gestionar las postulaciones recibidas.
                        No olvides firmar el Convenio Macro con la Universidad para la publicación de pasantías. Para más detalles, visita la sección '¿Cómo firmo un Convenio Macro con la Universidad?'
                    </p>
                }
            />

            <FaqContainer
                title={"¿Cuáles son los requisitos necesarios para publicar trabajo en relación de dependencia o pasantias?"}
                description={
                    <p>
                        Para publicar búsquedas laborales en la Bolsa de Trabajo se deberá cumplir con lo siguiente:
                        <br />
                        La empresa debe estar inscripta en el <strong>Registro público de comercio</strong> y tener <strong>personería jurídica</strong>.
                        <br />
                        Las empresas <strong>unipersonales</strong> no pueden firmar <strong>convenio</strong> de pasantía.
                        <br />
                        <h4>Trabajo en relación de dependencia:</h4>
                        Completar el formulario 'Editar perfil'.
                        <br />
                        Actualmente no tiene costo para la Empresa.
                        <br />
                        Los trabajos se publicarán inmediatamente.
                        <br />
                        <h4>Pasantias</h4>
                        Para contratar Pasantes, es necesario la firma de un Convenio Marco entre la Empresa y la Universidad.
                        <br />
                        Para la firma del Convenio, la empresa deberá presentar documentación de acuerdo a su tipo:
                        <br /><br />
                        <strong>Para Sociedades Inscriptas:</strong>
                        <br />
                        <ol>
                            <li>Copia del Contrato Social.</li>
                            <li>El firmante en representación de la Empresa se encuentre autorizado a obligar a la sociedad.</li>
                            <li>En el caso que el poder general se otorgue a un tercero (Ej. Jefe de RRHH) deberá acompañar copia certificada del mismo, firmado ante el juez o Banco.</li>
                            <li>Constancia de inscripción a la AFIP</li>
                        </ol>
                        <br />
                        <strong>Para Sociedades de Hecho:</strong>
                        <ol>
                            <li>Acreditar su situación frente al AFIP</li>
                            <li>Si quien firma no es el socio sino un mandatario deberá acreditar su poder como en el inciso 3 del caso anterior.</li>
                        </ol>
                        <br />
                        <strong>Para Instituciones Nacionales /Provinciales/ Municipales</strong>
                        <ol>
                            <li>En caso de que el firmante en representación de la institución sea el director, adjuntar copia del decreto donde surge el poder.</li>
                            <li>En el caso que el poder general se otorgue a un tercero (Ej. Abogado) deberá acompañar copia certificada del mismo.</li>
                        </ol>
                        <br />
                        <strong>Documentación por cada pasante:</strong>
                        <br />
                        <ul>
                            <li>La empresa debe enviar copia del Convenio colectivo de Trabajo. En caso de no poseerlo, la norma que los rige en cuanto a Salario, ya que el premio estímulo del pasante se basa en el Convenio Colectivo o el Salario Mínimo Vital y Móvil. Hacer nota aclarando cual es el monto.</li>
                            <li>Conforme la Resolución 1225/2009 de la Superintendencia de Servicios de Salud se resuelve que las empresas deberán incluir a los pasantes en la misma obra social que tienen sus empleados. En consecuencia debe presentar el Formulario 931 de la AFIP acreditando la inclusión del pasante a la obra social.</li>
                            <li>Copia del alta de la ART.</li>
                            <li>Copia de la Cobertura Médico Asistencial.</li>
                            <li>Datos del Tutor para poder contactarlo.</li>
                            <li>El pasante debe presentar Certificado de alumno regular, copia del DNI y completar la notificación de pasantía.</li>
                            <li>Copia del formulario 931 de AFIP a fin de comprobar cantidad de empleados en relación de dependencia.</li>
                        </ul>
                        <br />
                        <strong>Procedimiento:</strong>
                        <br />
                        <ol>
                            <li>Una vez aprobado y firmado el convenio, se procede a la publicación del Perfil de Búsqueda (Se visualizará el estado de la pasantía como 'Habilitado').</li>
                            <li>Los estudiantes se postulan a través de la Bolsa de Trabajo.</li>
                            <li>La empresa podrá visualizar a través de la Bolsa de Trabajo la información de los alumnos postulados.</li>
                            <li>Una vez seleccionados, la empresa informa a la facultad los nombres de los alumnos para volver a verificar la condición de alumno regular de los mismos.</li>
                            <li>Se procede a firmar un Acuerdo Individual por cada pasante (Empresa, Pasante y Universidad).</li>
                            <li>Tanto el Acuerdo como el Convenio son por cuadruplicado, doble faz y deben ser firmados por la empresa (en el caso del Convenio) y por la empresa, el tutor y el pasante (en el caso del Acuerdo), para ser firmado por las autoridades de la Universidad.</li>
                            <li>La empresa debe abonarle a la Universidad un monto equivalente al 5% de la asignación estimulo que reciba el pasante.</li>
                        </ol>
                        <br />
                        <strong>Normativa vigente:</strong> Ley de Pasantías
                        <br /><br />
                        La Secretaría de Asuntos Universitarios se guarda el derecho de solicitar mayor documentación en caso que así lo considere necesario.
                    </p>
                }
            />

            <FaqContainer
                title={"¿Cuáles son los requisitos académicos necesarios para postularse a una pasantía o trabajo en relación de dependencia?"}
                description={
                    <p>
                        <h4>Trabajo en relación de dependencia</h4>
                        Para este tipo de búsqueda, la condición de alumno regular no es excluyente, a menos que sea parte de los requerimientos de la Empresa. Por supuesto que sí deberá cumplir con el requisito de ser alumno de la facultad.

                        <h4>Pasantías</h4>
                        Para este tipo de búsqueda, es <strong>requisito</strong> (Ley Nacional Nº26427/2008) ser <strong>alumno regular</strong>.
                        Es decir haber aprobado 2 materias en el ciclo lectivo anterior, o 2 materias en el ciclo lectivo actual.

                        Aquellos que no cumplan con este requisito no serán tenidas en cuenta su Postulaciones en este tipo de búsquedas.

                    </p>
                }
            />
            <FaqContainer
                title={"¿Es posible incluir una nueva habilidad?"}
                description={
                    <p>
                        Para solicitar la incorporación de una nueva habilidad, envía un correo electrónico a facultad@gmail.com indicando el nombre de la habilidad y una breve descripción de la misma. Asegúrate de incluir "Solicitud nueva habilidad" en el asunto del correo.
                    </p>
                }
            />

        </div >
    )
}

export default FAQ 
