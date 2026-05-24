import React, { useState } from 'react';
import { TopBar } from '../components/TopBar';
import { mockBookings, activitiesData } from '../data';
import { useNavigate } from 'react-router-dom';
import { Star, CheckCircle2 } from 'lucide-react';
export function Bookings() {
  const [activeTab, setActiveTab] = useState('Past');
  const navigate = useNavigate();
  const filteredBookings = mockBookings.filter((b) =>
  activeTab === 'Upcoming' ?
  b.status === 'upcoming' :
  b.status === 'completed'
  );
  return (
    <div className="pb-6">
      <div className="bg-[#0a0a0a] pt-6 pb-4 px-4 sticky top-0 z-40 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-white mb-4">My Bookings</h1>
        <div className="flex gap-6">
          {['Upcoming', 'Past'].map((tab) =>
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-medium ${activeTab === tab ? 'text-white border-b-2 border-district-purple' : 'text-gray-500'}`}>
            
              {tab}
            </button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {filteredBookings.length === 0 ?
        <div className="text-center py-12 text-gray-500">
            No {activeTab.toLowerCase()} bookings found.
          </div> :

        filteredBookings.map((booking) => {
          const activity = activitiesData.find(
            (a) => a.id === booking.activityId
          );
          if (!activity) return null;
          return (
            <div
              key={booking.id}
              className="bg-[#1c1c1e] rounded-2xl overflow-hidden border border-gray-800">
              
                <div className="flex p-4 gap-4">
                  <img
                  src={activity.image}
                  alt=""
                  className="w-20 h-20 rounded-xl object-cover" />
                
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-1">
                      {activity.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">
                      Visited {booking.date}
                    </p>
                    <p className="text-xs text-gray-500">
                      Booking ID: {booking.id.toUpperCase()}-9821
                    </p>
                  </div>
                </div>

                {activeTab === 'Past' &&
              <div className="px-4 pb-4 pt-2 border-t border-gray-800/50 mt-2">
                    {booking.reviewed ?
                <div className="flex items-center gap-2 text-district-green text-sm font-medium">
                        <CheckCircle2 size={16} />
                        Review Submitted
                      </div> :

                <button
                  onClick={() => navigate(`/review/${booking.id}`)}
                  className="w-full py-3 rounded-xl bg-district-purple/10 text-district-purple font-bold text-sm flex items-center justify-center gap-2 border border-district-purple/20">
                  
                        <Star size={16} className="fill-district-purple" />
                        Rate Your Visit
                      </button>
                }
                  </div>
              }
              </div>);

        })
        }
      </div>
    </div>);

}