import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.RAJAONGKIR_API_KEY;

  try {
    const response = await fetch('https://api.rajaongkir.com/starter/province', {
      headers: {
        'key': apiKey as string,
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch provinces' }, { status: 500 });
  }
}