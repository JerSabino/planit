import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faRightFromBracket,
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { Button } from "./ui/button"

import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {

  const { isManager, isAdmin } = useAuth()

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  const onNewNoteClicked = () => navigate('/dash/notes/new')
  const onNewUserClicked = () => navigate('/dash/users/new')
  const onNotesClicked = () => navigate('/dash/notes')
  const onUsersClicked = () => navigate('/dash/users')

  let dashClass = null
  if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
    dashClass = "max-w-screen-sm"
  }

  let newNoteButton = null
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <Button
        title="New Note"
        onClick={onNewNoteClicked}
      >
        <FontAwesomeIcon icon={faFileCirclePlus}/>
      </Button>
    )
  }

  let newUserButton = null 
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <Button
        title="New User"
        onClick={onNewUserClicked}
      >
        <FontAwesomeIcon icon={faUserPlus}/>
      </Button>
    )
  }

  let userButton = null
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
      userButton = (
        <Button
          title="Users"
          onClick={onUsersClicked}
        >
          <FontAwesomeIcon icon={faUserGear}/>
        </Button>
      )
    }
  }
    

  let notesButton = null
  if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
    notesButton = (
      <Button
        title="Notes"
        onClick={onNotesClicked}
      >
        <FontAwesomeIcon icon={faFilePen}/>
      </Button>
    )
  }

  const logoutButton = (
    <Button
      title="Logout"
      onClick={sendLogout}
    >
      <FontAwesomeIcon icon={faRightFromBracket}/>
    </Button>
  )

  const errClass = isError ? "errmsg" : "offscreen"

  let buttonContent 
  if (isLoading) {
    buttonContent = <p>Logging Out</p>
  } else {
    buttonContent = (
      <>
        {newNoteButton}
        {newUserButton}
        {notesButton}
        {userButton}
        {logoutButton}
      </>
    )
  }

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <header className="flex items-center justify-between sticky top-0 z-10 px-2 pb-1 bg-gray-900 w-full">
        <div className={`flex flex-nowrap justify-between items-center w-full`}>
          <Link to="/dash">
            <h1 className="text-white text-6xl flex-nowrap justify-end gap-2 align-middle">
              TaskIt
            </h1>
          </Link>
          <nav>
            {buttonContent}
          </nav>
        </div>
      </header>
    </>
 )

 return content
}

export default DashHeader