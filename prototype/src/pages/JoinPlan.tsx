import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  activitiesData,
  getPlanById,
  PlanSession as PlanSessionType } from
'../data';
import { ChevronLeft, MapPin, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export function JoinPlan() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [showTickets, setShowTickets] = useState(false);
  const [plan, setPlan] = useState<PlanSessionType | null>(null);
  useEffect(() => {
    if (sessionId) setPlan(getPlanById(sessionId));
  }, [sessionId]);
  const activity = plan ?
  activitiesData.find((a) => a.id === plan.activityId) :
  null;
  if (!plan || !activity) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6">
        <h2 className="text-white text-xl font-bold mb-2">Plan not found</h2>
        <button
          onClick={() => navigate('/activities')}
          className="bg-district-purple text-white px-6 py-3 rounded-xl font-bold mt-4">
          
          Back to Activities
        </button>
      </div>);

  }
  const handleConfirm = () => {
    navigate(`/plan/${plan.id}`);
  };
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col relative">
      {/* Header */}
      <div className="pt-4 pb-3 px-4 flex items-center border-b border-gray-800">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <ChevronLeft size={24} className="text-white" />
        </button>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-district-purple to-purple-700 flex items-center justify-center text-white font-bold text-2xl mb-4">
          {plan.hostName.charAt(0)}
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">
          {plan.hostName} invited you to a Plan!
        </h1>

        {plan.message &&
        <div className="bg-[#1c1c1e] rounded-xl p-3 mb-8 border border-gray-800 relative">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#1c1c1e] border-t border-l border-gray-800 rotate-45"></div>
            <p className="text-sm text-gray-300 italic relative z-10">
              "{plan.message}"
            </p>
          </div>
        }

        <div className="w-full bg-[#1c1c1e] rounded-2xl border border-gray-800 overflow-hidden mb-8 text-left">
          <img
            src={activity.image}
            alt=""
            className="w-full h-32 object-cover" />
          
          <div className="p-4">
            <h2 className="font-bold text-white text-lg mb-2">
              {activity.name}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
              <Calendar size={14} />
              <span className="text-[#e5b94a] font-medium">
                {plan.visitDate} • {plan.timeSlot}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin size={14} />
              <span>{activity.location}</span>
            </div>
          </div>
        </div>

        <div className="w-full space-y-3">
          <button
            onClick={() => setShowTickets(true)}
            className="w-full bg-district-purple text-white py-4 rounded-2xl font-bold text-[15px]">
            
            I'm in ✓
          </button>
          <button
            onClick={() => navigate('/activities')}
            className="w-full border border-gray-700 text-gray-300 py-4 rounded-2xl font-bold text-[15px]">
            
            Can't make it
          </button>
        </div>

        <button
          onClick={() => navigate(`/activity/${activity.id}`)}
          className="mt-6 text-sm text-gray-500 underline">
          
          Tap here to see venue details first
        </button>
      </div>

      {/* Ticket Selector Sheet */}
      <AnimatePresence>
        {showTickets &&
        <>
            <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            className="absolute inset-0 bg-black/60 z-40"
            onClick={() => setShowTickets(false)} />
          
            <motion.div
            initial={{
              y: '100%'
            }}
            animate={{
              y: 0
            }}
            exit={{
              y: '100%'
            }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 200
            }}
            className="absolute bottom-0 left-0 right-0 bg-[#1c1c1e] rounded-t-3xl z-50 p-6">
            
              <h3 className="text-xl font-bold text-white mb-6">
                How many tickets?
              </h3>

              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="font-semibold text-white">Adult</div>
                  <div className="text-sm text-gray-400">
                    ₹{plan.pricePerTicket.toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-white">
                    -
                  </button>
                  <span className="text-lg font-bold text-white">1</span>
                  <button className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
                    +
                  </button>
                </div>
              </div>

              <button
              onClick={handleConfirm}
              className="w-full bg-district-purple text-white py-4 rounded-2xl font-bold text-[15px]">
              
                Confirm Attendance
              </button>
            </motion.div>
          </>
        }
      </AnimatePresence>
    </div>);

}