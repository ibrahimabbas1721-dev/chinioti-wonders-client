import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getCategories, getVideos } from '../services/api';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import VideoCard from '../components/VideoCard';
import { WHATSAPP_NUMBER } from '../config';
import heroBg from '../assets/Background.jpg';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [videos, setVideos] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, newRes, bestRes, videoRes] = await Promise.all([
          getCategories(),
          getProducts({ newArrival: true }),
          getProducts({ bestSeller: true }),
          getVideos(),
        ]);
        setCategories(catRes.data);
        setNewArrivals(newRes.data);
        setBestSellers(bestRes.data);
        setVideos(videoRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      {/* ── HERO BANNER ── */}
      <section
        className="relative text-white"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-amber-950/75" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Welcome to <br />
            <span className="text-amber-400">Chinioti Wonders</span>
          </h1>

          <p className=" text-2xl max-w-xl">ہر نقش میں ایک داستاں</p>
          <div className="space-y-2">
            <p className="text-4xl  max-w-lg">
              <strong>
                <span className="text-amber-400">Leading</span>
              </strong>{' '}
              the Digital Era of <br />{' '}
              <strong>
                Furniture <span class="text-amber-400">Craftsmanship</span>
              </strong>
            </p>
          </div>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              to="/catalog"
              className="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8 py-3 rounded-full transition"
            >
              Browse Catalog
            </Link>

            <a
              href="#about"
              className="border border-amber-400 text-amber-300 hover:bg-amber-900 px-8 py-3 rounded-full transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="bg-amber-800 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-sm font-medium text-center">
          <span>🌳 100% Solid Wood</span>
          <span>🚚 Delivery Available</span>
          <span>🛠️ Custom Orders Welcome</span>
          <span>📞 WhatsApp Support</span>
        </div>
      </section>

      {/* ── SHOP BY CATEGORY ── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-amber-900 text-center mb-10">Shop by Category</h2>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-40 bg-amber-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-400">No categories yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map(cat => (
              <CategoryCard key={cat._id} category={cat} />
            ))}
          </div>
        )}
      </section>

      {/* ── NEW ARRIVALS ── */}
      <section className="bg-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-amber-900">New Arrivals</h2>
            <Link
              to="/catalog?newArrival=true"
              className="text-amber-700 hover:underline text-sm font-medium"
            >
              View All →
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 bg-amber-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : newArrivals.length === 0 ? (
            <p className="text-center text-gray-400">No new arrivals yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {newArrivals.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── BEST SELLERS ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-amber-900">Best Sellers</h2>
            <Link
              to="/catalog?bestSeller=true"
              className="text-amber-700 hover:underline text-sm font-medium"
            >
              View All →
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 bg-amber-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : bestSellers.length === 0 ? (
            <p className="text-center text-gray-400">No best sellers yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {bestSellers.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── SOCIAL MEDIA VIDEOS ── */}
      {videos.length > 0 && (
        <section className="bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-white">📱 Watch Our Videos</h2>
                <p className="text-gray-400 text-sm mt-1">
                  Follow us on social media for more content
                </p>
              </div>
            </div>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-96 bg-gray-800 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {videos.map(video => (
                  <VideoCard key={video._id} video={video} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── ABOUT SECTION ── */}
      <section id="about" className="bg-amber-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center flex flex-col gap-6">
          <h2 className="text-3xl font-bold">About Chinioti Wonders</h2>
          <p className="text-amber-200 text-lg leading-relaxed">
            As a top-tier furniture brand in Pakistan, Chinioti Wonders consistently sets the
            standard for style, frequently capturing the spotlight across digital platforms. We are
            driven by a singular mission: to showcase the timeless elegance of our creations to the
            world and establish a formidable presence within the global furniture landscape.
          </p>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-3 rounded-full transition w-fit mx-auto"
          >
            📲 Order on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
