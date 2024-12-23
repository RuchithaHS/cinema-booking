"use client"

import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { Suspense } from "react"

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const seats = searchParams.get('seats')?.split(',') || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-red-900/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-gray-400">Thank you for choosing Cinema Elite</p>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-red-950 to-black p-1 rounded-xl">
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-xl font-semibold text-red-400 mb-4">Booking Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Movie</span>
                  <span className="text-white">Upcoming Blockbuster</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Screen</span>
                  <span className="text-white">Screen 1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Seats</span>
                  <span className="text-white">{seats.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/"
              className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-500 hover:to-red-400 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-500">Loading...</div>
        </div>
      }>
        <ConfirmationContent />
      </Suspense>
    </div>
  )
} 