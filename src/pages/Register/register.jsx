import Styles from './Register.module.css'
import { useState, useEffect } from 'react'

import { useAuth } from '../../hooks/useAuth'


const register = () => {
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [idade, setIdade] = useState("")
  const [password, setPassword] = useState("")
  const [confirpass, setConfirpass] = useState("")
  const [error, setError] = useState("")

  const { createUser, error: authError, loading } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")

    const user = {
      displayName,
      email,
      password,
      idade
    }

    if (password !== confirpass) {
      setError("As senhas precisam ser iguais")
      return
    }

    const res = await createUser(user)
  }

  useEffect(() => {
    if(authError) {
      setError(authError)
    }
  }, [authError])

  return (
    <div className={Styles.register}>
      <h1>Cadastre-se para postar</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input type="text" name='displayName' required placeholder='Nome do usuário' value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </label>

        <label>
          <span>E-mail:</span>
          <input type="email" name='email' required placeholder='E-mail do usuário' value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          <span>Data de aniversario:</span>
          <input type="date" name='idade' required value={idade} onChange={(e) => setIdade(e.target.value)} />
        </label>

        <label>
          <span>Senha:</span>
          <input type="password" name='password' required placeholder='Sua senha' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <label>
          <span>Confirmar senha:</span>
          <input type="password" name='confirpass' required placeholder='Confirma senha' value={confirpass} onChange={(e) => setConfirpass(e.target.value)} />
        </label>
        {!loading && <button className='btn'>Cadastrar</button>}
        {loading && <button className='btn' disabled>Aguarde...</button>}
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default register
