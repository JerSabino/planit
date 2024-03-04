import { Link } from'react-router-dom'
import { Label } from '../../components/ui/label'

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date);

  const content = (
    <section className="flex flex-col text-white gap-4">
      
      <p className="text-gray-400">
        {today}
      </p>
      <h1>
        Welcome!
      </h1>
      <div className="flex flex-col gap-4">
        <div>
          <Label>Notes</Label> 
          <p><span>• </span><Link to="/dash/notes">View planIt notes</Link></p>
          <p><span>• </span><Link to="/dash/notes/new">Add a new note</Link></p>
        </div>
        <div>
        <Label>Users</Label> 
          <p><span>• </span><Link to="/dash/users">View User Settings</Link></p>
          <p><span>• </span><Link to="/dash/users/new">Add a new user</Link></p>
        </div>
      </div>
      <div className="min-h-full">

      </div>
    </section>
  )

  return content
}

export default Welcome