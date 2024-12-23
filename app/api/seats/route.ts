import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Define types
interface Data {
  selectedSeats: string[];
  sessions: Record<string, string>;
}

const dataFilePath = path.join(process.cwd(), 'data', 'seats.json');

export async function GET() {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    return NextResponse.json(JSON.parse(fileContent));
  } catch {
    // No need to use 'error' if it's not utilized
    return NextResponse.json({ selectedSeats: [], sessions: {} });
  }
}

export async function POST(request: Request) {
  try {
    const { selectedSeats, sessionId, seatId }: { selectedSeats: string[]; sessionId: string; seatId: string } = await request.json();
    
    // Read existing data
    let data: Data = { selectedSeats: [], sessions: {} };
    try {
      const fileContent = await fs.readFile(dataFilePath, 'utf-8');
      data = JSON.parse(fileContent) as Data;
    } catch {
      // Ignore file reading errors and use default empty data
    }

    // Update the data
    if (selectedSeats.includes(seatId)) {
      // Seat was added
      data.sessions[seatId] = sessionId;
    } else {
      // Seat was removed
      delete data.sessions[seatId];
    }
    
    data.selectedSeats = selectedSeats;

    // Write the updated data back to the file
    await fs.writeFile(dataFilePath, JSON.stringify(data));

    return NextResponse.json(data);
  } catch {
    // Handle POST error gracefully without using 'error'
    return NextResponse.json(
      { error: 'Failed to update seats' },
      { status: 500 }
    );
  }
}
