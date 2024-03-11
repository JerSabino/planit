import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

import { useGetUsersQuery } from './usersApiSlice'
import { memo } from "react"

import { Button } from '../../components/ui/button'
import {
  TableCell,
  TableRow,
} from "../../components/ui/table"

const User = ({ userId }) => {
  
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId]
    }),
  })

  const navigate = useNavigate()

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`)

    const userRolesString = user.roles.toString().replaceAll(',',', ')

    const cellStatus = user.active ? '' : 'text-gray-700 '
    const activeCell = user.active ? 'bg-emerald-700' : 'bg-rose-700'
    const active = user.active ? 'True' : 'False'

    return (
      <TableRow>
        <TableCell className={`text-white ${cellStatus}`}>
          <div className={`rounded-lg w-min px-2 h-5 leading-5 text-center text-white font-semibold select-none ${activeCell}`}>
            {active}
          </div>
        </TableCell>
        <TableCell className={`text-white ${cellStatus}`}>
          {user.username}
        </TableCell>
        <TableCell className={`text-white ${cellStatus}`}>
          {userRolesString}
        </TableCell>
        <TableCell className={`${cellStatus} text-center`}>
          <Button onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare}/>
          </Button>
        </TableCell>
      </TableRow>
    )
  } else return null
}

const memoizedUser = memo(User)

export default memoizedUser