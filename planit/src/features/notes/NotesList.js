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

const NotesList = () => {
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetNotesQuery()

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

    const {ids} = notes 

    const tableContent = ids?.length
      ? ids.map(noteId => <Note key={noteId} noteId={noteId} />)
      : null

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