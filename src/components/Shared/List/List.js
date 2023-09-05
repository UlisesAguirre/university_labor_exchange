import "./List.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const List = ({title, content}) => {
  return (
    <div className="list-container">
      <h2 className="list-title">{title}</h2>
        <ul className="list-content">
            {content.map((c) => <li><FontAwesomeIcon icon={c.icon}/> <span>{c.text}</span> </li>)}
        </ul>
    </div>
  )
}

export default List
