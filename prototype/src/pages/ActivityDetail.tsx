import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { activitiesData, Activity, Review } from '../data';
import {
  ChevronLeft,
  Bookmark,
  Upload,
  Star,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  MapPin,
  Languages,
  Users,
  Ticket,
  Baby,
  FileText,
  Tag } from
'lucide-react';
import { Link } from 'react-router-dom';
export function ActivityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  useEffect(() => {
    const found = activitiesData.find((a) => a.id === id);
    if (found) {
      const localReviewsStr = localStorage.getItem(`reviews_${id}`);
      if (localReviewsStr) {
        const localReviews = JSON.parse(localReviewsStr);
        setActivity({
          ...found,
          reviews: [...localReviews, ...found.reviews],
          reviewCount: found.reviewCount + localReviews.length,
          rating:
          (found.rating * found.reviewCount +
          localReviews.reduce(
            (acc: number, r: Review) => acc + r.rating,
            0
          )) / (
          found.reviewCount + localReviews.length)
        });
      } else {
        setActivity(found);
      }
    }
  }, [id]);
  if (!activity) return <div className="p-8 text-center">Loading...</div>;
  const thingsToKnow = [
  {
    icon: Languages,
    label: 'Activity will be in English, Hindi'
  },
  {
    icon: Users,
    label: 'Ticket needed for all ages'
  },
  {
    icon: Ticket,
    label: 'Entry allowed for all ages'
  },
  {
    icon: Baby,
    label: 'Kid friendly'
  }];

  const visibleReviews = showAllReviews ?
  activity.reviews :
  activity.reviews.slice(0, 3);
  return (
    <div className="pb-32 relative bg-[#0a0a0a] min-h-screen">
      {/* Hero Image — extends to top */}
      <div className="relative w-full h-[280px] overflow-hidden">
        <img
          src={activity.image}
          alt={activity.name}
          className="w-full h-full object-cover" />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40"></div>

        {/* Top Nav Overlay */}
        <div className="absolute top-0 left-0 right-0 pt-3 px-4 flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
              
              <ChevronLeft size={22} className="text-white" />
            </button>
            <h2 className="text-white font-bold text-lg drop-shadow-md">
              {activity.name}
            </h2>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
              <Bookmark size={18} className="text-white" />
            </button>
            <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
              <Upload size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Sheet with drag handle */}
      <div className="relative -mt-6 bg-[#0a0a0a] rounded-t-3xl z-10 pt-3 pb-6">
        {/* Drag handle */}
        <div className="flex justify-center mb-2">
          <div className="w-10 h-1 bg-gray-600 rounded-full"></div>
        </div>

        {/* Category pills */}
        <div className="px-5 mb-3">
          <div className="flex gap-2">
            <span className="px-3 py-1 rounded-full border border-gray-700 text-xs text-gray-300 font-medium">
              {activity.category}
            </span>
            <span className="px-3 py-1 rounded-full border border-gray-700 text-xs text-gray-300 font-medium">
              Game Zones
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="px-5 mb-1">
          <h1 className="text-[28px] font-bold text-white leading-tight">
            {activity.name}
          </h1>
        </div>

        {/* Date range — yellow */}
        <div className="px-5 mb-5">
          <p className="text-[#e5b94a] text-base font-medium">
            Thu, 21 May – Sun, 31 May, Multiple slots
          </p>
        </div>

        {/* Location card */}
        <div className="px-5 mb-6">
          <div className="flex items-start gap-3 py-2">
            <div className="w-11 h-11 rounded-xl bg-[#1c1c1e] flex items-center justify-center flex-shrink-0">
              <MapPin size={20} className="text-gray-300" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium text-[15px] leading-snug">
                {activity.name} - Trampoline Park | Bowling, Go - Karting | Kids
                Fun zone, {activity.location}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                {activity.distance} away
              </p>
            </div>
            <ChevronRight size={20} className="text-gray-500 mt-3" />
          </div>
        </div>

        {/* About */}
        <div className="px-5 mb-8">
          <h2 className="text-xl font-bold text-white mb-3">
            About the activity
          </h2>
          <p className="text-gray-300 text-[15px] leading-relaxed line-clamp-4">
            {activity.description} Known for its exciting range of activities
            such as bowling, arcade games, VR games, Laser Wars, Go Karting &
            dance game to show your peppy moves, bu...
          </p>
          <button className="flex items-center gap-1 text-white font-semibold text-sm mt-2">
            Read more <ChevronRight size={16} />
          </button>
        </div>

        {/* Things to Know */}
        <div className="px-5 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Things to Know</h2>
          <div>
            {thingsToKnow.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 py-4 border-b border-gray-800/60 last:border-0">
                  
                  <Icon size={22} className="text-gray-400 flex-shrink-0" />
                  <span className="text-white text-[15px]">{item.label}</span>
                </div>);

            })}
          </div>
          <button className="flex items-center gap-1 text-white font-semibold text-sm mt-3">
            See all <ChevronRight size={16} />
          </button>
        </div>

        {/* ⭐ Ratings & Reviews — the hero feature */}
        <div className="px-5 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">
            Ratings & Reviews
          </h2>

          {activity.reviewCount === 0 ?
          <div className="bg-[#141414] rounded-2xl p-6 text-center border border-gray-800/60">
              <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star size={24} className="text-gray-600" />
              </div>
              <h3 className="text-white font-bold mb-1">No reviews yet</h3>
              <p className="text-gray-400 text-sm">
                Be the first to review this activity after your visit.
              </p>
            </div> :

          <>
              {/* Aggregate summary */}
              <div className="flex items-center gap-5 mb-5">
                <div>
                  <div className="text-4xl font-black text-white leading-none flex items-baseline gap-1">
                    {activity.rating.toFixed(1)}
                    <Star
                    size={20}
                    className="text-yellow-400 fill-yellow-400" />
                  
                  </div>
                  <div className="text-xs text-gray-400 mt-1.5">
                    {activity.reviewCount} reviews
                  </div>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((star) => {
                  const percentages: Record<number, number> = {
                    5: 68,
                    4: 22,
                    3: 7,
                    2: 2,
                    1: 1
                  };
                  const pct = percentages[star];
                  return (
                    <div key={star} className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] text-gray-500 w-3">
                          {star}
                        </span>
                        <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{
                            width: `${pct}%`
                          }}>
                        </div>
                        </div>
                      </div>);

                })}
                </div>
              </div>

              {/* Verified label */}
              <div className="flex items-center gap-1.5 text-district-green mb-5">
                <CheckCircle2 size={14} />
                <span className="text-xs font-semibold">
                  Verified District bookings only
                </span>
              </div>

              {/* Sort */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-400">
                  Showing {visibleReviews.length} of {activity.reviewCount}
                </span>
                <button className="flex items-center gap-1 text-sm text-white font-medium">
                  Most Recent <ChevronDown size={14} />
                </button>
              </div>

              {/* Review List */}
              <div className="space-y-5">
                {visibleReviews.map((review) =>
              <div
                key={review.id}
                className="border-b border-gray-800/60 pb-5 last:border-0">
                
                    <div className="flex justify-between items-start mb-2.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-district-purple to-purple-700 flex items-center justify-center text-white font-bold text-sm">
                          {review.author.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-white text-sm">
                            {review.author}
                          </div>
                          <div className="text-[11px] text-gray-500">
                            Visited {review.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) =>
                    <Star
                      key={i}
                      size={13}
                      className={
                      i < review.rating ?
                      'text-yellow-400 fill-yellow-400' :
                      'text-gray-700 fill-gray-700'
                      } />

                    )}
                      </div>
                    </div>

                    {review.verified &&
                <div className="flex items-center gap-1 text-district-green mb-2">
                        <CheckCircle2 size={11} />
                        <span className="text-[10px] font-semibold uppercase tracking-wide">
                          Verified District Booking
                        </span>
                      </div>
                }

                    {review.text &&
                <p className="text-sm text-gray-300 leading-relaxed mb-3">
                        {review.text}
                      </p>
                }

                    {review.photos && review.photos.length > 0 &&
                <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                        {review.photos.map((photo, idx) =>
                  <img
                    key={idx}
                    src={photo}
                    alt="Review"
                    className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />

                  )}
                      </div>
                }
                  </div>
              )}
              </div>

              {/* See all / collapse */}
              {activity.reviews.length > 3 &&
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="flex items-center gap-1 text-white font-semibold text-sm mt-4">
              
                  {showAllReviews ?
              'Show less' :
              `See all ${activity.reviewCount} reviews`}
                  <ChevronRight size={16} />
                </button>
            }
            </>
          }
        </div>

        {/* More */}
        <div className="px-5 mb-6">
          <h2 className="text-xl font-bold text-white mb-3">More</h2>
          <button className="w-full flex items-center justify-between gap-3 px-4 py-4 rounded-2xl border border-gray-800 bg-transparent">
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-gray-400" />
              <span className="text-white font-semibold text-[15px]">
                Terms and conditions
              </span>
            </div>
            <ChevronRight size={20} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[420px] mx-auto z-50">
        {/* Purple offer banner */}
        {activity.offer &&
        <div className="bg-district-purple px-5 py-3 flex items-center gap-2">
            <Tag size={16} className="text-white" />
            <span className="text-white text-sm font-medium">
              {activity.offer}
            </span>
          </div>
        }

        {/* CTA bar */}
        <div className="bg-[#0a0a0a] border-t border-gray-800/60 px-5 py-3 flex justify-between items-center">
          <div>
            <div className="text-lg font-bold text-white leading-tight">
              {activity.price.split(' ')[0]}
            </div>
            <div className="text-xs text-gray-400">onwards</div>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/plan/create/${activity.id}`}
              className="border border-district-purple text-district-purple px-4 py-3.5 rounded-2xl font-bold text-[15px] flex items-center gap-2">
              
              <Users size={18} />
              Plan
            </Link>
            <button className="bg-white text-black px-6 py-3.5 rounded-2xl font-bold text-[15px]">
              Book tickets
            </button>
          </div>
        </div>
      </div>
    </div>);

}