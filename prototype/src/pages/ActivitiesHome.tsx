import React, { useEffect, useState } from 'react';
import { TopBar } from '../components/TopBar';
import { ActivityCard } from '../components/ActivityCard';
import { activitiesData, mockBookings, mockActivePlan } from '../data';
import { ChevronRight, Star, X, Users, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
export function ActivitiesHome() {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  // Find a pending review
  const pendingBooking = mockBookings.find(
    (b) => b.status === 'completed' && !b.reviewed
  );
  const pendingActivity = pendingBooking ?
  activitiesData.find((a) => a.id === pendingBooking.activityId) :
  null;
  useEffect(() => {
    // Show notification after 2 seconds
    if (pendingActivity) {
      const timer = setTimeout(() => {
        setShowNotification(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [pendingActivity]);
  const categories = [
  {
    name: 'Game Zones',
    icon: '🎳'
  },
  {
    name: 'Water Parks',
    icon: '🌊'
  },
  {
    name: 'Workshops',
    icon: '🎨'
  },
  {
    name: 'Adventure',
    icon: '🪂'
  },
  {
    name: 'Theme Parks',
    icon: '🎢'
  },
  {
    name: 'Kids Play',
    icon: '🏰'
  },
  {
    name: 'Museums',
    icon: '🏛️'
  },
  {
    name: 'Farm',
    icon: '🧺'
  }];

  return (
    <div className="pb-6">
      <TopBar />

      {/* Push Notification Mock */}
      <AnimatePresence>
        {showNotification && pendingActivity && pendingBooking &&
        <motion.div
          initial={{
            y: -100,
            opacity: 0
          }}
          animate={{
            y: 0,
            opacity: 1
          }}
          exit={{
            y: -100,
            opacity: 0
          }}
          className="fixed top-4 left-4 right-4 z-50 bg-[#1c1c1e] rounded-2xl p-4 shadow-2xl border border-gray-800 flex gap-3 max-w-[388px] mx-auto"
          onClick={() => navigate(`/review/${pendingBooking.id}`)}>
          
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
              <img
              src={pendingActivity.image}
              alt=""
              className="w-full h-full object-cover" />
            
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-sm text-white">District</h4>
                <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNotification(false);
                }}
                className="text-gray-400 p-1">
                
                  <X size={14} />
                </button>
              </div>
              <p className="text-sm text-gray-300 mt-1 leading-tight">
                How was your day at {pendingActivity.name}? Rate your experience
                in 30 seconds.
              </p>
            </div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Hero Banner */}
      <div className="px-4 mt-4 mb-8">
        <div className="w-full aspect-[2/1] rounded-2xl overflow-hidden relative">
          <img
            src="./WhatsApp_Image_2026-05-12_at_8.24.36_AM.jpg"
            alt="Summertime Madness"
            className="w-full h-full object-cover" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end items-center pb-4">
            <Link
              to="/activities/all"
              className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2">
              
              Explore activities <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* NEW: Active Plans (Demo Entry Point) */}
      <div className="px-4 mb-8">
        <h2 className="text-lg font-bold text-white mb-3">Active Plans</h2>
        <div
          onClick={() => navigate(`/plan/${mockActivePlan.id}`)}
          className="bg-[#1c1c1e] border border-gray-800 rounded-2xl p-4 flex items-center gap-4 cursor-pointer relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-24 h-24 bg-district-purple/10 rounded-bl-full -z-0"></div>
          <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 relative z-10">
            <img
              src={
              activitiesData.find((a) => a.id === mockActivePlan.activityId)?.
              image
              }
              alt=""
              className="w-full h-full object-cover" />
            
          </div>
          <div className="flex-1 relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Users size={14} className="text-district-purple" />
              <span className="text-xs font-bold text-district-purple uppercase tracking-wider">
                Group Plan
              </span>
            </div>
            <h3 className="font-bold text-white text-[15px] leading-tight mb-1">
              {
              activitiesData.find((a) => a.id === mockActivePlan.activityId)?.
              name
              }
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Clock size={12} />
              <span>Confirm by {mockActivePlan.deadline.split(',')[0]}</span>
              <span className="mx-1">•</span>
              <span>3/5 going</span>
            </div>
          </div>
          <ChevronRight size={20} className="text-gray-500 relative z-10" />
        </div>
      </div>

      {/* NEW: Pending Review Card (Inline entry point) */}
      {pendingActivity && pendingBooking &&
      <div className="px-4 mb-8">
          <div
          onClick={() => navigate(`/review/${pendingBooking.id}`)}
          className="bg-gradient-to-r from-district-purple/20 to-[#1c1c1e] border border-district-purple/30 rounded-2xl p-4 flex items-center justify-between cursor-pointer">
          
            <div>
              <h3 className="font-bold text-white mb-1">Rate your visit ⭐</h3>
              <p className="text-sm text-gray-300">
                How was {pendingActivity.name}?
              </p>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) =>
            <Star key={i} size={20} className="text-gray-600" />
            )}
            </div>
          </div>
        </div>
      }

      {/* Categories */}
      <div className="px-4 mb-8">
        <h2 className="text-lg font-bold text-white mb-4">
          Explore Activities
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {categories.map((cat, idx) =>
          <div key={idx} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-2xl bg-[#1c1c1e] flex items-center justify-center text-3xl">
                {cat.icon}
              </div>
              <span className="text-[11px] font-medium text-gray-300 text-center">
                {cat.name}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Top 10 */}
      <div className="mb-8">
        <div className="px-4 flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white">
            Top 10 in your District
          </h2>
        </div>
        <div className="flex overflow-x-auto hide-scrollbar px-4 gap-4 pb-4">
          {activitiesData.slice(0, 4).map((activity, idx) =>
          <div key={activity.id} className="relative">
              <div className="absolute -left-4 top-10 text-[120px] font-black text-gray-800/30 leading-none z-0 pointer-events-none">
                {idx + 1}
              </div>
              <ActivityCard
              activity={activity}
              className="w-[200px] relative z-10" />
            
            </div>
          )}
        </div>
      </div>

      {/* Amusement Parks */}
      <div className="mb-8">
        <div className="px-4 flex items-center gap-1 mb-4">
          <h2 className="text-lg font-bold text-white">Amusement Parks</h2>
          <ChevronRight size={20} className="text-white" />
        </div>
        <div className="flex overflow-x-auto hide-scrollbar px-4 gap-4 pb-4">
          {activitiesData.
          filter(
            (a) =>
            a.category === 'Amusement Parks' ||
            a.category === 'Theme Parks'
          ).
          map((activity) =>
          <ActivityCard
            key={activity.id}
            activity={activity}
            className="w-[160px]" />

          )}
        </div>
      </div>

      {/* Go Karting */}
      <div className="mb-8">
        <div className="px-4 flex items-center gap-1 mb-4">
          <h2 className="text-lg font-bold text-white">Go Karting</h2>
          <ChevronRight size={20} className="text-white" />
        </div>
        <div className="flex overflow-x-auto hide-scrollbar px-4 gap-4 pb-4">
          {activitiesData.
          filter(
            (a) => a.category === 'Go Karting' || a.category === 'Game Zones'
          ).
          map((activity) =>
          <ActivityCard
            key={activity.id}
            activity={activity}
            className="w-[160px]" />

          )}
        </div>
      </div>
    </div>);

}