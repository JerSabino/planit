import NewNoteForm from './NewNoteForm'

import { useGetUsersQuery } from '../users/usersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'

const NewNote = () => {

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map(id => data?.entities[id])
    }),
  })

  if (!users?.length) return (
    <div className="flex w-screen h-screen justify-center items-center bg-gray-950">
      <PulseLoader color={"#FFF"}/>
    </div>
  )

  const content = <NewNoteForm users={users}/>

  return content
}

export default NewNote