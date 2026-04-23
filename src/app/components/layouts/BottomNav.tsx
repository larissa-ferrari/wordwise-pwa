import React from 'react';
import { Home, Compass, PlusCircle, BookMarked, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'feed', icon: Home, label: 'Feed' },
    { id: 'discover', icon: Compass, label: 'Descobrir' },
    { id: 'review', icon: PlusCircle, label: 'Review' },
    { id: 'shelves', icon: BookMarked, label: 'Estantes' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1a1210] border-t border-[#c8a96e]/20 px-4 pb-safe z-50">
      <div className="max-w-md mx-auto flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isReview = tab.id === 'review';

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] transition-all ${
                isReview ? 'relative -mt-8' : ''
              }`}
            >
              <div
                className={`flex items-center justify-center transition-all ${
                  isReview
                    ? 'w-14 h-14 rounded-full bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] shadow-lg shadow-[#c8a96e]/30'
                    : isActive
                    ? 'w-10 h-10 rounded-full bg-[#c8a96e]/10'
                    : 'w-10 h-10'
                }`}
              >
                <Icon
                  size={isReview ? 28 : 22}
                  className={
                    isReview
                      ? 'text-[#1a1210]'
                      : isActive
                      ? 'text-[#c8a96e]'
                      : 'text-[#8a7e6e]'
                  }
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              <span
                className={`text-[10px] mt-1 transition-colors ${
                  isReview ? 'hidden' : isActive ? 'text-[#c8a96e]' : 'text-[#8a7e6e]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
