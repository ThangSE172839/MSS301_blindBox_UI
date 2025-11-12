import client, { USE_MOCK_API, accountClient } from './client'

export async function login(email, password) {
  try {
    // Sử dụng direct service hoặc mock
    const apiClient = USE_MOCK_API ? client : accountClient
    const endpoint = '/api/auth/login'  // Direct service endpoint
    
    console.log('Attempting login to:', endpoint)
    console.log('Using client:', USE_MOCK_API ? 'Mock API' : 'Direct Account Service')
    console.log('Base URL:', apiClient.defaults?.baseURL || 'Mock API')
    console.log('Request body:', { email, password })
    
    const resp = await apiClient.post(endpoint, { email, password })
    console.log('Login response:', resp.data)
    return resp.data
  } catch (error) {
    console.error('Login error details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
      baseURL: error.config?.baseURL
    })
    throw error
  }
}

export function saveToken(data) {
  if (data && data.token) {
    localStorage.setItem('token', data.token)
    localStorage.setItem('email', data.email || '')
    localStorage.setItem('username', data.username || '')
    localStorage.setItem('role', data.role || 'USER')
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('email')
  localStorage.removeItem('username')
  localStorage.removeItem('role')
}

export function getToken() {
  return localStorage.getItem('token')
}
