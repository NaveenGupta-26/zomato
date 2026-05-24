import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  activitiesData,
  getPlanById,
  PlanSession as PlanSessionType } from
'../data';
import {
  ChevronLeft,
  Share2,
  Copy,
  Clock,
  CheckCircle2,
  XCircle,
  UserPlus } from
'lucide-react';
import { motion } from 'framer-motion';
export function PlanSession() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [plan, setPlan] = useState<PlanSessionType | null>(null);
  useEffect(() => {
    if (sessionId) {
      setPlan(getPlanById(sessionId));
    }
  }, [sessionId]);
  const activity = plan ?
  activitiesData.find((a) => a.id === plan.activityId) :
  null;
  if (!plan || !activity) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6">
        <h2 className="text-white text-xl font-bold mb-2">Plan not found</h2>
        <p className="text-gray-400 text-sm mb-6 text-center">
          This plan may have expired or been deleted.
        </p>
        <button
          onClick={() => navigate('/activities')}
          className="bg-district-purple text-white px-6 py-3 rounded-xl font-bold">
          
          Back to Activities
        </button>
      </div>);

  }
  const confirmedMembers = plan.members.filter((m) => m.status === 'confirmed');
  const totalTickets = confirmedMembers.reduce(
    (acc, m) => acc + m.ticketCount,
    0
  );
  const totalPrice = totalTickets * plan.pricePerTicket;
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-28">
      {/* Header */}
      <div className="pt-4 pb-3 px-4 flex items-center justify-between border-b border-gray-800 sticky top-0 bg-[#0a0a0a] z-20">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/activities')} className="p-1 -ml-1">
            <ChevronLeft size={24} className="text-white" />
          </button>
          <h1 className="text-lg font-bold text-white">Group Plan</h1>
        </div>
        <button className="p-1">
          <Share2 size={20} className="text-white" />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Venue Hero */}
        <Link
          to={`/activity/${activity.id}`}
          className="block relative h-40 rounded-2xl overflow-hidden">
          
          <img
            src={activity.image}
            alt=""
            className="w-full h-full object-cover" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-3 left-4 right-4">
            <h2 className="text-xl font-bold text-white mb-1">
              {activity.name}
            </h2>
            <p className="text-[#e5b94a] text-sm font-medium">
              {plan.visitDate} • {plan.timeSlot}
            </p>
          </div>
        </Link>

        {/* Countdown */}
        <div className="bg-[#1c1c1e] border border-gray-800 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
            <Clock size={20} className="text-gray-300" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Confirm by {plan.deadline}</p>
            <p className="text-white font-bold text-[15px]">1d 14h 23m left</p>
          </div>
        </div>

        {/* Share Card */}
        <div className="bg-gradient-to-br from-district-purple/20 to-[#1c1c1e] border border-district-purple/30 rounded-2xl p-5 text-center">
          <p className="text-sm text-gray-300 mb-2">Session Code</p>
          <div className="text-3xl font-black text-white tracking-[0.25em] mb-4">
            {plan.sessionCode.split('').join(' ')}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 bg-[#2a2a2a] text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
              
              {copied ?
              <CheckCircle2 size={16} className="text-district-green" /> :

              <Copy size={16} />
              }
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <button className="flex-1 bg-[#25D366] text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
              <Share2 size={16} />
              WhatsApp
            </button>
          </div>
        </div>

        {/* Members List */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">
            Going{' '}
            <span className="text-gray-500 font-normal text-sm ml-1">
              ({confirmedMembers.length} of {plan.members.length} confirmed)
            </span>
          </h3>

          <div className="space-y-3">
            {plan.members.map((member, idx) =>
            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: idx * 0.1
              }}
              key={member.id}
              className="bg-[#1c1c1e] border border-gray-800 rounded-2xl p-3 flex items-center gap-3">
              
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {member.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-[15px]">
                      {member.name}
                    </span>
                    {member.isHost &&
                  <span className="bg-district-purple/20 text-district-purple text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">
                        Host
                      </span>
                  }
                  </div>
                  {member.status === 'confirmed' &&
                <p className="text-xs text-gray-400">
                      {member.ticketCount} {member.ticketType}
                    </p>
                }
                </div>
                <div>
                  {member.status === 'confirmed' &&
                <div className="flex items-center gap-1 text-district-green">
                      <CheckCircle2 size={14} />
                      <span className="text-xs font-medium">Confirmed</span>
                    </div>
                }
                  {member.status === 'pending' &&
                <div className="flex items-center gap-1 text-gray-500">
                      <Clock size={14} />
                      <span className="text-xs font-medium">Pending</span>
                    </div>
                }
                  {member.status === 'declined' &&
                <div className="flex items-center gap-1 text-red-500">
                      <XCircle size={14} />
                      <span className="text-xs font-medium">Can't make it</span>
                    </div>
                }
                </div>
              </motion.div>
            )}
          </div>

          <button className="w-full mt-3 py-3 border border-dashed border-gray-700 rounded-2xl text-gray-400 text-sm font-medium flex items-center justify-center gap-2 hover:border-district-purple hover:text-district-purple transition-colors">
            <UserPlus size={16} />
            Invite more friends
          </button>
        </div>
      </div>

      {/* Sticky Bottom */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[420px] mx-auto bg-[#0a0a0a] border-t border-gray-800 p-4 z-50">
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-sm text-gray-400">
              Total for {totalTickets} tickets
            </div>
            <div className="text-lg font-bold text-white leading-tight">
              ₹{totalPrice.toLocaleString()}
            </div>
          </div>
          <button
            onClick={() => navigate(`/plan/${plan.id}/checkout`)}
            disabled={confirmedMembers.length <= 1}
            className="bg-district-purple text-white px-6 py-3.5 rounded-2xl font-bold text-[15px] disabled:opacity-50 disabled:bg-gray-800">
            
            {confirmedMembers.length <= 1 ? 'Waiting...' : 'Book for Group'}
          </button>
        </div>
      </div>
    </div>);

}