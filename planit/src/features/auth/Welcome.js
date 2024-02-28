import { Link } from'react-router-dom'

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
      <div>
        <p><span>• </span><Link to="/dash/notes">View planIt notes</Link></p>
        <p><span>• </span><Link to="/dash/users">View User Settings</Link></p>
      </div>
      <div className="min-h-full">

      </div>
    </section>
  )

  return content
}

export default Welcome