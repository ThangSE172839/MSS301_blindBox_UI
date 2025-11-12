import { mockUsers, mockBrands, mockBlindBoxes } from './mockData'

// Development mode - set to false để sử dụng direct services
const USE_MOCK_API = false

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class MockAPIClient {
  constructor() {
    this.brands = [...mockBrands]
    this.blindBoxes = [...mockBlindBoxes]
    this.nextBrandId = Math.max(...this.brands.map(b => b.id)) + 1
  }

  async post(endpoint, data) {
    await delay(500) // Simulate network delay
    
    if (endpoint === '/auth/login') {
      const { email, password } = data
      const user = mockUsers.find(u => u.email === email && u.password === password)
      
      if (user) {
        return {
          data: {
            token: user.token,
            email: user.email,
            username: user.username,
            role: user.role
          }
        }
      } else {
        throw {
          response: {
            status: 401,
            data: { message: 'Invalid credentials' }
          }
        }
      }
    }
    
    if (endpoint === '/brands') {
      const newBrand = {
        id: this.nextBrandId++,
        name: data.name,
        country: data.country
      }
      this.brands.push(newBrand)
      return { data: newBrand }
    }
    
    throw new Error(`Mock API: Unsupported POST endpoint ${endpoint}`)
  }

  async get(endpoint) {
    await delay(300)
    
    if (endpoint === '/brands') {
      return { data: this.brands }
    }
    
    if (endpoint.startsWith('/brands/country/')) {
      const country = endpoint.split('/').pop()
      const filtered = this.brands.filter(b => 
        b.country.toLowerCase().includes(country.toLowerCase())
      )
      return { data: filtered }
    }
    
    if (endpoint === '/blind-boxes') {
      return { data: this.blindBoxes }
    }
    
    if (endpoint.startsWith('/blind-boxes/category/')) {
      const categoryId = parseInt(endpoint.split('/').pop())
      const filtered = this.blindBoxes.filter(b => b.categoryID === categoryId)
      return { data: filtered }
    }
    
    if (endpoint.startsWith('/blind-boxes/rarity/')) {
      const rarity = endpoint.split('/').pop()
      const filtered = this.blindBoxes.filter(b => 
        b.rarity.toLowerCase() === rarity.toLowerCase()
      )
      return { data: filtered }
    }
    
    throw new Error(`Mock API: Unsupported GET endpoint ${endpoint}`)
  }

  async put(endpoint, data) {
    await delay(400)
    
    if (endpoint.startsWith('/brands/')) {
      const id = parseInt(endpoint.split('/').pop())
      const index = this.brands.findIndex(b => b.id === id)
      
      if (index !== -1) {
        this.brands[index] = { ...this.brands[index], ...data }
        return { data: this.brands[index] }
      }
    }
    
    throw new Error(`Mock API: Unsupported PUT endpoint ${endpoint}`)
  }

  async delete(endpoint) {
    await delay(300)
    
    if (endpoint.startsWith('/brands/')) {
      const id = parseInt(endpoint.split('/').pop())
      const index = this.brands.findIndex(b => b.id === id)
      
      if (index !== -1) {
        this.brands.splice(index, 1)
        return { data: { success: true } }
      }
    }
    
    throw new Error(`Mock API: Unsupported DELETE endpoint ${endpoint}`)
  }
}

export { USE_MOCK_API }
export default new MockAPIClient()