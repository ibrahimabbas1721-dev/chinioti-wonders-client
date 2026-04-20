import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
})

export const getProducts = (params) => API.get('/products', { params })
export const getProduct = (id) => API.get(`/products/${id}`)
export const getCategories = () => API.get('/categories')
export const getVideos = () => API.get('/videos')