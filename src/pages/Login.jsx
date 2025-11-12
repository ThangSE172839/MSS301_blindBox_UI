import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, saveToken } from '../api/auth'
import { USE_MOCK_API } from '../api/client'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      const data = await login(email, password)
      saveToken(data)
      navigate('/brands')
    } catch (err) {
      console.error('Login failed:', err)
      let errorMessage = 'Login failed'
      if (err.response?.status === 401) {
        errorMessage = 'Invalid credentials'
      } else if (err.response?.status === 404) {
        errorMessage = 'Login endpoint not found. Check if API Gateway is running on port 8088.'
      } else if (err.code === 'ERR_NETWORK') {
        errorMessage = 'Cannot connect to API Gateway. Check if it\'s running on http://localhost:8088'
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message
      }
      setError(errorMessage)
    }
  }

  return (
    <div className="page login-page">
      <div className="login-card">
        <div style={{textAlign:'center', marginBottom:'24px'}}>
          <h2>Welcome Back! 🎉</h2>
          <p style={{color:'var(--text-secondary)', margin:'8px 0 0 0'}}>
            Sign in to manage your collection and discover amazing blind boxes
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="form">
          <div>
            <label>📧 Email Address</label>
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              type="email" 
              placeholder="Enter your email"
              required 
            />
          </div>
          
          <div>
            <label>🔒 Password</label>
            <input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              placeholder="Enter your password"
              required 
            />
          </div>
          
          <div className="flex gap-2" style={{marginTop:'24px'}}>
            <button className="btn primary" type="submit" style={{flex:'1'}}>
              ✨ Sign In
            </button>
            <button 
              type="button" 
              className="btn secondary" 
              onClick={() => { setEmail(''); setPassword('') }}
            >
              🗑️ Clear
            </button>
          </div>
          
          {error && (
            <div className="error">
              ⚠️ {error}
            </div>
          )}
        </form>
        
        <div style={{
          textAlign:'center', 
          marginTop:'24px', 
          padding:'16px', 
          background: USE_MOCK_API ? 'rgba(16, 185, 129, 0.1)' : 'rgba(99, 102, 241, 0.1)', 
          borderRadius:'12px',
          fontSize:'13px',
          color:'var(--text-secondary)'
        }}>
          {USE_MOCK_API ? (
            <>
              <div style={{color:'var(--success)', fontWeight:'600', marginBottom:'8px'}}>
                🚀 MOCK MODE ACTIVE - API Gateway không cần thiết!
              </div>
              <div><strong>Admin:</strong> admin@blindbox.com / admin123</div>
              <div><strong>User:</strong> user@example.com / password123</div>
            </>
          ) : (
            <>
              <div style={{color:'var(--text-secondary)', fontWeight:'500', marginBottom:'8px'}}>
                � Real API Connection
              </div>
              <div style={{fontSize:'12px', color:'var(--text-secondary)'}}>
                Kết nối với microservices thật
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
