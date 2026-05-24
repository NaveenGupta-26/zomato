import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  activitiesData,
  getPlanById,
  PlanSession as PlanSessionType } from
'../data';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
export function PayShare() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{
            scale: 0.5,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          className="w-20 h-20 bg-district-green rounded-full flex items-center justify-center mb-6">
          
          <CheckCircle2 size={40} className="text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-2 text-center">
          Paid!
        </h2>
        <p className="text-gray-400 text-center mb-8">
          ₹{plan.pricePerTicket.toLocaleString()} sent to {plan.hostName}. They
          will see this update immediately.
        </p>
        <button
          onClick={() => navigate('/activities')}
          className="bg-[#1c1c1e] text-white px-8 py-3 rounded-xl font-bold">
          
          Back to Home
        </button>
      </div>);

  }
  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-28">
      {/* Header */}
      <div className="pt-4 pb-3 px-4 flex items-center justify-between border-b border-gray-800 sticky top-0 bg-[#0a0a0a] z-20">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <ChevronLeft size={24} className="text-white" />
        </button>
        <span className="text-white font-black tracking-tighter">District</span>
        <div className="w-8"></div>
      </div>

      <div className="p-4 pt-8">
        <div className="bg-[#1c1c1e] rounded-3xl border border-gray-800 p-6 text-center relative overflow-hidden shadow-2xl">
          {/* Decorative blur */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-district-purple/20 rounded-full blur-[40px]"></div>

          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-district-purple to-purple-700 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 relative z-10">
            {plan.hostName.charAt(0)}
          </div>

          <p className="text-gray-300 text-sm mb-6 relative z-10">
            <span className="font-bold text-white">{plan.hostName}</span> paid
            for the group booking at {activity.name}.
          </p>

          <div className="mb-6 relative z-10">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">
              Your Share
            </p>
            <h1 className="text-5xl font-black text-white">
              ₹{plan.pricePerTicket.toLocaleString()}
            </h1>
          </div>

          <div className="bg-[#0a0a0a] rounded-xl p-4 text-left relative z-10">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">For</span>
              <span className="text-white font-medium">{activity.name}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Date</span>
              <span className="text-white font-medium">{plan.visitDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Tickets</span>
              <span className="text-white font-medium">1 Adult</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[420px] mx-auto bg-[#0a0a0a] border-t border-gray-800 p-4 z-50">
        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full bg-white text-black py-4 rounded-2xl font-bold text-[15px] flex justify-center items-center gap-2">
          
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


          <>
              <span className="font-black text-xs border border-black rounded px-1">
                UPI
              </span>
              Pay ₹{plan.pricePerTicket.toLocaleString()} to {plan.hostName}
            </>
          }
        </button>
      </div>
    </div>);

}