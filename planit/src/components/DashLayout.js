import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'

const DashLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <DashHeader />
      <div className="flex-grow p-2 bg-gradient-to-t from-gray-800 via-gray-700 to-gray-800">
        <Outlet />
      </div>
      <DashFooter />
    </div>
  )
}

export default DashLayout