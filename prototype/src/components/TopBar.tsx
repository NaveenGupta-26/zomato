import React from 'react';
import { MapPin, ChevronDown, Bookmark, User, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
export function TopBar() {
  const location = useLocation();
  const tabs = ['Dining', 'Events', 'IPL', 'Stores', 'Activities', 'Play'];
  return (
    <div className="bg-[#0a0a0a] pt-4 pb-0 sticky top-0 z-40">
      {/* Top Row: Location & Icons */}
      <div className="flex justify-between items-center px-4 mb-4">
        <div className="flex items-start gap-2">
          <MapPin size={20} className="text-white mt-1" />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-white">Delhi/NCR</span>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
            <p className="text-xs text-gray-400">Delhi</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
            <Bookmark size={20} className="text-white" />
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={20} className="text-gray-800" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 mb-4">
        <div className="bg-[#1c1c1e] rounded-full flex items-center px-4 py-3 gap-3">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search for 'Water Parks'"
            className="bg-transparent border-none outline-none text-white w-full placeholder-gray-500 text-sm" />
          
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar px-4 border-b border-gray-800">
        <div className="flex gap-6 pb-0">
          <div className="pb-3 text-gray-400 flex-shrink-0">
            <HomeIcon size={20} />
          </div>
          {tabs.map((tab) => {
            const isActive = tab === 'Activities';
            return (
              <Link
                key={tab}
                to={tab === 'Activities' ? '/activities' : '#'}
                className={`pb-3 text-sm font-medium flex-shrink-0 whitespace-nowrap ${isActive ? 'text-white border-b-2 border-district-purple' : 'text-gray-400'}`}>
                
                {tab}
              </Link>);

          })}
        </div>
      </div>
    </div>);

}
function HomeIcon({ size }: {size: number;}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>);

}