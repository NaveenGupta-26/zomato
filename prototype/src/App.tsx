import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ActivitiesHome } from './pages/ActivitiesHome';
import { ActivityDetail } from './pages/ActivityDetail';
import { ReviewFlow } from './pages/ReviewFlow';
import { Bookings } from './pages/Bookings';
import { AllActivities } from './pages/AllActivities';
import { CreatePlan } from './pages/CreatePlan';
import { PlanSession } from './pages/PlanSession';
import { JoinPlan } from './pages/JoinPlan';
import { InstallToJoin } from './pages/InstallToJoin';
import { PlanCheckout } from './pages/PlanCheckout';
import { PaymentTracker } from './pages/PaymentTracker';
import { PayShare } from './pages/PayShare';
import { BottomNav } from './components/BottomNav';
export function App() {
  return (
    <HashRouter>
      <div className="flex justify-center w-full min-h-screen bg-black text-white font-sans">
        {/* Mobile Viewport Wrapper — scrolls with the document so fixed CTAs work */}
        <div className="w-full max-w-[420px] bg-[#0a0a0a] min-h-screen relative shadow-2xl pb-20">
          <Routes>
            <Route path="/" element={<Navigate to="/activities" replace />} />
            <Route path="/activities" element={<ActivitiesHome />} />
            <Route path="/activities/all" element={<AllActivities />} />
            <Route path="/activity/:id" element={<ActivityDetail />} />
            <Route path="/review/:bookingId" element={<ReviewFlow />} />
            <Route path="/bookings" element={<Bookings />} />

            {/* Plan with Friends Routes */}
            <Route path="/plan/create/:activityId" element={<CreatePlan />} />
            <Route path="/plan/:sessionId" element={<PlanSession />} />
            <Route path="/plan/join/:sessionId" element={<JoinPlan />} />
            <Route
              path="/plan/install/:sessionId"
              element={<InstallToJoin />} />
            
            <Route
              path="/plan/:sessionId/checkout"
              element={<PlanCheckout />} />
            
            <Route
              path="/plan/:sessionId/payments"
              element={<PaymentTracker />} />
            
            <Route path="/plan/:sessionId/pay" element={<PayShare />} />
          </Routes>
        </div>

        <BottomNav />
      </div>
    </HashRouter>);

}