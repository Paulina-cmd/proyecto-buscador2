export default function Card({ usuario }) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '1.5rem',
      border: '1px solid #e5e7eb',
      textAlign: 'center'
    }}>
      <img
        src={usuario.foto}
        alt={`${usuario.nombre} ${usuario.apellidos}`}
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          objectFit: 'cover',
          margin: '0 auto 1rem',
          border: '3px solid #e5e7eb'
        }}
      />
      <h3 style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem'}}>
        {usuario.nombre} {usuario.apellidos}
      </h3>
      <p style={{color: '#374151', marginBottom: '0.5rem', fontWeight: '600'}}>
        {usuario.perfil}
      </p>
      <p style={{color: '#6b7280', fontStyle: 'italic', marginBottom: '0.5rem', fontSize: '0.875rem'}}>
        {usuario.intereses}
      </p>
      <p style={{color: '#3b82f6', fontSize: '0.875rem'}}>
        {usuario.correo}
      </p>
    </div>
  )
}