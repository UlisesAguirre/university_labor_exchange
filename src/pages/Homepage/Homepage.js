import "./homepage.css"
import List from "../../components/Shared/List/List"
import { faBriefcase, faListCheck, faPen, faPenToSquare, faSave, faShare } from "@fortawesome/free-solid-svg-icons";

const Homepage = () => {

  const studentsSectionContent = [
    {
      icon: faPenToSquare,
      text: "Registrate completando el formulario para obtener tu cuenta verificada",
    },
    {
      icon: faListCheck,
      text: "Completa la información principal de tu perfíl, subi tu CV y detalla tus habilidades",
    },
    {
      icon: faBriefcase,
      text: "Postulate a Ofertas y Pasantías que más te interesan y seguí el proceso de tus postulaciones",
    },
    {
      icon: faSave,
      text: "Recordá mantener tu información actualizada desde la sección de tu perfil",
    }
  ]

  const companiesSectionContent = [
    {
      icon: faPenToSquare,
      text: "Registrate complentando el formulario para obtener tu cuenta verificada",
    },
    {
      icon: faListCheck,
      text: "Completa la información adicional de contacto",
    },
    {
      icon: faShare,
      text: "Publica ofertas laborales, recibi las postulaciones y contrata",
    },
    {
      icon: faPen,
      text: "Firma el Convenio Macro con la Universidad para la publicación de Pasantías",
    }
  ]

  return (

    <div >

      <div> 
        <h2 className="home-description">
          Para poder facilitar el vinculo entre estudiantes Universitarios y el sector empresarial publico y privado se creó
          el Sistema Virtual de Búsqueda de Empleo
        </h2>
      </div>


      <div className="home-users-section">

        <List title={"¿Sos estudiante?"} content={studentsSectionContent} />

        <List title={"¿Sos empresa?"} content={companiesSectionContent} />

      </div>

    </div>
  )
}

export default Homepage