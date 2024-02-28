import { Link } from'react-router-dom'

const DashHeader = () => {
 const content = (
  <header className="flex items-center justify-between sticky top-0 z-10 px-2 pb-1 bg-gray-900">
    <div className="flex flex-nowrap justify-end items-center">
      <Link to="/dash">
        <h1 className="text-white text-6xl flex-nowrap justify-end gap-2 align-middle">
          Planit
        </h1>
      </Link>
      <nav>

      </nav>
    </div>
  </header>
 )
 return content
}

export default DashHeader