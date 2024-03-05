import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Link, useLocation } from'react-router-dom'
import { Button } from "./ui/button"

import { useSendLogoutMutation } from '../features/auth/authApiSlice'

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) {
      console.log('Logout Success')
      navigate('/')
    }
  }, [isSuccess, navigate])

  if (isLoading) return <p>Logging Out</p>

  if (isError) return <p>Error: {error.data?.message}</p>

  let dashClass = null
  if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
    dashClass = "max-w-screen-sm"
  }

  const logoutButton = (
    <Button
      title="Logout"
      onClick={sendLogout}
    >
      <FontAwesomeIcon icon={faRightFromBracket}/>
    </Button>
  )

  const content = (
    <header className="flex items-center justify-between sticky top-0 z-10 px-2 pb-1 bg-gray-900">
      <div className={`flex flex-nowrap justify-between items-center w-full ${dashClass}`}>
        <Link to="/dash">
          <h1 className="text-white text-6xl flex-nowrap justify-end gap-2 align-middle">
            Planit
          </h1>
        </Link>
        <nav>
          {logoutButton}
        </nav>
      </div>
    </header>
 )

 return content
}

export default DashHeader