import { Link } from 'react-router-dom';
import { thumbnailImage } from '../utils/cloudinary';

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/catalog?category=${category._id}`}
      className="relative bg-amber-100 hover:bg-amber-200 rounded-xl overflow-hidden h-40 flex items-end p-4 transition group shadow"
    >
      {category.image && (
        <img
          src={thumbnailImage(category.image)}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-300"
          loading="lazy"
        />
      )}
      <div className="relative z-10 bg-amber-900 bg-opacity-70 text-white text-sm font-semibold px-3 py-1 rounded-full">
        {category.name}
      </div>
    </Link>
  );
}
