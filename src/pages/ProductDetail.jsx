import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../services/api';
import { WHATSAPP_NUMBER } from '../config';
import { fullImage, mediumImage } from '../utils/cloudinary';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('details');
  const [selectedVariant, setSelectedVariant] = useState(null);

  // const WHATSAPP_NUMBER = '923001234567'
  const placeholder = 'https://placehold.co/600x400/f5e6d3/92400e?text=No+Image';

  useEffect(() => {
    getProduct(id)
      .then(res => setProduct(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-700 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-gray-500">Product not found</p>
        <Link to="/catalog" className="text-amber-700 hover:underline">
          ← Back to Catalog
        </Link>
      </div>
    );

  const images = product.images?.length > 0 ? product.images : [placeholder];

  const selectedOption = selectedVariant
    ? `\nOption: ${selectedVariant.name}`
    : product.variants?.length > 0
      ? '\nOption: Not selected yet'
      : '';

  const whatsappMessage = `Hi! I'm interested in buying:\n\n*${product.name}*\nPrice: Rs. ${
    selectedVariant
      ? Number(selectedVariant.price).toLocaleString()
      : product.price.toLocaleString()
  }${selectedOption}\nMaterial: ${product.material}\nDimensions: ${product.dimensions}\n\nPlease share more details.`;

  // FIX: Defined the missing whatsappLink variable
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-400">
        <Link to="/" className="hover:text-amber-700">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to="/catalog" className="hover:text-amber-700">
          Catalog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-amber-900 font-medium">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16 flex flex-col gap-8">
        {/* ── TOP SECTION ── */}
        <div className="bg-white rounded-2xl shadow p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* ── IMAGE GALLERY ── */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 h-80 md:h-[420px] flex items-center justify-center">
              <img
                src={fullImage(images[activeImage])}
                alt={product.name}
                className="w-full h-full object-contain p-4"
                loading="lazy"
              />
              {/* Image counter */}
              {images.length > 1 && (
                <span className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                  {activeImage + 1} / {images.length}
                </span>
              )}
              {/* Prev / Next arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage(i => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow transition"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setActiveImage(i => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow transition"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-3 transition-all duration-300 flex-shrink-0 ${
                    activeImage === i
                      ? 'border-amber-600 shadow-lg shadow-amber-600/30 scale-110'
                      : 'border-gray-200 hover:border-amber-400 hover:shadow-md hover:scale-105'
                  } hover:opacity-100 opacity-75 cursor-pointer`}
                >
                  <img
                    src={mediumImage(img)}
                    alt=""
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ── PRODUCT INFO ── */}
          <div className="flex flex-col gap-4">
            {/* Category + Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-medium">
                {product.category?.name}
              </span>
              {product.isNewArrival && (
                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                  ✨ New Arrival
                </span>
              )}
              {product.isBestSeller && (
                <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full font-medium">
                  🔥 Best Seller
                </span>
              )}
            </div>

            {/* Name */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3">
              <p className="text-3xl font-bold text-amber-700">
                Rs.{' '}
                {selectedVariant
                  ? Number(selectedVariant.price).toLocaleString()
                  : product.price.toLocaleString()}
              </p>
              {selectedVariant && product.variants?.length > 0 && (
                <span className="text-sm text-gray-400 line-through">
                  Rs. {product.price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Stock */}
            <div>
              {product.inStock ? (
                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                  ✅ In Stock
                </span>
              ) : (
                <span className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full font-medium">
                  ❌ Out of Stock
                </span>
              )}
            </div>

            {/* ── VARIANTS ── */}
            {product.variants && product.variants.length > 0 && (
              <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
                <p className="text-sm font-semibold text-gray-700">Choose an Option:</p>
                <div className="flex flex-col gap-2">
                  {product.variants.map((variant, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() =>
                        setSelectedVariant(
                          (selectedVariant?._id === variant._id || selectedVariant?.name === variant.name) 
                          ? null 
                          : variant
                        )
                      }
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 text-sm font-medium transition
            ${
              selectedVariant?._id === variant._id || selectedVariant?.name === variant.name
                ? 'border-amber-600 bg-amber-50 text-amber-800'
                : 'border-gray-200 hover:border-amber-300 text-gray-700'
            }`}
                    >
                      <span>{variant.name}</span>
                      <span className="font-bold text-amber-700">
                        Rs. {Number(variant.price).toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
                {selectedVariant && (
                  <p className="text-xs text-green-600 font-medium">
                    ✅ Selected: {selectedVariant.name}
                  </p>
                )}
              </div>
            )}

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
              {product.material && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Material</p>
                  <p className="text-sm font-semibold text-gray-700">{product.material}</p>
                </div>
              )}
              {product.dimensions && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Dimensions</p>
                  <p className="text-sm font-semibold text-gray-700">{product.dimensions}</p>
                </div>
              )}
              {product.weight && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Weight</p>
                  <p className="text-sm font-semibold text-gray-700">{product.weight}</p>
                </div>
              )}
              {product.color && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Color</p>
                  <p className="text-sm font-semibold text-gray-700">{product.color}</p>
                </div>
              )}
              {product.finish && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Finish</p>
                  <p className="text-sm font-semibold text-gray-700">{product.finish}</p>
                </div>
              )}
              {product.warranty && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Warranty</p>
                  <p className="text-sm font-semibold text-gray-700">{product.warranty}</p>
                </div>
              )}
            </div>

            {/* Delivery Box */}
            <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <span className="text-2xl">🚚</span>
              <div>
                <p className="font-semibold text-amber-800 text-sm">Estimated Delivery</p>
                <p className="text-amber-700 text-sm">
                  {product.deliveryTime || '7-10 business days'}
                </p>
              </div>
            </div>

            {/* Custom Order */}
            {product.customOrderAvailable && (
              <div className="flex gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
                <span className="text-2xl">🛠️</span>
                <div>
                  <p className="font-semibold text-blue-800 text-sm">Custom Order Available</p>
                  <p className="text-blue-700 text-sm">
                    Contact us on WhatsApp for custom sizes & finishes
                  </p>
                </div>
              </div>
            )}

            {/* WhatsApp Button */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-center text-lg transition shadow-lg flex items-center justify-center gap-3 mt-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.135 1.532 5.88L.057 23.997l6.306-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.369l-.36-.214-3.733.979 1.001-3.648-.235-.374A9.818 9.818 0 1112 21.818z" />
              </svg>
              Order on WhatsApp
            </a>

            <Link to="/catalog" className="text-center text-sm text-amber-700 hover:underline">
              ← Back to Catalog
            </Link>
          </div>
        </div>

        {/* ── TABS SECTION ── */}
        <div className="bg-white rounded-2xl shadow p-6 md:p-10">
          {/* Tab Buttons */}
          <div className="flex gap-4 border-b border-gray-200 mb-6">
            {['details', 'care', 'shipping'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-semibold capitalize border-b-2 transition ${
                  activeTab === tab
                    ? 'border-amber-700 text-amber-700'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab === 'details' ? '📋 Details' : tab === 'care' ? '🧴 Care' : '📦 Shipping'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'details' && (
            <div className="text-sm text-gray-600 leading-relaxed flex flex-col gap-3">
              <p>{product.description || 'No description available.'}</p>
              <ul className="list-disc list-inside flex flex-col gap-1 text-gray-500">
                {product.material && (
                  <li>
                    Made from <strong>{product.material}</strong>
                  </li>
                )}
                {product.dimensions && (
                  <li>
                    Dimensions: <strong>{product.dimensions}</strong>
                  </li>
                )}
                {product.weight && (
                  <li>
                    Weight: <strong>{product.weight}</strong>
                  </li>
                )}
                {product.finish && (
                  <li>
                    Finish: <strong>{product.finish}</strong>
                  </li>
                )}
                {product.color && (
                  <li>
                    Color: <strong>{product.color}</strong>
                  </li>
                )}
              </ul>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="text-sm text-gray-600 leading-relaxed">
              {product.careInstructions ? (
                <p>{product.careInstructions}</p>
              ) : (
                <ul className="list-disc list-inside flex flex-col gap-2 text-gray-500">
                  <li>Wipe with a soft dry cloth regularly</li>
                  <li>Avoid direct sunlight for extended periods</li>
                  <li>Keep away from moisture and water</li>
                  <li>Use furniture polish every 3-6 months</li>
                  <li>Avoid placing hot items directly on the surface</li>
                </ul>
              )}
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="text-sm text-gray-600 flex flex-col gap-3">
              <div className="flex gap-3 items-start">
                <span className="text-xl">🚚</span>
                <div>
                  <p className="font-semibold text-gray-700">Delivery Time</p>
                  <p>{product.deliveryTime || '7-10 business days'}</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-xl">📍</span>
                <div>
                  <p className="font-semibold text-gray-700">Delivery Area</p>
                  <p>
                    Available across Pakistan. Contact us on WhatsApp for delivery charges to your
                    city.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-xl">📦</span>
                <div>
                  <p className="font-semibold text-gray-700">Packaging</p>
                  <p>
                    All furniture is carefully packed and wrapped to prevent damage during transit.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-xl">💬</span>
                <div>
                  <p className="font-semibold text-gray-700">Order Process</p>
                  <p>
                    Click "Order on WhatsApp", confirm your order, share your address, and we'll
                    arrange delivery.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}