import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from "react-router-dom"

const DashFooter = () => {

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onGoHomeClicked = () => navigate('/dash')

  let goHomeButton = null
  /* Only appear in non-root pages of dash */
  if (pathname !== '/dash') {
    goHomeButton = (
      <button 
        title="Home" 
        onClick={onGoHomeClicked}
      >
        <FontAwesomeIcon icon={faHouse}/>
      </button>
    )
  }
  
  const content = (
    <footer className="flex flex-nowrap flex-col justify-start gap-2 bg-slate-900 text-white sticky bottom-0 z-10 p-2 ">
      {goHomeButton}
      <p>Current user:</p>
      <p>Status:</p>
    </footer>
  )
  
  return content
}

export default DashFooter