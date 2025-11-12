import { useEffect, useState } from 'react'
import client, { USE_MOCK_API, blindboxesClient } from '../api/client'

export default function BlindBoxes() {
  const [boxes, setBoxes] = useState([])
  const [category, setCategory] = useState('')
  const [rarity, setRarity] = useState('')
  const [loading, setLoading] = useState(false)

  async function fetchAll() {
    setLoading(true)
    try {
      const apiClient = USE_MOCK_API ? client : blindboxesClient
      const endpoint = '/api/blind-boxes'
      const resp = await apiClient.get(endpoint)
      setBoxes(resp.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function fetchByCategory(catId) {
    setLoading(true)
    try {
      const apiClient = USE_MOCK_API ? client : blindboxesClient
      const endpoint = `/api/blind-boxes/category/${catId}`
      const resp = await apiClient.get(endpoint)
      setBoxes(resp.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function fetchByRarity(r) {
    setLoading(true)
    try {
      const apiClient = USE_MOCK_API ? client : blindboxesClient
      const endpoint = `/api/blind-boxes/rarity/${r}`
      const resp = await apiClient.get(endpoint)
      setBoxes(resp.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  return (
    <div className="page blindboxes-page">
      <div style={{textAlign:'center', marginBottom:'32px'}}>
        <h2 style={{
          fontSize:'2.5rem',
          fontWeight:'800',
          background:'var(--gradient-primary)',
          WebkitBackgroundClip:'text',
          WebkitTextFillColor:'transparent',
          backgroundClip:'text',
          margin:'0 0 8px 0'
        }}>
          🎲 Blind Box Collection
        </h2>
        <p style={{color:'var(--text-secondary)', fontSize:'1.1rem'}}>
          Discover amazing surprises in our curated blind box collection
        </p>
      </div>

      <div className="filters">
        <div style={{display:'flex',gap:'12px',alignItems:'center', flexWrap:'wrap'}}>
          <div style={{position:'relative'}}>
            <input 
              placeholder="📋 Category ID (1-5)" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              style={{paddingLeft:'40px'}}
            />
            <span style={{position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)'}}>🔍</span>
          </div>
          <button className="btn primary" onClick={() => fetchByCategory(category)}>
            Filter Category
          </button>
          
          <div style={{position:'relative'}}>
            <select 
              value={rarity} 
              onChange={(e) => setRarity(e.target.value)}
              style={{
                paddingLeft:'40px',
                padding:'12px 40px 12px 40px',
                border:'2px solid rgba(99, 102, 241, 0.1)',
                borderRadius:'12px',
                background:'rgba(255, 255, 255, 0.8)',
                backdropFilter:'blur(10px)',
                fontSize:'14px',
                minWidth:'150px'
              }}
            >
              <option value="">Select Rarity</option>
              <option value="Common">Common</option>
              <option value="Rare">Rare</option>
              <option value="Epic">Epic</option>
              <option value="Legendary">Legendary</option>
            </select>
            <span style={{position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)'}}>✨</span>
          </div>
          <button className="btn primary" onClick={() => fetchByRarity(rarity)}>
            Filter Rarity
          </button>
          
          <button className="btn secondary" onClick={fetchAll}>
            🔄 Reset All
          </button>
        </div>
        
        {/* Quick stats */}
        <div style={{
          display:'flex',
          gap:'16px',
          marginTop:'16px',
          fontSize:'13px',
          color:'var(--text-secondary)'
        }}>
          <div>📦 Total: <strong>{boxes.length}</strong></div>
          <div>💎 Rare+: <strong>{boxes.filter(b => ['Rare','Epic','Legendary'].includes(b.rarity)).length}</strong></div>
          <div>💰 Avg Price: <strong>${boxes.length > 0 ? (boxes.reduce((sum, b) => sum + b.price, 0) / boxes.length).toFixed(2) : '0.00'}</strong></div>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading amazing blind boxes...</div>
      ) : (
        <div className="list">
          {boxes.length === 0 && (
            <div style={{
              gridColumn:'1 / -1',
              textAlign:'center',
              padding:'48px',
              background:'rgba(255,255,255,0.9)',
              borderRadius:'16px',
              color:'var(--text-secondary)'
            }}>
              <div style={{fontSize:'48px', marginBottom:'16px'}}>🎁</div>
              <h3>No blind boxes found</h3>
              <p>Try adjusting your filters or check back later!</p>
            </div>
          )}
          {boxes.map((b) => (
            <div key={b.blindBoxID} className="card" style={{position:'relative', overflow:'hidden'}}>
              {/* Stock indicator */}
              <div style={{
                position:'absolute',
                top:'12px',
                left:'12px',
                background: b.stock > 100 ? 'linear-gradient(135deg, #10b981, #059669)' :
                           b.stock > 50 ? 'linear-gradient(135deg, #f59e0b, #d97706)' :
                           'linear-gradient(135deg, #ef4444, #dc2626)',
                color:'white',
                padding:'4px 8px',
                fontSize:'10px',
                fontWeight:'700',
                borderRadius:'8px',
                textTransform:'uppercase'
              }}>
                📦 {b.stock} left
              </div>

              {/* Rarity badge */}
              <div style={{
                position:'absolute',
                top:'12px',
                right:'12px',
                background: b.rarity === 'Rare' ? 'linear-gradient(135deg, #f59e0b, #d97706)' :
                           b.rarity === 'Epic' ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' :
                           b.rarity === 'Legendary' ? 'linear-gradient(135deg, #ef4444, #dc2626)' :
                           'linear-gradient(135deg, #10b981, #059669)',
                color:'white',
                padding:'4px 12px',
                fontSize:'11px',
                fontWeight:'700',
                borderRadius:'8px',
                textTransform:'uppercase',
                letterSpacing:'0.05em'
              }}>
                ⭐ {b.rarity}
              </div>
              
              <div style={{
                width:'60px',
                height:'60px',
                background:'var(--gradient-primary)',
                borderRadius:'16px',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                fontSize:'24px',
                marginBottom:'16px',
                marginTop:'32px',
                animation:'float 3s ease-in-out infinite'
              }}>
                🎁
              </div>
              
              <h3 style={{fontSize:'1.25rem', marginBottom:'8px', paddingRight:'80px'}}>
                {b.name}
              </h3>
              
              {/* Price */}
              <div style={{
                fontSize:'1.5rem',
                fontWeight:'800',
                color:'var(--primary)',
                marginBottom:'12px'
              }}>
                ${b.price}
              </div>
              
              {/* Category and Brand */}
              <div style={{
                display:'flex',
                gap:'12px',
                marginBottom:'12px',
                flexWrap:'wrap'
              }}>
                <div style={{
                  display:'flex',
                  alignItems:'center',
                  gap:'6px',
                  background:'rgba(99, 102, 241, 0.1)',
                  padding:'4px 8px',
                  borderRadius:'8px',
                  fontSize:'12px'
                }}>
                  <span>📋</span>
                  <strong>{b.categoryName}</strong>
                </div>
                
                {b.brandName && (
                  <div style={{
                    display:'flex',
                    alignItems:'center',
                    gap:'6px',
                    background:'rgba(16, 185, 129, 0.1)',
                    padding:'4px 8px',
                    borderRadius:'8px',
                    fontSize:'12px',
                    color:'var(--success)'
                  }}>
                    <span>🏷️</span>
                    <strong>{b.brandName}</strong>
                  </div>
                )}
              </div>
              
              {/* Release Date */}
              <div style={{
                color:'var(--text-secondary)',
                fontSize:'13px',
                display:'flex',
                alignItems:'center',
                gap:'6px',
                marginBottom:'16px'
              }}>
                <span>📅</span>
                <span>Released: {b.releaseDate}</span>
              </div>

              {/* Buy Button */}
              <button 
                className="btn primary" 
                style={{
                  width:'100%',
                  background: b.stock === 0 ? '#9ca3af' : 'var(--gradient-primary)',
                  cursor: b.stock === 0 ? 'not-allowed' : 'pointer'
                }}
                disabled={b.stock === 0}
              >
                {b.stock === 0 ? '😞 Sold Out' : '🛒 Add to Cart'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
