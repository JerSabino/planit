import { useGetNotesQuery } from "./notesApiSlice"
import Note from "./Note"
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import PulseLoader from 'react-spinners/PulseLoader'
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
    content = (
      <div className="flex w-screen h-screen justify-center items-center bg-gray-950">
        <PulseLoader color={"#FFF"}/>
      </div>
    )
  } 

  if (isError) {
    content = <p>{error?.data?.message}</p>
  }

  if (isSuccess) {
    const {ids, entities} = notes 

    let filteredIds
    if (isManager || isAdmin) {
      filteredIds = [...ids]
    } else {
      filteredIds = ids.filter(noteId => entities[noteId].username === username)
    }

    const tableContent = ids?.length && filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />)

    content = (
      <div className="rounded-lg border border-gray-600 bg-gray-950">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className=" text-white">
                Status
              </TableHead>
              <TableHead className=" text-white">
                Created
              </TableHead>
              <TableHead className=" text-white">
                Updated
              </TableHead>
              <TableHead className=" text-white">
                Title
              </TableHead>
              <TableHead className=" text-white">
                Owner
              </TableHead>
              <TableHead className="text-white text-center">
                Edit
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableContent}
          </TableBody>
        </Table>
      </div>
    )
  }
  return content
}

export default NotesList