import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'

import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}/>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />

        {/* Dash Start */}
        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />

          <Route path="notes">
            <Route index element={<NotesList />} />
          <Route/>
          
          <Route path="users">
            <Route index element={<UsersList />} />
          </Route>
        </Route>
        {/* Dash End */}

      </Route>
    </Routes>
  );
}

export default App;
