import axios from 'axios'

// Direct service endpoints (không qua gateway)
const SERVICES = {
  ACCOUNT: 'http://localhost:8081',     // MSAccount Service
  BRANDS: 'http://localhost:8082',      // MSBrand Service  
  BLINDBOXES: 'http://localhost:8083'   // MSBlindBox Service
}

// Tạo clients cho từng service
export const accountClient = axios.create({
  baseURL: SERVICES.ACCOUNT,
  headers: { 'Content-Type': 'application/json' }
})

export const brandsClient = axios.create({
  baseURL: SERVICES.BRANDS,
  headers: { 'Content-Type': 'application/json' }
})

export const blindboxesClient = axios.create({
  baseURL: SERVICES.BLINDBOXES,
  headers: { 'Content-Type': 'application/json' }
})

// Add auth header cho tất cả clients
const addAuthInterceptor = (client) => {
  client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
}

addAuthInterceptor(accountClient)
addAuthInterceptor(brandsClient)
addAuthInterceptor(blindboxesClient)

export { SERVICES }