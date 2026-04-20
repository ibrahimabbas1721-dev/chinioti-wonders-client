import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProducts, getCategories } from '../services/api'
import ProductCard from '../components/ProductCard'

export default function Catalog() {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || '')
  const [activeFilter, setActiveFilter] = useState(
    searchParams.get('newArrival') ? 'newArrival' :
    searchParams.get('bestSeller') ? 'bestSeller' : ''
  )

  // Fetch categories once
  useEffect(() => {
    getCategories().then(res => setCategories(res.data)).catch(console.error)
  }, [])

  // Fetch products whenever filters change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const params = {}
        if (activeCategory) params.category = activeCategory
        if (activeFilter === 'newArrival') params.newArrival = true
        if (activeFilter === 'bestSeller') params.bestSeller = true
        if (search) params.search = search
        const res = await getProducts(params)
        setProducts(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [activeCategory, activeFilter, search])

  const handleCategoryClick = (id) => {
    setActiveCategory(id)
    setActiveFilter('')
  }

  const handleFilterClick = (filter) => {
    setActiveFilter(prev => prev === filter ? '' : filter)
    setActiveCategory('')
  }

  const clearAll = () => {
    setActiveCategory('')
    setActiveFilter('')
    setSearch('')
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ── PAGE HEADER ── */}
      <section className="bg-amber-900 text-white py-10 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">Our Furniture Catalog</h1>
        <p className="text-amber-200 text-sm">Browse our full collection of handcrafted wooden furniture</p>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ── SEARCH BAR ── */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search furniture..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-96 border border-amber-300 rounded-full px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* ── FILTERS ── */}
        <div className="flex flex-wrap gap-2 mb-8">

          {/* All */}
          <button
            onClick={clearAll}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
              !activeCategory && !activeFilter
                ? 'bg-amber-900 text-white border-amber-900'
                : 'bg-white text-amber-900 border-amber-300 hover:bg-amber-50'
            }`}
          >
            All
          </button>

          {/* New Arrivals */}
          <button
            onClick={() => handleFilterClick('newArrival')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
              activeFilter === 'newArrival'
                ? 'bg-amber-900 text-white border-amber-900'
                : 'bg-white text-amber-900 border-amber-300 hover:bg-amber-50'
            }`}
          >
            New Arrivals
          </button>

          {/* Best Sellers */}
          <button
            onClick={() => handleFilterClick('bestSeller')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
              activeFilter === 'bestSeller'
                ? 'bg-amber-900 text-white border-amber-900'
                : 'bg-white text-amber-900 border-amber-300 hover:bg-amber-50'
            }`}
          >
            Best Sellers
          </button>

          {/* Category Filters */}
          {categories.map(cat => (
            <button
              key={cat._id}
              onClick={() => handleCategoryClick(cat._id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                activeCategory === cat._id
                  ? 'bg-amber-900 text-white border-amber-900'
                  : 'bg-white text-amber-900 border-amber-300 hover:bg-amber-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* ── PRODUCT COUNT ── */}
        {!loading && (
          <p className="text-sm text-gray-400 mb-4">
            {products.length} product{products.length !== 1 ? 's' : ''} found
          </p>
        )}

        {/* ── PRODUCTS GRID ── */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-amber-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🪑</p>
            <p className="text-lg font-medium">No products found</p>
            <button onClick={clearAll} className="mt-4 text-amber-700 hover:underline text-sm">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

      </div>
    </main>
  )
}