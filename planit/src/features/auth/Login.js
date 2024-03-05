import { useRef, useState, useEffect } from 'react' 
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice' 
import { useLoginMutation } from './authApiSlice'

import usePersist from '../../hooks/usePersist'

import { Form } from "../../components/ui/form"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Checkbox } from "../../components/ui/checkbox"

const Login = () => {
  
  const userRef = useRef()
  const errRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [persist, setPersist] = usePersist()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [username, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const { accessToken } = await login({ username, password }).unwrap()
        dispatch(setCredentials({ accessToken }))
        setUsername('')
        setPassword('')
        navigate('/dash')
        console.log("Logged in")
    } catch (err) {
        if (!err.status) {
            setErrMsg('No Server Response');
        } else if (err.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg(err.data?.message);
        }
        errRef.current.focus();
    }
  }

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)
  const handleToggle = () => setPersist(prev => !prev)

  const errClass = errMsg ? "errmsg" : "offscreen"

  if (isLoading) return <p>Loading</p>

  const content = (
    <section>
      <header>
        <h1>
          Employee Login
        </h1>
      </header>
      <main>
        <Form>
          <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

          <Label htmlFor="username">
            Username:
          </Label>
          <Input
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />

          <Label htmlFor="password">
            Password:
          </Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={handlePwdInput}
            required
          />
          <Button onClick={handleSubmit}>
            Sign In
          </Button>

          <Label htmlFor="persist">
            Trust this Device
          </Label>
          <Checkbox
            id="persist"
            checked={persist}
            onCheckedChange={handleToggle}
          />  
        </Form>
      </main>
    </section>
  )

  return content
}

export default Login