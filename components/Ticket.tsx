"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface TicketProps {
  selectedSeats: string[]
  onClose: () => void
}

export default function Ticket({ selectedSeats, onClose }: TicketProps) {
  const router = useRouter()

  const handleConfirm = () => {
    router.push(`/confirmation?seats=${selectedSeats.join(',')}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-red-950 to-black rounded-2xl p-1 max-w-md w-full shadow-2xl"
      >
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 relative">
          <div className="absolute -left-2 top-1/2 w-4 h-4 bg-black rounded-full transform -translate-y-1/2" />
          <div className="absolute -right-2 top-1/2 w-4 h-4 bg-black rounded-full transform -translate-y-1/2" />
          
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Your Tickets
            </h3>
          </div>

          <div className="space-y-4">
            <div className="border-b border-red-900/30 pb-4">
              <div className="flex justify-between text-gray-400">
                <span>Cinema Elite</span>
                <span>Screen 1</span>
              </div>
            </div>

            <div className="border-b border-red-900/30 pb-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-red-400 mb-2">Selected Seats</div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {selectedSeats.map(seat => (
                    <span
                      key={seat}
                      className="px-3 py-1 bg-red-900/20 rounded-full text-red-300 text-sm"
                    >
                      {seat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 rounded-lg border border-red-900/50 text-red-400 hover:bg-red-900/20 transition-colors"
              >
                Change Seats
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-500 hover:to-red-400 transition-colors"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 