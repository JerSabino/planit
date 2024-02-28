import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";

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

const User = ({ userId }) => {
  const user = useSelector(state => selectUserById(state, userId))

  console.log("hello", user)

  const navigate = useNavigate()

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`)

    const userRolesString = user.roles.toString().replaceAll(',',', ')

    const cellStatus = user.active ? '' : 'table__cell--inactive'

    return (
      <TableRow>
        <TableCell className="text-white">
          {user.username}
        </TableCell>
        <TableCell className="text-white">
          {userRolesString}
        </TableCell>
        <TableCell>
          <Button onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare}/>
          </Button>
        </TableCell>
      </TableRow>
    )
  } else return null
}
export default User