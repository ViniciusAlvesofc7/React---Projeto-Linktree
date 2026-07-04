import { Link, useNavigate } from "react-router-dom"

import Input from "../../components/Input/index.tsx"
import { useState, type FormEvent } from "react";

import { auth } from "../../services/firebaseConnection.ts"
import { signInWithEmailAndPassword } from "firebase/auth"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    
    if(email === "" || password === ""){
      setError("Preencha todos os campos")
      return
    } 

    signInWithEmailAndPassword(auth, email, password)
    .then(()=>{
      navigate('/admin')
    })
    .catch((error)=>{
      console.log("ERRO AO FAZER O LOGIN: ")
      console.log(error)
      setError("Email ou senha inválidos")
    })

  }

  return (
    <div className="flex w-full h-screen flex-col items-center justify-center bg-gray-950 text-white">
      <Link to="/home">
        <h1 className="mt-11 mb-7 font-bold text-5xl">Dev<span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span></h1>
      </Link>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-xl px-2">
        <Input
          placeholder="Digite seu email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          placeholder="Digite sua senha "
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error ? <p className="text-sm text-red-400">{error}</p> : null}

        <button
          type="submit"
          className="h-9 rounded-md bg-gradient-to-r from-blue-400 to-blue-900 text-lg font-bold cursor-pointer"
        >
          Acessar
        </button>
      </form>
    </div>
  )
}

export default Login
