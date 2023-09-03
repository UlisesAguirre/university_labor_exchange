import "./homepage.css"
import { ThemeContext } from '../../components/Context/ThemeContext/ThemeContext'
import BasicCard from '../../components/Shared/BasicCard/BasicCard';

const Homepage = () => {

  const { theme } = useContext(ThemeContext);

  return (
    <div className={`homepage-container ${theme}`}>

      <BasicCard>
        <p>
          Para poder facilitar el vinculo entre estudiantes Universitarios y el sector empresarial publico y privado se creó
          el Sistema Virtual de Búsqueda de Empleo
        </p>
      </BasicCard>

      <div>
        <BasicCard>
          ¿Sos estudiante?
          Registrate completando el formulario para obtener tu cuenta verificada
          Completa la información principal de tu perfíl, subi tu CV y detalla tus habilidades
          Postulate a Ofertas y Pasantías que más te interesan y seguí el proceso de tus postulaciones
          Recordá mantener tu información actualizada desde la sección de tu perfil
          
        </BasicCard>
        
        <BasicCard>
          ¿Sos Empresa?
          Registrate complentando el formulario para obtener tu cuenta verificada
          Completa la información adicional de contacto
          Publica ofertas laborales, recibi las postulaciones y contrata
          Firma el Convenio Macro con la Universidad para la publicación de Pasantías
        </BasicCard>
        
      </div>

    </div>
  )
}

export default Homepage