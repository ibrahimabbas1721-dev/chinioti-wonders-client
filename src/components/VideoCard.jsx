import { PLATFORMS } from '../utils/platforms'
import { thumbnailImage } from '../utils/cloudinary'

export default function VideoCard({ video }) {
  const platform = PLATFORMS[video.platform] || PLATFORMS.tiktok
  const placeholder = 'https://placehold.co/400x300/1a1a1a/ffffff?text=Video'

  return (
    <a
      href={video.videoUrl}
      target="_blank"
      rel="noreferrer"
      className="group relative bg-black rounded-xl overflow-hidden shadow hover:shadow-xl transition duration-300 block"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[9/16] overflow-hidden">
        <img
          src={thumbnailImage(video.thumbnail) || placeholder}
          alt={video.title || 'Video'}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300 opacity-90 group-hover:opacity-70"
          loading="lazy"
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300">
            <svg
              className="w-6 h-6 text-gray-800 ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Platform Badge */}
        <div
          className={`absolute top-3 left-3 ${platform.color} text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1`}
        >
          <span>{platform.icon}</span>
          <span>{platform.label}</span>
        </div>
      </div>

      {/* Title */}
      <div className="p-3 bg-gray-900">
        <p className="text-white text-sm font-medium line-clamp-2 leading-snug">
          {video.title}
        </p>
        <p className="text-gray-400 text-xs mt-1">
          Click to watch on {platform.label} →
        </p>
      </div>
    </a>
  )
}