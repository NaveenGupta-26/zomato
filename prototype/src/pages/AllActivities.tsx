import React from 'react';
import { TopBar } from '../components/TopBar';
import { ActivityCard } from '../components/ActivityCard';
import { activitiesData } from '../data';
import { SlidersHorizontal, Star } from 'lucide-react';
export function AllActivities() {
  const filters = ['Under 5 km', 'Bowling', 'Today', 'Tomorrow'];
  return (
    <div className="pb-6">
      <TopBar />

      <div className="px-4 mb-4">
        <h1 className="text-xl font-bold text-white mb-4">All Activities</h1>

        {/* Filters */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-[#1c1c1e] text-sm font-medium whitespace-nowrap flex-shrink-0">
            <SlidersHorizontal size={16} />
            Filters
          </button>

          {/* NEW: Top Rated Filter */}
          <button className="flex items-center gap-1 px-4 py-2 rounded-full border border-district-purple bg-district-purple/10 text-district-purple text-sm font-medium whitespace-nowrap flex-shrink-0">
            <Star size={14} className="fill-district-purple" />
            Top Rated
          </button>

          {filters.map((filter) =>
          <button
            key={filter}
            className="px-4 py-2 rounded-full border border-gray-700 bg-[#1c1c1e] text-sm font-medium whitespace-nowrap flex-shrink-0">
            
              {filter}
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="px-4 grid grid-cols-2 gap-4">
        {activitiesData.map((activity) =>
        <ActivityCard
          key={activity.id}
          activity={activity}
          className="w-full" />

        )}
      </div>
    </div>);

}