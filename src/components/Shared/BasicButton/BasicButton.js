
const BasicButton = ({buttonName, buttonHandler}) => {
  return (
    <button className="button" onClick={buttonHandler}>
        {buttonName}
    </button>
  )
}

export default BasicButton
