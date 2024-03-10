import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const DashFooter = () => {

  const { username, status } = useAuth()

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
    <footer className="flex flex-nowrap gap-2 bg-slate-900 text-white sticky bottom-0 z-10 p-2 justify-between items-center">
      <div>
        <p>Current user: {username}</p>
        <p>Status: {status}</p>
      </div>
      <div>
        {goHomeButton}
      </div>
    </footer>
  )
  
  return content
}

export default DashFooter