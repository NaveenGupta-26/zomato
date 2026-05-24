import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  activitiesData,
  getPlanById,
  PlanSession as PlanSessionType } from
'../data';
import { motion } from 'framer-motion';
export function InstallToJoin() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [isInstalling, setIsInstalling] = useState(false);
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
  const handleInstall = () => {
    setIsInstalling(true);
    setTimeout(() => {
      navigate(`/plan/join/${plan.id}`);
    }, 3000);
  };
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-district-purple/20 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="text-center mb-8 relative z-10">
        <div className="w-16 h-16 bg-black border border-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
          <span className="text-white font-black text-2xl tracking-tighter">
            D.
          </span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">
          Your friends are planning something
        </h1>
        <p className="text-gray-400">Install District to join the plan</p>
      </div>

      <div className="w-full bg-[#1c1c1e] rounded-3xl border border-gray-800 p-5 mb-8 relative z-10 shadow-2xl">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-800">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-district-purple to-purple-700 flex items-center justify-center text-white font-bold">
            {plan.hostName.charAt(0)}
          </div>
          <div className="text-left">
            <div className="font-semibold text-white">
              {plan.hostName} invited you
            </div>
            <div className="text-xs text-gray-400">to a group plan</div>
          </div>
        </div>

        <div className="flex gap-4">
          <img
            src={activity.image}
            alt=""
            className="w-20 h-20 rounded-xl object-cover" />
          
          <div className="text-left flex-1">
            <h2 className="font-bold text-white text-[15px] mb-1">
              {activity.name}
            </h2>
            <p className="text-[#e5b94a] text-xs font-medium mb-2">
              {plan.visitDate}
            </p>
            <div className="flex items-center gap-1">
              <div className="flex -space-x-2">
                {plan.members.
                filter((m) => m.status === 'confirmed').
                slice(0, 3).
                map((m, i) =>
                <div
                  key={i}
                  className="w-5 h-5 rounded-full bg-gray-700 border border-[#1c1c1e] flex items-center justify-center text-[8px] text-white font-bold">
                  
                      {m.avatar}
                    </div>
                )}
              </div>
              <span className="text-xs text-gray-400 ml-1">3 going</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full relative z-10">
        <button
          onClick={handleInstall}
          disabled={isInstalling}
          className="w-full bg-district-purple text-white py-4 rounded-2xl font-bold text-[15px] flex justify-center items-center">
          
          {isInstalling ?
          <motion.div
            animate={{
              rotate: 360
            }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: 'linear'
            }}
            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" /> :


          'Install District to Join'
          }
        </button>
        <p className="text-xs text-gray-500 text-center mt-4 px-4">
          After install, you'll land directly inside the plan — no setup needed.
        </p>
      </div>
    </div>);

}