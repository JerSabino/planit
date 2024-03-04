import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectNoteById } from "./notesApiSlice";

import { Button } from '../../components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"

const Note = ({ noteId }) => {

  const note = useSelector(state => selectNoteById(state, noteId))

  const navigate = useNavigate()

  if (note) {

    const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

    const handleEdit = () => navigate(`/dash/notes/${noteId}`)

    return (
      <TableRow>
        <TableCell className="text-white">
          {note.completed
            ? <span className="text-green-500">Completed</span>
            : <span className="text-yellow-200">Open</span>
          }
        </TableCell>
        <TableCell className="text-white">{created}</TableCell>
        <TableCell className="text-white">{updated}</TableCell>
        <TableCell className="text-white">{note.title}</TableCell>
        <TableCell className="text-white">{note.username}</TableCell>
  
        <TableCell>
          <Button onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare}/>
          </Button>
        </TableCell>
      </TableRow>
    )

  } else return null
}

export default Note