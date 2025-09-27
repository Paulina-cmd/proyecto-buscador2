import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(usuario, password)
  }

  return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#edebebff'}}>
      <form onSubmit={handleSubmit} style={{backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '24rem'}}>
        <h2 style={{fontSize: '1.5rem', textAlign: 'center', marginBottom: '1.5rem'}}>Iniciar Sesión</h2>
        
        <div style={{marginBottom: '1rem'}}>
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            style={{width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.25rem'}}
          />
        </div>
        
        <div style={{marginBottom: '1.5rem'}}>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.25rem'}}
          />
        </div>
        
        <button 
          type="submit"
          style={{
            width: '100%', 
            backgroundColor: '#427edeff', 
            color: 'white', 
            padding: '0.75rem', 
            borderRadius: '0.25rem',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1953d1ff'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4b90ffff'}
        >
          Entrar
        </button>
        
     
      
      </form>
    </div>
  )
}