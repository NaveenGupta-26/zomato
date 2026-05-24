import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  activitiesData,
  getPlanById,
  PlanSession as PlanSessionType } from
'../data';
import { ChevronLeft, Info, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
export function PlanCheckout() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
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
  const confirmedMembers = plan.members.filter((m) => m.status === 'confirmed');
  const totalTickets = confirmedMembers.reduce(
    (acc, m) => acc + m.ticketCount,
    0
  );
  const subtotal = totalTickets * plan.pricePerTicket;
  const convenienceFee = 0;
  const total = subtotal + convenienceFee;
  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      navigate(`/plan/${plan.id}/payments`);
    }, 2000);
  };
  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-28">
      {/* Header */}
      <div className="pt-4 pb-3 px-4 flex items-center border-b border-gray-800 sticky top-0 bg-[#0a0a0a] z-20">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <ChevronLeft size={24} className="text-white" />
        </button>
        <h1 className="text-lg font-bold text-white ml-2">Group Booking</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Info Banner */}
        <div className="bg-district-purple/10 border border-district-purple/20 rounded-xl p-3 flex items-start gap-3">
          <Info
            size={18}
            className="text-district-purple mt-0.5 flex-shrink-0" />
          
          <p className="text-sm text-district-purple leading-snug">
            You pay now to secure the booking. District will automatically
            request ₹{plan.pricePerTicket.toLocaleString()} from each friend via
            UPI.
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-[#1c1c1e] rounded-2xl border border-gray-800 overflow-hidden">
          <div className="p-4 border-b border-gray-800 bg-gray-900/50">
            <h2 className="font-bold text-white text-[15px] mb-1">
              {activity.name}
            </h2>
            <p className="text-sm text-gray-400">
              {plan.visitDate} • {plan.timeSlot}
            </p>
          </div>

          <div className="p-4 space-y-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Confirmed Tickets ({totalTickets})
            </h3>
            {confirmedMembers.map((m) =>
            <div
              key={m.id}
              className="flex justify-between items-center text-sm">
              
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center text-[10px]">
                    {m.avatar}
                  </span>
                  {m.name}
                </div>
                <div className="text-white">
                  {m.ticketCount} × ₹{plan.pricePerTicket.toLocaleString()}
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-800 bg-gray-900/50 space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>
                Subtotal ({totalTickets} × ₹
                {plan.pricePerTicket.toLocaleString()})
              </span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Convenience fee</span>
              <span className="text-district-green">FREE</span>
            </div>
            <div className="flex justify-between font-bold text-white text-lg pt-2 border-t border-gray-800 mt-2">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <p className="text-[11px] text-gray-500 pt-1">
              Each friend pays back ₹{plan.pricePerTicket.toLocaleString()}{' '}
              after booking.
            </p>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3">Pay via</h3>
          <div className="bg-[#1c1c1e] border border-district-purple rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center border border-gray-800">
                <span className="text-white font-bold text-xs">UPI</span>
              </div>
              <div>
                <div className="font-semibold text-white">Google Pay</div>
                <div className="text-xs text-gray-500">rohan@okaxis</div>
              </div>
            </div>
            <CheckCircle2 size={20} className="text-district-purple" />
          </div>
        </div>
      </div>

      {/* Sticky Bottom */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[420px] mx-auto bg-[#0a0a0a] border-t border-gray-800 p-4 z-50">
        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full bg-white text-black py-4 rounded-2xl font-bold text-[15px] flex justify-center items-center">
          
          {isProcessing ?
          <motion.div
            animate={{
              rotate: 360
            }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: 'linear'
            }}
            className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full" /> :


          `Pay ₹${total.toLocaleString()} & Confirm`
          }
        </button>
      </div>
    </div>);

}