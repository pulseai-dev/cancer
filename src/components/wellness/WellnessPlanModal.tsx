import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WellnessDay } from '../../types/analysis';
import { getWellnessPlan } from '../../services/wellnessData';

interface WellnessPlanModalProps {
  isOpen: boolean;
  riskProfile: string;
  onClose: () => void;
}

function DayCard({ day, isExpanded, onToggle }: { day: WellnessDay; isExpanded: boolean; onToggle: () => void }) {
  const intensityColors = {
    low: 'bg-success/10 text-success',
    moderate: 'bg-warning/10 text-warning',
    high: 'bg-danger/10 text-danger',
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-medium text-sm flex items-center justify-center">
            {day.day}
          </span>
          <div className="text-left">
            <p className="text-sm font-medium text-neutral">Day {day.day}</p>
            <p className="text-xs text-neutral/50">{day.exercise.type} • {day.exercise.duration}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${intensityColors[day.exercise.intensity]}`}>
            {day.exercise.intensity}
          </span>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
            className={`text-neutral/40 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-3 pt-0 border-t border-gray-100 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-neutral/60 uppercase">Diet</h4>
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium">Breakfast:</span> {day.diet.breakfast}</p>
                    <p><span className="font-medium">Lunch:</span> {day.diet.lunch}</p>
                    <p><span className="font-medium">Dinner:</span> {day.diet.dinner}</p>
                  </div>
                  <p className="text-xs text-primary">{day.diet.tips}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-neutral/60 uppercase">Exercise</h4>
                  <div className="text-sm">
                    <p><span className="font-medium">Type:</span> {day.exercise.type}</p>
                    <p><span className="font-medium">Duration:</span> {day.exercise.duration}</p>
                    <p><span className="font-medium">Intensity:</span> {day.exercise.intensity}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function WellnessPlanModal({ isOpen, riskProfile, onClose }: WellnessPlanModalProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [activeTab, setActiveTab] = useState<'combined' | 'diet' | 'exercise'>('combined');
  const plan = getWellnessPlan(riskProfile);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-heading text-lg text-neutral">7-Day Wellness Plan</h3>
                <p className="text-xs text-neutral/50 capitalize">{riskProfile} risk profile</p>
              </div>
              <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              {(['combined', 'diet', 'exercise'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 text-sm font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-neutral/50 hover:text-neutral'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {plan.days.map((day) => (
                <DayCard
                  key={day.day}
                  day={day}
                  isExpanded={expandedDay === day.day}
                  onToggle={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
