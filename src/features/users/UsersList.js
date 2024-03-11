import { useGetUsersQuery } from "./usersApiSlice"
import User from "./User"
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import PulseLoader from 'react-spinners/PulseLoader'

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery('usersList', {
    pollingInterval: 60000,
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

    const {ids} = users 

    const tableContent = ids?.length && ids.map(userId => <User key={userId} userId={userId} />)

    content = (
      <div className="rounded-lg border border-gray-600 bg-gray-950">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className=" text-white">
                Active
              </TableHead>
              <TableHead className=" text-white">
                Username
              </TableHead>
              <TableHead className=" text-white">
                Roles
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

export default UsersList