import axios from 'axios'
import mockClient, { USE_MOCK_API } from './mockClient'
import { accountClient, brandsClient, blindboxesClient } from './directServices'

// API Gateway client (không dùng nữa)
const API_BASE = 'http://localhost:8088/api'
const gatewayClient = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

gatewayClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Export clients dựa trên mode
const client = USE_MOCK_API ? mockClient : gatewayClient

export default client
export { USE_MOCK_API, accountClient, brandsClient, blindboxesClient }
