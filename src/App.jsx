import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Card from './components/Card'
import SearchInput from './components/SearchInput'
import axios from 'axios'
import { useAuth } from './context/AuthContext'

const USUARIOS_POR_PAGINA = 10

export default function App() {
  const [usuarios, setUsuarios] = useState([])
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([])
  const [error, setError] = useState(null)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  
  const paginaActual = parseInt(searchParams.get('pagina')) || 1

  const obtenerUsuarios = async () => {
    try {
      const res = await axios.get('http://localhost:8000/usuarios')
      setUsuarios(res.data)
      setUsuariosFiltrados(res.data)
    } catch (err) {
      setError('Error al cargar usuarios')
      console.error('Error:', err)
    }
  }

  useEffect(() => {
    obtenerUsuarios()
  }, [])

  const filtrarUsuarios = (query) => {
    if (query.trim() === '') {
      setUsuariosFiltrados(usuarios)
      navigate('/buscador-usuarios?pagina=1')
    } else {
      const q = query.trim().toLowerCase()
      const resultados = usuarios.filter((u) =>
        [u.nombre, u.apellidos, u.perfil, u.intereses, u.correo].some(
          (campo) => campo && String(campo).toLowerCase().includes(q)
        )
      )
      setUsuariosFiltrados(resultados)
      navigate('/buscador-usuarios?pagina=1')
    }
  }

  const handleLogout = () => {
    logout()
  }

  // Calcular paginación
  const totalPaginas = Math.ceil(usuariosFiltrados.length / USUARIOS_POR_PAGINA)
  const inicio = (paginaActual - 1) * USUARIOS_POR_PAGINA
  const fin = inicio + USUARIOS_POR_PAGINA
  const usuariosPagina = usuariosFiltrados.slice(inicio, fin)

  const cambiarPagina = (nuevaPagina) => {
    navigate(`/buscador-usuarios?pagina=${nuevaPagina}`)
  }

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '1rem'}}>
      {/* Header con título y botón de logout */}
      <div style={{
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem',
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', margin: 0}}>
          BUSCADOR DE USUARIOS
        </h1>
        
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <button 
            onClick={handleLogout}
            style={{
              backgroundColor: '#ef4444',
              color: 'white',
              fontWeight: 'bold',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
      
      <SearchInput onSearch={filtrarUsuarios} />
      
      {error && (
        <div style={{backgroundColor: '#fef2f2', color: '#dc2626', padding: '0.75rem', borderRadius: '0.25rem', marginBottom: '1rem', textAlign: 'center'}}>
          {error}
        </div>
      )}

      {/* Información de paginación */}
      <div style={{textAlign: 'center', marginBottom: '1rem', color: '#6b7280'}}>
        Mostrando {usuariosPagina.length} de {usuariosFiltrados.length} usuarios
        {usuariosFiltrados.length !== usuarios.length && ' (filtrados)'}
        {totalPaginas > 1 && ` - Página ${paginaActual} de ${totalPaginas}`}
      </div>

      {/* Grid de usuarios */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2rem'}}>
        {usuariosPagina.map((usuario) => (
          <Card key={usuario.id} usuario={usuario} />
        ))}
      </div>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap'}}>
          <button 
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual <= 1}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.25rem',
              backgroundColor: paginaActual <= 1 ? '#f3f4f6' : 'white',
              color: paginaActual <= 1 ? '#9ca3af' : '#374151',
              cursor: paginaActual <= 1 ? 'not-allowed' : 'pointer',
              fontSize: '0.9rem'
            }}
          >
            ← Anterior
          </button>

          {/* Números de página */}
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
            <button
              key={pagina}
              onClick={() => cambiarPagina(pagina)}
              style={{
                padding: '0.5rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.25rem',
                backgroundColor: pagina === paginaActual ? '#3b82f6' : 'white',
                color: pagina === paginaActual ? 'white' : '#374151',
                cursor: 'pointer',
                fontSize: '0.9rem',
                minWidth: '2.5rem'
              }}
            >
              {pagina}
            </button>
          ))}

          <button 
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual >= totalPaginas}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.25rem',
              backgroundColor: paginaActual >= totalPaginas ? '#f3f4f6' : 'white',
              color: paginaActual >= totalPaginas ? '#9ca3af' : '#374151',
              cursor: paginaActual >= totalPaginas ? 'not-allowed' : 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Siguiente →
          </button>
        </div>
      )}

      {usuariosPagina.length === 0 && !error && (
        <p style={{textAlign: 'center', color: '#6b7280', marginTop: '2rem', fontSize: '1.1rem'}}>
          No se encontraron usuarios
        </p>
      )}
    </div>
  )
}