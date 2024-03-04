import { useState, useEffect } from 'react'
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"

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
          <SelectItem
              key={role}
              value={role}

          > {role}</SelectItem >
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
          <h2>Edit User</h2>
          <div>
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

        {/* Username */}
        <Label htmlFor="username">
          Username:<span>[3-20 letters]</span>
        </Label>
        <Input
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={onUsernameChanged}
        />

        {/* Password */}
        <Label htmlFor="password">
          Password:<span>[4-12 chars including special chars]</span>
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChanged}
        />

        {/* User Active */}
        <Label htmlFor="user-active">
          ACTIVE:
          <Input
            id="user-active"
            name="user-active"
            type="checkbox"
            checked={active}
            onChange={onActiveChanged}
          />
        </Label>

        {/* Roles */}
        <Label htmlFor="roles">
          ASSIGNED ROLES:
        </Label>
        <Select
          id="roles"
          name="roles"
          className={`form__select ${validRolesClass}`}
          multiple={true}
          size="3"
          value={roles}
          onChange={onRolesChanged}
        >
          <SelectContent>
            {options}
          </SelectContent>
        </Select>
      </Form>
    </>
  )

  return content 
}

export default EditUserForm