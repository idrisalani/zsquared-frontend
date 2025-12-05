/**
 * Calendar Step Component - MODERN UI/UX
 * - Modern card design
 * - Enhanced visual hierarchy
 * - Better spacing and typography
 * - Smooth animations
 * - Visual feedback
 */

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, AlertCircle } from 'lucide-react';

interface CalendarStepProps {
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  error?: string;
}

// ✅ Mock booked dates - will be replaced with backend API
const MOCK_BOOKED_DATES = [
  '2025-12-05',
  '2025-12-10',
  '2025-12-15',
  '2025-12-20',
  '2025-12-25'
];

export function CalendarStep({
  selectedDate,
  onSelectDate,
  error
}: CalendarStepProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookedDates, setBookedDates] = useState<string[]>(MOCK_BOOKED_DATES);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  // ✅ Convert Date to "YYYY-MM-DD" string using ONLY local operations
  const dateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // ✅ Convert "YYYY-MM-DD" string back to Date using local time
  const stringToDate = (dateStr: string): Date => {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  // ✅ Check availability when month changes
  useEffect(() => {
    const checkAvailability = async (): Promise<void> => {
      setLoadingAvailability(true);
      try {
        // TODO: Replace with real backend API call:
        // const response = await fetch(
        //   `/api/availability/booked-dates?month=${currentMonth.getMonth()+1}&year=${currentMonth.getFullYear()}`
        // );
        // const data = await response.json();
        // setBookedDates(data.bookedDates || []);

        // For now, using mock data
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
        setBookedDates(MOCK_BOOKED_DATES);
      } catch (err) {
        console.error('Failed to check availability:', err);
        // Fallback to empty array if API fails
        setBookedDates([]);
      } finally {
        setLoadingAvailability(false);
      }
    };

    checkAvailability();
  }, [currentMonth]);

  // Get number of days in month
  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday)
  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days: (Date | null)[] = [];

    // Empty cells before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Days of month (using local timezone)
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
    }

    return days;
  };

  const handleDateClick = (date: Date): void => {
    const dateStr = dateToString(date);

    // ✅ Check if date is booked
    if (bookedDates.includes(dateStr)) {
      alert('This date is already booked. Please select another date.');
      return;
    }

    onSelectDate(dateStr);
  };

  const calendarDays = generateCalendarDays();
  const monthYear = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const today = new Date();
  const todayStr = dateToString(today);

  // Count booked dates in current month
  const bookedInMonth = bookedDates.filter(date => {
    const d = stringToDate(date);
    return d.getMonth() === currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear();
  }).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border-2 border-blue-200 bg-linear-to-r from-blue-50 to-purple-50 p-8">
        <div className="flex items-center gap-3 mb-2">
          <Calendar size={24} className="text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Select Your Event Date</h2>
        </div>
        <p className="text-gray-600">Choose when you want to book your event</p>
      </div>

      {/* Calendar */}
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-8">
        {/* Month/Year Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="p-2 rounded-lg border-2 border-gray-300 hover:border-blue-500 transition"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>

          <h2 className="text-xl font-bold text-gray-900">{monthYear}</h2>

          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="p2 rounded-lg border-2 border-gray-300 hover:border-blue-500 transition"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Availability Loading */}
        {loadingAvailability && (
          <div className="mb-4 p-3 bg-blue-100 border-2 border-blue-300 rounded-lg flex items-center gap-2 animate-pulse">
            <div className="text-blue-600">⏳</div>
            <p className="text-blue-900 font-semibold text-sm">Checking availability...</p>
          </div>
        )}

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const dateStr = dateToString(date);
            const isSelected = selectedDate === dateStr;
            const isToday = todayStr === dateStr;
            const isPast = date < today && !isToday;
            const isBooked = bookedDates.includes(dateStr);

            return (
              <button
                key={dateStr}
                onClick={() => handleDateClick(date)}
                disabled={isPast || isBooked}
                title={isBooked ? 'Date is already booked' : isPast ? 'Past date' : ''}
                className={`
                  aspect-square rounded-lg border-2 font-bold transition text-sm relative group
                  ${isSelected
                    ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white border-blue-600 shadow-lg'
                    : isToday
                    ? 'border-blue-400 bg-blue-50 text-gray-900'
                    : isBooked
                    ? 'border-red-400 bg-red-100 text-red-700 cursor-not-allowed hover:bg-red-100'
                    : isPast
                    ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-900 hover:border-blue-500 hover:bg-blue-50'
                  }
                `}
              >
                <span>{date.getDate()}</span>
                
                {/* 🔒 Icon for booked dates */}
                {isBooked && (
                  <div className="absolute top-0 right-0 text-xs bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                    🔒
                  </div>
                )}

                {/* Tooltip on hover */}
                {isBooked && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                    Already booked
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center gap-3 flex-wrap text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-blue-400 bg-blue-50 rounded"></div>
            <span className="text-gray-600">Today</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-linear-to-r from-blue-600 to-purple-600 rounded"></div>
            <span className="text-gray-600">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-red-400 bg-red-100 rounded text-center text-xs">🔒</div>
            <span className="text-gray-600">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-gray-200 bg-gray-100 rounded"></div>
            <span className="text-gray-600">Past</span>
          </div>
        </div>
      </div>

      {/* Availability Notice */}
      {bookedInMonth > 0 && (
        <div className="rounded-2xl border-2 border-yellow-300 bg-yellow-50 p-4 flex items-start gap-3">
          <AlertCircle size={20} className="text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-yellow-900 font-semibold mb-1">Availability Notice</p>
            <p className="text-sm text-yellow-800">
              {bookedInMonth} date{bookedInMonth !== 1 ? 's are' : ' is'} already booked in {monthYear}. These dates are marked with 🔒 and cannot be selected.
            </p>
          </div>
        </div>
      )}

      {/* Selected Date Display */}
      {selectedDate && (
        <div className="rounded-2xl border-2 border-green-300 bg-green-50 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">✓</div>
            <div>
              <p className="text-sm text-green-600 font-semibold">Date Selected</p>
              <p className="text-lg font-bold text-gray-900">
                {stringToDate(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
          <Calendar size={24} className="text-green-600" />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="rounded-2xl border-2 border-red-300 bg-red-50 p-4">
          <p className="text-red-700 font-semibold">{error}</p>
        </div>
      )}
    </div>
  );
}