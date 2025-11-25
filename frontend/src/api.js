import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api' })

// Request interceptor - add token to all requests
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token')
  console.log('🚀 API REQUEST:', cfg.method.toUpperCase(), cfg.url)
  console.log('🔑 Token from localStorage:', token ? `${token.substring(0, 20)}...` : 'NO TOKEN')
  
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`
    console.log('✅ Authorization header set:', `Bearer ${token.substring(0, 20)}...`)
  } else {
    console.log('⚠️ No token found in localStorage')
  }
  return cfg
}, error => {
  console.error('❌ Request interceptor error:', error)
  return Promise.reject(error)
})

// Response interceptor - handle 401 errors globally
api.interceptors.response.use(
  response => response,
  error => {
    // Don't auto-logout, just pass the error to the component to handle
    // This allows pages to show specific error messages
    return Promise.reject(error)
  }
)

export default api
