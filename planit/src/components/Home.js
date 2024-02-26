import { Link } from 'react-router-dom'

import React from 'react'

const Home = () => {
  const content = (
    <section>
      <header>
        <h1 className="border-2 border-black text-center">Welcome to Planit</h1>
      </header>
      <main>
        <p>
          Planit is a web application that allows you to plan your day out.
        </p>
        <address>
          Fake R. Name <br />
          123 Fake Street <br />
          Fake City, FS 12345 <br />
          <a href="tel:+15555555555">(555) 555-5555</a>
        </address>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  )
  return content
}

export default Home