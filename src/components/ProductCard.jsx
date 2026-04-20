import { Link } from 'react-router-dom';
import { thumbnailImage } from '../utils/cloudinary';

export default function ProductCard({ product }) {
  const placeholder = 'https://placehold.co/400x300/f5e6d3/92400e?text=No+Image';

  return (
    <Link
      to={`/product/${product._id}`}
      className="group bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition duration-300"
    >
      {/* Image */}
      <div className="overflow-hidden h-52 bg-amber-50">
        <img
          src={thumbnailImage(product.images?.[0]) || placeholder}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <p className="text-amber-700 font-bold text-base">Rs. {product.price.toLocaleString()}</p>
        {product.material && <p className="text-xs text-gray-400">{product.material}</p>}
        <span className="mt-1 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full w-fit">
          {product.category?.name}
        </span>
      </div>
    </Link>
  );
}
