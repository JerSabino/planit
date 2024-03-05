import { useGetUsersQuery } from "./usersApiSlice"
import User from "./User"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"

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
    console.log("loading")
    content = <p>Loading</p>
  } 

  if (isError) {
    console.log("error")
    content = <p>{error?.data?.message}</p>
  }

  if (isSuccess) {
    console.log("success")

    const {ids} = users 

    const tableContent = ids?.length
      ? ids.map(userId => <User key={userId} userId={userId} />)
      : null

    content = (
      <Table>
        <TableCaption>A list of users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              Username
            </TableHead>
            <TableHead>
              Roles
            </TableHead>
            <TableHead>
              Edit
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

export default UsersList