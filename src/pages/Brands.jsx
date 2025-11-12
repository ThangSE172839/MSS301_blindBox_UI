import { useEffect, useState } from 'react'
import client, { USE_MOCK_API, brandsClient } from '../api/client'

export default function Brands() {
  const [brands, setBrands] = useState([])
  const [countryFilter, setCountryFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ brandName: '', countryOfOrigin: '' })

  async function fetchAll() {
    setLoading(true)
    try {
      const apiClient = USE_MOCK_API ? client : brandsClient
      const endpoint = '/api/brands'
      const resp = await apiClient.get(endpoint)
      setBrands(resp.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function fetchByCountry(country) {
    setLoading(true)
    try {
      const apiClient = USE_MOCK_API ? client : brandsClient
      const endpoint = `/api/brands/country/${country}`
      const resp = await apiClient.get(endpoint)
      setBrands(resp.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  function startCreate() {
    setEditing(null)
    setForm({ brandName: '', countryOfOrigin: '' })
  }

  function startEdit(b) {
    setEditing(b.brandID)
    setForm({ brandName: b.brandName || '', countryOfOrigin: b.countryOfOrigin || '' })
  }

  async function handleSave(e) {
    e.preventDefault()
    try {
      const apiClient = USE_MOCK_API ? client : brandsClient
      
      if (editing) {
        const endpoint = `/api/brands/${editing}`
        const resp = await apiClient.put(endpoint, form)
        setBrands((prev) => prev.map((p) => (p.brandID === editing ? resp.data : p)))
      } else {
        const endpoint = '/api/brands'
        const resp = await apiClient.post(endpoint, form)
        setBrands((prev) => [resp.data, ...prev])
      }
      setEditing(null)
      setForm({ brandName: '', countryOfOrigin: '' })
    } catch (err) {
      console.error(err)
      alert('Save failed')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this brand?')) return
    try {
      const apiClient = USE_MOCK_API ? client : brandsClient
      const endpoint = `/api/brands/${id}`
      await apiClient.delete(endpoint)
      setBrands((prev) => prev.filter((b) => b.brandID !== id))
    } catch (err) {
      console.error(err)
      alert('Delete failed')
    }
  }

  return (
    <div className="page brands-page">
      <div className="brands-main">
        <div style={{textAlign:'center', marginBottom:'32px'}}>
          <h2 style={{
            fontSize:'2.5rem',
            fontWeight:'800',
            background:'var(--gradient-brand)',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent',
            backgroundClip:'text',
            margin:'0 0 8px 0'
          }}>
            🏷️ Brand Management
          </h2>
          <p style={{color:'var(--text-secondary)', fontSize:'1.1rem'}}>
            Manage and organize your brand collection
          </p>
        </div>

        {loading ? (
          <div className="loading">Loading awesome brands...</div>
        ) : (
          <div>
            {brands.length === 0 && (
              <div style={{
                textAlign:'center',
                padding:'48px',
                background:'rgba(255,255,255,0.9)',
                borderRadius:'16px',
                color:'var(--text-secondary)'
              }}>
                <div style={{fontSize:'48px', marginBottom:'16px'}}>🏷️</div>
                <h3>No brands found</h3>
                <p>Start by creating your first brand!</p>
              </div>
            )}
            {brands.map((b) => (
              <div key={b.brandID} className="brand-card">
                <div className="brand-avatar">
                  {b.brandName ? b.brandName.charAt(0).toUpperCase() : '?'}
                </div>
                
                <div className="brand-content">
                  <h3 className="brand-name">
                    🏷️ {b.brandName}
                  </h3>
                  <div className="brand-country">
                    <span>🌍</span>
                    <strong>Country:</strong> {b.countryOfOrigin}
                  </div>
                </div>
                
                <div className="brand-actions">
                  <button 
                    className="btn primary" 
                    onClick={() => startEdit(b)}
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    className="btn secondary" 
                    onClick={() => handleDelete(b.brandID)}
                    style={{color:'var(--danger)'}}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="brands-sidebar">
        <div className="brand-controls" style={{marginBottom:'24px'}}>
          <div style={{display:'flex',gap:'12px',alignItems:'center', flexDirection:'column'}}>
            <div style={{position:'relative', width:'100%'}}>
              <input 
                placeholder="🌍 Filter by country" 
                value={countryFilter} 
                onChange={(e) => setCountryFilter(e.target.value)}
                style={{paddingLeft:'40px', width:'100%'}}
              />
              <span style={{position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)'}}>🔍</span>
            </div>
            <button className="btn primary" onClick={() => fetchByCountry(countryFilter)} style={{width:'100%'}}>
              Filter
            </button>
            <button className="btn secondary" onClick={fetchAll} style={{width:'100%'}}>
              Reset All
            </button>
          </div>
        </div>

        <form onSubmit={handleSave} className="brand-form" style={{
          background:'rgba(255,255,255,0.95)', 
          padding:'24px', 
          borderRadius:'16px',
          backdropFilter:'blur(20px)',
          border:'1px solid rgba(255,255,255,0.3)',
          boxShadow:'var(--shadow-lg)'
        }}>
          <h3 style={{margin:'0 0 16px 0', color:'var(--text-primary)'}}>
            {editing ? '✏️ Edit Brand' : '➕ New Brand'}
          </h3>
          <input 
            placeholder="✨ Brand name" 
            value={form.brandName} 
            onChange={(e) => setForm({ ...form, brandName: e.target.value })} 
            required 
            style={{marginBottom:'12px'}}
          />
          <input 
            placeholder="🌍 Country of Origin" 
            value={form.countryOfOrigin} 
            onChange={(e) => setForm({ ...form, countryOfOrigin: e.target.value })} 
            required 
            style={{marginBottom:'16px'}}
          />
          <button className="btn primary" type="submit" style={{width:'100%', marginBottom:'8px'}}>
            {editing ? '💾 Update' : '🚀 Create'}
          </button>
          {editing && (
            <button 
              className="btn secondary" 
              type="button" 
              onClick={() => { setEditing(null); setForm({ brandName: '', countryOfOrigin: '' }) }}
              style={{width:'100%'}}
            >
              ❌ Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
