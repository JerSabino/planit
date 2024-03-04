import { useState, useEffect } from 'react'
import { useAddNewUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { ROLES } from '../../config/roles'

// Form Imports
import { Button } from "../../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select } from "../../components/ui/select"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {
  
  const [addNewUser, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState(["Employee"])

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])
  
  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    if (isSuccess) {
      setUsername('')
      setPassword('')
      setRoles([])
      navigate('/dash/users')
    }
  }, [isSuccess, navigate])

  const onUsernameChanged = e => setUsername(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)

  const onRolesChanged = e => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    )
    setRoles(values)
  }

  const canSave = [roles.length, validUsername, validPassword].every(Boolean)

  const onSaveUserClicked = async(e) => {
    e.preventDefault() 
    if (canSave) {
      await addNewUser({ username, password, roles })
    }
  }

  const options = Object.values(ROLES).map(role => {
    return (
      <option 
        key={role}
        value={role}
      >
        {role}
      </option>
    )
  })

  const errClass = isError ? "errmsg" : "offscreen"
  const validUserClass = !validUsername ? 'form__input--incomplete' : ''
  const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
  const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

  const content = (
    <>
      <p>{error?.data?.message}</p>

      <Form onSubmit={e => e.preventDefault()}>
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-white">New User</h2>
            <div>
              <Button
                title="Save"
                disabled={!canSave}
                onClick={onSaveUserClicked}
              >
                <FontAwesomeIcon icon={faSave} />
              </Button>
            </div>
          </div>

          {/* Username */}
          <div className="flex flex-col gap-2">
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

          {/* Password */}
          <div className="flex flex-col gap-2">
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

          {/* Roles */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="roles" className="text-white"> 
              ASSIGNED ROLES:
            </Label>
            <select 
              id="roles"
              name="roles"
              multiple={true}
              className="border border-gray-300 rounded-md p-1 w-max"
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

export default NewUserForm