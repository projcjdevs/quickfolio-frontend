// app/api/portfolio/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  if (typeof window === 'undefined') { // Server-side
    try {
      // For demo purposes - in reality you'd fetch from your database
      const defaultData = {
        name: "Your Name",
        title: "Your Title",
        education: [],
        experience: [],
        leadership: [],
        contact: {},
        config: {
          colors: {
            bg: "#0a0a0a",
            text: "#e5e5e5", 
            accent: "#facc15"
          },
          particleDensity: 50
        }
      };
      
      return NextResponse.json(defaultData);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch portfolio" },
        { status: 500 }
      );
    }
  }
}