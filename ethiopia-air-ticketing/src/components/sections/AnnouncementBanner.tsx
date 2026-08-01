"use client";

import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  active: boolean;
}

export default function AnnouncementBanner() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Filter only active announcements
          setAnnouncements(data.filter((a) => a.active));
        }
      })
      .catch((err) => console.error("Error loading announcements:", err));
  }, []);

  if (!isVisible || announcements.length === 0) return null;

  const current = announcements[currentIndex];

  return (
    <div className="bg-brand-900 text-white px-4 py-2.5 text-xs sm:text-sm font-medium relative z-50 border-b border-brand-gold/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="p-1 bg-brand-gold/20 text-brand-gold rounded-full shrink-0">
            <Bell className="w-3.5 h-3.5 animate-bounce" />
          </span>
          <p className="truncate">
            <strong className="text-brand-gold mr-1.5">{current.title}:</strong> 
            {current.content}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {announcements.length > 1 && (
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % announcements.length)}
              className="text-[10px] uppercase font-bold tracking-wider underline text-gray-300 hover:text-brand-gold transition-colors"
            >
              Next ({currentIndex + 1}/{announcements.length})
            </button>
          )}
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Close banner"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}