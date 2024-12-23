"use client"

import React, { useState, useEffect } from 'react'
import { cn } from "@/lib/utils"
import { generateSessionId } from "@/lib/utils"
import Ticket from "@/components/Ticket"

interface SeatProps {
  id: string
  isSelected: boolean
  isAvailable: boolean
  onSelect: (id: string) => void
}

const Seat: React.FC<SeatProps> = ({ id, isSelected, isAvailable, onSelect }) => (
  <button
    className={cn(
      "relative group",
      "w-8 h-10 sm:w-10 sm:h-12 md:w-12 md:h-14 m-1 sm:m-1.5",
      "flex flex-col items-center justify-end",
      "transition-all duration-200 ease-in-out",
      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    )}
    onClick={() => isAvailable && onSelect(id)}
    disabled={!isAvailable}
    aria-label={`Seat ${id} ${isAvailable ? isSelected ? 'Selected' : 'Available' : 'Not Available'}`}
  >
    {/* Seat Back */}
    <div className={cn(
      "absolute top-0 w-full h-3/5 rounded-t-lg",
      "transform perspective-500 rotateX-10",
      isAvailable
        ? isSelected
          ? "bg-gradient-to-b from-red-500 to-red-600 shadow-red-500/50"
          : "bg-gradient-to-b from-gray-600 to-gray-700 group-hover:from-gray-500 group-hover:to-gray-600"
        : "bg-gradient-to-b from-red-800 to-red-900",
      "shadow-md transition-all duration-200"
    )} />
    
    {/* Seat Bottom */}
    <div className={cn(
      "absolute bottom-0 w-full h-2/5",
      "rounded-sm",
      isAvailable
        ? isSelected
          ? "bg-gradient-to-b from-red-600 to-red-700"
          : "bg-gradient-to-b from-gray-700 to-gray-800 group-hover:from-gray-600 group-hover:to-gray-700"
        : "bg-gradient-to-b from-red-900 to-red-950",
    )} />
    
    {/* Seat Number */}
    <span className={cn(
      "absolute bottom-1 text-[10px] sm:text-xs font-medium z-10",
      isSelected ? "text-white" : "text-gray-300"
    )}>
      {id}
    </span>
  </button>
)

interface SeatBookingProps {
  rows: number
  seatsPerRow: number
  maxSelectableSeats: number
}

const SeatBooking = ({ rows, seatsPerRow, maxSelectableSeats }: SeatBookingProps) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sessionId, setSessionId] = useState('')
  const [unavailableSeats, setUnavailableSeats] = useState<Record<string, string>>({})
  const [showTicket, setShowTicket] = useState(false)

  useEffect(() => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    
    const loadSavedSeats = async () => {
      try {
        const response = await fetch('/api/seats');
        const data = await response.json();
        
        // Track seats that are taken by other sessions
        const takenSeats: Record<string, string> = {};
        Object.entries(data.sessions || {}).forEach(([seat, session]) => {
          if (session !== newSessionId) {
            takenSeats[seat] = session as string;
          }
        });
        setUnavailableSeats(takenSeats);

        // Only load seats that belong to this session
        setSelectedSeats(data.selectedSeats.filter((seat: string) => 
          data.sessions?.[seat] === newSessionId
        ));
      } catch (error) {
        console.error('Error loading saved seats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedSeats();
  }, []);

  // Save seats whenever they change
  const handleSeatSelect = async (id: string) => {
    let newSelectedSeats: string[];

    setSelectedSeats(prev => {
      if (prev.includes(id)) {
        newSelectedSeats = prev.filter(seatId => seatId !== id);
      } else if (prev.length < maxSelectableSeats) {
        newSelectedSeats = [...prev, id];
      } else {
        alert(`You can only select up to ${maxSelectableSeats} seats.`);
        newSelectedSeats = prev;
      }
      
      // Save to API with session information
      fetch('/api/seats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          selectedSeats: newSelectedSeats,
          sessionId,
          seatId: id
        }),
      }).catch(error => console.error('Error saving seats:', error));

      return newSelectedSeats;
    });
  };

  if (isLoading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  const renderSeats = () => {
    const seats = []
    for (let i = 0; i < rows; i++) {
      const row = []
      for (let j = 0; j < seatsPerRow; j++) {
        const seatId = `${String.fromCharCode(65 + i)}${j + 1}`
        row.push(
          <Seat
            key={seatId}
            id={seatId}
            isSelected={selectedSeats.includes(seatId)}
            isAvailable={!unavailableSeats[seatId]}
            onSelect={handleSeatSelect}
          />
        )
      }
      seats.push(
        <div key={i} className="flex justify-center w-full">
          {row}
        </div>
      )
    }
    return seats
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="w-full p-2 sm:p-4">
        <div className="bg-black/50 backdrop-blur-sm rounded-xl p-3 sm:p-6 shadow-2xl">
          <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
            Select Your Seats
          </h2>
          
          <div className="text-center space-y-1 sm:space-y-2 mb-4 sm:mb-8">
            <p className="text-gray-300 text-sm sm:text-base">You can select up to {maxSelectableSeats} seats</p>
            <p className="text-xs sm:text-sm text-gray-400">Selected: {selectedSeats.join(', ') || 'None'}</p>
          </div>

          <div className="relative">
            {/* Screen */}
            <div className="w-full h-6 sm:h-12 mb-8 sm:mb-12 relative">
              <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-gray-800/50 to-transparent rounded-t-full transform perspective-1000 rotateX-60 origin-bottom"></div>
              <div className="absolute inset-x-0 -bottom-4 sm:-bottom-6 text-center text-xs sm:text-sm text-gray-400">Screen</div>
            </div>

            {/* Seats Container */}
            <div className="relative z-10 bg-black/30 p-2 sm:p-4 rounded-xl backdrop-blur-sm overflow-x-auto">
              <div className="w-fit mx-auto space-y-1 sm:space-y-2">
                {renderSeats()}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6 sm:mt-8 text-center">
            <button 
              className={cn(
                "px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base",
                "transition-all duration-200 transform",
                "bg-gradient-to-r from-red-600 to-red-500",
                "hover:from-red-500 hover:to-red-400",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "shadow-lg shadow-red-500/20 hover:shadow-red-500/30",
                "focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              )}
              onClick={() => setShowTicket(true)}
              disabled={selectedSeats.length === 0}
            >
              Confirm Selection
            </button>
          </div>

          {/* Legend */}
          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 sm:w-6 h-6 sm:h-8 rounded-t-lg bg-gradient-to-b from-gray-600 to-gray-700"></div>
              <span className="text-gray-300">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 sm:w-6 h-6 sm:h-8 rounded-t-lg bg-gradient-to-b from-red-500 to-red-600"></div>
              <span className="text-gray-300">Selected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 sm:w-6 h-6 sm:h-8 rounded-t-lg bg-gradient-to-b from-red-800 to-red-900"></div>
              <span className="text-gray-300">Not Available</span>
            </div>
          </div>
        </div>
      </div>

      {showTicket && (
        <Ticket 
          selectedSeats={selectedSeats} 
          onClose={() => setShowTicket(false)}
        />
      )}
    </div>
  )
}

export default SeatBooking;