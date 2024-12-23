import SeatBooking from '@/components/SeatBooking'
import PageTransition from '../../components/PageTransition'

export default function SeatsPage() {
  return (
    <PageTransition>
      <SeatBooking rows={8} seatsPerRow={12} maxSelectableSeats={5} />
    </PageTransition>
  )
}