import { useState, useEffect } from 'react'
import { useUpdateNoteMutation, useDeleteNoteMutation } from './notesApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons'

import { Button } from "../../components/ui/button"
import { Form } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Checkbox } from "../../components/ui/checkbox"
import { Textarea } from "../../components/ui/textarea"

import useAuth from '../../hooks/useAuth'

const EditNoteForm = ({ note, users }) => {

  const {isManager, isAdmin} = useAuth()

  const [updateNote, {
      isLoading,
      isSuccess,
      isError,
      error
  }] = useUpdateNoteMutation()

  const [deleteNote, {
      isSuccess: isDelSuccess,
      isError: isDelError,
      error: delerror
  }] = useDeleteNoteMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState(note.title)
  const [text, setText] = useState(note.text)
  const [completed, setCompleted] = useState(note.completed)
  const [userId, setUserId] = useState(note.user)

  useEffect(() => {

      if (isSuccess || isDelSuccess) {
          setTitle('')
          setText('')
          setUserId('')
          navigate('/dash/notes')
      }

  }, [isSuccess, isDelSuccess, navigate])

  const onTitleChanged = e => setTitle(e.target.value)
  const onTextChanged = e => setText(e.target.value)
  const onCompletedChanged = e => setCompleted(prev => !prev)
  const onUserIdChanged = e => setUserId(e.target.value)

  const canSave = [title, text, userId].every(Boolean) && !isLoading

  const onSaveNoteClicked = async (e) => {
      if (canSave) {
          await updateNote({ id: note.id, user: userId, title, text, completed })
      }
  }

  const onDeleteNoteClicked = async () => {
      await deleteNote({ id: note.id })
  }

  const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
  const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

  const options = users.map(user => {
      return (
          <option
              key={user.id}
              value={user.id}
          > 
            {user.username}
          </option >
      )
  })

  const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
  const validTitleClass = !title ? "form__input--incomplete" : ''
  const validTextClass = !text ? "form__input--incomplete" : ''

  const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

  let deleteButton = null
  if (isManager || isAdmin) {
    deleteButton = (
      <Button
        title="Delete"
        onClick={onDeleteNoteClicked}
      >
        <FontAwesomeIcon icon={faTrashCan}/>
      </Button>
    )
  }

  const content = (
    <>
      <p className={errClass}>{errContent}</p>
      <h2 className="text-white font-bold ml-2">Edit Note: <span className="font-thin">#{note.ticket}</span></h2>
      <Form>
        <div className="flex flex-col gap-4 border rounded-lg p-5">
          <div>
            <div className="flex gap-2">
              <Button
                title="Save"
                onClick={onSaveNoteClicked}
                disabled={!canSave}  
              >
                <FontAwesomeIcon icon={faSave}/>
              </Button>
              {deleteButton}
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

          <div className="flex flex-col gap-5">
            <div className="flex gap-2">
              <Label htmlFor="user-active" className="text-white">
                WORK COMPLETE:
              </Label>
              <Checkbox
                id="note-completed"
                name="completed"
                className="dark"
                checked={completed}
                onCheckedChange={onCompletedChanged}
              />    
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="note-username" className="text-white">
                ASSIGNED TO:
              </Label>
              <select
                id="note-username"
                name="username"
                className="rounded-md p-1 w-[200px]"
                value={userId}
                onChange={onUserIdChanged}
              >
                {options}
              </select>
            </div>
            <div>
              <div>
                <p className="text-white text-sm font-bold italic">Created: <span className="font-thin">{created}</span></p>
                <p className="text-white text-sm font-bold italic">Updated: <span className="font-thin">{updated}</span></p>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  )

  return content

}

export default EditNoteForm