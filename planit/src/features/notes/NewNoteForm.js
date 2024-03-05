import { useState, useEffect } from 'react'
import { useAddNewNoteMutation } from './notesApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

import { Button } from "../../components/ui/button"
import { Form } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Checkbox } from "../../components/ui/checkbox"
import { Textarea } from "../../components/ui/textarea"

const NewNoteForm = ({ users }) => {
  const [addNewNote, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewNoteMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [userId, setUserId] = useState(users[0].id)

  useEffect(() => {
    if (isSuccess) {
      setTitle('')
      setText('')
      setText('')
      setUserId('')
      navigate('/dash/notes')
    }
  }, [isSuccess, navigate])

  const onTitleChanged = e => setTitle(e.target.value)
  const onTextChanged = e => setText(e.target.value)
  const onUserIdChanged = e => setUserId(e.target.value)

  const canSave = [title, text, userId].every(Boolean) && !isLoading

  const onSaveNoteClicked = async(e) => {
    e.preventDefault()
    if (canSave) {
      await addNewNote({user: userId, title, text})
    }
  }

  const options = users.map(user => {
    return (
      <option 
        key={user.id}
        value={user.id}
      >
        {user.username}
      </option>
    )
  })

  const errClass = isError ? "errmsg" : "offscreen"
  const validTitleClass = !title ? "form__input--incomplete" : ''
  const validTextClass = !text ? "form__input--incomplete" : ''

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <Form>
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-white">New note</h2>
            <div>
              <Button
                title="Save"
                onClick={onSaveNoteClicked}
                disabled={!canSave}  
              >
                <FontAwesomeIcon icon={faSave}/>
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="note-title" className="text-white">
              Title:
            </Label>
            <Input
              id="note-title"
              name="title"
              type="text"
              autoComplete="off"
              value={title}
              onChange={onTitleChanged}
            />
          </div>

          <div>
            <Label htmlFor="note-text" className="text-white">
              Text:
            </Label>
            <Textarea
              id="note-text"
              name="text"
              value={text}
              onChange={onTextChanged}
            />
          </div>

          <div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="note-username" className="text-white">
                ASSIGNED TO:
              </Label>
              <select
                id="note-username"
                name="username"
                className="border border-gray-300 rounded-md p-1 w-max"
                value={userId}
                onChange={onUserIdChanged}
              >
                {options}
              </select>
            </div>
          </div>
        </div>
      </Form>
    </>
  )

  return content
}

export default NewNoteForm