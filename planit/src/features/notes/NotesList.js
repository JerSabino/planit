import { useGetNotesQuery } from "./notesApiSlice"
import Note from "./Note"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import useAuth from "../../hooks/useAuth"

const NotesList = () => {

  const { username, isManager, isAdmin } = useAuth()

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetNotesQuery('notesList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  let content

  if (isLoading){
    console.log("loading")
    content = <p>Loading</p>
  } 

  if (isError) {
    console.log("error")
    content = <p>{error?.data?.message}</p>
  }

  if (isSuccess) {
    console.log("success")

    const {ids, entities} = notes 

    let filteredIds
    if (isManager || isAdmin) {
      filteredIds = [...ids]
    } else {
      filteredIds = ids.filter(noteId => entities[noteId].username === username)
    }

    const tableContent = ids?.length && filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />)

    content = (
      <Table>
        <TableCaption>A list of notes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              Status
            </TableHead>
            <TableHead>
              Created
            </TableHead>
            <TableHead>
              Updated
            </TableHead>
            <TableHead>
              Title
            </TableHead>
            <TableHead>
              Owner
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableContent}
        </TableBody>
      </Table>
    )
  }
  return content
}

export default NotesList