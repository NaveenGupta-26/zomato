import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getPlanById,
  PlanSession as PlanSessionType,
  PlanMember } from
'../data';
import { ChevronLeft, CheckCircle2, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
export function PaymentTracker() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<PlanSessionType | null>(null);
  const [members, setMembers] = useState<PlanMember[]>([]);
  const [toast, setToast] = useState('');
  useEffect(() => {
    if (sessionId) {
      const p = getPlanById(sessionId);
      setPlan(p);
      if (p) {
        setMembers(
          p.members.filter((m) => m.status === 'confirmed' && !m.isHost)
        );
      }
    }
  }, [sessionId]);
  if (!plan) {
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
  const paidCount = members.filter((m) => m.paymentStatus === 'paid').length;
  const totalToCollect = members.length;
  const progressPct =
  totalToCollect > 0 ? paidCount / totalToCollect * 100 : 0;
  const handleNudge = (id: string) => {
    setToast('Reminder sent via push notification');
    setTimeout(() => setToast(''), 3000);
    setTimeout(() => {
      setMembers((prev) =>
      prev.map((m) =>
      m.id === id ?
      {
        ...m,
        paymentStatus: 'paid'
      } :
      m
      )
      );
    }, 4000);
  };
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative">
      {toast &&
      <motion.div
        initial={{
          y: -50,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        exit={{
          y: -50,
          opacity: 0
        }}
        className="fixed top-4 left-4 right-4 z-50 bg-[#1c1c1e] border border-gray-800 text-white px-4 py-3 rounded-xl shadow-2xl text-sm font-medium text-center max-w-[388px] mx-auto">
        
          {toast}
        </motion.div>
      }

      {/* Header */}
      <div className="pt-4 pb-3 px-4 flex items-center border-b border-gray-800 sticky top-0 bg-[#0a0a0a] z-20">
        <button onClick={() => navigate('/activities')} className="p-1 -ml-1">
          <ChevronLeft size={24} className="text-white" />
        </button>
        <h1 className="text-lg font-bold text-white ml-2">Split Payments</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Success Banner */}
        <div className="bg-district-green/10 border border-district-green/20 rounded-2xl p-4 text-center">
          <div className="w-12 h-12 bg-district-green rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 size={24} className="text-white" />
          </div>
          <h2 className="text-white font-bold text-lg mb-1">
            Booking Confirmed!
          </h2>
          <p className="text-sm text-district-green">
            Tickets sent to all{' '}
            {plan.members.filter((m) => m.status === 'confirmed').length}{' '}
            friends.
          </p>
        </div>

        {/* Progress */}
        <div className="bg-[#1c1c1e] border border-gray-800 rounded-2xl p-5">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">
                Collecting from {totalToCollect} friends
              </p>
              <h3 className="text-2xl font-bold text-white">
                ₹{(totalToCollect * plan.pricePerTicket).toLocaleString()}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-white">
                {paidCount} of {totalToCollect} paid
              </p>
            </div>
          </div>

          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-district-green rounded-full"
              initial={{
                width: 0
              }}
              animate={{
                width: `${progressPct}%`
              }}
              transition={{
                duration: 0.5
              }} />
            
          </div>
        </div>

        {/* Member List */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Payment Status</h3>
          <div className="space-y-3">
            {members.map((m) =>
            <div
              key={m.id}
              className="bg-[#1c1c1e] border border-gray-800 rounded-2xl p-4 flex items-center justify-between">
              
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
                    {m.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-[15px]">
                      {m.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      ₹{plan.pricePerTicket.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div>
                  {m.paymentStatus === 'paid' ?
                <div className="flex items-center gap-1.5 text-district-green bg-district-green/10 px-3 py-1.5 rounded-lg">
                      <CheckCircle2 size={14} />
                      <span className="text-xs font-bold uppercase">Paid</span>
                    </div> :

                <button
                  onClick={() => handleNudge(m.id)}
                  className="flex items-center gap-1.5 text-gray-300 bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors">
                  
                      <Bell size={14} />
                      <span className="text-xs font-bold uppercase">Nudge</span>
                    </button>
                }
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          You'll get a notification when everyone has paid.
        </p>
      </div>
    </div>);

}