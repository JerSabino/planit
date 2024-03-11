import { useParams } from'react-router-dom'
import EditUserForm from './EditUserForm'

import { useGetUsersQuery } from './usersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'

const EditUser = () => {
  const { id } = useParams()

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id]
    }),
  })

  if (!user) return (
    <div className="flex w-screen h-screen justify-center items-center bg-gray-950">
      <PulseLoader color={"#FFF"}/>
    </div>
  )

  const content = <EditUserForm user={user}/> 

  return content
}

export default EditUser