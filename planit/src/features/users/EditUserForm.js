import { useState, useEffect } from 'react'
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { ROLES } from '../../config/roles'

// Form Imports
import { Button } from "../../components/ui/button"
import { Form } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Checkbox } from "../../components/ui/checkbox"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {
  const [updateUser, {
    isLoading,
    isSuccess,
    isError,
    error 
  }] = useUpdateUserMutation()

  const [deleteUser, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delError
  }] = useDeleteUserMutation()

  const navigate = useNavigate()
  
  const [username, setUsername] = useState(user.username)
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState(user.roles)
  const [active, setActive] = useState(user.active)

  useEffect (() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect (() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername('')
      setPassword('')
      setRoles([])
      navigate('/dash/users')
    }
  }, [isSuccess, isDelSuccess, navigate])

  const onUsernameChanged = e => setUsername(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)

  const onRolesChanged = e => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    )
    setRoles(values)
  }

  const onActiveChanged = () => setActive(prev => !prev)

  const onSaveUserClicked = async (e) => {
    if (password) {
        await updateUser({ id: user.id, username, password, roles, active })
    } else {
        await updateUser({ id: user.id, username, roles, active })
    }
  }

  const onDeleteUserClicked = async () => {
      await deleteUser({ id: user.id })
  }

  const options = Object.values(ROLES).map(role => {
      return (
          <option key={role} value={role}> 
            {role}
          </option >
      )
  })

  let canSave
  if (password) {
      canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
  } else {
      canSave = [roles.length, validUsername].every(Boolean) && !isLoading
  }

  const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
  const validUserClass = !validUsername ? 'form__input--incomplete' : ''
  const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''
  const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

  const errContent = (error?.data?.message || delError?.data?.message) ?? ''

  const content = (
    <>
      <p>{errContent}</p>

      <Form onSubmit={e => e.preventDefault()}>
        <div>
          <h2 className="text-white">Edit User</h2>
          <div className="flex gap-2">
            <Button
              title="Save"
              onClick={onSaveUserClicked}
              disabled={!canSave}  
            >
              <FontAwesomeIcon icon={faSave}/>
            </Button>
            <Button
              title="Delete"
              onClick={onDeleteUserClicked}
            >
              <FontAwesomeIcon icon={faTrashCan}/>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {/* Username */}
          <div>
            <Label htmlFor="username" className="text-white">
              Username: <span>[3-20 letters]</span>
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              autoComplete="off"
              value={username}
              onChange={onUsernameChanged}
            />
          </div>
          
          <div>
            {/* Password */}
            <Label htmlFor="password" className="text-white">
              Password: <span>[4-12 chars including special chars]</span>
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={onPasswordChanged}
            />
          </div>

          {/* User Active */}
          <div className="flex gap-2">
            <Label htmlFor="user-active" className="text-white">
              ACTIVE:
            </Label>
            <Checkbox
              id="user-active"
              name="user-active"
              className="dark"
              checked={active}
              onCheckedChange={onActiveChanged}
            />
          </div>

          {/* Roles */}
          <div className="flex flex-col gap-2">  
            <Label htmlFor="roles" className="text-white">
              ASSIGNED ROLES:
            </Label>
            <select
              id="roles"
              name="roles"
              className="border border-gray-300 rounded-md p-2 w-max"
              multiple={true}
              size="3"
              value={roles}
              onChange={onRolesChanged}
            >
              {options}
            </select>
          </div>
        </div>
      </Form>
    </>
  )

  return content 
}

export default EditUserForm