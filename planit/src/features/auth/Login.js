import { useRef, useState, useEffect } from 'react' 
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice' 
import { useLoginMutation } from './authApiSlice'

import usePersist from '../../hooks/usePersist'

import PulseLoader from 'react-spinners/PulseLoader'
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
    } catch (err) {
        if (!err.status) {
            setErrMsg('No Server Response');
        } else if (err.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.status === 401) {
            setErrMsg('No such user exists');
        } else if (err.status === 402) {
            setErrMsg('Password is incorrect');
        } else {
            setErrMsg(err?.data?.message);
        }
        errRef.current.focus();
    }
  }

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)
  const handleToggle = () => setPersist(prev => !prev)

  const errClass = errMsg ? "errmsg" : "offscreen"

  if (isLoading) return <PulseLoader color={"#FFF"}/>

  const content = (
    <section className="flex flex-col justify-center items-center h-screen bg-gray-950">
      <header>
        <h1 className="text-white font-bold">
          Employee Login
        </h1>
      </header>
      <div className="flex flex-col border gap-3 p-7 w-2/4 mt-1 mb-10 rounded-xl text-white">
        <Label ref={errRef} className="text-red-600" aria-live="assertive">{errMsg}</Label>  
        <Form>
          <Label htmlFor="username">
            Username:
          </Label>
          <Input
            className="text-black"
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
            className="text-black"
            type="password"
            id="password"
            value={password}
            onChange={handlePwdInput}
            required
          />

          <div className="flex h-5 leading-5 items-center gap-2">
            <Label htmlFor="persist">
              Trust this Device
            </Label>
            <Checkbox
              className="dark"
              id="persist"
              checked={persist}
              onCheckedChange={handleToggle}
            />  
          </div>

          <Button onClick={handleSubmit}>
            Sign In
          </Button>
        </Form>
      </div>
      <footer className="text-white text-xs bottom-4">
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  )

  return content
}

export default Login