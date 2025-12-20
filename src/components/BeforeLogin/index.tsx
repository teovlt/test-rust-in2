import React from 'react'

const BeforeLogin: React.FC = () => {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '20px 0',
      }}
    >
      <div
        style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#e05d38',
          marginBottom: '8px',
          letterSpacing: '-0.02em',
          fontFamily: 'Nunito, sans-serif',
        }}
      >
        Rust-in
      </div>
      <p
        style={{
          fontSize: '1rem',
          color: 'var(--theme-elevation-600)',
          margin: 0,
          fontFamily: 'Nunito, sans-serif',
        }}
      >
        Portail d'administration
      </p>
    </div>
  )
}

export default BeforeLogin
