import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

import { useGetNotesQuery } from './notesApiSlice'
import { memo } from "react"

import { Button } from '../../components/ui/button'
import { TableCell, TableRow } from "../../components/ui/table"

const Note = ({ noteId }) => {

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId]
    }),
  })

  const navigate = useNavigate()

  if (note) {

    const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

    const handleEdit = () => navigate(`/dash/notes/${noteId}`)

    const cellStatus = note.completed ? 'text-gray-700' : ''
    const completedCell = note.completed ? 'bg-emerald-700' : 'bg-amber-700'
    const completed = note.completed ? 'Completed' : 'Open'

    return (
      <TableRow>
        <TableCell className="text-white">
          <div className={`rounded-lg w-min px-2 h-5 leading-5 text-center text-white font-semibold select-none ${completedCell}`}>
            {completed}
          </div>
        </TableCell>
        <TableCell className={`text-white ${cellStatus}`}>{created}</TableCell>
        <TableCell className={`text-white ${cellStatus}`}>{updated}</TableCell>
        <TableCell className={`text-white ${cellStatus}`}>{note.title}</TableCell>
        <TableCell className={`text-white ${cellStatus}`}>{note.username}</TableCell>
  
        <TableCell className={`text-center`}>
          <Button onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare}/>
          </Button>
        </TableCell>
      </TableRow>
    )

  } else return null
}

const memoizedNote = memo(Note)

export default memoizedNote