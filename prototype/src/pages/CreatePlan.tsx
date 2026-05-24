import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { activitiesData, createPlan, parsePrice } from '../data';
import {
  ChevronLeft,
  Calendar,
  Clock,
  MessageSquare,
  Users } from
'lucide-react';
export function CreatePlan() {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const activity = activitiesData.find((a) => a.id === activityId);
  const [date, setDate] = useState('Sat, 24 May');
  const [time, setTime] = useState('5:00 PM');
  const [deadline, setDeadline] = useState('Thu, 11:59 PM');
  const [message, setMessage] = useState('');
  if (!activity) return <div className="p-8 text-white">Activity not found</div>;
  const pricePerTicket = parsePrice(activity.price);
  const handleCreate = () => {
    const newPlan = createPlan({
      activityId: activity.id,
      hostName: 'You',
      visitDate: date,
      timeSlot: time,
      deadline,
      message: message || undefined,
      pricePerTicket
    });
    navigate(`/plan/${newPlan.id}`);
  };
  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24">
      {/* Header */}
      <div className="pt-4 pb-3 px-4 flex items-center gap-3 border-b border-gray-800 sticky top-0 bg-[#0a0a0a] z-20">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <ChevronLeft size={24} className="text-white" />
        </button>
        <h1 className="text-lg font-bold text-white">Plan with Friends</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Venue Summary */}
        <div className="bg-[#1c1c1e] rounded-2xl p-3 flex gap-3 border border-gray-800">
          <img
            src={activity.image}
            alt=""
            className="w-20 h-20 rounded-xl object-cover" />
          
          <div className="flex flex-col justify-center">
            <h2 className="font-bold text-white text-[15px] mb-1">
              {activity.name}
            </h2>
            <p className="text-sm text-gray-400 mb-1">{activity.location}</p>
            <p className="text-sm font-semibold text-white">
              ₹{pricePerTicket.toLocaleString()}{' '}
              <span className="text-xs text-gray-500 font-normal">
                per person
              </span>
            </p>
          </div>
        </div>

        {/* Date Picker */}
        <div>
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Calendar size={16} className="text-district-purple" />
            Select Date
          </h3>
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
            {['Fri, 23 May', 'Sat, 24 May', 'Sun, 25 May', 'Mon, 26 May'].map(
              (d) =>
              <button
                key={d}
                onClick={() => setDate(d)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap border ${date === d ? 'bg-district-purple/20 border-district-purple text-district-purple' : 'bg-[#1c1c1e] border-gray-800 text-gray-300'}`}>
                
                  {d}
                </button>

            )}
          </div>
        </div>

        {/* Time Picker */}
        <div>
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Clock size={16} className="text-district-purple" />
            Select Time
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {['11:00 AM', '2:00 PM', '5:00 PM', '8:00 PM'].map((t) =>
            <button
              key={t}
              onClick={() => setTime(t)}
              className={`py-2.5 rounded-xl text-sm font-medium border ${time === t ? 'bg-district-purple/20 border-district-purple text-district-purple' : 'bg-[#1c1c1e] border-gray-800 text-gray-300'}`}>
              
                {t}
              </button>
            )}
          </div>
        </div>

        {/* Deadline Picker */}
        <div>
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Users size={16} className="text-district-purple" />
            Confirm By
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            Friends must confirm before this deadline.
          </p>
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
            {['Today 11:59 PM', 'Tomorrow 11:59 PM', 'Thu, 11:59 PM'].map(
              (d) =>
              <button
                key={d}
                onClick={() => setDeadline(d)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap border ${deadline === d ? 'bg-district-purple/20 border-district-purple text-district-purple' : 'bg-[#1c1c1e] border-gray-800 text-gray-300'}`}>
                
                  {d}
                </button>

            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <MessageSquare size={16} className="text-district-purple" />
            Note for Friends{' '}
            <span className="text-gray-500 font-normal">(Optional)</span>
          </h3>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Bhai Saturday plan at ${activity.name}, ₹${pricePerTicket} per head, confirm by Thursday`}
            className="w-full bg-[#1c1c1e] border border-gray-800 rounded-xl p-3 text-sm text-white placeholder-gray-600 h-24 resize-none focus:outline-none focus:border-district-purple" />
          
        </div>
      </div>

      {/* Sticky Bottom */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[420px] mx-auto bg-[#0a0a0a] border-t border-gray-800 p-4 z-50">
        <button
          onClick={handleCreate}
          className="w-full bg-district-purple text-white py-3.5 rounded-2xl font-bold text-[15px]">
          
          Create Plan & Get Link
        </button>
      </div>
    </div>);

}