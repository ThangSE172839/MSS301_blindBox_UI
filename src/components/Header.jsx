import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../api/auth'
import { USE_MOCK_API } from '../api/client'

export default function Header() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="app-header">
      <div className="flex" style={{alignItems:'center', gap:'12px'}}>
        <div className="brand">blindBOX</div>
        <div style={{
          color:'rgba(55,65,81,0.6)',
          fontSize:'13px',
          fontWeight:'500',
          letterSpacing:'0.05em',
          textTransform:'uppercase'
        }}>
          🎁 Collect • Trade • Discover
        </div>
        {USE_MOCK_API && (
          <div style={{
            background:'linear-gradient(135deg, #10b981, #059669)',
            color:'white',
            fontSize:'10px',
            fontWeight:'700',
            padding:'4px 8px',
            borderRadius:'6px',
            textTransform:'uppercase',
            letterSpacing:'0.05em'
          }}>
            🚀 MOCK MODE
          </div>
        )}
      </div>

      <nav>
        <Link to="/blindboxes">🎲 BlindBoxes</Link>
        {token && <Link to="/brands">🏷️ Brands</Link>}
      </nav>

      <div className="auth" style={{display:'flex', alignItems:'center', gap:'12px'}}>
        {token ? (
          <>
            <div style={{
              display:'flex',
              alignItems:'center',
              gap:'8px',
              padding:'6px 12px',
              background:'rgba(99, 102, 241, 0.1)',
              borderRadius:'8px',
              fontSize:'13px',
              fontWeight:'500'
            }}>
              <div style={{
                width:'24px',
                height:'24px',
                borderRadius:'50%',
                background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                color:'white',
                fontSize:'10px',
                fontWeight:'700'
              }}>
                {(username || 'U').charAt(0).toUpperCase()}
              </div>
              <span style={{color:'var(--primary)'}}>{username || 'User'}</span>
            </div>
            <button className="btn secondary" onClick={handleLogout} style={{fontSize:'13px'}}>
              🚪 Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn primary" style={{fontSize:'14px', fontWeight:'600'}}>
            🔐 Login
          </Link>
        )}
      </div>
    </header>
  )
}
