import React from 'react';
import { Home, Bookmark, CalendarCheck, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
export function BottomNav() {
  const location = useLocation();
  // Hide bottom nav on review flow and on plan checkout/pay flows where its own CTA is sticky
  if (
  location.pathname.includes('/review/') ||
  location.pathname.includes('/plan/install/') ||
  location.pathname.includes('/plan/') && (
  location.pathname.includes('/checkout') ||
  location.pathname.includes('/pay')))

  return null;
  const navItems = [
  {
    icon: Home,
    label: 'Home',
    path: '/activities'
  },
  {
    icon: Bookmark,
    label: 'Saved',
    path: '#'
  },
  {
    icon: CalendarCheck,
    label: 'Bookings',
    path: '/bookings'
  },
  {
    icon: User,
    label: 'Profile',
    path: '#'
  }];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-[#121212] border-t border-gray-800 px-6 py-3 flex justify-between items-center z-40">
      {navItems.map((item, idx) => {
        const Icon = item.icon;
        const isActive =
        location.pathname === item.path ||
        item.path === '/activities' &&
        location.pathname.startsWith('/activity/');
        return (
          <Link
            key={idx}
            to={item.path}
            className="flex flex-col items-center gap-1">
            
            <Icon
              size={20}
              className={isActive ? 'text-district-purple' : 'text-gray-400'} />
            
            <span
              className={`text-[10px] ${isActive ? 'text-district-purple' : 'text-gray-400'}`}>
              
              {item.label}
            </span>
          </Link>);

      })}
    </div>);

}