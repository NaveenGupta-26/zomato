import React from 'react';
import { Bookmark, Tag, Star } from 'lucide-react';
import { Activity } from '../data';
import { Link } from 'react-router-dom';
interface ActivityCardProps {
  activity: Activity;
  className?: string;
}
export function ActivityCard({
  activity,
  className = 'w-[240px]'
}: ActivityCardProps) {
  return (
    <Link
      to={`/activity/${activity.id}`}
      className={`block flex-shrink-0 ${className}`}>
      
      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-3 bg-gray-800">
        <img
          src={activity.image}
          alt={activity.name}
          className="w-full h-full object-cover" />
        
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <Bookmark size={16} className="text-white" />
        </div>
      </div>

      <h3 className="font-bold text-white text-base mb-1 truncate">
        {activity.name}
      </h3>

      {/* NEW: Star Ratings Widget */}
      {activity.reviewCount > 0 &&
      <div className="flex items-center gap-1 mb-1">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-semibold text-white">
            {activity.rating.toFixed(1)}
          </span>
          <span className="text-sm text-gray-400">
            ({activity.reviewCount})
          </span>
        </div>
      }

      <p className="text-sm text-gray-400 mb-2 truncate">
        {activity.distance} | {activity.price}
      </p>

      {activity.offer &&
      <div className="flex items-center gap-1 text-district-green">
          <Tag size={14} className="fill-district-green" />
          <span className="text-xs font-medium truncate">{activity.offer}</span>
        </div>
      }
    </Link>);

}