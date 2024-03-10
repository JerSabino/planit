import { Link } from 'react-router-dom'
import { Button } from './ui/button'

import React from 'react'

const Home = () => {
  const content = (
    <section 
    className="flex items-center justify-center flex-col 
                bg-gradient-to-t from-gray-950 via-gray-900 to-gray-950 
                h-screen gap-10 dark text-center">
      <header>
        <h1 className="text-9xl text-white select-none">
          TaskIt
        </h1>
      </header>
      <main>
        <p className="text-white font-bold">
          Make tasking a piece of cake
        </p>
        {/*
        <address>
          Fake R. Name <br />
          123 Fake Street <br />
          Fake City, FS 12345 <br />
          <a href="tel:+15555555555">(555) 555-5555</a>
        </address>
        */}
      </main>
      <footer>
        <Button className="text-white bg-slate-800 hover:bg-gray-700">
          <Link to="/login">Employee Login</Link>
        </Button>
      </footer>
    </section>
  )
  return content
}

export default Home